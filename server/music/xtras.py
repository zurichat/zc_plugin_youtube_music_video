import requests, json

from django.http import Http404
from django.conf import settings
# from django.views.static import serve as static_serve
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import RoomSerializer, RoomCreateSerializer
from rest_framework.decorators import api_view
from rest_framework import status

from drf_spectacular.utils import extend_schema


### api/v1/sidebar?org=5336&user=Devjoseph&token=FGEZJJ-ZFDGB-FDGG
PLUGIN_ID = settings.PLUGIN_ID
ORGANISATION_ID = settings.ORGANISATION_ID
ROOM_COLLECTION_NAME = settings.ROOM_COLLECTION_NAME
ADDED_ROOM_COLLECTION_NAME = settings.ADDED_ROOM_COLLECTION_NAME
PLUGIN_NAME = settings.PLUGIN_NAME
DESCRIPTION = settings.DESCRIPTION

class SidebarView(APIView):
    def get(self,request,*args, **kwargs):
        if request.GET.get('org') and request.GET.get('user'):
            user = request.GET.get('user')
            org = request.GET.get('org')
            url = f'https://api.zuri.chat/organizations/{org}/members/{user}'
            headers = {
                "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb29raWUiOiJNVFl6TWpVMk5UY3pPSHhIZDNkQlIwUlplRTVIVm0xUFYxWm9XbFJOTVZsdFNUTk5Na1V6VGpKS2FrMXRSWGxPZHowOWZERHRMWFpqWlRUU1VLSHNPNzItTjNVSlVZNmlVaDlTMUhveXcwbl8zaWNUIiwiZW1haWwiOiJhbGFzaGltdXlpd2FAZ21haWwuY29tIiwiaWQiOiI2MTRlZjllYWUzNWJiNzNhNzdiYzJhMjciLCJvcHRpb25zIjp7IlBhdGgiOiIvIiwiRG9tYWluIjoiIiwiTWF4QWdlIjo3OTM5NzY1MjQ0LCJTZWN1cmUiOmZhbHNlLCJIdHRwT25seSI6ZmFsc2UsIlNhbWVTaXRlIjowfSwic2Vzc2lvbl9uYW1lIjoiZjY4MjJhZjk0ZTI5YmExMTJiZTMxMGQzYWY0NWQ1YzcifQ.ZAFc8PUEnHveRyGzDPB_TXP0qzGhd2ymhDx44ECdDA4",
                "Content-Type" : "application/json",
                }
            r = requests.get(url,headers=headers)
            print(r.status_code)
            if r.status_code == 200:
                public_url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/{ROOM_COLLECTION_NAME}/{ORGANISATION_ID}"
                private_url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/{ADDED_ROOM_COLLECTION_NAME}/{ORGANISATION_ID}"
                public_r = requests.get(public_url)
                private_r = requests.get(private_url)
                public_response = json.loads(public_r.text)
                private_response = json.loads(private_r.text)
                if private_response['status']!=200:
                    return Response({"name": PLUGIN_NAME,
                    "description": DESCRIPTION,
                    "plugin_id": PLUGIN_ID,
                    "organisation_id": org,
                    "user_id": user,
                    "group_name": "SALES",
                    "show_group": False,
                    "Public rooms":public_response['data'],
                    "Joined rooms":[]})
                else:
                    return Response({"name": PLUGIN_NAME,
                    "description": DESCRIPTION,
                    "plugin_id": PLUGIN_ID,
                    "organisation_id": org,
                    "user_id": user,
                    "group_name": "SALES",
                    "show_group": False,
                    "Public rooms":private_response['data'],
                    "Joined rooms":private_response['data']})
            else:
                return Response({"name": PLUGIN_NAME,
                    "description": DESCRIPTION,
                    "plugin_id": PLUGIN_ID,
                    "organisation_id": "",
                    "user_id": "",
                    "group_name": "SALES",
                    "show_group": False,
                    "Public rooms":[],
                    "Joined rooms":[]})
        else:
            return Response({"name": PLUGIN_NAME,
                    "description": DESCRIPTION,
                    "plugin_id": PLUGIN_ID,
                    "organisation_id": "",
                    "user_id": "",
                    "group_name": "SALES",
                    "show_group": False,
                    "Public rooms":[],
                    "Joined rooms":[]})


def is_valid(param):
    return param != "" and param is not None


# class SidebarView(GenericAPIView):

#     def get(self, request, *args, **kwargs):
#         org_id = request.GET.get('org', None)
#         user_id = request.GET.get('user', None)

#         pub_room = get_room_info()

#         data = {

#             "message": "Plugin Sidebar Retrieved",
#             "data": {
#                 "type": "Plugin Sidebar",
#                 "name": "Music Plugin",
#                 "description": "Plays YouTube Links",
#                 "plugin_id": "61360ab5e2358b02686503ad",
#                 "organisation_id": org_id,
#                 "user_id": user_id,
#                 "group_name": "Music",
#                 "show_group": False,
#                 "public_rooms": pub_room,
#                 "joined_rooms": {},
#             },
#             "success": "true"
#         }
#         return JsonResponse(data, safe=False)    

# from django.utils import timezone
# from rest_framework import serializers


# class UserSerializer(serializers.Serializer):
    
#     user_id = serializers.CharField(max_length=50, read_only=True)
#     name = serializers.CharField(max_length=256, read_only=True)
#     avatar = serializers.CharField(max_length=256, required=False, read_only=True)
#     token = serializers.CharField(max_length=500, required=False, read_only=True)

#     def __str__(self):
#         return str(self.name)
    

# class MediaSerializer(serializers.Serializer):
    
#     media_id = serializers.CharField()
#     name = serializers.CharField()
#     url = serializers.CharField()
#     added_by = serializers.CharField()


# class CommentSerializer(serializers.Serializer):
    
#     _id = serializers.ReadOnlyField()
#     message = serializers.CharField(max_length=256)
#     time = serializers.DateTimeField(default=timezone.now, read_only=True)
#     user_id = serializers.ListField(child=serializers.CharField(max_length=128), required=False, default=[])

#     def __str__(self):
#         return str(self.message)

#     def update(self, instance, validated_data):
        
#         instance["_id"] = validated_data.get("_id", instance["_id"])
#         instance["message"] = validated_data.get("message", instance["message"])
#         instance["time"] = validated_data.get("time", instance["time"])
#         instance["user_id"] = validated_data.get("user_id", instance["user_id"])
        
#         return instance


# class RoomSerializer(serializers.Serializer):
    
#     _id = serializers.ReadOnlyField()
#     org_id = serializers.CharField(max_length=100, required=False)
#     room_name = serializers.CharField(max_length=100)   
#     description = serializers.CharField(max_length=300)
#     type_of_room = serializers.CharField(max_length=50, required=True)
#     user_id = serializers.ListField(child=serializers.CharField(max_length=128), required=False, default=[])

#     def __str__(self):
#         return str(self.room_name)


# class SongSerializer(serializers.Serializer):

#     _id = serializers.ReadOnlyField()
#     title = serializers.CharField(max_length=100, required=False)
#     duration = serializers.CharField(max_length=100)   
#     albumCover = serializers.CharField(max_length=300)
#     url = serializers.URLField(max_length=200, min_length=None, allow_blank=False)
#     # addedBy = UserSerializer(many=True, read_only=True)
#     # added_by = serializers.ListField(child=serializers.CharField(max_length=128), allow_empty=False, required=True)
#     added_by = serializers.ListField(child=serializers.CharField(max_length=128), required=False, default=[])
#     likedBy = serializers.NullBooleanField(required=False)

#     def __str__(self):
#         return str(self.title)


   
#removes a single user id from the members collection
@api_view(['GET', 'POST'])
def leave_room(request):
    plugin_id = settings.PLUGIN_ID
    organization_id = settings.ORGANIZATON_ID
    collection_name = settings.MEMBERS_COLLECTION
    
    member_data = read_data(settings.MEMBERS_COLLECTION)
    # _id = member_data["data"][0]["room_user_ids"]
    _id = member_data["room_user_ids"]

    if request.method == 'GET':
        data = read_data(collection_name)
        return Response(data)

    elif request.method == 'PUT':

        url = "https://api.zuri.chat/data/write"

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
            # Note: use only {"_id": ""} in the payload

            if r.status_code == 200:
                return Response({"message": "User left room"},
                                status=status.HTTP_200_OK)
            else:
                return Response({"error": r.json()['message']}, status=r.status_code)

        except exceptions.ConnectionError as e:
            return Response(str(e), status=status.HTTP_502_BAD_GATEWAY)


def delete_user(collection_name, organization_id, user):
  
    organization_id = settings.ORGANIZATON_ID
    collection_name = settings.MEMBERS_COLLECTION
    
    user_list = list()
    users = read_data(settings.MEMBERS_COLLECTION)
    
    if users == None or "status_code" in users:
        return users
    else:
        for user in users:
            if "room_user_ids" in user:
                if user in user.get("room_user_ids"):
                    user_list.remove(user)
                else:
                    return user_list
        return user_list


@api_view(['GET', 'POST'])
def remove_song(request):
    plugin_id = settings.PLUGIN_ID
    organization_id = settings.ORGANIZATON_ID
    collection_name = settings.SONG_COLLECTION
    
    song_data = read_data(settings.SONG_COLLECTION)
    _id = song_data["data"][0]["_id"]
    # query = song_data.objects.get(object_id=_id)

    if request.method == 'GET':
        data = read_data(collection_name)
        return Response(data)

    elif request.method == 'POST':
        
        # response = requests.post('https://api.zuri.chat/data/delete', params=query)

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
                return Response({"message": "Song deleted"},
                                status=status.HTTP_200_OK)
            else:
                return Response({"error": r.json()['message']}, status=r.status_code)

        except exceptions.ConnectionError as e:
            return Response(str(e), status=status.HTTP_502_BAD_GATEWAY)    


@api_view(['GET', 'POST'])
def remove_comments(request):
    
    plugin_id = settings.PLUGIN_ID
    organization_id = settings.ORGANIZATON_ID
    collection_name = settings.COMMENTS_COLLECTION
    
    chat_data = read_data(settings.COMMENTS_COLLECTION)
    _id = chat_data["data"][0]["_id"]

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
                return Response({"message": "Comment removed"},
                                status=status.HTTP_200_OK)
            else:
                return Response({"error": r.json()['message']}, status=r.status_code)

        except exceptions.ConnectionError as e:
            return Response(str(e), status=status.HTTP_502_BAD_GATEWAY)  


def delete_comments(request, _id):
    
    plugin_id = settings.PLUGIN_ID
    organization_id = settings.ORGANIZATON_ID
    collection_name = settings.COMMENTS_COLLECTION


    if request.method == "POST":
        url = f"https://api.zuri.chat/data/delete"

        message_payload = {
            "organization_id": organization_id,
            "plugin_id": plugin_id,
            "collection_name": collection_name,
            "bulk_delete": False,
            "object_id": _id,
            "filter": {},
        }
        try:
            response = requests.request(url=url, json=message_payload)
            if response.status_code == 200:
                return Response({"message": "message successfully deleted"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": response.json()['message']}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(str(e), status=status.HTTP_502_BAD_GATEWAY)


class UserView(APIView):

    def get(self, request):
        data = read_data(settings.MEMBERS_COLLECTION)
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            payload = serializer.data

            data = write_data(settings.MEMBERS_COLLECTION, payload=payload)

            updated_data = read_data(settings.MEMBERS_COLLECTION)

            # centrifugo_post("zuri-plugin-music", {"event": "added_chat", "data": updated_data})

            return Response(data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




def r_comments(collection_name, organization_id, user):
  
    organization_id = settings.ORGANIZATON_ID
    collection_name = settings.COMMENTS_COLLECTION
    
    chat_list = list()
    users = read_data(settings.MEMBERS_COLLECTION)
    
    if users == None or "status_code" in users:
        return users
    else:
        for user in users:
            if "room_user_ids" in user:
                if user in user.get("room_user_ids"):
                    chat_list.remove(user)
                else:
                    return chat_list
        return chat_list




# def user_rooms(collection_name, organization_id, user):
    
#     room_list = list()
#     rooms = read_data(collection_name, {"organization_id": organization_id})
#     if rooms == None or "status_code" in rooms:
#         return rooms
#     else:
#         for room in rooms:
#             if "room_user_ids" in room:
#                 if user in room.get("room_user_ids"):
#                     room_list.append(room)
#                 else:
#                     return room_list
#         return room_list


# get rooms for a particular user
# def get_rooms(user_id):
        
#     response = DB.read("dm_rooms")
#     data =  []
#     if response != None:
#         if "status_code" in response:
#             return response
#         for room in response:
#             try:
#                 users_room_list = room['room_user_ids']
#                 if user_id in users_room_list:
#                     data.append(room)
#             except Exception:
#                 pass
#         if len(data) == 0:
#             data = []
#             return data
#         return data
    
#     return response


# @db_init_with_credentials
# def create_room(request):
#     """
#     This function is used to create a room between 2 users.
#     It takes the id of the users involved, sends a write request to the database .
#     Then returns the room id when a room is successfully created
#     """

#     # validate request
#     #   if 'Authorization' in request.headers:
#     #       token = request.headers['Authorization']
#     #   else:
#     #       token = request.headers['Cookie']

#     #   verify = verify_user(token)
#     #   if verify.get("status") == 200:

#     serializer = RoomSerializer(data=request.data)
#     if serializer.is_valid():
#         user_ids = serializer.data["room_user_ids"]
#         user_rooms = get_rooms(user_ids[0])
#         for room in user_rooms:
#             room_users = room["room_user_ids"]
#             if set(room_users) == set(user_ids):
#                 response_output = {"room_id": room["_id"]}
#                 return Response(data=response_output, status=status.HTTP_200_OK)
#     response = DB.write("dm_rooms", data=serializer.data)
#     data = response.get("data").get("object_id")
#     if response.get("status") == 200:
#         response_output = {"room_id": data}
#         return Response(data=response_output, status=status.HTTP_201_CREATED)
#     return Response(status=status.HTTP_400_BAD_REQUEST)

