from django.conf import settings
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from django.http import JsonResponse
from music.utils.data_access import data_read, data_write, get_video, read_data, write_data, centrifugo_post, del_data
from rest_framework.views import APIView
from datetime import datetime
from music.serializers import CommentSerializer


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

        # centrifugo_post("channel_name", {"event": "join_room"})
        return Response(data)


class UserCountView(GenericAPIView):
    def get(self, request):
        centrifugo_post("channel_name", {"event": "join_room"})
        centrifugo_post.counter += 1
        header_user_count = centrifugo_post.counter
        return Response(header_user_count)

    centrifugo_post.counter = 0


class Songs(APIView):

    def post(self, req):
        collection = "Songs"

        url = req.data['url']
        payload = get_video(url)
        res = data_write(collection, payload)

        return Response(res.json(), status=200)

    def put(self, req):
        collection = "Songs"

        url = req.data['url']

        obj_id = req.data['object_id']

        payload = get_video(url)

        res = data_write(collection, payload, object_id=obj_id)

        return Response(res, status=200)

    def get(self, req):
        res = data_read("Songs")

        return Response(res, status=200)

        return Response(data["data"])

    def post(self, request):
        payload = {
            "age": 233,
            "fan": "Carbom",
            "name": "Oxide"
        }
        data = write_data("test_collection", payload=payload)
        return Response(data)


class AddToRoomView(APIView):
    @staticmethod
    def get_obj_id_and_append_user_id(request):
        room_data = read_data(settings.ROOM_COLLECTION)
        user_ids = room_data["data"][0]["room_user_ids"]
        _id = room_data["data"][0]["_id"]
        user_ids.append(request.data)
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
        return Response(data, status=status.HTTP_202_ACCEPTED)


class CreateRoomView(APIView):
    def post(self, request):
        payload = {
            "age": 233,
            "fan": "Carbom",
            "name": "Oxide"
        }
        data = write_data(settings.ROOM_COLLECTION, payload=payload)
        return Response(data)


class CommentView(APIView):

    def get(self, request):
        collection = 'Comments'
        response = data_read(collection)

        return Response(response, status=200)


    def post(self, request):

        collection = 'Comments'
        serializer = CommentSerializer(data=request.data)

        if serializer.is_valid():
            payload = serializer.data
            response = data_write(collection,payload)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

class EventDisplay(APIView):

    def get(self, req):

        collection = "Music_Room"
        evt = req.GET['event'].strip()
        user="Guest"
        if evt == "join":

            #Update room numbers
            payload = {
                 
            "user": "Guest",
            "timestamp": str(datetime.now()),

            }
            data_write(collection, payload)

            room_det = data_read(collection)
            
            total_user = len(room_det)
            
            data = {
                "user":user,
                "total_user":total_user

            }
        elif evt=="leave":
            room_det = data_read(collection)
            rm_len = len(room_det)
            obj_id = room_det[rm_len - 1].get('object_id')
            res = del_data(collection, obj_id)
            room_det = data_read(collection)
            rm_len = len(room_det) - 1
            data = {
                "user":user,
                "total_user":rm_len
            }


        return Response(data, status=200)