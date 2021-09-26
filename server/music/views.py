from django.conf import settings
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from django.http import JsonResponse

from music.serializers import CommentSerializer, RoomSerializer, MembersSerializer
from music.utils.data_access import get_video, read_data, write_data, centrifugo_post
from rest_framework.views import APIView
from rest_framework.decorators import api_view
import requests
import json
from requests import exceptions


def check_if_user_is_in_room_and_return_room_id(user_id):
    room_data = read_data(settings.ROOM_COLLECTION)
    room_user_ids = room_data["data"][0]["room_user_ids"]
    if user_id not in room_user_ids:
        return None
    return room_data["data"][0]["_id"]


def get_room_info(room_id=None):
    room_data = read_data(settings.ROOM_COLLECTION)
    output = {
        "name": room_data["data"][0]["name"],
        "description": room_data["data"][0]["Description"],
        "icon": "#"
    }
    return output


class SidebarView(GenericAPIView):

    def get(self, request, *args, **kwargs):
        org_id = request.GET.get('org', None)
        user_id = request.GET.get('user', None)

        pub_room = get_room_info()

        data = {

            "message": "Plugin Sidebar Retrieved",
            "data": {
                "type": "Plugin Sidebar",
                "name": "Music Plugin",
                "description": "Plays YouTube Links",
                "plugin_id": "61360ab5e2358b02686503ad",
                "organisation_id": org_id,
                "user_id": user_id,
                "group_name": "Music",
                "show_group": False,
                "public_rooms": pub_room,
                "joined_rooms": {},
            },
            "success": "true"
        }
        return JsonResponse(data, safe=False)


class PluginInfoView(GenericAPIView):

    def get(self, request, *args, **kwargs):
        data = {
            "message": "Plugin Information Retrieved",
            "data": {
                "type": "Plugin Information",
                "plugin_info": {"name": "Music room",
                                "description": [
                                    "This is a plugin that allows individuals in an organization to add music and "
                                    "video links from YouTube to a  shared playlist. Users also have the option to "
                                    "chat with other users in the music room and the option to like a song or video "
                                    "that is in the music room library."]
                                },
                "version": "v1",
                "scaffold_structure": "Monolith",
                "team": "HNG 8.0/Team Music Plugin",
                "developer_name": "Zurichat Music Plugin",
                "developer_email": "musicplugin@zurichat.com",
                "icon_url": "https://drive.google.com/file/d/1KB9uSWqg0rM21ohsPxGnG8_1xbcdReio/view?usp=drivesdk",
                "photos": "https://drive.google.com/file/d/1KB9uSWqg0rM21ohsPxGnG8_1xbcdReio/view?usp=drivesdk",
                "homepage_url": "https://music.zuri.chat/music/",
                "sidebar_url": "https://music.zuri.chat/music/api/v1/sidebar",
                "install_url": "https://music.zuri.chat/music/",
                'ping_url': 'http://music.zuri.chat/music/api/v1/ping'
            },
            "success": "true"
        }
        return JsonResponse(data, safe=False)


class PluginPingView(GenericAPIView):

    def get(self, request, *args, **kwargs):
        server = [
            {'status': 'Success',
             'Report': ['The music.zuri.chat server is working']}
        ]
        return JsonResponse({'server': server})


class MediaView(APIView):
    def get(self, request):
        payload = {"email": "hng.user01@gmail.com", "password": "password"}

        data = read_data("test_collection")

        centrifugo_post("zuri-plugin-music", {"event": "join_room"})
        return Response(data)


class UserCountView(GenericAPIView):
    def get(self, request):
        data = read_data(settings.ROOM_COLLECTION)
        header_user_count = data["data"][0]["room_user_ids"]

        return Response(len(header_user_count))


class SongView(APIView):
    def get(self, request):
        data = read_data(settings.SONG_COLLECTION)

        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        media_info = get_video(request.data['url'])

        payload = {
            "title": media_info["title"],
            "duration": media_info["duration"],
            "albumCover": media_info["thumbnail_url"],
            "url": media_info["track_url"],
            "addedBy": " ",
            "likedBy": []
        }

        data = write_data(settings.SONG_COLLECTION, payload=payload)

        updated_data = read_data(settings.SONG_COLLECTION)

        centrifugo_post("zuri-plugin-music", {"event": "added_song", "data": updated_data})
        return Response(data, status=status.HTTP_202_ACCEPTED)
        # Note: use only {"url": ""} in the payload


class AddToRoomView(APIView):
    @staticmethod
    def get_obj_id_and_append_user_id(request):
        room_data = read_data(settings.ROOM_COLLECTION)
        user_ids = room_data["data"][0]["room_user_ids"]
        _id = room_data["data"][0]["_id"]
        if request.data["id"] not in user_ids:
            user_ids.append(request.data["id"])
        return _id, user_ids

    def get(self, request):
        data = read_data(settings.ROOM_COLLECTION)
        return Response(data)

    def post(self, request):
        _id, user_ids = self.get_obj_id_and_append_user_id(request)

        payload = {
            "room_user_ids": user_ids
        }

        data = write_data(settings.ROOM_COLLECTION, object_id=_id, payload=payload, method="PUT")
        centrifugo_post("channel_name", {"event": "entered_room", "data": "send something"})
        return Response(data, status=status.HTTP_202_ACCEPTED)


class AddMember(GenericAPIView):
    serializer_class = MembersSerializer

    def post(self, request):
        user_id = request.query_params.get('user')
        user_name = request.query_params.get('display name')
        avatar = request.query_params.get('profile picture')

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        coll_name = "members"

        member = serializer.data
        member['user_id'] = user_id
        member['user_name'] = user_name
        member['avatar'] = avatar
        data = write_data(coll_name, payload=member)
        return Response(data)


class CreateRoomView(APIView):
    serializer_class = RoomSerializer

    def post(self, request):
        org_id = request.query_params.get('org_id')
        coll_name = "members"
        room_user_id = read_data(coll_name)

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        rooms = serializer.data
        rooms['room_user_id'] = room_user_id
        rooms['org_id'] = org_id
        data = write_data(settings.ROOM_COLLECTION, payload=rooms)
        return Response(data)


class CommentView(APIView):

    def get(self, request):
        data = read_data(settings.COMMENTS_COLLECTION)
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CommentSerializer(data=request.data)

        if serializer.is_valid():
            payload = serializer.data

            data = write_data(settings.COMMENTS_COLLECTION, payload=payload)

            updated_data = read_data(settings.COMMENTS_COLLECTION)

            centrifugo_post("zuri-plugin-music", {"event": "added_chat", "data": updated_data})

            return Response(data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RoomView(APIView):
    def get(self, request):
        data = read_data(settings.ROOM_COLLECTION)
        return Response(data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def leave_room(request):
    plugin_id = settings.PLUGIN_ID
    organization_id = settings.ORGANIZATON_ID
    collection_name = settings.ROOM_COLLECTION

    room_data = read_data(settings.ROOM_COLLECTION)
    user_ids = room_data["data"][0]["room_user_ids"]
    _id = room_data["data"][0]["_id"]

    if request.method == 'GET':
        data = read_data(collection_name)
        return Response(data)

    elif request.method == 'POST':

        url = 'https://api.zuri.chat/data/delete'
        payload = {
            "plugin_id": plugin_id,
            "organization_id": organization_id,
            "collection_name": collection_name,
            "bulk_delete": False,
            # "object_id": _id,
            "object_id": user_ids,
            "filter": {}
        }

        try:
            r = requests.post(url, data=json.dumps(payload))
            # Note: use only {"_id": ""} in the payload

            if r.status_code == 200:
                return Response({"message": "User left room"},
                                status=status.HTTP_200_OK)
            else:
                return Response({"error": r.json()['message']}, status=r.status_code)

        except exceptions.ConnectionError as e:
            return Response(str(e), status=status.HTTP_502_BAD_GATEWAY)

# @api_view(['GET', 'POST'])
# def remove_song(request):
#     plugin_id = settings.PLUGIN_ID
#     organization_id = settings.ORGANIZATON_ID
#     collection_name = settings.SONG_COLLECTION

#     song_data = read_data(settings.SONG_COLLECTION)
#     user_ids = song_data["data"][0]["added_by_id"]
#     _id = song_data["data"][0]["_id"]

#     if request.method == 'GET':
#         data = read_data(collection_name)
#         return Response(data)

#     elif request.method == 'POST':

#         url = 'https://api.zuri.chat/data/delete'
#         payload = {
#             "plugin_id": plugin_id,
#             "organization_id": organization_id,
#             "collection_name": collection_name,
#             "bulk_delete": False,
#             "object_id": _id,
#             "filter": {}
#         }

#         try:
#             r = requests.post(url, data=json.dumps(payload))
#             #Note: use only {"_id": ""} in the payload

#             if r.status_code == 200:
#                 return Response({"message": "User left room"},
#                                 status=status.HTTP_200_OK)
#             else:
#                 return Response({"error": r.json()['message']}, status=r.status_code)

#         except exceptions.ConnectionError as e:
#             return Response(str(e), status=status.HTTP_502_BAD_GATEWAY)
