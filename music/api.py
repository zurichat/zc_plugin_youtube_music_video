from rest_framework.response import Response
from rest_framework.views import APIView

from music.serializers import MediaSerializer
from music.utils.request_client import RequestClient


class SidebarView(APIView):
    """Loads the sidebar items for zuri music"""

    def get(self, request, *args, **kwargs):
        static_info = {
            "name": "Todo Plugin",
            "description": "Shows todo items",
            "plugin_id": "DGGF-DSDFFDDF-EDFDFDF",
            "organisation_id": "Ffddffd",
            "user_id": "232",
            "group_name": "Todo",
            "show_group": False,
            "joined_rooms": {
                "title": "general",
                "id": "DFGHH-EDDDDS-DFDDF",
                "unread": 2,
                "members": 23,
                "icon": "shovel",
                "action": "open",
            },
            "public_rooms": {
                "title": "general",
                "id": "DFGHH-EDDDDS-DFDDF",
                "unread": 2,
                "members": 23,
                "icon": "shovel",
                "action": "open",
            }
        }

        return Response(static_info)


class PluginInfoView(APIView):
    def get(self, request, *args, **kwargs):
        data = {
            "message": "Plugin Information Retrieved",
            "data": {
                "type": "Plugin Information",
                "plugin_info": {
                    "name": "Youtube Music Video Plugin",
                    "description": [
                        "Zuri.chat plugin",
                        "This plugin allows individuals in an organization to add music and video links "
                        "from YouTube. These links are added to a shared playlist so that anyone in that "
                        "organization can listen to or watch any of the shared videos or songs.",
                    ],
                },
                "scaffold_structure": "Monolith",
                "team": "HNG 8.0/Team Pythagoras",
                "sidebar_url": "https://music.zuri.chat/api/v1/sideBar",
                "ping_url": "https://music.zuri.chat/api/v1/ping",
                "homepage_url": "https://music.zuri.chat/"
            },
        }
        return Response(data)


class MediaView(APIView):
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
        # results = MediaSerializer(yourdata).data
        return Response(yourdata)
