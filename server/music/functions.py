from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from django.http import JsonResponse
import json
from music.serializers import *
from music.models import *
from music.utils.data_access import *
import requests
from requests import exceptions
from django.http import Http404

from rest_framework.decorators import api_view



@api_view(['GET', 'POST'])
def removecomment(request):
    plugin_id = settings.PLUGIN_ID
    organization_id = settings.ORGANIZATON_ID
    collection_name = settings.COMMENTS_COLLECTION

    comment_data = read_data(settings.COMMENTS_COLLECTION)
    _id = comment_data["data"][0]["_id"]
    # _id = song_data.GET.get("_id", None)

    if request.method == 'GET':
        data = read_data(collection_name)
        return Response(data)

    elif request.method == 'POST':

        url = 'https://api.zuri.chat/data/delete'
        payload = {
            "plugin_id": plugin_id,
            "organization_id": organization_id,
            "collection_name": collection_name,
            "bulk_delete": False,
            "object_id": _id,
            "filter": {}
        }

        try:
            r = requests.post(url, data=json.dumps(payload))
            #Note: use only {"_id": ""} in the payload

            if r.status_code == 200:
                return Response({"message": "Comment deleted successfully"},
                                status=status.HTTP_200_OK)
            else:
                return Response({"error": r.json()['message']}, status=r.status_code)

        except exceptions.ConnectionError as e:
            return Response(str(e), status=status.HTTP_502_BAD_GATEWAY)


@api_view(['GET', 'POST'])
def removesong(request):
    plugin_id = settings.PLUGIN_ID
    organization_id = settings.ORGANIZATON_ID
    collection_name = settings.SONG_COLLECTION

    song_data = read_data(settings.SONG_COLLECTION)
    _id = song_data["data"][0]["_id"]
    # _id = song_data.GET.get("_id", None)

    if request.method == 'GET':
        data = read_data(collection_name)
        return Response(data)

    elif request.method == 'POST':

        url = 'https://api.zuri.chat/data/delete'
        payload = {
            "plugin_id": plugin_id,
            "organization_id": organization_id,
            "collection_name": collection_name,
            "bulk_delete": False,
            "object_id": _id,
            "filter": {}
        }

        try:
            r = requests.post(url, data=json.dumps(payload))
            #Note: use only {"_id": ""} in the payload

            if r.status_code == 200:
                return Response({"message": "Song deleted successfully"},
                                status=status.HTTP_200_OK)
            else:
                return Response({"error": r.json()['message']}, status=r.status_code)

        except exceptions.ConnectionError as e:
            return Response(str(e), status=status.HTTP_502_BAD_GATEWAY)

