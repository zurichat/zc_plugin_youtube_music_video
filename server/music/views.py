import re
from django.core.paginator import Paginator
from django.conf import settings
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
from requests import exceptions
from django.http import Http404
from music.dataStorage import *

# from rest_framework.authentication import TokenAuthentication, SessionAuthentication


def check_if_user_is_in_room_and_return_room_id(user_id):
    room_data = read_data(settings.ROOM_COLLECTION)
    room_user_ids = room_data["data"][0]["userId"]
    if user_id not in room_user_ids:
        return None
    return room_data["data"][0]["_id"]


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


def get_room_info(roomid=None):
    room_data = read_data(settings.ROOM_COLLECTION)
    orgid = settings.ORGANIZATON_ID
    roomid = settings.ROOM_ID

    output = {
        "room_name": room_data["data"][0]["room_name"],
        "room_id": f"/music/{roomid}",
        "button_url": f"/music",
        "room_image": room_image[0],
    }
    return output


class SidebarView(GenericAPIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):

        org_id = request.GET.get("org", None)
        user_id = request.GET.get("user", None)
        room = settings.ROOM_COLLECTION
        plugin_id = settings.PLUGIN_ID
        orgid = settings.ORGANIZATON_ID
        roomid = settings.ROOM_ID

        pub_room = get_room_info()

        sidebar_update = "currentWorkspace_userInfo_sidebar"

        # subscription_channel: org_id_memberid_sidebar
        subscription_channel = "{org_id}_{user_id}_sidebar"

        sidebar_update_payload = {
            "event": "sidebar_update",
            "plugin_id": "music.zuri.chat",
            "data": {
                "name": "Music Plugin",
                "description": "This is a virtual lounge where people can add, watch and listen to YouTube videos or music",
                "group_name": [],
                # "category": "entertainment",
                "show_group": False,
                "button_url": f"/music/{org_id}/{roomid}",
                "public_rooms": [pub_room],
                "joined_rooms": [pub_room],
            },
        }

        if request.GET.get("org") and request.GET.get("user"):
            url = f"https://api.zuri.chat/organizations/{org_id}/members/{user_id}"
            headers = {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb29raWUiOiJNVFl6TWpZME16VXhOM3hIZDNkQlIwUlplRTVFWnpGT1JGRXpXbFJTYVUxdFJteFpiVmswV2xkTk5GbDZhM2xOVVQwOWZLaXFkd3RkaFJlOUdpYUgxZ0dQWXpKLVRFTUc4Qm9ZNnIyNUJNQ2pHWlNnIiwiZW1haWwiOiJ1Y2hpd2FsbGkuYkBnbWFpbC5jb20iLCJpZCI6IjYxNDg1NDQ3ZTRiMmFlYmY4ZWM4YzkyMSIsIm9wdGlvbnMiOnsiUGF0aCI6Ii8iLCJEb21haW4iOiIiLCJNYXhBZ2UiOjc5Mzk3ODU3MjUsIlNlY3VyZSI6ZmFsc2UsIkh0dHBPbmx5IjpmYWxzZSwiU2FtZVNpdGUiOjB9LCJzZXNzaW9uX25hbWUiOiJmNjgyMmFmOTRlMjliYTExMmJlMzEwZDNhZjQ1ZDVjNyJ9.YznvgpGNmf9GqnBYBgHYcJucMk3oNLKQf11McWYSwb0",
                "Content-Type": "application/json",
            }
            r = requests.get(url, headers=headers)
            print(r.status_code)

            if r.status_code == 200:
                public_url = f"https://api.zuri.chat/data/read/{orgid}/{plugin_id}/{room}/{roomid}"

                r = requests.get(public_url)
                # publish_to_sidebar(plugin_id, user_id, {"event": "sidebar_update", "data": pub_room})

                centrifugo_post(
                    sidebar_update, sidebar_update_payload, subscription_channel
                )
                return JsonResponse(r, safe=True)

            else:
                centrifugo_post(
                    sidebar_update, sidebar_update_payload, subscription_channel
                )

                return JsonResponse(
                    {
                        "name": "Music Plugin",
                        "description": "This is a virtual lounge where people can add, watch and listen to YouTube videos or music",
                        "plugin_id": plugin_id,
                        "organisation_id": org_id,
                        "room_id": roomid,
                        "user_id": user_id,
                        "group_name": [],
                        "show_group": True,
                        # "category": "utility",
                        "public_rooms": [pub_room],
                        "joined_rooms": [pub_room],
                    }
                )
        else:
            centrifugo_post(
                sidebar_update, sidebar_update_payload, subscription_channel
            )

            return JsonResponse(
                {
                    "name": "Music Plugin",
                    "description": "This is a virtual lounge where people can add, watch and listen to YouTube videos or music",
                    "plugin_id": plugin_id,
                    "organisation_id": org_id,
                    "room_id": roomid,
                    "user_id": user_id,
                    "group_name": [],
                    "show_group": True,
                    # "category": "utility",
                    "public_rooms": [pub_room],
                    "joined_rooms": [pub_room],
                }
            )

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


class SongView(APIView):
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

        centrifugo_post(plugin_id, {"event": "added_song", "data": updated_object})
        return Response(updated_object, status=status.HTTP_202_ACCEPTED)
        # Note: song endpoint expects {"url": "", "userId": "", "addedBy":"", "time":""} in the payload


class DeleteSongView(APIView):
    def get(self, request, *args, **kwargs):
        data = read_data(settings.SONG_COLLECTION)
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = SongSerializer(data=request.data)

        if serializer.is_valid():
            object_id = request.data["_id"]

            data = delete_data(settings.SONG_COLLECTION, object_id=object_id)

            updated_data = read_data(settings.SONG_COLLECTION)

            centrifugo_post(plugin_id, {"event": "deleted_chat", "data": updated_data})

            return Response(data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # Note: use {"_id": ""} to delete


class SongSearchView(APIView):
    # def get(self, request, *args, org_id, member_id, **kwargs):
    def get(self, request, *args, **kwargs):

        collection_name = settings.SONG_COLLECTION

        key_word = request.query_params.get("key") or []
        if key_word:
            key_word = re.split("[;,\s]+", key_word)

        songs = read_data(collection_name)["data"]
        search_result = []

        for word in key_word:
            word = word.lower()
            for song in songs:
                title = str(song["title"]).lower()
                if word in title and song not in search_result:
                    # print(title)
                    search_result.append(song)

        for item in search_result:
            item["image_url"] = item["albumCover"]
            item["created_at"] = item["time"]
            item["content"] = ""
            item["url"] = f"https://zuri.chat/music/{collection_name}"
            item["email"] = ([],)
            item["description"] = ([],)
            item.pop("albumCover")
            item.pop("time")

        paginate_by = request.query_params.get("paginate_by", 20)
        paginator = Paginator(search_result, paginate_by)
        page_num = request.query_params.get("page", 1)
        page_obj = paginator.get_page(page_num)
        Query = request.query_params.get("key") or []
        paginated_data = {
            "status": "ok",
            "pagination": {
                "total_count": paginator.count,
                "current_page": page_obj.number,
                "per_page": paginate_by,
                "page_count": paginator.num_pages,
                "first_page": 1,
                "last_page": paginator.num_pages,
            },
            "plugin": "Music",
            "Query": Query,
            "data": list(page_obj),
            "filter_sugestions": {"in": [], "from": []},
        }

        return Response({"data": paginated_data}, status=status.HTTP_200_OK)


class CommentView(APIView):
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

            centrifugo_post(plugin_id, {"event": "added_chat", "data": updated_data})

            return Response(data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteCommentView(APIView):

    serializer_class = CommentSerializer

    def get(self, request, *args, **kwargs):
        data = read_data(settings.COMMENTS_COLLECTION)
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = CommentSerializer(data=request.data)

        if serializer.is_valid():
            object_id = request.data["_id"]

            data = delete_data(settings.COMMENTS_COLLECTION, object_id=object_id)

            updated_data = read_data(settings.COMMENTS_COLLECTION)

            centrifugo_post(plugin_id, {"event": "deleted_chat", "data": updated_data})

            return Response(data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # Note: use {"id": ""} to delete


class UpdateCommentView(APIView):
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

            centrifugo_post(plugin_id, {"event": "updated_chat", "data": updated_data})

            return Response(data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RoomDetailView(
    APIView
):  # room detailview (if the organization has multiple music rooms)
    def get(self, request, *args, **kwargs):
        serializer = RoomSerializer(data=request.data)

        if serializer.is_valid():

            pk = kwargs["_id"]

            data = read_data(settings.ROOM_COLLECTION, object_id=pk)
            return Response(data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteRoomView(APIView):

    serializer_class = RoomSerializer

    def get(self, request, *args, **kwargs):
        data = read_data(settings.ROOM_COLLECTION)
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = RoomSerializer(data=request.data)

        if serializer.is_valid():
            object_id = request.data["_id"]

            data = delete_data(settings.ROOM_COLLECTION, object_id=object_id)

            updated_data = read_data(settings.ROOM_COLLECTION)

            centrifugo_post(plugin_id, {"event": "room deleted", "data": updated_data})

            return Response(data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # Note: use {"id": ""} to delete


class UserCountView(GenericAPIView):
    def get(self, request, *args, **kwargs):
        data = read_data(settings.ROOM_COLLECTION)
        header_user_count = data["data"][0]
        user_count = len(header_user_count)

        centrifugo_post(plugin_id, {"event": "header_user_count", "data": user_count})

        return Response(user_count)


class RoomView(APIView):  # view room

    serializer_class = RoomSerializer

    def get(self, request, *args, **kwargs):
        data = read_data(settings.ROOM_COLLECTION)
        return Response(data, status=status.HTTP_200_OK)


class DeleteRoomUserView(APIView):  # fully functional working

    serializer_class = RoomSerializer

    def remove_user(self, request, *args, **kwargs):

        room_data = read_data(settings.ROOM_COLLECTION)
        room_users = room_data["data"][0]["memberId"]
        room_id = room_data["data"][0]["_id"]
        user = request.data["memberId"]

        for x in room_users:
            if x == user:
                room_users.remove(x)
        return room_id, room_users

    def get(self, request, *args, **kwargs):
        data = read_data(settings.ROOM_COLLECTION)
        return Response(data)

    def put(self, request, *args, **kwargs):

        room_id, updated_room = self.remove_user(request)

        payload = {"memberId": updated_room}

        data = write_data(
            settings.ROOM_COLLECTION, object_id=room_id, payload=payload, method="PUT"
        )

        centrifugo_post(plugin_id, {"event": "User left room", "data": data})
        return Response(data, status=status.HTTP_202_ACCEPTED)
        # Note: use {"memberId": ""} to delete


class RoomUserView(APIView):  # working

    serializer_class = RoomSerializer

    def get(self, request, *args, **kwargs):
        room_data = read_data(settings.ROOM_COLLECTION)
        room_users = room_data["data"][0]["memberId"]

        return Response(room_users)


class AddUserToRoomView(APIView):
    def post(self, request, org_id, room_id):
        helper = DataStorage()
        helper.organization_id = org_id
        serializer = AddToRoomSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.data
            room_id = data["room_id"]
            member_id = data["member_id"]
            music_rooms = helper.read("music_room", {"_id": room_id})
            if music_rooms and music_rooms.get("status_code", None) == None:
                users_id = music_rooms.get("memberId")
                if member_id not in users_id:
                    users_id.append(member_id)
                    response = helper.update(
                        "music_room", room_id, {"memberId": users_id}
                    )
                    if response.get("status") == 200:
                        response_output = {
                            "event": "add_user_to_room",
                            "message": response.get("message"),
                            "data": {
                                "room_id": data["room_id"],
                                "new_member_id": data["member_id"],
                                "action": "user added successfully",
                            },
                        }
                        try:
                            centrifugo_data = centrifugo_publish(
                                room_id, response_output
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
                                    data="User added but centrifugo not available",
                                    status=status.HTTP_424_FAILED_DEPENDENCY,
                                )
                        except Exception:
                            return Response(
                                data="centrifugo server not available",
                                status=status.HTTP_424_FAILED_DEPENDENCY,
                            )
                    return Response(
                        "User not added", status=status.HTTP_424_FAILED_DEPENDENCY
                    )
                return Response("Member already in room", status=status.HTTP_302_FOUND)
            return Response(
                "Data not availabe on ZC core", status=status.HTTP_424_FAILED_DEPENDENCY
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateRoom(APIView):  # fully functional working

    serializer_class = RoomSerializer

    def post(self, request, *args, **kwargs):
        org_id = settings.ORGANIZATON_ID
        plugin_id = settings.PLUGIN_ID
        coll_name = settings.ROOM_COLLECTION

        plugin_id = settings.PLUGIN_ID

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        rooms = serializer.data

        rooms["org_id"] = org_id
        rooms["plugin_id"] = plugin_id
        # rooms["memberId"] = memberId

        data = write_data(coll_name, payload=rooms)
        return Response(data)



# class CreateRoom(APIView):
#     def post(self, request, *args, **kwargs):
#         serializer = RoomSerializer(data=request.data)

#         org_id = request.data.get("org_id")
#         memberId = request.data.get("memberId")
#         collection = request.data.get("collection")
#         room_name = request.data.get("room_name")
#         description = request.data.get("description")

#         if serializer.is_valid():

#             room_url = (
#                 f"https://api.zuri.chat/data/read/{plugin_id}/{collection}/{org_id}"
#             )

#             x = requests.request("GET", url=room_url)

#             if x.status_code == 200:

#                 data = {
#                     "plugin_id": plugin_id,
#                     "organization_id": org_id,
#                     "collection_name": collection,
#                     "bulk_write": False,
#                     "payload": {
#                         "room_name": room_name,
#                         "description": description,
#                         "private": False,
#                         "memberId": [memberId],
#                     },
#                 }

#                 post_url = "https://api.zuri.chat/data/write"

#                 x = requests.request("POST", url=post_url, data=json.dumps(data))

#                 if x.status_code in [201, 200]:

#                     responses = x.json()
#                     room_url_data = responses["data"]

#                     room_url = room_url_data["_id"]

#                     payload = {
#                         "plugin_id": plugin_id,
#                         "organization_id": org_id,
#                         "collection_name": collection,
#                         "object_id": "",
#                         "bulk_write": False,
#                         "payload": {"room_url": f"/music/{room_url}"},
#                     }
#                     # add the room url to the room for the side bar to see

#                     x_url = requests.request(
#                         "PATCH", url=post_url, data=json.dumps(payload)
#                     )

#                     if x_url.status_code in [201, 200]:
#                         response = {
#                             "room_id": room_url,
#                             "room_name": room_name,
#                             "description": description,
#                             "private": False,
#                             "memberId": [memberId],
#                             "room_url": f"/music/{room_url}",
#                         }

#                     return Response(data=response, status=status.HTTP_200_OK)
#                 return Response(
#                     data={"message": "url error"}, status=status.HTTP_200_OK
#                 )
#             return Response(
#                 data={"message": "failed"}, status=status.HTTP_400_BAD_REQUEST
#             )
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


