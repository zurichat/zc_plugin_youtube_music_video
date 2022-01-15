import requests
from django.conf import settings
from django.http import JsonResponse
from drf_spectacular.utils import extend_schema
from music.utils.data_access import get_org_members, get_room_info, musicroom_image
from music.utils.request_client import RequestClient
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView


class RoomImageView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(
        description="change_room_image",
        responses={
            200: "Success",
            400: "Error",
        },
        methods=["GET", "POST"],
    )
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
            musicroom_image[0] = "https://svgshare.com/i/aXm.svg"
        else:
            musicroom_image[0] = data["albumCover"]
        return Response(
            {"room_image": musicroom_image, "curent-song": data}, status=status.HTTP_200_OK
        )


class SidebarView(GenericAPIView):
    permission_classes = [AllowAny]

    @extend_schema(
        description="Sidebar information",
        responses={
            200: "Success",
            204: "No content",
            401: "Unatthorized",
            424: "Failed",
        },
        methods=["GET"],
    )
    def get(self, request, *args, **kwargs):

        org_id = request.GET.get("org", None)
        user_id = request.GET.get("user", None)
        room_id = settings.ROOM_ID
        pub_room = get_room_info(room_id)
        sidebar = {
            "name": "Music Plugin",
            "description": "This is a virtual lounge where people can add, watch and listen to YouTube videos or music",
            "group_name": [],
            "category": "entertainment",
            "plugin_id": "music.zuri.chat",
            "organisation_id": "",
            "room_id": "",
            "user_id": "",
            "show_group": False,
            "button_url": "/music",
            "public_rooms": [],
            "joined_rooms": [],
            "starred_rooms": [],
        }
        if org_id and user_id:
            org_members = get_org_members(org_id)
            if org_members["status"] == 200:
                org_members = org_members["data"]
                for member in org_members:
                    if member["_id"] == user_id:
                        sidebar_data = sidebar
                        sidebar_data["organisation_id"] = org_id
                        sidebar_data["room_id"] = room_id
                        sidebar_data["user_id"] = user_id
                        sidebar_data["public_rooms"] = [pub_room]
                        sidebar_data["joined_rooms"] = [pub_room]
                        sidebar_update_payload = {
                            "event": "sidebar_update",
                            "plugin_id": "music.zuri.chat",
                            "data": sidebar_data,
                        }
                        return Response(
                            sidebar_update_payload, status=status.HTTP_200_OK
                        )
                return Response(sidebar, status=status.HTTP_401_UNAUTHORIZED)
            return Response(sidebar, status=status.HTTP_424_FAILED_DEPENDENCY)
        return Response(sidebar, status=status.HTTP_204_NO_CONTENT)

    def is_valid(param):
        return param != "" and param is not None


class PluginInfoView(GenericAPIView):
    permission_classes = [AllowAny]

    @extend_schema(
        description="Plugin Information",
        responses={200: "Success"},
        methods=["GET"],
    )
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
                "sidebar_url": "https://zuri.chat/api/v1/sidebar",
                "install_url": "https://zuri.chat/music",
                "ping_url": "http://zuri.chat/music/api/v1/ping",
            },
            "success": "true",
        }
        return JsonResponse(data, safe=False)


class PluginPingView(GenericAPIView):
    permission_classes = [AllowAny]

    @extend_schema(
        description="Plugin Ping",
        responses={
            200: "Success",
            424: "Failed",
        },
        methods=["GET"],
    )
    def get(self, request, *args, **kwargs):

        url = "https://music.zuri.chat/music"
        try:
            response = requests.get(url, headers={"Content-Type": "application/json"})
            if response.status_code == 200:
                server = [
                    {
                        "status": "Success",
                        "Report": ["The music.zuri.chat server is working"],
                    }
                ]
                return Response({"server": server}, status=status.HTTP_200_OK)
            server = [
                {
                    "status": "Failed",
                    "Report": ["The music.zuri.chat server is not working"],
                }
            ]
            return Response(
                {"server": server}, status=status.HTTP_424_FAILED_DEPENDENCY
            )
        except Exception:
            return Response(
                data="Connetion Error",
                status=status.HTTP_424_FAILED_DEPENDENCY,
            )


# plugin marketplace
class InstallView(APIView):
    @extend_schema(
        responses={200},
        description="install a plugin",
        methods=["POST"],
    )
    def post(self, request):
        plugin_id = settings.PLUGIN_ID
        user_id = request.data["user_id"]
        org_id = request.data["organisation_id"]
        token = request.headers["Authorization"]
        print(token)
        payload = {
            "plugin_id": plugin_id,
            "user_id": user_id,
            "organisation_id": org_id,
        }
        request_client = RequestClient()

        response = request_client.request(
            method="POST",
            url=f"https://api.zuri.chat/organizations/{org_id}/plugins",
            headers={"Authorization": token, "Content-Type": "application/json"},
            post_data=payload,
        )

        installed = response.response_data
        print(installed)
        if installed["status"] == 200:
            data = {
                "message": "Plugin successfully installed!",
                "success": True,
                "data": {"redirect_url": "/music"},
            }
            return Response(data=data, status=status.HTTP_201_CREATED)

        elif installed["status"] == 400:
            data = {
                "message": "Plugin has already been installed!",
                "success": False,
                "data": None,
            }
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)

        else:
            data = {
                "message": "There is an Error with this installation! Please contact Admin",
                "success": False,
                "data": None,
            }
            return Response(data=data, status=status.HTTP_424_FAILED_DEPENDENCY)


class UninstallView(APIView):
    @extend_schema(
        responses={200},
        description="uninstall a plugin",
        methods=["DELETE"],
    )
    def delete(self, request):
        plugin_id = settings.PLUGIN_ID
        user_id = request.data["user_id"]
        org_id = request.data["organisation_id"]
        token = request.headers["Authorization"]
        print(token)
        payload = {
            "plugin_id": plugin_id,
            "user_id": user_id,
            "organisation_id": org_id,
        }
        request_client = RequestClient()

        response = request_client.request(
            method="DELETE",
            url=f"https://api.zuri.chat/organizations/{org_id}/plugins/{plugin_id}",
            headers={"Authorization": token, "Content-Type": "application/json"},
            post_data=payload,
        )

        uninstalled = response.response_data
        print(uninstalled)
        if uninstalled["status"] == 200:
            data = {
                "message": "Uninstalled successfully!",
                "success": True,
                "data": None,
            }
            return Response(data=data, status=status.HTTP_201_CREATED)

        elif uninstalled["status"] == 400:
            data = {
                "message": "Oops! plugin does not exist",
                "success": False,
                "data": None,
            }
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)

        else:
            data = {
                "message": "There is an Error with this uninstallation! Please contact Admin",
                "success": False,
                "data": None,
            }
            return Response(data=data, status=status.HTTP_424_FAILED_DEPENDENCY)
