# from rest_framework.response import Response
# from rest_framework.views import APIView
# from django.http import JsonResponse

# from music.serializers import MediaSerializer
# from music.utils.request_client import RequestClient


# class SidebarView(APIView):

#     def get(self, request, *args, **kwargs):
#         data = {

#             "message": "Plugin Sidebar Retrieved",
#             "data": {
#                 "type": "Plugin Sidebar",
#                 "name": "Music Plugin",
#                 "description": "Shows Music items",
#                 "plugin_id": "613e32a115fb2424261b6621",
#                 "organisation_id": "6134fd770366b6816a0b75ed",
#                 "user_id": "6139170699bd9e223a37d91b",
#                 "group_name": "Music",
#                 "show_group": False,
#                 "public_rooms": {

#                     "name": "music room",
#                     "id": "613e906115fb2424261b6652",
#                     "unread": 2,
#                     "members": 23,
#                     "icon": "headphones",
#                     "action": "open",
#                 },
#                 "joined_rooms": {
#                     "title": "general",
#                     "id": "DFGHH-EDDDDS-DFDDF",
#                     "unread": 2,
#                     "members": 23,
#                     "icon": "shovel",
#                     "action": "open",
#                 },
#             },
#             "success": "true"
#         }
#         return JsonResponse(data, safe=False)


# class PluginInfoView(APIView):

#     def get(self, request, *args, **kwargs):
#         data = {
#             "message": "Plugin Information Retrieved",
#             "data": {
#                 "type": "Plugin Information",
#                 "plugin_info": {"name": "Music room",
#                                 "description": ["This is a plugin that allows individuals in an organization to add music and video links from YouTube to a  shared playlist. This allows anyone in that organization to listen to or watch any of the shared videos/songs. Users also have the option to chat with other users in the music room and the option to like a song or video that is in the music room library."]
#                                 },
#                 "version": "v1",                            
#                 "scaffold_structure": "Monolith",
#                 "team": "HNG 8.0/Team Music Plugin",
#                 "developer_name": "Zurichat Music Plugin",
#                 "developer_email": "musicplugin@zurichat.com",
#                 "icon_url": "https://drive.google.com/file/d/1KB9uSWqg0rM21ohsPxGnG8_1xbcdReio/view?usp=drivesdk",
#                 "photos": "https://drive.google.com/file/d/1KB9uSWqg0rM21ohsPxGnG8_1xbcdReio/view?usp=drivesdk",
#                 "homepage_url": "https://music.zuri.chat/",
#                 "sidebar_url": "https://music.zuri.chat/api/v1/sidebar/",
#                 "install_url":  "https://music.zuri.chat/",
#                 'ping_url': 'http://music.zuri.chat/api/v1/ping'
#             },
#             "success": "true"
#         }
#         return JsonResponse(data, safe=False)


# class PluginPingView(APIView):

#     def get(self, request, *args, **kwargs):
#         server = [
#             {'status': 'Success',
#             'Report': ['The music.zuri.chat server is working']}
#         ]
#         return JsonResponse({'server': server})


# class MediaView(APIView):
#     def get(self, request):
#         payload = {"email": "hng.user01@gmail.com", "password": "password"}

#         request_client = RequestClient()

#         response = request_client.request(
#             method="GET",
#             url=f"https://httpbin.org/anything",
#             headers={"Content-Type": "application/json"},
#             post_data=payload,
#         )

#         yourdata = response.response_data
#         # results = MediaSerializer(yourdata).data
#         return Response(yourdata)
