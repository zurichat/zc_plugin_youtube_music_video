#access_ops.py
# utility to READ/WRITE from zc core
from django.conf import settings
import requests

# gettings the relevant ids from settings
plugin_id = settings.PLUGIN_ID
org_id = settings.ORGANIZATON_ID
centrifugo = settings.CENTRIFUGO_TOKEN





# function to write data to zc core
def data_write(collection,  payload,filter={}, bulk=False, object_id=""):
    data = {

            "plugin_id": plugin_id,
            "organization_id": org_id,
            "collection_name": collection,
            "bulk_write": bulk,
            "object_id":object_id,
            "filter": filter,
            "payload": payload
    }
    url = "https://api.zuri.chat/data/write"

    res = requests.post(url, json=data)

    return res

# function to read data from zc core
def data_read(coll):


    url = "https://api.zuri.chat/data/read/" + plugin_id+"/"+coll+"/"+org_id

    res = requests.get(url)

    print(res.status_code)
    data = res.json()
    return data


# function to update data from zc core
def data_edit(collection,  payload,filter={}, bulk=False,object_id="" ):
    data = {

            "plugin_id": plugin_id,
            "organization_id": org_id,
            "collection_name": collection,
            "bulk_write": bulk,
            "object_id":object_id,
            "filter": filter,
            "payload": payload
    }

    url = "https://api.zuri.chat/data/write"

    res = requests.put(url=url, json=data)
    return res


