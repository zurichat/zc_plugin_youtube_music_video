from rest_framework.response import Response
from rest_framework.views import APIView


class SidebarView(APIView):
    """Loads the sidebar items for zuri music"""

    def get(self, request, *args, **kwargs):
        static_info = {
            "status": "success",
            "plugin_name": "Music Plugin",
            "type": "sidebar items",
            "menu": {
                "title": "MUSIC",
                "sub_menu": {
                    "item_1": {
                        "name": "Music Player",
                        "icon": "#",
                        "action": "Opens Music Player",
                    },
                    "item_2": {
                        "name": "Comments",
                        "icon": "#",
                        "action": "Comments Section",
                    },
                    "item_3": {
                        "name": "Search Bar",
                        "icon": "#",
                        "action": "Open Search Bar",
                    },
                },
            },
        }
        return Response(static_info)


class Comment(object):
    def __init__(self, **kwargs):
        for field in ('id', 'username','created_at', 'message'):
            setattr(self, field, kwargs.get(field, None))