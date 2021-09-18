<<<<<<< HEAD
from music.utils.data_access import read_data, write_data
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
=======
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
>>>>>>> bec0d7e39fa76e7324b8fe77438e4b4d4be7733f
from django.http import JsonResponse
from music.utils.data_access import get_video_info

from music.utils.data_access import centrifugo_post
from music.utils.request_client import RequestClient


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
                                "description": ["This is a plugin that allows individuals in an organization to add music and video links from YouTube to a  shared playlist. Users also have the option to chat with other users in the music room and the option to like a song or video that is in the music room library."]
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
                "install_url":  "https://music.zuri.chat/music/",
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


class MediaView(GenericAPIView):
    def get(self, request):
        payload = {"email": "hng.user01@gmail.com", "password": "password"}

        request_client = RequestClient()

        response = request_client.request(
            method="GET",
            url=f"https://httpbin.org/anything",
            headers={"Content-Type": "application/json"},
            post_data=payload,
        )

        yourdata = response.response_data
        centrifugo_post("channel_name", {"event": "join_room"})
        # results = MediaSerializer(yourdata).data
<<<<<<< HEAD:music/views.py
        return Response(yourdata)




class AddMediaView(GenericAPIView):
    def get(self, request):

        data = read_data('New Collection')
        data = data['data']

        return Response(data)

    def post(self, request):
        payload = get_video_info("https://www.youtube.com/watch?v=3A3MiNlX6II")

        data = write_data('New Collection', payload=payload)
        data=data['data']

        return Response(data)
=======
        return Response(yourdata)
>>>>>>> e75c89e5f2714b26ae3f3925df677a761e68b9fe:server/music/views.py
