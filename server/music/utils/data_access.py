from music.utils.request_client import RequestClient
from django.conf import settings
from requests_html import HTMLSession
from bs4 import BeautifulSoup as bs
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


def read_data(collection=None, filter_data=None):
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


def write_data(collection, object_id=None, filter_data=None, payload=None, bulk_write=False, method="POST"):
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
        url="http://localhost:8000/api",
        headers=headers,
        post_data=post_data
    )
    return response


def data_write(collection, payload, filter={}, bulk=False, object_id=""):
    plugin_id = settings.PLUGIN_ID

    org_id = settings.ORGANIZATON_ID

    data = {

        "plugin_id": plugin_id,
        "organization_id": org_id,
        "collection_name": collection,
        "bulk_write": bulk,
        "object_id": object_id,
        "filter": filter,
        "payload": payload

    }
    url = "https://api.zuri.chat/data/write"

    res = requests.post(url, json=data)

    print(res.status_code)

    return res


def data_read(coll):
    plugin_id = settings.PLUGIN_ID

    org_id = settings.ORGANIZATON_ID

    url = "https://api.zuri.chat/data/read/" + plugin_id + "/" + coll + "/" + org_id

    res = requests.get(url)

    print(res.status_code)
    data = res.json()
    return data['data']

def del_data(collection, object_id, bulk=False, filter={}):

    plugin_id = settings.PLUGIN_ID

    org_id = settings.ORGANIZATON_ID

    data = {

        "plugin_id": plugin_id,
        "organization_id": org_id,
        "collection_name": collection,
        "bulk_delete": bulk,
        "object_id": object_id,
        "filter": filter
       

    }
    url = "https://api.zuri.chat//data/delete"
    res = requests.post(url, json=data)

    return res


def get_video(url):
    res = requests.get(url)

    res_text = res.text

    soup = bs(res_text, "html.parser")

    result = {}

    result["title"] = soup.find("meta", itemprop="name")['content']

    result["thumbnail_url"] = soup.find("meta", property="og:image")['content']

    result["track_url"] = soup.find("meta", property="og:url")['content']
    return result
