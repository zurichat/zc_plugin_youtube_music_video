# from bs4.element import Comment
from music.models import Room
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
from music.models import *
from requests import exceptions

import requests
import json


class SidebarView(GenericAPIView):

    def get(self, request, *args, **kwargs):
        data = {

            "message": "Plugin Sidebar Retrieved",
            "data": {
                "type": "Plugin Sidebar",
                "name": "Music Plugin",
                "description": "Shows Music items",
                "plugin_id": "61360ab5e2358b02686503ad",
                "organisation_id": "6134fd770366b6816a0b75ed",
                "user_id": "6139170699bd9e223a37d91b",
                "group_name": "Music",
                "show_group": False,
                "public_rooms": {
                    "room_name": "music room",
                    "room_id": "613e906115fb2424261b6652",
                    "collection_name": "room",
                    "type": "public_rooms",
                    "unread": 2,
                    "members": 23,
                    "icon": "headphones",
                    "action": "open",
                },
                "joined_rooms": {
                    "title": "general",
                    "room_id": "613e906115fb2424261b6652",
                    "collection_name": "room",
                    "type": "public_rooms",
                    "unread": 2,
                    "members": 23,
                    "icon": "headphones",
                    "action": "open",
                },
            },
            "success": "true"
        }
        return JsonResponse(data, safe=False)


def music_sidebar(request):
    collections = "music_rooms"
    org_id = request.GET.get("org_id", None)
    user = request.GET.get("user_id", None)
    user_rooms = get_rooms(user_id=user)
    
    musicrooms = []
    for musicroom in user_rooms:
        profile_list = []
        if "org_id" in musicroom:
            
            if org_id == musicroom["org_id"]:
            
                for user_id in musicroom["room_user_ids"]:
                    profile = get_user_profile(org_id,user_id)
                
                    if profile["status"] == 200:
                        user_name = profile["data"]["user_name"]
                        image_url = profile["data"]["image_url"]
                        data = {"user_name":user_name, "image_url":image_url}
                        profile_list.append(data)
                
                    elif profile["status"] == 500:
                        profile_list.append("user not found")
                
                musicroom["room_user_profiles"] = profile_list
                
                musicroom["room_url"] = f"music/room/{musicroom['_id']}"
                
                musicrooms.append(musicroom)
    
    side_bar = {
        "name": "Music Plugin",
        "description": "Virtual lounge for listening to music, watching videos and lighthearted banter",
        "plugin_id": "613ceb50ceee2ab59d44df2f",
        "organisation_id": f"{org_id}",
        "user_id": f"{user}",
        "group_name": "Music",
        "show_group": False,
        "public_rooms": [],
        "joined_rooms": rooms,
       
    }
    return JsonResponse(side_bar, safe=False)


class PluginInfoView(GenericAPIView):

    def get(self, request, *args, **kwargs):
        data = {
            "message": "Plugin Information Retrieved",
            "data": {
                "type": "Plugin Information",
                "plugin_info": {"name": "Music room",
                                "description": [
                                    "This is a plugin that allows individuals in an organization to add music and video links from YouTube to a  shared playlist. Users also have the option to chat with other users in the music room and the option to like a song or video that is in the music room library."]
                                },
                "version": "v1",
                "scaffold_structure": "Monolith",
                "team": "HNG 8.0/Team Music Plugin",
                "developer_name": "Zurichat Music Plugin",
                "developer_email": "musicplugin@zurichat.com",
                "icon_url": "https://drive.google.com/file/d/1KB9uSWqg0rM21ohsPxGnG8_1xbcdReio/view?usp=drivesdk",
                "photos": "https://drive.google.com/file/d/1KB9uSWqg0rM21ohsPxGnG8_1xbcdReio/view?usp=drivesdk",
                "homepage_url": "https://music.zuri.chat/music/",
                "sidebar_url": "https://music.zuri.chat/music/api/v1/sidebar/",
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
        centrifugo_post("channel_name", {"event": "join_room"})
        centrifugo_post.counter += 1
        header_user_count = centrifugo_post.counter
        return Response(header_user_count)

    centrifugo_post.counter = 0


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
        # TODO: <Emmanuel> Check if user_id is already in the list before appending
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




# class CommentDetailView(APIView):

#     def get(self, object_id):
#         try:
#             return Comment
#         data = read_data(settings.COMMENTS_COLLECTION)
#         return Response(data, status=status.HTTP_200_OK)
        
#     def get(self, request, pk):
#         data = read_data(settings.COMMENTS_COLLECTION)
#         return Response(data, status=status.HTTP_200_OK)

#     def post(self, request):
#         serializer = CommentSerializer(data=request.data)

#         if serializer.is_valid():
#             payload = serializer.data

#             data = write_data(settings.COMMENTS_COLLECTION, payload=payload)

#             updated_data = read_data(settings.COMMENTS_COLLECTION)

#             centrifugo_post("zuri-plugin-music", {"event": "added_chat", "data": updated_data})

#             return Response(data, status=status.HTTP_200_OK)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class RoomView(APIView):

    def get(self, request, format=None):
        data = read_data(settings.ROOM_COLLECTION)
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = RoomSerializer(data=request.data)

        if serializer.is_valid():
            payload = serializer.data

            data = write_data(settings.ROOM_COLLECTION, payload=payload)
            # serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class RoomDetail(APIView):

    def get(self, request, format=None):
        data = read_data(settings.ROOM_COLLECTION)
        return Response(data, status=status.HTTP_200_OK)

    def put(self, request, format=None):
        serializer = RoomSerializer(data=request.data)

        if serializer.is_valid():
            payload = serializer.data

            data = put_data(settings.ROOM_COLLECTION, payload=payload)

            return Response(data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MemberView(APIView):

    def get(self, request):
        data = read_data(settings.MEMBERS_COLLECTION)
        return Response(data, status=status.HTTP_200_OK)

   

#removes a single user id from the members collection
@api_view(['GET', 'POST'])
def leave_room(request):
    plugin_id = settings.PLUGIN_ID
    organization_id = settings.ORGANIZATON_ID
    collection_name = settings.MEMBERS_COLLECTION
    
    member_data = read_data(settings.MEMBERS_COLLECTION)
    _id = member_data["data"][0]["room_user_ids"]

    if request.method == 'GET':
        data = read_data(collection_name)
        return Response(data)

    elif request.method == 'PUT':

        url = "https://api.zuri.chat/data/write"

        payload = {
            "plugin_id": plugin_id,
            "organization_id": organization_id,
            "collection_name": collection_name,
            "bulk_delete": False,
            "object_id": _id,
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


@api_view(['GET', 'POST'])
def remove_song(request):
    plugin_id = settings.PLUGIN_ID
    organization_id = settings.ORGANIZATON_ID
    collection_name = settings.SONG_COLLECTION
    
    song_data = read_data(settings.SONG_COLLECTION)
    _id = song_data["data"][0]["_id"]
    # query = song_data.objects.get(object_id=_id)

    if request.method == 'GET':
        data = read_data(collection_name)
        return Response(data)

    elif request.method == 'POST':
        
        # response = requests.post('https://api.zuri.chat/data/delete', params=query)

        url = 'https://api.zuri.chat/data/delete'
        payload = {
            "plugin_id": plugin_id,
            "organization_id": organization_id,
            "collection_name": collection_name,
            "bulk_delete": False,
            "object_id": _id,
            "filter": {}
        }
        
        try:
            r = requests.post(url, data=json.dumps(payload))
            #Note: use only {"_id": ""} in the payload

            if r.status_code == 200:
                return Response({"message": "Song deleted"},
                                status=status.HTTP_200_OK)
            else:
                return Response({"error": r.json()['message']}, status=r.status_code)

        except exceptions.ConnectionError as e:
            return Response(str(e), status=status.HTTP_502_BAD_GATEWAY)    


@api_view(['GET', 'POST'])
def remove_comments(request):
    
    plugin_id = settings.PLUGIN_ID
    organization_id = settings.ORGANIZATON_ID
    collection_name = settings.COMMENTS_COLLECTION
    
    chat_data = read_data(settings.COMMENTS_COLLECTION)
    _id = chat_data["data"][0]["_id"]

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
            "object_id": _id,
            "filter": {}
        }
        
        try:
            r = requests.post(url, data=json.dumps(payload))
            #Note: use only {"_id": ""} in the payload

            if r.status_code == 200:
                return Response({"message": "Comment removed"},
                                status=status.HTTP_200_OK)
            else:
                return Response({"error": r.json()['message']}, status=r.status_code)

        except exceptions.ConnectionError as e:
            return Response(str(e), status=status.HTTP_502_BAD_GATEWAY)  


# @db_init_with_credentials
# def create_room(request):
#     """
#     This function is used to create a room between 2 users.
#     It takes the id of the users involved, sends a write request to the database .
#     Then returns the room id when a room is successfully created
#     """

#     # validate request
#     #   if 'Authorization' in request.headers:
#     #       token = request.headers['Authorization']
#     #   else:
#     #       token = request.headers['Cookie']

#     #   verify = verify_user(token)
#     #   if verify.get("status") == 200:

#     serializer = RoomSerializer(data=request.data)
#     if serializer.is_valid():
#         user_ids = serializer.data["room_user_ids"]
#         user_rooms = get_rooms(user_ids[0])
#         for room in user_rooms:
#             room_users = room["room_user_ids"]
#             if set(room_users) == set(user_ids):
#                 response_output = {"room_id": room["_id"]}
#                 return Response(data=response_output, status=status.HTTP_200_OK)
#     response = DB.write("dm_rooms", data=serializer.data)
#     data = response.get("data").get("object_id")
#     if response.get("status") == 200:
#         response_output = {"room_id": data}
#         return Response(data=response_output, status=status.HTTP_201_CREATED)
#     return Response(status=status.HTTP_400_BAD_REQUEST)

