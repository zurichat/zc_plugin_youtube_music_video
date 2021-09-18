# import pytest
from music.views import PluginInfo
from django.test.client import Client
from django.urls import resolve, reverse
from rest_framework.test import APITestCase
from rest_framework import status
from music.api import SidebarView
from frontend.views import IndexView


class TestUrls(APITestCase):
    def setUp(self):

        self.sidebar_url = reverse("sidebar")
        self.info_url = reverse("info")
        self.home_url = reverse("home")
        # self.user = User.objects.create(username="uname", password="Strong password")
        # self.token = Token.objects.create(user=self.user)
        # self.client.credentials(HTTP_AUTHORIZATION="Token "+self.token)

        self.client = Client()

    def test_sideBar(self):

        response = self.client.get(self.sidebar_url)

        resolved = resolve(self.sidebar_url)

        # test response status code
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # test view name
        self.assertEqual(resolved.func.view_class, SidebarView)

        # test response data
        self.assertEqual(
            response.data,
            {
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
            },
        )

    def test_pluginInfo(self):

        response = self.client.get(self.info_url)

        resolved = resolve(self.info_url)

        # test response status code
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # test view name
        self.assertEqual(resolved.func.view_class, PluginInfo)

        # test response data
        self.assertEqual(
            response.json(),
            {
                "plugin_name": "Youtube Music Video Plugin",
                "description": "This is a plugin that allows individuals in an organization to add music and video links from YouTube. These links are added to a shared playlist so that anyone in that organization can listen to or watch any of the shared videos or songs.",
                "plugin_structure": "Monolith",
                "team name": "Team Pythagoras",
                "plugin_url": "music.zuri.chat",
                "information_url": "music.zuri.chat/info",
                "sidebar_url": "music.zuri.chat/sidebar",
            },
        )

    def test_homePage(self):

        response = self.client.get(self.home_url)

        resolved = resolve(self.home_url)

        # test response status code
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # test view name
        self.assertEqual(resolved.func.view_class, IndexView)

        # test Template Used
        self.assertTemplateUsed(response, "frontend/index.html")
