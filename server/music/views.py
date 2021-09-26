from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import redirect

from rest_framework import status
from rest_framework.generics import GenericAPIView, ListCreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view

# from rest_framework.permissions import IsAdminUser
from music.serializers import *
from music.utils.data_access import *
from requests import exceptions

import requests
import json


##note: still testing and making corrections. I'm aware that some are duplicated

def check_if_user_is_in_room_and_return_room_id(user_id):
    room_data = read_data(settings.ROOM_COLLECTION)
    room_user_ids = room_data["data"][0]["user_ids"]
    if user_id not in room_user_ids:
        return None
    return room_data["data"][0]["_id"]


# def get_room_info(room_id=None):
#     room_data = read_data(settings.ROOM_COLLECTION)
#     output = {
#         "name": room_data["data"][0]["name"],
#         "description": room_data["data"][0]["Description"],
#         "image": "#",
#         "room_url": "https://music.zuri.chat/music/api/v1/room/614f5562cf2c0f1ad7584fa0"
#     }
#     return output


# class SidebarView(GenericAPIView):

#     def get(self, request, *args, **kwargs):
#         org_id = request.GET.get('org', None)
#         user_id = request.GET.get('user', None)

#         pub_room = get_room_info()

#         data = {

#             "message": "Plugin Sidebar Retrieved",
#             "data": {
#                 "name": "Music Plugin",
#                 "description": "Plays YouTube Links",
#                 "organisation_id": org_id,
#                 "plugin_id": "613ceb50ceee2ab59d44df2f",
#                 "user_id": user_id,
#                 "group_name": "Music",
#                 "show_group": True,
#                 "public_rooms": pub_room,
#                 "joined_rooms": [],
#             },
#             "success": "true"
#         }
#         return JsonResponse(data, safe=True)


class SidebarView(APIView):
    
    def get(self, request, *args, **kwargs):

        org = request.GET.get('org', None)
        user = request.GET.get('user', None)
        room = settings.ROOM_COLLECTION
        plugin_id = settings.PLUGIN_ID
        org_id = settings.ORGANIZATON_ID

        if request.GET.get('org') and request.GET.get('user'):
            url = f'https://api.zuri.chat/organizations/{org}/members/{user}'
            headers = {
                "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb29raWUiOiJNVFl6TWpZME16VXhOM3hIZDNkQlIwUlplRTVFWnpGT1JGRXpXbFJTYVUxdFJteFpiVmswV2xkTk5GbDZhM2xOVVQwOWZLaXFkd3RkaFJlOUdpYUgxZ0dQWXpKLVRFTUc4Qm9ZNnIyNUJNQ2pHWlNnIiwiZW1haWwiOiJ1Y2hpd2FsbGkuYkBnbWFpbC5jb20iLCJpZCI6IjYxNDg1NDQ3ZTRiMmFlYmY4ZWM4YzkyMSIsIm9wdGlvbnMiOnsiUGF0aCI6Ii8iLCJEb21haW4iOiIiLCJNYXhBZ2UiOjc5Mzk3ODU3MjUsIlNlY3VyZSI6ZmFsc2UsIkh0dHBPbmx5IjpmYWxzZSwiU2FtZVNpdGUiOjB9LCJzZXNzaW9uX25hbWUiOiJmNjgyMmFmOTRlMjliYTExMmJlMzEwZDNhZjQ1ZDVjNyJ9.YznvgpGNmf9GqnBYBgHYcJucMk3oNLKQf11McWYSwb0",
                "Content-Type" : "application/json",
                }
            r = requests.get(url,headers=headers)
            print(r.status_code)

            if r.status_code == 200:
                public_url = f"https://api.zuri.chat/data/read/{plugin_id}/{room}/{org_id}"

                r = requests.get(public_url)
                return JsonResponse(r, safe=True)
               
            else:
                return JsonResponse({
                    "name": "Music Plugin",
                    "description": "Plays YouTube Links",
                    "plugin_id": plugin_id,
                    "organisation_id": org,
                    "user_id": user,
                    "group_name": "Music",
                    "show_group": False,
                    "public_rooms":[],
                    "joined_rooms":[]
                    })
        else:
            return JsonResponse({
                   "name": "Music Plugin",
                    "description": "Plays YouTube Links",
                    "plugin_id": plugin_id,
                    "organisation_id": org,
                    "user_id": user,
                    "group_name": "Music",
                    "show_group": False,
                    "public_rooms":[],
                    "joined_rooms":[]
                    })

def is_valid(param):
    return param != "" and param is not None


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


class CreateRoomView(APIView):
    serializer_class = RoomSerializer

    def post(self, request):

        org_id = settings.ORGANIZATON_ID
        plugin_id = settings.PLUGIN_ID
        coll_name = settings.ROOM_COLLECTION
        room_user_id = read_data(coll_name)

        plugin_id = settings.PLUGIN_ID

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        rooms = serializer.data
        rooms['user_id'] = room_user_id
        rooms['org_id'] = org_id
        rooms['plugin_id'] = plugin_id
        data = write_data(settings.ROOM_COLLECTION, payload=rooms)
        return Response(data)


class RoomView(APIView):
    serializer_class = RoomSerializer  

    def get(self, request, pk, format=None):
        pk = '_id'

        data = read_data(settings.ROOM_COLLECTION)
        return Response(data, status=status.HTTP_200_OK)

    
class RoomUpdate(APIView):
    serializer_class = RoomSerializer
    lookup_field = '_id'

    def put(self, request, format=None):
        serializer = RoomSerializer(data=request.data)

        if serializer.is_valid():
            payload = serializer.data

            data = put_data(settings.ROOM_COLLECTION, payload=payload)

            return Response(data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddToRoomView(APIView):
    @staticmethod
    def get_obj_id_and_append_user_id(request):
        room_data = read_data(settings.ROOM_COLLECTION)
        user_ids = room_data["data"][0]["user_ids"]
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
            "user_ids": user_ids
        }

        data = write_data(settings.ROOM_COLLECTION, object_id=_id, payload=payload, method="PUT")
        centrifugo_post("channel_name", {"event": "entered_room", "data": "send something"})
        return Response(data, status=status.HTTP_202_ACCEPTED)


class UserListView(GenericAPIView):
    serializer_class = MembersSerializer

    def get(self, request):
        data = read_data(settings.MEMBERS_COLLECTION)
        return Response(data, status=status.HTTP_200_OK)


class AddMember(GenericAPIView):
    serializer_class = MembersSerializer

    def post(self, request):

        user_id = request.query_params.get('user')
        user_name = request.query_params.get('display name')
        avatar = request.query_params.get('profile picture')

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        coll_name = settings.MEMBERS_COLLECTION

        member = serializer.data
        member['user_id'] = user_id
        member['user_name'] = user_name
        member['avatar'] = avatar
        data = write_data(coll_name, payload=member)
        
        return Response(data, status=status.HTTP_200_OK)


class UserCountView(GenericAPIView):
    serializer_class = MembersSerializer

    def get(self, request):
        data = read_data(settings.ROOM_COLLECTION)
        header_user_count = data["data"][0]["room_user_ids"]

        return Response(len(header_user_count))


class RemoveMember(GenericAPIView):
    serializer_class = MembersSerializer

    def leave_room(self, request):
        user_id = request.query_params.get('user')
    
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        coll_name = settings.MEMBERS_COLLECTION

        member = serializer.data
        member['user_id'] = user_id
       
        try:
            data = delete_data(coll_name, payload=member)

            if data.status_code == 200:
                return Response({"message": "User left room"},
                                status=status.HTTP_200_OK)
            else:
                return Response({"error": data.json()['message']}, status=data.status_code)     
        
        except exceptions.ConnectionError as e:
            return Response(str(e), status=status.HTTP_502_BAD_GATEWAY)
    

class DeleteMember(GenericAPIView):
    serializer_class = MembersSerializer

    def delete_user(collection_name, user):
    
        collection_name = settings.MEMBERS_COLLECTION
        
        user_list = list()
        users = read_data(settings.MEMBERS_COLLECTION)
        
        if users == None or "status_code" in users:
            return users
        else:
            for user in users:
                if "user_ids" in user:
                    if user in user.get("user_ids"):
                        user_list.remove(user)
                    else:
                        return user_list
            return user_list




