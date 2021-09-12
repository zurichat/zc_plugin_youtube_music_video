from django.test import TestCase
import requests
from rest_framework import status
from datetime import datetime
import json


class TestDataReadWrite(TestCase):
    def setUp(self):

        self.writeUrl = "https://zuri.chat/data/write"
        self.plugin_id = "123"
        self.org_id = "123"
        self.playlist = {
            "name": "Slow mode",
            "genre": "pop and soul",
            "date_created": datetime.now(),
            "songs": {},
            "comments": {},
            "likes": 0,
            "created_by": "classicmeone",
        }

        self.comment = {
            "comment": "Very good bad songs",
            "date_created": datetime.now(),
        }

        self.song = {
            "title": "Pimp Down",
            "artist": "Drake",
            "album": "CLB",
            "released": datetime.now(),
        }

    def test_WritePlaylist(self):

        data = {
            "plugin_id": self.plugin_id,
            "organization_id": self.org_id,
            "collection_name": "Playlists",
            "bulk_write": False,
            "object_id": "001",
            "filter": {},
            "payload": self.playlist,
        }

        res = requests.post(self.writeUrl, data=data)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_WriteComment(self):

        data = {
            "plugin_id": self.plugin_id,
            "organization_id": self.org_id,
            "collection_name": "Comments",
            "bulk_write": False,
            "object_id": "001",
            "filter": {},
            "payload": self.comment,
        }

        res = requests.post(self.writeUrl, data=data)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_WriteSong(self):

        data = {
            "plugin_id": self.plugin_id,
            "organization_id": self.org_id,
            "collection_name": "Songs",
            "bulk_write": False,
            "object_id": "001",
            "filter": {},
            "payload": self.song,
        }

        res = requests.post(self.writeUrl, data=data)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_DataReadPlaylist(self):

        #  /data/read/{plugin_id}/{collection_name}/{organization_id}
        url = "https://zuri.chat/data/read/123/Playlists/123"
        res = requests.get(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

        # data = res.data[0]
        data = res.text
        vals = data[0]
        self.assertEqual(str(vals), "Slow mode")

    def test_DataReadComment(self):
        url = "https://zuri.chat/data/read/123/Comments/123"
        res = requests.get(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

        data = res.text
        vals = data[0]
        self.assertEqual(str(vals), "Very good bad songs")

    def test_DataReadSong(self):

        url = "https://zuri.chat/data/read/123/Songs/123"
        res = requests.get(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

        data = res.text
        vals = data[0]
        print(vals)
        self.assertEqual(str(vals), "Pimp Down")
