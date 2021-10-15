from music.utils.request_client import RequestClient
from django.conf import settings
from bs4 import BeautifulSoup
from isodate import parse_duration
import requests

plugin_id = settings.PLUGIN_ID
org_id = settings.ORGANIZATON_ID
centrifugo = settings.CENTRIFUGO_TOKEN

headers = {"Authorization": "headers"}


def user_login():
    payload = {"email": "hng.user01@gmail.com", "password": "password"}

    request_client = RequestClient()

    response = request_client.request(
        method="POST",
        url="https://api.zuri.chat/auth/login",
        headers={"Content-Type": "application/json"},
        post_data=payload,
    )
    return response


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


def read_data(collection=None, object_id=None, filter_data=None):
    if filter_data is None:
        filter_data = {}

    if object_id is None:
        object_id = ""

    request_client = RequestClient()

    response = request_client.request(
        method="GET",
        url=f"https://api.zuri.chat/data/read/{plugin_id}/{collection}/{org_id}",
        headers={"Authorization": "headers"},
        post_data=filter_data,
    )
    return response.response_data


def query_data(collection=None, object_id=None, filter_data=None, options=None):
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


def centrifugo_post(room, data):
    headers = {
        "Content-type": "application/json",
        "Authorization": "apikey " + centrifugo,
    }
    post_data = {"method": "publish", "params": {"channel": room, "data": data}}
    request_client = RequestClient()

    response = request_client.request(
        method="POST",
        url="https://realtime.zuri.chat/api",
        headers=headers,
        post_data=post_data,
    )
    return response


def publish_to_sidebar(organization_id, user_id, data):
    headers = {
        "Content-type": "application/json",
        "Authorization": "apikey " + centrifugo,
    }
    room = {"org_id": organization_id, "user_id": user_id}
    post_data = {"method": "publish", "params": {"channel": room, "data": data}}
    request_client = RequestClient()

    response = request_client.request(
        method="POST",
        url="https://realtime.zuri.chat/api",
        headers=headers,
        post_data=post_data,
    )
    return response


def get_video(url):
    res = requests.get(url)

    content = res.content

    soup = BeautifulSoup(content, "html.parser")

    result = {
        "title": soup.select_one('meta[itemprop="name"][content]')["content"],
        "track_url": soup.select_one('link[itemprop="url"]')["href"],
        "thumbnail_url": soup.select_one('link[itemprop="thumbnailUrl"]')["href"],
        "duration": str(
            parse_duration(
                soup.select_one('meta[itemprop="duration"][content]')["content"]
            )
        ),
    }

    return result


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
        # url="https://api.zuri.chat/data/delete",
        headers={"Authorization": "headers"},
        post_data=patch_data,
    )
    return response.response_data
