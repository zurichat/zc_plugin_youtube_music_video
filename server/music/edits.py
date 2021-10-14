# import re
# from django.core.paginator import Paginator
# from django.conf import settings
# from rest_framework import status
# from rest_framework.generics import GenericAPIView
# from rest_framework.permissions import AllowAny
# from rest_framework.response import Response
# from django.http import JsonResponse
# import json
# from music.serializers import *
# from music.models import *
# from music.utils.data_access import *
# from rest_framework.views import APIView
# import requests
# from requests import exceptions
# from django.http import Http404
# from music.dataStorage import *


# #edits in progress

# class CreateRoomView(APIView):

#     # def post(self,request,org_id,memberId,collection,*args, **kwargs):
#     def post(self, request, org_id, memberId, collection,*args, **kwargs):
#         serializer = RoomSerializer(data=request.data)

#         org_id = request.data.get('org_id')
#         memberId = request.data.get('memberId')
#         collection = request.data.get('collection')
#         room_name = request.data.get('room_name')
#         description = request.data.get('description')

#         if serializer.is_valid():

#             room_url = f"https://api.zuri.chat/data/read/{plugin_id}/{collection}/{org_id}"

#             x = requests.request("GET", url=room_url)

#             if x.status_code == 200:

#                 data = {
#                     "plugin_id": plugin_id,
#                     "organization_id": org_id,
#                     "collection_name": collection,
#                     "bulk_write": False,
#                     "payload": {
#                         "room_name": room_name,
#                         "description": description,
#                         "private": False,
#                         "memberId": [memberId],
#                     }
#                 }

#                 post_url = 'https://api.zuri.chat/data/write'

#                 x = requests.request("POST", url=post_url, data=json.dumps(data))

#                 if x.status_code in [201, 200]:

#                     responses = x.json()
#                     room_url_data = responses['data']

#                     room_url = room_url_data['object_id']

#                     payload = {
#                     "plugin_id": plugin_id,
#                     "organization_id": org_id,
#                     "collection_name": collection,
#                     "object_id": room_url,
#                     "bulk_write": False,
#                     "payload": {
#                         "room_url": f"/music/{room_url}"
#                         }
#                     }
#                     #add the room url to the room for the side bar to see

#                     x_url = requests.request("PATCH", url=post_url, data=json.dumps(payload))

#                     if x_url.status_code in [201, 200]:
#                         response = {
#                             "room_id":room_url,
#                             "room_name": room_name,
#                             "memberId": memberId,
#                             "room_url": f"/music/{room_url}"
#                         }

#                     return Response(data=response, status=status.HTTP_200_OK)
#                 return Response(data={"message":"url error"}, status=status.HTTP_200_OK)
#             return Response(data={"message": "failed"}, status=status.HTTP_400_BAD_REQUEST)


# class CreateRoomView(APIView):

#     serializer_class = RoomSerializer

#     def post(self, request, *args, **kwargs):
#         org_id = settings.ORGANIZATON_ID
#         plugin_id = settings.PLUGIN_ID
#         coll_name = settings.ROOM_COLLECTION

#         plugin_id = settings.PLUGIN_ID

#         serializer = self.serializer_class(data=request.data)

#         if serializer.is_valid(raise_exception=True)

#             rooms = serializer.data

#             rooms["org_id"] = org_id
#             rooms["plugin_id"] = plugin_id
#             # rooms["memberId"] = memberId

#             data = write_data(coll_name, payload=rooms)
#             return Response(data)
