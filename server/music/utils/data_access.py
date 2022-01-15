from urllib.parse import urlencode

import requests
from bs4 import BeautifulSoup
from django.conf import settings
from isodate import parse_duration
from music.utils.request_client import RequestClient
from requests import exceptions, status_codes
from requests.exceptions import RequestException
from rest_framework import status

plugin_id = settings.PLUGIN_ID
org_id = settings.ORGANIZATON_ID
centrifugo = settings.CENTRIFUGO_TOKEN
musicroom_image = ["https://svgshare.com/i/aXm.svg"]
headers = {"Authorization": "headers"}


def user_login():
    payload = {"email": "hng.user01@gmail.com", "password": "password"}

    request_client = RequestClient()

    return request_client.request(
        method="POST",
        url="https://api.zuri.chat/auth/login",
        headers={"Content-Type": "application/json"},
        post_data=payload,
    )


def verify_token(token):
    if token is None:
        headers = {"Authorization": f"Bearer {token}"}
    else:
        headers = {"Cookie": token}

    request_client = RequestClient()

    response = request_client.request(
        method="GET",
        url="https://api.zuri.chat/auth/verify-token",
        headers=headers,
    )
    return response.response_data


def read_data(collection=None, object_id=None, filter_data=None, options=None):
    if filter_data is None:
        filter_data = {}

    if object_id is None:
        object_id = ""

    if options is None:
        options = {}

    post_data = {
        "collection_name": collection,
        "filter": filter_data,
        "object_id": object_id,
        "organization_id": org_id,
        "plugin_id": plugin_id,
        "options": options,
    }

    request_client = RequestClient()

    response = request_client.request(
        method="POST",
        url="https://api.zuri.chat/data/read",
        headers={"Authorization": "headers"},
        post_data=post_data,
    )
    return response.response_data


def write_data(
    collection,
    object_id=None,
    filter_data=None,
    payload=None,
    bulk_write=False,
    method="POST",
):
    if filter_data is None:
        filter_data = {}

    if payload is None:
        payload = {}

    if object_id is None:
        object_id = ""

    post_data = {
        "plugin_id": plugin_id,
        "organization_id": org_id,
        "collection_name": collection,
        "bulk_write": bulk_write,
        "object_id": object_id,
        "filter": filter_data,
        "payload": payload,
    }
    request_client = RequestClient()

    response = request_client.request(
        method=method,
        url="https://api.zuri.chat/data/write",
        headers={"Authorization": "headers"},
        post_data=post_data,
    )
    return response.response_data


def delete_data(
    collection,
    object_id=None,
    filter_data=None,
    payload=None,
    bulk_write=False,
    method="POST",
):
    if filter_data is None:
        filter_data = {}

    if payload is None:
        payload = {}

    if object_id is None:
        object_id = ""

    data = {
        "plugin_id": plugin_id,
        "organization_id": org_id,
        "collection_name": collection,
        "bulk_write": bulk_write,
        "object_id": object_id,
        "filter": filter_data,
        "payload": payload,
    }
    request_client = RequestClient()

    response = request_client.request(
        method=method,
        url="https://api.zuri.chat/data/delete",
        headers={"Authorization": "headers"},
        post_data=data,
    )
    return response.response_data


def put_data(
    collection,
    object_id=None,
    filter_data=None,
    payload=None,
    bulk_write=False,
    method="PUT",
):
    if filter_data is None:
        filter_data = {}

    if payload is None:
        payload = {}

    if object_id is None:
        object_id = ""

    patch_data = {
        "plugin_id": plugin_id,
        "organization_id": org_id,
        "collection_name": collection,
        "bulk_write": bulk_write,
        "object_id": object_id,
        "filter": filter_data,
        "payload": payload,
    }
    request_client = RequestClient()

    response = request_client.request(
        method=method,
        url="https://api.zuri.chat/data/write",
        headers={"Authorization": "headers"},
        post_data=patch_data,
    )
    return response.response_data


def get_video(url):
    res = requests.get(url)

    content = res.content

    soup = BeautifulSoup(content, "html.parser")

    return {
        "title": soup.select_one('meta[itemprop="name"][content]')["content"],
        "track_url": soup.select_one('link[itemprop="url"]')["href"],
        "thumbnail_url": soup.select_one('link[itemprop="thumbnailUrl"]')["href"],
        "duration": str(
            parse_duration(
                soup.select_one('meta[itemprop="duration"][content]')["content"]
            )
        ),
    }


def get_room_info(room_id):
    room_data = read_data(settings.ROOM_COLLECTION, object_id=room_id)
    if room_data["data"] is not None or room_data["status"] == 200:
        try:
            return {
                "room_id": room_id,
                "room_name": room_data["data"]["room_name"],
                "room_url": f"/music/{room_id}",
                "room_image": musicroom_image[0],
            }
        except requests.RequestException as error:
            raise RequestException(error)


def get_org_members(org_id):
    url = f"https://api.zuri.chat/organizations/{org_id}/members"
    if org_id is not None:
        try:
            response = requests.get(url)
            return response.json()
        except requests.RequestException as error:
            raise RequestException(error)


def centrifugo_publish(room, event, data, plugin_url="music.zuri.chat"):
    data_to_publish = {
        "status": 200,
        "event": event,
        "plugin_url": plugin_url,
        "plugin_id": plugin_id,
        "data": data,
    }

    headers = {
        "Content-type": "application/json",
        "Authorization": "apikey " + centrifugo,
    }
    url = "https://realtime.zuri.chat/api"
    command = {
        "method": "publish",
        "params": {"channel": room, "data": data_to_publish},
    }
    try:
        response = requests.post(url=url, headers=headers, json=command)
    except requests.RequestException as error:
        raise RequestException(error)

    return {"status_code": response.status_code, "message": response.json()}
