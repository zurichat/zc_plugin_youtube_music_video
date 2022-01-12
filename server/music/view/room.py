import requests
from django.conf import settings
from drf_spectacular.utils import extend_schema
from music.serializer.room import (AddToRoomSerializer, RemoveUserSerializer,
                                   RoomSerializer, UpdateRoomSerializer)
from music.utils.data_access import (centrifugo_publish, delete_data,
                                     get_org_members, read_data, room_image,
                                     write_data)
from music.utils.dataStorage import DataStorage
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


# room views
class RoomView(APIView):
    @extend_schema(
        request=RoomSerializer,
        responses={200: RoomSerializer},
        description="view rooms in the collection",
        methods=["GET"],
    )
    def get(self, request, *args, **kwargs):
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid():
            try:
                data = read_data(settings.ROOM_COLLECTION)

                if data["status"] == 200:
                    return Response(data=data["data"], status=status.HTTP_200_OK)
                return Response(
                    data={"message": "rooms not found"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except Exception:
                return Response(
                    data={"message": "Error reading from collection"},
                    status=status.HTTP_424_FAILED_DEPENDENCY,
                )
        return Response(data={"Bad request"}, status=status.HTTP_400_BAD_REQUEST)


class RoomDetailView(APIView):
    @extend_schema(
        request=RoomSerializer,
        responses={200: RoomSerializer},
        description="view information about a specific room in the collection. Pass the roomid (_id) in the url",
        methods=["GET"],
    )
    def get(self, request, *args, **kwargs):
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid():
            pk = kwargs["_id"]
            try:
                data = read_data(settings.ROOM_COLLECTION, object_id=pk)
                if data["status"] == 200:
                    return Response(data, status=status.HTTP_200_OK)
                return Response(
                    data={"room not found"}, status=status.HTTP_404_NOT_FOUND
                )
            except Exception:
                return Response(
                    data={"message": "Error reading from collection"},
                    status=status.HTTP_424_FAILED_DEPENDENCY,
                )
        return Response(data={"Bad request"}, status=status.HTTP_400_BAD_REQUEST)


class UpdateRoomView(APIView):
    @extend_schema(
        request=UpdateRoomSerializer,
        responses={200: RoomSerializer},
        description="update room",
        methods=["PUT"],
    )
    def put(self, request, *args, **kwargs):

        """
        This endpoint is used to update the musicroom. Constants like plugin_id, org_id are not editable. All other parameters except the room_id are optional.

        Sample request body

        {
            "room_name": "Music",
            "description": "New music room"
        }

        """
        serializer = UpdateRoomSerializer(data=request.data)

        if serializer.is_valid():
            payload = serializer.data
            # room_id = request.data["_id"]
            room_id = kwargs["_id"]
            room_data = read_data(settings.ROOM_COLLECTION, object_id=room_id)

            if room_data["status"] == 200:
                room_data["data"]["_id"] == room_id
                try:
                    data = write_data(
                        settings.ROOM_COLLECTION,
                        object_id=room_id,
                        payload=payload,
                        method="PUT",
                    )
                except Exception:
                    return None

                if data["status"] == 200:
                    centrifugo_response = centrifugo_publish(
                        room=settings.ROOM_ID,
                        event="Room Update",
                        data=data,
                    )
                    if centrifugo_response.get("status_code", None) == 200:
                        return Response(data, status=status.HTTP_200_OK)
                    return Response(
                        "Room updated but Centrifugo is not available",
                        status=status.HTTP_424_FAILED_DEPENDENCY,
                    )
                return Response(
                    data={"message": "Room not updated"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            return Response(data={"Room not found"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(data={"Bad request"}, status=status.HTTP_400_BAD_REQUEST)


class DeleteRoomView(APIView):
    @extend_schema(
        request=RoomSerializer,
        responses={200: RoomSerializer},
        description="delete a specific room from the collection",
        methods=["DELETE"],
    )
    def delete(self, request, *args, **kwargs):
        org_id = kwargs.get("org_id")
        room_id = kwargs.get("_id")
        collection = settings.ROOM_COLLECTION
        filter_data = {"organization_id": org_id}

        try:
            room = read_data(collection, object_id=room_id, filter_data=filter_data)
        except requests.exceptions.RequestException as e:
            print(e)
            return None

        if room:
            if room["status"] == 200:
                if room["data"]["_id"] == room_id:
                    response = delete_data(collection, object_id=room_id)
                    if response["status"] == 200:
                        return Response(data=response, status=status.HTTP_200_OK)
                    return Response(
                        data={"room not deleted"},
                        status=status.HTTP_424_FAILED_DEPENDENCY,
                    )
                return Response(data={"invalid room"}, status=status.HTTP_404_NOT_FOUND)
            return Response(
                data={room["message"]: "room not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        return Response(data={"invalid room_id"}, status=status.HTTP_404_NOT_FOUND)


class CreateRoom(APIView):
    @extend_schema(
        request={RoomSerializer},
        responses={200: RoomSerializer},
        description="create a new room",
        methods=["POST"],
    )
    def post(self, request, *args, **kwargs):

        """
        This endpoint is used to create a new room. It checks for a valid org_id and member_id of the user creating the room. If the user is a member of the org, it creates a new room, adds the user to the memberId list and returns the room_id.

        Sample request body

        {
            "plugin_name": "Youtube music plugin",
            "room_name": "Music",
            "description": "New music room"
        }

        """
        serializer = RoomSerializer(data=request.data)

        org_id = kwargs.get("org_id")
        member_id = kwargs.get("member_id")
        created_by = member_id
        collection = settings.ROOM_COLLECTION
        room_name = request.data.get("room_name")
        description = request.data.get("description")
        plugin_name = request.data.get("plugin_name")
        plugin_id = settings.PLUGIN_ID

        if org_id and member_id:
            org_members = get_org_members(org_id)
            if org_members["status"] == 200:
                org_members = org_members["data"]
                for member in org_members:
                    if member["_id"] == member_id:

                        if serializer.is_valid():
                            rooms = {
                                "plugin_id": plugin_id,
                                "org_id": org_id,
                                "collection": collection,
                                "room_name": room_name,
                                "plugin_name": plugin_name,
                                "description": description,
                                "created_by": created_by,
                                "is_private": False,
                                "is_archived": False,
                                "memberId": [created_by],
                            }
                            try:
                                data = write_data(
                                    settings.ROOM_COLLECTION, payload=rooms
                                )
                            except Exception:
                                return Response(
                                    data={"message": "Error writing to collection"},
                                    status=status.HTTP_424_FAILED_DEPENDENCY,
                                )
                            if data["status"] == 200:
                                return Response(data, status=status.HTTP_200_OK)
                            return Response(
                                data={"message": "Room not created"},
                                status=status.HTTP_400_BAD_REQUEST,
                            )
                        return Response(
                            data={"Bad request"}, status=status.HTTP_400_BAD_REQUEST
                        )
                    return Response(
                        data={"message": "Member not found"},
                        status=status.HTTP_404_NOT_FOUND,
                    )
            return Response(
                data={"message": "Organization not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        return Response(
            data={"message": "Invalid org_id or member_id"},
            status=status.HTTP_400_BAD_REQUEST,
        )


# user views
class UserCountView(APIView):
    @extend_schema(
        request=RoomSerializer,
        responses={200: RoomSerializer},
        description="get total count of users in the room",
        methods=["GET"],
    )
    def get(self, request, *args, **kwargs):

        serializer = RoomSerializer(data=request.data)
        room_id = kwargs.get("_id")
        if serializer.is_valid():
            room_data = read_data(settings.ROOM_COLLECTION, object_id=room_id)
            if room_data["status"] == 200:
                room_users = room_data["data"]["memberId"]
                if room_users:
                    user_count = len(room_users)
                    centrifugo_response = centrifugo_publish(
                        room=settings.ROOM_ID, event="user_count", data=user_count
                    )
                    if centrifugo_response.get("status_code", None) == 200:
                        return Response(user_count, status=status.HTTP_200_OK)
                    return Response(
                        "Centrifugo is not available",
                        status=status.HTTP_424_FAILED_DEPENDENCY,
                    )
                return Response(
                    data={"message": "no users in this room"}, status=status.HTTP_200_OK
                )
            return Response(
                data={"message": "room not found"}, status=status.HTTP_404_NOT_FOUND
            )
        return Response(data={"Bad request"}, status=status.HTTP_400_BAD_REQUEST)


class DeleteRoomUserView(APIView):
    @extend_schema(
        request=RemoveUserSerializer,
        responses={200: RemoveUserSerializer},
        description="view and remove users from the room list. Note: pass {'room_id':'xxxx', 'org_id': 'xxxx', 'memberId':'xxxx'} as the request parameters to remove a user",
        methods=["PUT"],
    )
    def remove_user(self, request, *args, **kwargs):

        room_data = read_data(settings.ROOM_COLLECTION)
        room_users = room_data["data"][0]["memberId"]
        room_id = room_data["data"][0]["_id"]
        user = request.data["memberId"]

        for x in room_users:
            if x == user:
                room_users.remove(x)
        return room_id, room_users

    def put(self, request, *args, **kwargs):

        """
        This endpoint is used to remove a user from the room.

        Sample request body

        {
            "room_id": "61a4c1cd4f88198ec49dd636",
            "org_id" : "619ba4671a5f54782939d384",
            "memberId":"619baa6a1a5f54782939d38e"
        }
        """

        room_id, updated_room = self.remove_user(request)
        user = request.data["memberId"]
        org_id = request.data["org_id"]
        payload = {"memberId": updated_room}

        data = write_data(
            settings.ROOM_COLLECTION, object_id=room_id, payload=payload, method="PUT"
        )
        if data["status"] == 200:
            sidebar_data = {
                "name": "Music Plugin",
                "description": "User joins the music room",
                "group_name": [],
                "category": "Entertainment",
                "show_group": False,
                "button_url": "/music",
                "public_rooms": [],
                "starred_rooms": [],
                "joined_rooms": [],
            }

            response_output = {
                "event": "remove_user_from_room",
                "message": "success",
                "data": {
                    "memberId": user,
                    "action": "user removed successfully",
                },
            }

            channel = f"{org_id}_{user}_sidebar"
            centrifugo_data = centrifugo_publish(
                room=channel, event="sidebar_update", data=sidebar_data
            )
            if centrifugo_data.get("status_code", None) == 200:
                return Response(data=response_output, status=status.HTTP_201_CREATED)
            return Response(
                data="User removed but centrifugo not available",
                status=status.HTTP_424_FAILED_DEPENDENCY,
            )
        return Response("User not removed", status=status.HTTP_400_BAD_REQUEST)


class RoomUserList(APIView):
    @extend_schema(
        request=RoomSerializer,
        responses={200: RoomSerializer},
        description="retrieve the list of users in a specific room. You need to pass the room_id (_id) in the url",
        methods=["GET"],
    )
    def get(self, request, *args, **kwargs):

        serializer = RoomSerializer(data=request.data)
        room_id = kwargs.get("_id")

        if serializer.is_valid():
            room_data = read_data(settings.ROOM_COLLECTION, object_id=room_id)
            if room_data["status"] == 200:
                room_users = room_data["data"]["memberId"]
                if room_users:
                    return Response(
                        data={"room_users": room_users}, status=status.HTTP_200_OK
                    )
                return Response(
                    data={"message": "User not found"}, status=status.HTTP_200_OK
                )

            return Response(
                data={"message": "room not found"}, status=status.HTTP_404_NOT_FOUND
            )
        return Response(data={"Bad request"}, status=status.HTTP_400_BAD_REQUEST)


class AddUserToRoomView(APIView):
    @extend_schema(
        request=AddToRoomSerializer,
        responses={200: AddToRoomSerializer},
        description="add new user to a room",
        methods=["POST"],
    )
    def post(self, request, org_id, room_id):

        """
        This endpoint is used to add a user to the room.

        Sample request body

        {
            "room_id": "61ddd85a5a3812d0a9d0b40c",
            "memberId": ["619baa6a1a5f54782939d38e"]
        }
        """

        helper = DataStorage()
        helper.organization_id = org_id
        serializer = AddToRoomSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.data
            room_id = data["room_id"]
            member_ids = data["memberId"]
            music_room = helper.read("musicroom", {"_id": room_id})
            if music_room and music_room.get("status_code", None) is None:
                users_id = music_room.get("memberId")
                new_members = list(set(member_ids).difference(set(users_id)))
                list(map(lambda x: users_id.append(x), new_members))
                if new_members:
                    response = helper.update(
                        "musicroom", room_id, {"memberId": users_id}
                    )
                    if response.get("status") == 200:
                        response_output = {
                            "event": "add_users_to_room",
                            "message": response.get("message"),
                            "data": {
                                "room_id": data["room_id"],
                                "new_member_ids": new_members,
                                "action": "user/users added successfully",
                            },
                        }
                        try:
                            for new_member_id in new_members:
                                music_data = {
                                    "room_image": "https://svgshare.com/i/aXm.svg",
                                    "room_url": f"/music/{room_id}",
                                }

                                sidebar_data = {
                                    "name": "Music Plugin",
                                    "description": "User joins the music room",
                                    "group_name": "Music",
                                    "category": "Entertainment",
                                    "show_group": True,
                                    "button_url": "/music",
                                    "public_rooms": [music_data],
                                    "joined_rooms": [music_data],
                                }

                                channel = f"{org_id}_{new_member_id}_sidebar"
                                centrifugo_data = centrifugo_publish(
                                    room=channel,
                                    event="sidebar_update",
                                    data=sidebar_data,
                                )

                            if (
                                centrifugo_data
                                and centrifugo_data.get("status_code") == 200
                            ):
                                return Response(
                                    data=response_output, status=status.HTTP_201_CREATED
                                )

                            return Response(
                                data="User/users added but centrifugo not available",
                                status=status.HTTP_424_FAILED_DEPENDENCY,
                            )
                        except Exception:
                            return Response(
                                data="centrifugo server not available",
                                status=status.HTTP_424_FAILED_DEPENDENCY,
                            )
                    return Response(
                        "User/users not added", status=status.HTTP_424_FAILED_DEPENDENCY
                    )
                return Response(
                    "Member/members already in room", status=status.HTTP_302_FOUND
                )
            return Response(
                "Data not available on ZC core",
                status=status.HTTP_424_FAILED_DEPENDENCY,
            )
        return Response(data={"Bad request"}, status=status.HTTP_400_BAD_REQUEST)
