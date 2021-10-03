from django.conf import settings
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
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

from rest_framework.decorators import api_view

plugin_id = settings.PLUGIN_ID


def check_if_user_is_in_room_and_return_room_id(user_id):
    room_data = read_data(settings.ROOM_COLLECTION)
    room_user_ids = room_data["data"][0]["room_user_ids"]
    if user_id not in room_user_ids:
        return None
    return room_data["data"][0]["_id"]


room_image = ["https://svgshare.com/i/aXm.svg"]


class change_room_image(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        if data['albumCover'] == "":
            room_image[0] = "https://svgshare.com/i/aXm.svg"
        else:
             room_image[0] = data['albumCover']
        
        return Response({'room_image': room_image, 'curent-song':data},status=status.HTTP_200_OK )


def get_room_info(room_id=None):
    room_data = read_data(settings.ROOM_COLLECTION)
    # room_url = room_data["data"][0]["_id"]

    output = {
        "room_name": room_data["data"][0]["name"],
        "room_url": f"/music",
        "room_image": room_image[0]
    }
    return output


class SidebarView(GenericAPIView):

    def get(self, request, *args, **kwargs):

        org_id = request.GET.get('org', None)
        user_id = request.GET.get('user', None)
        room = settings.ROOM_COLLECTION
        plugin_id = settings.PLUGIN_ID
        org_id = settings.ORGANIZATON_ID
        room_id = settings.ROOM_ID

        pub_room = get_room_info()

        sidebar_update_room_name = "currentWorkspace_userInfo_sidebar"

        sidebar_update_payload = {
                "event": "sidebar_update",
                "plugin_id": "music.zuri.chat",
                "data": {
                    "name": "Music Plugin",
                    "group_name": "Music",
                    "show_group": False,
                    "button_url": "/music",
                    "public_rooms": [pub_room],
                    "joined_rooms": [pub_room],
                }
            }

        if request.GET.get('org') and request.GET.get('user'):
            url = f'https://api.zuri.chat/organizations/{org_id}/members/{user_id}'
            headers = {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb29raWUiOiJNVFl6TWpZME16VXhOM3hIZDNkQlIwUlplRTVFWnpGT1JGRXpXbFJTYVUxdFJteFpiVmswV2xkTk5GbDZhM2xOVVQwOWZLaXFkd3RkaFJlOUdpYUgxZ0dQWXpKLVRFTUc4Qm9ZNnIyNUJNQ2pHWlNnIiwiZW1haWwiOiJ1Y2hpd2FsbGkuYkBnbWFpbC5jb20iLCJpZCI6IjYxNDg1NDQ3ZTRiMmFlYmY4ZWM4YzkyMSIsIm9wdGlvbnMiOnsiUGF0aCI6Ii8iLCJEb21haW4iOiIiLCJNYXhBZ2UiOjc5Mzk3ODU3MjUsIlNlY3VyZSI6ZmFsc2UsIkh0dHBPbmx5IjpmYWxzZSwiU2FtZVNpdGUiOjB9LCJzZXNzaW9uX25hbWUiOiJmNjgyMmFmOTRlMjliYTExMmJlMzEwZDNhZjQ1ZDVjNyJ9.YznvgpGNmf9GqnBYBgHYcJucMk3oNLKQf11McWYSwb0",
                "Content-Type": "application/json",
            }
            r = requests.get(url, headers=headers)
            print(r.status_code)

            if r.status_code == 200:
                public_url = f"https://api.zuri.chat/data/read/{plugin_id}/{room}/{room_id}/{org_id}"

                r = requests.get(public_url)
                # publish_to_sidebar(plugin_id, user_id, {"event": "sidebar_update", "data": pub_room})

                centrifugo_post(sidebar_update_room_name,sidebar_update_payload)
                return JsonResponse(r, safe=True)

            else:
                centrifugo_post(sidebar_update_room_name,sidebar_update_payload)
                
                return JsonResponse({
                    "name": "Music Plugin",
                    "description": "This is a virtual lounge where people can add, watch and listen to YouTube videos or music",
                    "plugin_id": plugin_id,
                    "organisation_id": org_id,
                    "room_id": room_id,
                    "user_id": user_id,
                    "group_name": "Music",
                    "show_group": True,
                    "public_rooms": [
                        pub_room
                    ],
                    "joined_rooms": [
                        pub_room
                    ],
                })
        else:
            centrifugo_post(sidebar_update_room_name,sidebar_update_payload)

            return JsonResponse({
                "name": "Music Plugin",
                "description": "This is a virtual lounge where people can add, watch and listen to YouTube videos or music",
                "plugin_id": plugin_id,
                "organisation_id": org_id,
                "room_id": room_id,
                "user_id": user_id,
                "group_name": "Music",
                "show_group": True,
                "public_rooms": [
                    pub_room
                ],
                "joined_rooms": [
                    pub_room
                ],
            })

    def is_valid(param):
        return param != "" and param is not None


class PluginInfoView(GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

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
                "homepage_url": "https://music.zuri.chat/music",
                "sidebar_url": "https://music.zuri.chat/sidebar",
                "install_url": "https://music.zuri.chat/music",
                'ping_url': 'http://music.zuri.chat/music/api/v1/ping'
            },
            "success": "true"
        }
        return JsonResponse(data, safe=False)


class PluginPingView(GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        server = [
            {'status': 'Success',
             'Report': ['The music.zuri.chat server is working']}
        ]
        return JsonResponse({'server': server})


class MediaView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        payload = {"email": "hng.user01@gmail.com", "password": "password"}

        data = read_data("test_collection")

        centrifugo_post(plugin_id, {"event": "join_room"})
        return Response(data)


class SongView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = read_data(settings.SONG_COLLECTION)

        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        media_info = get_video(request.data['url'])
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
            "time": time_info
        }

        data = write_data(settings.SONG_COLLECTION, payload=payload)
        
        updated_data = read_data(settings.SONG_COLLECTION)
        updated_object = updated_data["data"][-1]
        # returns the updated_object alone

        centrifugo_post(plugin_id, {"event": "added_song", "data": updated_object})
        return Response(updated_object, status=status.HTTP_202_ACCEPTED)
        # Note: song endpoint expects {"url": "", "userId": "", "addedBy":"", "time":""} in the payload

    # def delete(self, request):
    #     object_id = request.data["_id"]
    #     data = delete_data(settings.SONG_COLLECTION, object_id=object_id)
    #     return Response(data, status=status.HTTP_200_OK)
    #     # Note: use {"id": ""} to delete


class CommentView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = read_data(settings.COMMENTS_COLLECTION)
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CommentSerializer(data=request.data)

        if serializer.is_valid():
            payload = serializer.data

            data = write_data(settings.COMMENTS_COLLECTION, payload=payload)

            updated_data = read_data(settings.COMMENTS_COLLECTION)

            centrifugo_post(plugin_id, {"event": "added_chat", "data": updated_data})

            return Response(data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateRoomView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = RoomSerializer

    def post(self, request):
        org_id = settings.ORGANIZATON_ID
        plugin_id = settings.PLUGIN_ID
        coll_name = settings.ROOM_COLLECTION
        user_id = read_data(coll_name)

        plugin_id = settings.PLUGIN_ID

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        rooms = serializer.data
        rooms['user_id'] = user_id
        rooms['org_id'] = org_id
        rooms['plugin_id'] = plugin_id
        data = write_data(settings.ROOM_COLLECTION, payload=rooms)
        return Response(data)


class RoomView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = RoomSerializer

    def get(self, request, format=None):
        data = read_data(settings.ROOM_COLLECTION)
        return Response(data, status=status.HTTP_200_OK)


class AddToRoomView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get_obj_id_and_append_user_id(request):
        room_data = read_data(settings.ROOM_COLLECTION)
        room_users = room_data["data"][0]["room_user_ids"]
        _id = room_data["data"][0]["_id"]
        new_user = {"userEmail": request.data["userEmail"], "userId": request.data["userId"]}
        # TODO: Do a check for existing user before appending
        room_users.append(new_user)
        return _id, room_users

    def get(self, request,  orgid=settings.ORGANIZATON_ID, roomid=settings.ROOM_ID):
        data = read_data(settings.ROOM_COLLECTION)
        return Response(data)

    def post(self, request, orgid=settings.ORGANIZATON_ID, roomid=settings.ROOM_ID):
        _id, updated_room = self.get_obj_id_and_append_user_id(request)

        payload = {
            "room_user_ids": updated_room
        }

        data = write_data(settings.ROOM_COLLECTION, object_id=_id, payload=payload, method="PUT")

        centrifugo_post(plugin_id, {"event": "entered_room", "data": data})
        return Response(data, status=status.HTTP_202_ACCEPTED)


class MemberListView(GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = MemberSerializer

    def get(self, request):
        data = read_data(settings.MEMBERS_COLLECTION)
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        if serializer.is_valid():
            payload = serializer.data

            data = write_data(settings.MEMBERS_COLLECTION, payload=payload)

            updated_data = read_data(settings.MEMBERS_COLLECTION)

            centrifugo_post(plugin_id, {"event": "added_user", "data": updated_data})

            return Response(data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddMember(GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = MemberSerializer

    def post(self, request):
        user_id = request.query_params.get('user')
        user_name = request.query_params.get('display name')
        avatar = request.query_params.get('profile picture')

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        coll_name = settings.MEMBERS_COLLECTION

        member = serializer.data
        member['_id'] = user_id
        member['user_name'] = user_name
        member['avatar'] = avatar
        data = write_data(coll_name, payload=member)

        return Response(data, status=status.HTTP_200_OK)


class UserCountView(GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = read_data(settings.MEMBERS_COLLECTION)
        header_user_count = data["data"][0]
        user_count = len(header_user_count)

        centrifugo_post(plugin_id, {"event": "header_user_count", "data": user_count})

        return Response(user_count)
