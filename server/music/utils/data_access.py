from music.utils.request_client import RequestClient
from django.conf import settings
from bs4 import BeautifulSoup
from isodate import parse_duration
import requests

plugin_id = settings.PLUGIN_ID
org_id = settings.ORGANIZATON_ID
centrifugo = settings.CENTRIFUGO_TOKEN

headers = {"Authorization": "headers"}


def loadcheck(payload):
    if isinstance(payload, list):
        return True
    assert isinstance(payload, dict), "payload must be list or dict"
    return False


def verify_token(token):
    if token is None:
        header = {"Authorization": f"Bearer {token}"} or {"Cookie": token}

    request_client = RequestClient()

    response = request_client.request(
        method="GET",
        url="https://api.zuri.chat/auth/verify-token",
        headers=header,
    )
    return response.response_data


def read_data(collection, filter_data=None):
    if filter_data is None:
        filter_data = {}

    request_client = RequestClient()

    response = request_client.request(
        method="GET",
        url=f"https://api.zuri.chat/data/read/{plugin_id}/{collection}/{org_id}",
        headers={"Authorization": "headers"},
        post_data=filter_data
    )
    return response.response_data


def write_data(collection, object_id=None, filter_data=None, payload=None, method="POST"):
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
        "bulk_write": loadcheck(payload),
        "object_id": object_id,
        "filter": filter_data,
        "payload": payload
    }
    request_client = RequestClient()

    response = request_client.request(
        method=method,
        url="https://api.zuri.chat/data/write",
        headers={"Authorization": "headers"},
        post_data=post_data
    )
    return response.response_data


def centrifugo_post(room, data):
    headers = {'Content-type': 'application/json', 'Authorization': 'apikey ' + centrifugo}
    post_data = {
        "method": "publish",
        "params": {
            "channel": room,
            "data": data
        }
    }
    request_client = RequestClient()

    response = request_client.request(
        method="POST",
        url="https://realtime.zuri.chat/api",
        headers=headers,
        post_data=post_data
    )
    return response


def publish_to_sidebar(organization_id, user_id, data):
    headers = {'Content-type': 'application/json', 'Authorization': 'apikey ' + centrifugo}
    room = {'org_id': organization_id, 'user_id': user_id}
    post_data = {
        "method": "publish",
        "params": {
            "channel": room,
            "data": data
        }
    }
    request_client = RequestClient()

    response = request_client.request(
        method="POST",
        url="https://realtime.zuri.chat/api",
        headers=headers,
        post_data=post_data
    )
    return response


def get_video(url):
    res = requests.get(url)

    content = res.content

    soup = BeautifulSoup(content, "html.parser")

    result = {
        "title": soup.select_one('meta[itemprop="name"][content]')['content'],
        "track_url": soup.select_one('link[itemprop="url"]')['href'],
        "thumbnail_url": soup.select_one('link[itemprop="thumbnailUrl"]')['href'],
        "duration": str(parse_duration(soup.select_one('meta[itemprop="duration"][content]')['content']))
    }

    return result


def delete_data(collection, object_id=None, filter_data=None, method="POST"):
    post_data = {
        "plugin_id": plugin_id,
        "organization_id": org_id,
        "collection_name": collection,
    }
    if filter_data is not None:
        post_data.update({"filter": filter_data, "bulk_delete": True})
    else:
        if object_id is None:
            return {"error": "Object id must be set"}
        post_data.update({"object_id": object_id})
    request_client = RequestClient()

    response = request_client.request(
        method=method,
        url="https://api.zuri.chat/data/delete",
        headers={"Authorization": "headers"},
        post_data=post_data
    )
    return response.response_data


def update(collection, payload, filter_data=None, object_id=None, method="PUT"):
    post_data = {
        "plugin_id": plugin_id,
        "organization_id": org_id,
        "collection_name": collection,
        "bulk_write": loadcheck(payload),
        "object_id": object_id,
        "filter": filter_data,
        "payload": payload
    }
    bulk_write = post_data.get("bulk_write")
    if bulk_write:
        if filter_data is None:
            return {"error": "Filter must be set"}
        if object_id is None:
            return {"error": "Object ID must be set"}

    request_client = RequestClient()

    response = request_client.request(
        method=method,
        url="https://api.zuri.chat/data/write",
        headers={"Authorization": "headers"},
        post_data=post_data)
    return response.response_data
    #  if 200 <= response.status_code < 300:
    #  if not bulk_write:
    #      obj = {"_id": object_id}
    #  response = read_data(collection, obj)
