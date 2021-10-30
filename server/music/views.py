import re
from django.core.paginator import Paginator
from django.conf import settings
from requests import status_codes
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.http import JsonResponse
import json
from music.serializers import *
from music.models import *
from music.utils.data_access import *
from rest_framework.views import APIView
import requests
from music.utils.dataStorage import *
from requests import exceptions
from django.http import Http404
from music.pagination import *
from music.authentication import *
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample
from drf_spectacular.types import OpenApiTypes


# from rest_framework.authentication import TokenAuthentication, SessionAuthentication


room_image = ["https://svgshare.com/i/aXm.svg"]


class change_room_image(APIView):

    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        return Response(
            {
                "message": "This endpoint is for editing the music room icon in the sidebar "
            },
            status=status.HTTP_200_OK,
        )

    def post(self, request, *args, **kwargs):
        data = request.data

        if data["albumCover"] == "":
            room_image[0] = "https://svgshare.com/i/aXm.svg"
        else:
            room_image[0] = data["albumCover"]

        return Response(
            {"room_image": room_image, "curent-song": data}, status=status.HTTP_200_OK
        )


def get_room_info(room_id=None):
    room_data = read_data(settings.ROOM_COLLECTION, object_id=room_id)
    output = []
    if room_data:
        room = {
            "room_name": room_data["data"]["room_name"],
            "room_id": f"/music/{room_id}",
            "button_url": f"/music",
            "room_image": room_image[0],
        }
        output.append(room)
        return output
    return output


class SidebarView(GenericAPIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):

        org_id = request.GET.get("org", None)
        user_id = request.GET.get("user", None)
        room_id = settings.ROOM_ID
        pub_room = get_room_info(room_id)
        sidebar_update = "currentWorkspace_userInfo_sidebar"
        subscription_channel = "{org_id}_{user_id}_sidebar"
        url = f"https://api.zuri.chat/organizations/{org_id}/members"
        headers ={}
        sidebar = {
            "name": "Music Plugin",
            "description": "This is a virtual lounge where people can add, watch and listen to YouTube videos or music",
            "group_name": [],
            "category": "entertainment",
            "plugin_id": "music.zuri.chat",
            "organisation_id": "",
            "room_id": "",
            "user_id": "",
            "show_group": False,
            "button_url": f"/music",
            "public_rooms": [],
            "joined_rooms": [],
        }
        
        if org_id and user_id:
            if "Authorization" in request.headers:
                headers["Authorization"] = request.headers["Authorization"]
            else:
                headers["Cookie"] = request.headers["Cookie"]
            org_members = requests.request(
                "GET",
                url=url,
                headers=headers,
            )
            
            if org_members.status_code == 200:
                members = org_members.json()["data"]
                for user in members:
                    if user_id == user["_id"]:
                        sidebar_data = sidebar
                        sidebar_data["organisation_id"] = org_id
                        sidebar_data["room_id"] = room_id
                        sidebar_data["user_id"] = user_id
                        sidebar_data["public_rooms"] = pub_room
                        sidebar_data["joined_rooms"] = pub_room
                        
                        sidebar_update_payload = {
                                    "event": "sidebar_update",
                                    "plugin_id": "dm.zuri.chat",
                                    "data": sidebar_data
                                }
                        return Response(sidebar_update_payload, status=status.HTTP_200_OK)
                    else:
                        pass
                return Response(sidebar, status=status.HTTP_401_UNAUTHORIZED)
            return Response(sidebar, status=status.HTTP_424_FAILED_DEPENDENCY)
        return Response(sidebar, status=status.HTTP_204_NO_CONTENT)

    def is_valid(param):
        return param != "" and param is not None


class PluginInfoView(GenericAPIView):

    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        data = {
            "message": "Plugin Information Retrieved",
            "data": {
                "type": "Plugin Information",
                "plugin_info": {
                    "name": "Music room",
                    "description": [
                        "This is a plugin that allows individuals in an organization to add music and "
                        "video links from YouTube to a  shared playlist. Users also have the option to "
                        "chat with other users in the music room and the option to like a song or video "
                        "that is in the music room library."
                    ],
                },
                "version": "v1",
                "scaffold_structure": "Monolith",
                "team": "HNG 8.0/Team Music Plugin",
                "developer_name": "Music Plugin",
                "developer_email": "musicplugin@zurichat.com",
                "icon_url": "https://svgshare.com/i/aXm.svg",
                "photos": "https://svgshare.com/i/aXm.svg",
                "homepage_url": "https://zuri.chat/music",
                "sidebar_url": "https://zuri.chat/sidebar",
                "install_url": "https://zuri.chat/music",
                "ping_url": "http://zuri.chat/music/api/v1/ping",
            },
            "success": "true",
        }
        return JsonResponse(data, safe=False)


class PluginPingView(GenericAPIView):

    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        server = [
            {"status": "Success", "Report": ["The music.zuri.chat server is working"]}
        ]
        return JsonResponse({"server": server})


# song views
class SongView(APIView):

    serializer_class = SongSerializer

    @extend_schema(
        request=SongSerializer,
        responses={200: SongSerializer},
        description="Add and view songs",
        methods=["GET", "POST"],
    )
    def get(self, request, *args, **kwargs):
        data = read_data(settings.SONG_COLLECTION)

        return Response(data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        media_info = get_video(request.data["url"])
        userId_info = request.data["userId"]
        addedBy_info = request.data["addedBy"]
        time_info = request.data["time"]

        payload = {
            "title": media_info["title"],
            "duration": media_info["duration"],
            "albumCover": media_info["thumbnail_url"],
            "url": media_info["track_url"],
            "userId": userId_info,
            "addedBy": addedBy_info,
            "likedBy": [],
            "time": time_info,
        }

        data = write_data(settings.SONG_COLLECTION, payload=payload)

        updated_data = read_data(settings.SONG_COLLECTION)
        updated_object = updated_data["data"][-1]
        # returns the updated_object alone
        centrifugo_response = centrifugo_publish(
            room=plugin_id, event="New song added", data=updated_object
        )
        if centrifugo_response.get("status_code", None) == 200:
            return Response(updated_object, status=status.HTTP_202_ACCEPTED)
        return Response(
            "Song updated but Centrifugo is not available",
            status=status.HTTP_424_FAILED_DEPENDENCY,
        )

        # Note: song endpoint expects {"url": "", "userId": "", "addedBy":"", "time":""} in the payload


class DeleteSongView(APIView):
    serializer_class = SongSerializer

    @extend_schema(
        request=SongSerializer,
        responses={200: SongSerializer},
        description="view and delete songs",
        methods=["GET", "POST"],
    )
    def get(self, request, *args, **kwargs):
        data = read_data(settings.SONG_COLLECTION)
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = SongSerializer(data=request.data)

        if serializer.is_valid():
            object_id = request.data["_id"]

            data = delete_data(settings.SONG_COLLECTION, object_id=object_id)

            updated_data = read_data(settings.SONG_COLLECTION)

            centrifugo_response = centrifugo_publish(
                room=plugin_id, event="Song deleted", data=updated_data
            )
            if centrifugo_response.get("status_code", None) == 200:
                return Response(updated_data, status=status.HTTP_200_OK)
            return Response(
                "Song deleted but Centrifugo is not available",
                status=status.HTTP_424_FAILED_DEPENDENCY,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # Note: use {"_id": ""} to delete


class SongSearchView(APIView):

    serializer_class = SongSerializer

    @extend_schema(
        request=SongSerializer,
        responses={200: SongSerializer},
        description="search for songs",
        methods=["GET"],
    )
    def get(self, request, *args, **kwargs):

        collection_name = settings.SONG_COLLECTION

        key = request.query_params.get("q") or []
        filters = request.query_params.getlist("filter", [])
        paginate_by = request.query_params.get("limit", 20)
        paginator = SearchPagination()
        paginator.page_size = paginate_by

        key_word = key
        if key_word:
            key_word = re.split("[;,-]+", key_word)

        songs = read_data(collection_name)["data"]
        search_result = []

        try:
            for word in key_word:
                word = word.lower()
                for song in songs:
                    title = str(song["title"]).lower()
                    if word in title and song not in search_result:
                        search_result.append(song)

            for item in search_result:
                item["images_url"] = [item["albumCover"]]
                item["created_at"] = item["time"]
                item["created_by"] = item["addedBy"]
                item["content"] = item["title"]
                item["destination_url"] = f"/music/{collection_name}/{item['_id']}"
                for field in [
                    "duration",
                    "likedBy",
                    "time",
                    "addedBy",
                    "albumCover",
                    "userId",
                    "url",
                ]:
                    item.pop(field)

            result = paginator.paginate_queryset(search_result, request)
            # print(result)
            return paginator.get_paginated_response(
                result, key, filters, request, entity_type="others"
            )

        except Exception as e:
            print(e)
            result = paginator.paginate_queryset([], request)
            return paginator.get_paginated_response(
                result, key, filters, request, entity_type="others"
            )


class SongSearchSuggestions(APIView):
    serializer_class = SongSerializer

    @extend_schema(
        request=SongSerializer,
        responses={200: SongSerializer},
        description="Song search",
        methods=["GET"],
    )
    def get(self, request, *args, **kwargs):
        songs = read_data(settings.SONG_COLLECTION)["data"]
        data = {}
        try:
            for song in songs:
                data[song["title"]] = song["title"]

            return Response(
                {
                    "status": "ok",
                    "type": "suggestions",
                    "total_count": len(data),
                    "data": data,
                },
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            print(e)
            return Response(
                {
                    "status": "ok",
                    "type": "suggestions",
                    "total_count": len(data),
                    "data": data,
                },
                status=status.HTTP_200_OK,
            )


# comment views
class CommentView(APIView):
    serializer_class = CommentSerializer

    @extend_schema(
        request=CommentSerializer,
        responses={200: CommentSerializer},
        description="view and add comments",
        methods=["GET", "POST"],
    )
    def get(self, request, *args, **kwargs):
        data = read_data(settings.COMMENTS_COLLECTION)
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = CommentSerializer(data=request.data)

        if serializer.is_valid():
            payload = serializer.data

            data = write_data(
                settings.COMMENTS_COLLECTION, payload=payload, method="POST"
            )

            updated_data = read_data(settings.COMMENTS_COLLECTION)

            centrifugo_response = centrifugo_publish(
                room=plugin_id, event="New comment", data=updated_data
            )
            if centrifugo_response.get("status_code", None) == 200:
                return Response(updated_data, status=status.HTTP_200_OK)
            return Response(
                "Comment added but Centrifugo is not available",
                status=status.HTTP_424_FAILED_DEPENDENCY,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteCommentView(APIView):

    serializer_class = CommentSerializer

    @extend_schema(
        request=CommentSerializer,
        responses={200: CommentSerializer},
        description="view and delete comments",
        methods=["GET", "POST"],
    )
    def get(self, request, *args, **kwargs):
        data = read_data(settings.COMMENTS_COLLECTION)
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = CommentSerializer(data=request.data)

        if serializer.is_valid():
            object_id = request.data["_id"]

            data = delete_data(settings.COMMENTS_COLLECTION, object_id=object_id)

            updated_data = read_data(settings.COMMENTS_COLLECTION)

            centrifugo_response = centrifugo_publish(
                room=plugin_id, event="Delete comment", data=updated_data
            )
            if centrifugo_response.get("status_code", None) == 200:
                return Response(updated_data, status=status.HTTP_200_OK)
            return Response(
                "Comment deleted but Centrifugo is not available",
                status=status.HTTP_424_FAILED_DEPENDENCY,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # Note: use {"id": ""} to delete


class UpdateCommentView(APIView):
    serializer_class = CommentSerializer

    @extend_schema(
        request=CommentSerializer,
        responses={200: CommentSerializer},
        description="view and update comments",
        methods=["GET", "PUT"],
    )
    def get(self, request, *args, **kwargs):
        data = read_data(settings.COMMENTS_COLLECTION)
        return Response(data, status=status.HTTP_200_OK)

    def put(self, request):
        serializer = CommentSerializer(data=request.data)

        if serializer.is_valid():
            payload = serializer.data
            object_id = request.data["_id"]

            data = write_data(
                settings.COMMENTS_COLLECTION,
                object_id=object_id,
                payload=payload,
                method="PUT",
            )

            updated_data = read_data(settings.COMMENTS_COLLECTION)
            centrifugo_response = centrifugo_publish(
                room=plugin_id, event="Comment Update", data=updated_data
            )
            if centrifugo_response.get("status_code", None) == 200:
                return Response(updated_data, status=status.HTTP_202_ACCEPTED)
            return Response(
                "Comment updated but Centrifugo is not available",
                status=status.HTTP_424_FAILED_DEPENDENCY,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# room views
class RoomDetailView(APIView):
    # room detailview (if the organization has multiple music rooms)
    def get(self, request, *args, **kwargs):

        serializer = RoomSerializer(data=request.data)

        if serializer.is_valid():

            pk = kwargs["_id"]

            data = read_data(settings.ROOM_COLLECTION, object_id=pk)
            return Response(data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteRoomView(APIView):

    @extend_schema(
        request=RoomSerializer,
        responses={200: RoomSerializer},
        methods=["DELETE"]
    )
    def delete(self, request, *args, **kwargs):
        org_id = kwargs.get("org_id")
        room_id = kwargs.get("_id")
        collection = settings.ROOM_COLLECTION
        filter_data = {"organization_id": org_id}
        
        try:
            room = read_data(
                collection, object_id=room_id, filter_data=filter_data
            )
        except requests.exceptions.RequestException as e:
            print(e)
            return None

        if room:
            if room["status"] == 200:
                if room['data']['_id'] == room_id:
                    response = delete_data(
                        collection, object_id=room_id
                    )
                    if response["status"] == 200:
                        return Response(data=response, status=status.HTTP_200_OK)
                        #centrifugo_post(plugin_id, {"event": "room deleted", "data": response})

                    return Response(data={"room not deleted"}, status=status.HTTP_424_FAILED_DEPENDENCY)
                return Response(data={"invalid room"}, status=status.HTTP_404_NOT_FOUND)
            return Response(data={room["message"]:"room not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(data={"invalid room_id"}, status=status.HTTP_404_NOT_FOUND)



class CreateRoom(APIView):  # to create a new room(functional)
    serializer_class = RoomSerializer

    @extend_schema(
        request=RoomSerializer,
        responses={200: RoomSerializer},
        description="create a new room",
        methods=["POST"],
    )
    def post(self, request, *args, **kwargs):

        org_id = request.data.get("org_id")
        memberId = request.data.get("memberId")
        collection = request.data.get("collection")
        room_name = request.data.get("room_name")
        description = request.data.get("description")

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():

            rooms = serializer.data

            rooms["org_id"] = org_id
            rooms["plugin_id"] = plugin_id

            data = write_data(settings.ROOM_COLLECTION, payload=rooms)
            if data and data.get("status_code", None) == None:

                room_url = (
                    f"https://api.zuri.chat/data/read/{plugin_id}/{collection}/{org_id}"
                )

                x = requests.request("GET", url=room_url)

                if x.status_code == 200:

                    data = {
                        "plugin_id": plugin_id,
                        "organization_id": org_id,
                        "collection_name": collection,
                        "bulk_write": False,
                        "payload": {
                            "room_name": room_name,
                            "description": description,
                            "private": False,
                            "memberId": [memberId],
                        },
                    }

                    post_url = "https://api.zuri.chat/data/write"

                    x = requests.request("POST", url=post_url, data=json.dumps(data))

                    if x.status_code in [201, 200]:

                        responses = x.json()

                        return Response(data=responses, status=status.HTTP_200_OK)
                    return Response(
                        data={"message": "url error"}, status=status.HTTP_200_OK
                    )
                return Response(
                    data={"message": "failed"}, status=status.HTTP_400_BAD_REQUEST
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RoomView(APIView):  # view room

    serializer_class = RoomSerializer

    @extend_schema(
        request=RoomSerializer,
        responses={200: RoomSerializer},
        description="view information about a room",
        methods=["GET"],
    )
    def get(self, request, *args, **kwargs):
        data = read_data(settings.ROOM_COLLECTION)
        return Response(data, status=status.HTTP_200_OK)


# user views
class UserCountView(GenericAPIView):
    def get(self, request, *args, **kwargs):
        data = read_data(settings.ROOM_COLLECTION)
        header_user_count = data["data"][0]
        user_count = len(header_user_count)

        centrifugo_post(plugin_id, {"event": "header_user_count", "data": user_count})

        return Response(user_count)


class DeleteRoomUserView(APIView):  # fully functional working

    serializer_class = RoomSerializer

    @extend_schema(
        request=RoomSerializer,
        responses={200: RoomSerializer},
        description="view and remove users from the room list",
        methods=["GET", "PUT"],
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

        room_id, updated_room = self.remove_user(request)
        user = request.data["memberId"]
        payload = {"memberId": updated_room}

        data = write_data(
            settings.ROOM_COLLECTION, object_id=room_id, payload=payload, method="PUT"
        )

        sidebar_data = {
            "name": "Music Plugin",
            "description": "User joins the music room",
            "group_name": "Music",
            "category": "Entertainment",
            "show_group": True,
            "button_url": "/music",
            "public_rooms": [],
            "joined_rooms": [],
        }

        response_output = {
            "event": "add_users_to_room",
            "message": "success",
            "data": {
                "room_id": data["room_id"],
                "new_member_ids": user,
                "action": "user removed successfully",
            },
        }

        channel = f"{org_id}_{user}_sidebar"
        centrifugo_data = centrifugo_publish(
            room=channel, event="sidebar_update", data=sidebar_data
        )

        if centrifugo_data.get("status_code", None) == 200:
            return Response(data=response_output, status=status.HTTP_201_CREATED)
        else:
            return Response(
                data="User/users added but centrifugo not available",
                status=status.HTTP_424_FAILED_DEPENDENCY,
            )
        # Note: use {"memberId": ""} to delete


class RoomUserList(APIView):  # working

    serializer_class = RoomSerializer

    @extend_schema(
        request=RoomSerializer,
        responses={200: RoomSerializer},
        description="view information about members in a room",
        methods=["GET"],
    )
    def get(self, request, *args, **kwargs):
        room_data = read_data(settings.ROOM_COLLECTION)

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():

            rooms = serializer.data

            room_users = room_data["data"][0]["memberId"]

            return Response(room_users)


class AddUserToRoomView(APIView):  # to add a user to the room
    @extend_schema(
        request=AddToRoomSerializer,
        responses={200: AddToRoomSerializer},
        description="add new user to a room",
        methods=["POST"],
    )
    def post(self, request, org_id, room_id):
        helper = DataStorage()
        helper.organization_id = org_id
        serializer = AddToRoomSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.data
            room_id = data["room_id"]
            member_ids = data["memberId"]
            music_room = helper.read("musicroom", {"_id": room_id})
            if music_room and music_room.get("status_code", None) == None:
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
                            else:
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
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# plugin marketplace
class InstallView(APIView):
    def post(self, request):
        plugin_id = settings.PLUGIN_ID
        user_id = request.data["user_id"]
        org_id = request.data["organisation_id"]
        token = request.headers["Authorization"]
        print(token)
        payload = {
            "plugin_id": plugin_id,
            "user_id": user_id,
            "organisation_id": org_id,
        }
        request_client = RequestClient()

        response = request_client.request(
            method="POST",
            url=f"https://api.zuri.chat/organizations/{org_id}/plugins",
            headers={"Authorization": token, "Content-Type": "application/json"},
            post_data=payload,
        )

        installed = response.response_data
        print(installed)
        if installed["status"] == 200:
            data = {
                "message": "Plugin successfully installed!",
                "success": True,
                "data": {"redirect_url": "/music"},
            }
            return Response(data=data, status=status.HTTP_201_CREATED)

        elif installed["status"] == 400:
            data = {
                "message": "Plugin has already been installed!",
                "success": False,
                "data": None,
            }
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)

        else:
            data = {
                "message": "There is an Error with this installation! Please contact Admin",
                "success": False,
                "data": None,
            }
            return Response(data=data, status=status.HTTP_424_FAILED_DEPENDENCY)


class UninstallView(APIView):
    def delete(self, request):
        plugin_id = settings.PLUGIN_ID
        user_id = request.data["user_id"]
        org_id = request.data["organisation_id"]
        token = request.headers["Authorization"]
        print(token)
        payload = {
            "plugin_id": plugin_id,
            "user_id": user_id,
            "organisation_id": org_id,
        }
        request_client = RequestClient()

        response = request_client.request(
            method="DELETE",
            url=f"https://api.zuri.chat/organizations/{org_id}/plugins/{plugin_id}",
            headers={"Authorization": token, "Content-Type": "application/json"},
            post_data=payload,
        )

        uninstalled = response.response_data
        print(uninstalled)
        if uninstalled["status"] == 200:
            data = {
                "message": "Uninstalled successfully!",
                "success": True,
                "data": None,
            }
            return Response(data=data, status=status.HTTP_201_CREATED)

        elif uninstalled["status"] == 400:
            data = {
                "message": "Oops! plugin does not exist",
                "success": False,
                "data": None,
            }
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)

        else:
            data = {
                "message": "There is an Error with this uninstallation! Please contact Admin",
                "success": False,
                "data": None,
            }
            return Response(data=data, status=status.HTTP_424_FAILED_DEPENDENCY)
