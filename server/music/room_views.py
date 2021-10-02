from config.settings import SONG_COLLECTION, COMMENTS_COLLECTION
from rest_framework import status
from rest_framework.viewsets import ViewSet
from music.utils.FilterWrapper import OrderMixin
from rest_framework.response import Response
from music.serializers import *
from music.utils.data_access import *
from django.utils.timezone import datetime
from rest_framework.decorators import action


class MusicRoom(ViewSet, OrderMixin):
    OrderingFields = {"members": int, "created_on": datetime.fromisoformat}

    @action(methods=["POST"], detail=False, )
    def MusicRoomCreate(self, request):
        serializer = MusicRoomSerializer(data=request.data, context={"org_id": org_id})
        serializer.is_valid(raise_exception=True)
        musicroom = serializer.data.get("musicroom")
        res = musicroom.create
        status_code = status.HTTP_404_NOT_FOUND
        if res.__contains__("_id"):
            res.update({"members": len(res["users"].keys())})
            status_code = status.HTTP_201_CREATED
        return Response(res, status=status_code)

    @action(methods=["GET"], detail=False, )
    def MusicRoomDetails(self, room_id):
        """displays music room details
        """
        res = read_data(ROOM_COLLECTION, room_id)
        status_code = status.HTTP_404_NOT_FOUND
        if res.__contains__("_id") or isinstance(res, dict):
            res.update({"members": len(res["users"].keys())})
            status_code = status.HTTP_200_OK
        return Response(res, status=status_code)

    @action(methods=["GET"], detail=False)
    def all_musicroom(self, request, ):
        """Get all music room in an organization
        """
        data = {}
        data.update(self._clean_query_params(request))
        result = read_data(ROOM_COLLECTION, data) or []
        status_code = status.HTTP_404_NOT_FOUND
        if isinstance(result, list):
            if result:
                for i, musicroom in enumerate(result):
                    result[i].update({"members": len(musicroom["users"].keys())})
                result = self.perform_ordering(request, result)
            status_code = status.HTTP_200_OK
        return Response(result, status=status_code)

    @action(methods=["DELETE"], detail=False, )
    def DeleteMusicRoom(self, room_id):
        """
        deletes a music room and its related objects:  songs and chats
        """
        res = delete_data(ROOM_COLLECTION, object_id=room_id)
        if res.get("status") == 200:
            if res.get("data", {}).get("deleted_count") > 0:
                delete_data(COMMENTS_COLLECTION, org_id, filter_data={"room_id": room_id})
                delete_data(SONG_COLLECTION, org_id, filter_data={"room_id": room_id})

        return Response(status=status.HTTP_204_NO_CONTENT)

    @staticmethod
    def Retrieve_Music_Room(request, room_id):
        """
        retrieves a room's data
        """
        data = {"_id": room_id}
        res = read_data(ROOM_COLLECTION, data) or {}
        if res.__contains__("_id") and isinstance(res, dict):
            return res
        return {}

    @action(methods=["POST"], detail=False, )
    def Add_member_2_room(self, request, room_id):
        """
        adds a user to a music room
        """
        room = self.Retrieve_Music_Room(request, room_id)

        if room.__contains__("_id"):

            output = None

            # if multiple users are been added
            if isinstance(request.data, list):
                serializer = MemberSerializer(data=request.data, many=True)
                serializer.is_valid(raise_exception=True)
                user_list = serializer.initial_data

                # adds all users not in room
                for user in user_list:
                    if room["users"].get(user["_id"]):
                        user_list.pop(user)
                    else:
                        room["users"].update({f"{user['_id']}": user})

                output = user_list

            else:
                user_id = request.data.get("_id")
                user_data = room["users"].get(user_id)

                if not user_data:
                    serializer = MemberSerializer(data=request.data)
                    serializer.is_valid(raise_exception=True)
                    user_data = serializer.data

                    # add user to room
                    room["users"].update({f"{user_data['_id']}": serializer.data})

                    output = user_data
                else:
                    return Response(user_data, status=status.HTTP_200_OK)

            # removes room Id so it wont be changed in the process of updating
            room_id = room.pop("_id", None)

            # this only updates the user dictionary
            payload = {"users": room["users"]}

            res = update(ROOM_COLLECTION, payload=payload, object_id=room_id)
            return Response(res, status=res.status_code)
        return Response({"error": "Music Room not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(methods=["DELETE"], detail=False, )
    def Remove_member_from_room(self, request, room_id, member_id):
        """Removes member from a Music Room
        """
        room = self.Retrieve_Music_Room(request, room_id)

        if room.__contains__("_id"):

            # checks if the user is already a member of room
            user_data = room["users"].get(member_id)

            if user_data:
                # this removes a user from room
                del room["users"][member_id]

                room_id = room.pop("_id", None)

                payload = {"users": room["users"]}

                res = update(ROOM_COLLECTION, payload=payload, object_id=room_id)

                if isinstance(res, dict):
                    data = {"msg": "success"} if not res.get("error") else res

                    if not res.get("error"):
                        status_code = (status.HTTP_204_NO_CONTENT
                                       if not res.get("error")
                                       else status.HTTP_400_BAD_REQUEST)
                    return Response(data, status=status_code)

            return Response({"error": "member not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"error": "Music Room not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(methods=["GET"], detail=False, )
    def List_members_in_room(self, request, room_id):
        """
        gets all members of a room
        """
        musicroom = self.Retrieve_Music_Room(request, room_id)

        if musicroom.__contains__("_id"):
            users = list(musicroom.get("users", {}).values())
            serializer = MemberSerializer(data=users, many=True)
            serializer.is_valid(raise_exception=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response({"error": "music room not found"}, status=status.HTTP_404_NOT_FOUND)


musicroom_create_list_view = MusicRoom.as_view({"get": "all_musicroom", "post": "MusicRoomCreate"})
musicroom_details_delete_view = MusicRoom.as_view({"get": "MusicRoomDetails", "delete": "DeleteMusicRoom"})
musicroom_members_add_list_views = MusicRoom.as_view({"get": "List_members_in_room", "post": "Add_member_2_room"})
musicroom_remove_member_views = MusicRoom.as_view({"delete": "Remove_member_from_room"})
