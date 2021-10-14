from unittest import mock
from django.urls import reverse

from rest_framework.test import APIClient, APITestCase
from rest_framework import status


class AddToRoomTest(APITestCase):
    def setUp(self):
        self.client = APIClient()

    @mock.patch("music.views.DataStorage.read")
    def test_add_user_to_room_on_server_down(self, mock_read):
        payload = {
            "room_id": "12345",
            "member_ids": ["1111"]
        }

        url = "music:add_user_to_room"
        response = self.client.post(reverse(url, 
        kwargs={
            "org_id": "61424456576",
            "room_id": "12345"
        }), data=payload)

        mock_read.return_value = None

        self.assertEqual(response.data, "Data not available on ZC core")
        self.assertEqual(response.status_code, status.HTTP_424_FAILED_DEPENDENCY)


    @mock.patch("music.views.DataStorage.read")
    @mock.patch("music.views.DataStorage.update")
    @mock.patch("music.views.centrifugo_publish")
    def test_add_user_to_room_successful(self, mock_centrifugo, mock_update, mock_read):
        
        payload = {
            "room_id": "616714d49f7a790c08d222ee",
            "member_ids": ["1111"]
        }
        mock_read.return_value = {
            "_id":"12345",
            "description":"This is the music room",
            "memberId":["9896uyuy090","3225345"],
            "org_id":"61424456576",
            "plugin_id":"613ceb50ceee2ab59d44df2f",
            "private":False,
            "room_name":"Music room"
        }
        mock_update.return_value = {"status": 200}
        mock_centrifugo.return_value = {"status_code": 200}


        url = "music:add_user_to_room"
        response = self.client.post(reverse(url, 
            kwargs={
                "org_id": "614679ee1a5607b13c00bcb7",
                "room_id": "616714d49f7a790c08d222ee"
            }),data=payload)


        self.assertTrue(response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["event"], "add_user_to_room")


    @mock.patch("music.views.DataStorage.read")
    @mock.patch("music.views.DataStorage.update")
    def test_add_user_to_room_not_updated(self, mock_update, mock_read):
        
        payload = {
            "room_id": "616714d49f7a790c08d222ee",
            "member_ids": ["1111"]
        }
        mock_read.return_value = {
            "_id":"12345",
            "description":"This is the music room",
            "memberId":["9896uyuy090","3225345"],
            "org_id":"61424456576",
            "plugin_id":"613ceb50ceee2ab59d44df2f",
            "private":False,
            "room_name":"Music room"
        }
        mock_update.return_value = {"status_code": 503}

        url = "music:add_user_to_room"
        response = self.client.post(reverse(url, 
            kwargs={
                "org_id": "614679ee1a5607b13c00bcb7",
                "room_id": "616714d49f7a790c08d222ee"
            }),data=payload)


        self.assertTrue(response.data == "User/users not added")
        self.assertEqual(response.status_code, status.HTTP_424_FAILED_DEPENDENCY)

    
    @mock.patch("music.views.DataStorage.read")
    def test_add_user_to_room_user_already_in_room(self, mock_read):
        
        payload = {
            "room_id": "616714d49f7a790c08d222ee",
            "member_ids": ["1111", "2323"]
        }
        mock_read.return_value = {
            "_id":"12345",
            "description":"This is the music room",
            "memberId":["9896uyuy090","2323","3225345", "1111"],
            "org_id":"61424456576",
            "plugin_id":"613ceb50ceee2ab59d44df2f",
            "private":False,
            "room_name":"Music room"
        }

        url = "music:add_user_to_room"
        response = self.client.post(reverse(url, 
            kwargs={
                "org_id": "614679ee1a5607b13c00bcb7",
                "room_id": "616714d49f7a790c08d222ee",
            }),data=payload)


        self.assertTrue(response.data)
        self.assertEqual(response.status_code, status.HTTP_302_FOUND)
        self.assertEqual(response.data, "Member/members already in room")



    @mock.patch("music.views.DataStorage.read")
    @mock.patch("music.views.DataStorage.update")
    @mock.patch("music.views.centrifugo_publish")
    def test_add_user_to_room_centrifugo_server_down(
        self, mock_centrifugo, mock_update, mock_read):
        
        payload = {
            "room_id": "616714d49f7a790c08d222ee",
            "member_ids": ["1111", "122334"]
        }
        mock_read.return_value = {
            "_id":"12345",
            "description":"This is the music room",
            "memberId":["9896uyuy090","3225345"],
            "org_id":"61424456576",
            "plugin_id":"613ceb50ceee2ab59d44df2f",
            "private":False,
            "room_name":"Music room"
        }
        mock_update.return_value = {"status": 200}
        mock_centrifugo.return_value = {"status_code": 503}


        url = "music:add_user_to_room"
        response = self.client.post(reverse(url, 
            kwargs={
                "org_id": "614679ee1a5607b13c00bcb7",
                "room_id": "616714d49f7a790c08d222ee",
            }),data=payload)


        self.assertTrue(response.data)
        self.assertEqual(response.status_code, status.HTTP_424_FAILED_DEPENDENCY)
        self.assertEqual(response.data, "User/users added but centrifugo not available")


   
    def test_add_user_to_room_invalid_payload_case_1(self):
        
        payload = {
            "room_id": "616714d49f7a790c08d222ee",
            "member_ids": "1111"
        }
        
        url = "music:add_user_to_room"
        response = self.client.post(reverse(url, 
            kwargs={
                "org_id": "614679ee1a5607b13c00bcb7",
                "room_id": "616714d49f7a790c08d222ee"
            }),data=payload)


        self.assertTrue(response.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_add_user_to_room_invalid_payload_case_2(self):
        
        payload = {
            "room_id": "616714d49f7a790c08d222ee",
            "member_ids": []
        }
        
        url = "music:add_user_to_room"
        response = self.client.post(reverse(url, 
            kwargs={
                "org_id": "614679ee1a5607b13c00bcb7",
                "room_id": "616714d49f7a790c08d222ee"
            }),data=payload)


        self.assertTrue(response.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_add_user_to_room_invalid_payload_case_3(self):
            
        payload = {
            "room_id": "616714d49f7a790c08d222ee"
        }
        
        url = "music:add_user_to_room"
        response = self.client.post(reverse(url, 
            kwargs={
                "org_id": "614679ee1a5607b13c00bcb7",
                "room_id": "616714d49f7a790c08d222ee"
            }),data=payload)


        self.assertTrue(response.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

