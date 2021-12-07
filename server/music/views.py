import json
import re

import requests
from django.conf import settings
from django.core.paginator import Paginator
from django.http import Http404, JsonResponse
from drf_spectacular.utils import extend_schema
from music.pagination import SearchPagination
from music.serializers import (AddToRoomSerializer, CommentSerializer,
                               DeleteChatSerializer, DeleteSongSerializer,
                               LikeSongSerializer, RemoveUserSerializer,
                               RoomSerializer, SongLikeCountSerializer,
                               SongSerializer)
from music.utils.data_access import (centrifugo_publish, delete_data,
                                     get_org_members, get_room_info, get_video,
                                     read_data, room_image, write_data)
from music.utils.dataStorage import DataStorage
from music.utils.request_client import RequestClient
from requests import exceptions, status_codes
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView


class change_room_image(APIView):
    permission_classes = [AllowAny]

    @extend_schema(
        description="change_room_image",
        responses={
            200: "Success",
            400: "Error",
        },
        methods=["GET", "POST"],
    )
    def get(self, request, *args, **kwargs):
        return Response(
            {
                "message": "This endpoint is for editing the music room icon in the sidebar "
            },
            status=status.HTTP_200_OK,
        )

    def post(self, request, *args, **kwargs):
        data = request.data

        if data["albumCover"] == "":
            room_image[0] = "https://svgshare.com/i/aXm.svg"
        else:
            room_image[0] = data["albumCover"]
        return Response(
            {"room_image": room_image, "curent-song": data}, status=status.HTTP_200_OK
        )


class SidebarView(GenericAPIView):
    permission_classes = [AllowAny]

    @extend_schema(
        description="Sidebar information",
        responses={
            200: "Success",
            204: "No content",
            401: "Unatthorized",
            424: "Failed",
        },
        methods=["GET"],
    )
    def get(self, request, *args, **kwargs):

        org_id = request.GET.get("org", None)
        user_id = request.GET.get("user", None)
        room_id = settings.ROOM_ID
        pub_room = get_room_info(room_id)
        sidebar = {
            "name": "Music Plugin",
            "description": "This is a virtual lounge where people can add, watch and listen to YouTube videos or music",
            "group_name": [],
            "category": "entertainment",
            "plugin_id": "music.zuri.chat",
            "organisation_id": "",
            "room_id": "",
            "user_id": "",
            "show_group": False,
            "button_url": "/music",
            "public_rooms": [],
            "joined_rooms": [],
            "starred_rooms": [],
        }
        if org_id and user_id:
            org_members = get_org_members(org_id)
            if org_members["status"] == 200:
                org_members = org_members["data"]
                for member in org_members:
                    if member["_id"] == user_id:
                        sidebar_data = sidebar
                        sidebar_data["organisation_id"] = org_id
                        sidebar_data["room_id"] = room_id
                        sidebar_data["user_id"] = user_id
                        sidebar_data["public_rooms"] = pub_room
                        sidebar_data["joined_rooms"] = pub_room
                        sidebar_update_payload = {
                            "event": "sidebar_update",
                            "plugin_id": "music.zuri.chat",
                            "data": sidebar_data,
                        }
                        return Response(
                            sidebar_update_payload, status=status.HTTP_200_OK
                        )
                return Response(sidebar, status=status.HTTP_401_UNAUTHORIZED)
            return Response(sidebar, status=status.HTTP_424_FAILED_DEPENDENCY)
        return Response(sidebar, status=status.HTTP_204_NO_CONTENT)

    def is_valid(param):
        return param != "" and param is not None


class PluginInfoView(GenericAPIView):
    permission_classes = [AllowAny]

    @extend_schema(
        description="Plugin Information",
        responses={200: "Success"},
        methods=["GET"],
    )
    def get(self, request, *args, **kwargs):
        data = {
            "message": "Plugin Information Retrieved",
            "data": {
                "type": "Plugin Information",
                "plugin_info": {
                    "name": "Music room",
                    "description": [
                        "This is a plugin that allows individuals in an organization to add music and "
                        "video links from YouTube to a  shared playlist. Users also have the option to "
                        "chat with other users in the music room and the option to like a song or video "
                        "that is in the music room library."
                    ],
                },
                "version": "v1",
                "scaffold_structure": "Monolith",
                "team": "HNG 8.0/Team Music Plugin",
                "developer_name": "Music Plugin",
                "developer_email": "musicplugin@zurichat.com",
                "icon_url": "https://svgshare.com/i/aXm.svg",
                "photos": "https://svgshare.com/i/aXm.svg",
                "homepage_url": "https://zuri.chat/music",
                "sidebar_url": "https://zuri.chat/api/v1/sidebar",
                "install_url": "https://zuri.chat/music",
                "ping_url": "http://zuri.chat/music/api/v1/ping",
            },
            "success": "true",
        }
        return JsonResponse(data, safe=False)


class PluginPingView(GenericAPIView):
    permission_classes = [AllowAny]

    @extend_schema(
        description="Plugin Ping",
        responses={
            200: "Success",
            424: "Failed",
        },
        methods=["GET"],
    )
    def get(self, request, *args, **kwargs):

        url = "https://music.zuri.chat/music"
        try:
            response = requests.get(url, headers={"Content-Type": "application/json"})
            if response.status_code == 200:
                server = [
                    {
                        "status": "Success",
                        "Report": ["The music.zuri.chat server is working"],
                    }
                ]
                return Response({"server": server}, status=status.HTTP_200_OK)
        except requests.exceptions.RequestException as error:
            print(error)
            server = [
                {
                    "status": "Failed",
                    "Report": ["The music.zuri.chat server is not working"],
                }
            ]
            return Response(
                {"server": server}, status=status.HTTP_424_FAILED_DEPENDENCY
            )


# # song views
class SongView(APIView):
    @extend_schema(
        request=SongSerializer,
        responses={200: SongSerializer},
        description="Add and view songs. Note: song endpoint only expects url, userId in the payload",
        methods=["GET", "POST"],
    )
    def get(self, request, *args, **kwargs):

        """
        This endpoint is used to view songs in the music room.

        """
        serializer = SongSerializer(data=request.data)
        if serializer.is_valid():
            data = read_data(settings.SONG_COLLECTION)
            if data["status"] == 200:
                return Response(data, status=status.HTTP_200_OK)
            return Response(
                data={"no songs in collection"}, status=status.HTTP_204_NO_CONTENT
            )
        return Response(data={"Bad request"}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):

        """
        This endpoint is used to add a song to the music room.

        Sample payload:

        {
            "addedBy": "Pauline",
            "collection_name": "songs",
            "plugin_id": "616991e5ef1c19335a2869f4",
            "room_id": "61a4c1cd4f88198ec49dd636",
            "organization_id": "619ba4671a5f54782939d384",
            "url": "https://www.youtube.com/watch?v=zYBdfidjEdI",
            "time": "1638734479941",
            "userId": "619bab3b1a5f54782939d400"

        }

        """
        serializer = SongSerializer(data=request.data)

        media_info = get_video(request.data["url"])
        userId_info = request.data["userId"]
        addedBy_info = request.data["addedBy"]
        time_info = request.data["time"]
        org_id = request.data["organization_id"]
        plgn_id = settings.PLUGIN_ID
        coll_name = settings.SONG_COLLECTION
        room_id = request.data["room_id"]

        if serializer.is_valid():

            payload = {
                "title": media_info["title"],
                "duration": media_info["duration"],
                "albumCover": media_info["thumbnail_url"],
                "url": media_info["track_url"],
                "userId": userId_info,
                "addedBy": addedBy_info,
                "likedBy": [],
                "time": time_info,
                "plugin_id": plgn_id,
                "organization_id": org_id,
                "collection_name": coll_name,
                "room_id": room_id,
            }

            data = write_data(settings.SONG_COLLECTION, payload=payload)

            if data["status"] == 200:

                new_object = read_data(settings.SONG_COLLECTION)
                song_data = new_object["data"][-1]

                response_output = {
                    "event": "New Song",
                    "message": data.get("message"),
                    "data": {
                        "action": "comment added successfully",
                        "Song added": song_data,
                    },
                }
                centrifugo_response = centrifugo_publish(
                    room=settings.ROOM_ID, event="New song added", data=response_output
                )
                if centrifugo_response.get("status_code", None) == 200:
                    return Response(response_output, status=status.HTTP_200_OK)
                return Response(
                    "Song updated but Centrifugo is not available",
                    status=status.HTTP_424_FAILED_DEPENDENCY,
                )
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
        return Response(data={"Bad request"}, status=status.HTTP_400_BAD_REQUEST)


class songLikeCountView(APIView):
    serializer_class = SongLikeCountSerializer

    @extend_schema(
        request=SongLikeCountSerializer,
        responses={200: SongLikeCountSerializer, 400: "Bad Request"},
        description="endpoint for song likes/unlikes count. When a user likes a song, the informmation is saved to the database and the like count increases. If the same user likes the same song, the song is unliked and the counter reduces",
        methods=["POST"],
    )
    def post(self, request, org_id, *args, **kwargs):

        """
        This endpoint persists the information about users who like or unlike a song and the total number of likes a song has. When a user likes a song, the informmation is saved to the database and the like count increases. If the same user likes the same song, the song is unliked and the counter reduces",

        Sample request body

        {
            "userId": "juztiz5000kdkdkdkdkdkdkd",
            "songId": "61ae1e7b5a3812d0a9d0b213"
        }

        """
        helper = DataStorage()
        # org_id = settings.ORGANIZATON_ID
        helper.organization_id = org_id
        serializer = SongLikeCountSerializer(data=request.data)
        if serializer.is_valid():
            songId = request.data["songId"]
            userId = request.data["userId"]

            songs = read_data(settings.SONG_COLLECTION, object_id=songId)
            likedBy = songs["data"]["likedBy"]

            if userId in likedBy:
                likedBy.remove(userId)
                unlike_count = len(likedBy)
                helper.update("songs", songId, {"likedBy": likedBy})

                return Response(
                    {
                        "unlikedBy": userId,
                        "songId": songId,
                        "total_likes": unlike_count,
                    },
                    status=status.HTTP_200_OK,
                )

            likedBy.append(userId)
            like_count = len(likedBy)
            helper.update("songs", songId, {"likedBy": likedBy})

            return Response(
                {
                    "likedBy": userId,
                    "songId": songId,
                    "total_likes": like_count,
                },
                status=status.HTTP_200_OK,
            )
        return Response(data={"Bad request"}, status=status.HTTP_400_BAD_REQUEST)


class DeleteSongView(APIView):
    @extend_schema(
        request=DeleteSongSerializer,
        responses={200: SongSerializer},
        description="delete songs",
        methods=["POST"],
    )
    def post(self, request, *args, **kwargs):

        """
        This endpoint is used to delete a song.

        Sample request body

        {
            "_id": "61ae33d95a3812d0a9d0b217"
        }

        """
        serializer = DeleteSongSerializer(data=request.data)
        if serializer.is_valid():
            song_id = request.data["_id"]
            song_data = read_data(settings.SONG_COLLECTION, object_id=song_id)
            if song_data and song_data["status"] == 200:
                if song_data["data"]["_id"] == song_id:
                    try:
                        response = delete_data(
                            settings.SONG_COLLECTION, object_id=song_id
                        )
                        if response["status"] == 200:

                            centrifugo_response = centrifugo_publish(
                                room=settings.ROOM_ID,
                                event="Song deleted",
                                data=response,
                            )
                            if centrifugo_response.get("status_code", None) == 200:
                                return Response(
                                    response, status=status.HTTP_202_ACCEPTED
                                )
                            return Response(
                                "Song deleted but Centrifugo is not available",
                                status=status.HTTP_424_FAILED_DEPENDENCY,
                            )
                        return Response(
                            data={"song not deleted"},
                            status=status.HTTP_400_BAD_REQUEST,
                        )
                    except Exception as error:
                        print(error)
                        return Response(
                            "Song deleted but Centrifugo is not available",
                            status=status.HTTP_424_FAILED_DEPENDENCY,
                        )
                return Response(
                    data={"song not found"}, status=status.HTTP_404_NOT_FOUND
                )
            return Response(
                data={"Unable to read collection"}, status=status.HTTP_400_BAD_REQUEST
            )
        return Response(data={"Bad request"}, status=status.HTTP_400_BAD_REQUEST)


class LikeSongView(APIView):
    @extend_schema(
        request=LikeSongSerializer,
        responses={200: LikeSongSerializer},
        description="When a user likes a song, the informmation is saved to the database",
        methods=["POST"],
    )
    def post(self, request, *args, **kwargs):
        helper = DataStorage()
        helper.organization_id = settings.ORGANIZATON_ID
        serializer = LikeSongSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.data
            song_id = data["song_id"]
            member_ids = data["memberId"]
            song_data = helper.read("songs", {"_id": song_id})
            if song_data and song_data.get("status_code", None) is None:
                users_id = song_data.get("likedBy")
                if member_ids not in users_id:
                    users_id.append(member_ids)
                if users_id:
                    response = helper.update("songs", song_id, {"likedBy": users_id})
                    if response.get("status") == 200:
                        response_output = {
                            "event": "like_song",
                            "message": response.get("message"),
                            "data": {
                                "song_id": data["song_id"],
                                "liked by": member_ids,
                                "action": "song liked successfully",
                            },
                        }
                        centrifugo_response = centrifugo_publish(
                            room=settings.ROOM_ID,
                            event="Song liked",
                            data=response_output,
                        )
                        if centrifugo_response.get("status_code", None) == 200:
                            return Response(
                                response_output, status=status.HTTP_201_CREATED
                            )
                        return Response(
                            "Song liked but Centrifugo is not available",
                            status=status.HTTP_424_FAILED_DEPENDENCY,
                        )
                    return Response(
                        "Song not liked", status=status.HTTP_424_FAILED_DEPENDENCY
                    )
                return Response("Song already liked", status=status.HTTP_302_FOUND)
            return Response(
                "Data not available on ZC core",
                status=status.HTTP_424_FAILED_DEPENDENCY,
            )
        return Response(data={"Bad request"}, status=status.HTTP_400_BAD_REQUEST)


class SongSearchView(APIView):
    serializer_class = SongSerializer

    @extend_schema(
        request=SongSerializer,
        responses={200: SongSerializer},
        description="search songs",
        methods=["GET"],
    )
    def get(self, request, *args, **kwargs):

        collection_name = settings.SONG_COLLECTION

        key = request.query_params.get("q") or []
        filters = request.query_params.getlist("filter", [])
        paginate_by = request.query_params.get("limit", 20)
        paginator = SearchPagination()
        paginator.page_size = paginate_by

        key_word = key
        if key_word:
            key_word = re.split("[;,-]+", key_word)

        songs = read_data(collection_name)["data"]
        search_result = []

        try:
            for word in key_word:
                word = word.lower()
                for song in songs:
                    title = str(song["title"]).lower()
                    if word in title and song not in search_result:
                        search_result.append(song)

            for item in search_result:
                item["images_url"] = [item["albumCover"]]
                item["created_at"] = item["time"]
                item["created_by"] = item["addedBy"]
                item["content"] = item["title"]
                item["destination_url"] = f"/music/{collection_name}/{item['_id']}"
                for field in [
                    "duration",
                    "likedBy",
                    "time",
                    "addedBy",
                    "albumCover",
                    "userId",
                    "url",
                ]:
                    item.pop(field)

            result = paginator.paginate_queryset(search_result, request)
            # print(result)
            return paginator.get_paginated_response(
                result, key, filters, request, entity_type="others"
            )

        except Exception as e:
            print(e)
            result = paginator.paginate_queryset([], request)
            return paginator.get_paginated_response(
                result, key, filters, request, entity_type="others"
            )


class SongSearchSuggestions(APIView):
    serializer_class = SongSerializer

    @extend_schema(
        request=SongSerializer,
        responses={200: SongSerializer},
        description="Song search Suggestions",
        methods=["GET"],
    )
    def get(self, request, *args, **kwargs):
        songs = read_data(settings.SONG_COLLECTION)["data"]
        data = {}
        try:
            for song in songs:
                data[song["title"]] = song["title"]

            return Response(
                {
                    "status": "ok",
                    "type": "suggestions",
                    "total_count": len(data),
                    "data": data,
                },
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            print(e)
            return Response(
                {
                    "status": "ok",
                    "type": "suggestions",
                    "total_count": len(data),
                    "data": data,
                },
                status=status.HTTP_200_OK,
            )


# comment views
class CommentView(APIView):
    @extend_schema(
        request=CommentSerializer,
        responses={200: CommentSerializer},
        description="view and add comments",
        methods=["GET", "POST"],
    )
    def get(self, request, *args, **kwargs):

        """
        This function is used to view all comments in the music room.

        """
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():

            data = read_data(settings.COMMENTS_COLLECTION)
            if data["status"] == 200:
                return Response(data, status=status.HTTP_200_OK)
            return Response(
                data={"message": "cannot read collection"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(data={"Bad request"}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):

        """
        This function is used to add comments in the music room. All parameters are optional.

        Sample request body

        {
            "plugin_id" : "616991e5ef1c19335a2869f4",
            "organization_id" : "619ba4671a5f54782939d384",
            "collection_name" : "chats",
            "room_id" : "61a4c1cd4f88198ec49dd636",
            "username" : "Pauline",
            "userId" : "619bab3b1a5f54782939d400",
            "imageUrl" : "https://i.ytimg.com/vi/ffcitRgiNDs/maxresdefault.jpg",
            "time" : 1638734338282,
            "richUiData" : {
                "blocks" : [{
                    "data" : {},
                    "depth" : 7,
                    "entityRanges" : [],
                    "inlineStyleRanges" : [],
                    "key" : "music",
                    "text" :  "Testing chat endpoint",
                    "type" : "unstyled"
                    }],
                "entityMap" : {}
                        },
            "emojies" : [{
                "name" : "techie",
                "emoji" : "computer",
                "count" : 1
                }]
        }

        """
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            payload = serializer.data
            data = write_data(
                settings.COMMENTS_COLLECTION, payload=payload, method="POST"
            )
            if data["status"] == 200:
                new_object = read_data(settings.COMMENTS_COLLECTION)
                chat_data = new_object["data"][-1]
                response_output = {
                    "event": "New Comment",
                    "message": data.get("message"),
                    "data": {
                        "action": "comment added successfully",
                        "data created": chat_data,
                    },
                }
                centrifugo_response = centrifugo_publish(
                    room=settings.ROOM_ID, event="New comment", data=response_output
                )
                if centrifugo_response.get("status_code", None) == 200:
                    return Response(response_output, status=status.HTTP_200_OK)
                return Response(
                    data={"message": "Comment added but Centrifugo is not available"},
                    status=status.HTTP_424_FAILED_DEPENDENCY,
                )
            return Response(
                data={"message": "comment not created"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(data={"Bad request"}, status=status.HTTP_400_BAD_REQUEST)


class DeleteCommentView(APIView):
    @extend_schema(
        request=DeleteChatSerializer,
        responses={200: "success"},
        description="delete comments",
        methods=["POST"],
    )
    def post(self, request, *args, **kwargs):

        """
        This endpoint is used to delete a comment.

        Sample request body

        {
            "_id": "61ae33d95a3812d0a9d0b217"
        }

        """
        serializer = DeleteChatSerializer(data=request.data)
        if serializer.is_valid():
            chat_id = request.data["_id"]
            chat_data = read_data(settings.COMMENTS_COLLECTION, object_id=chat_id)

            if chat_data and chat_data["status"] == 200:
                if chat_data["data"]["_id"] == chat_id:
                    try:
                        response = delete_data(
                            settings.COMMENTS_COLLECTION, object_id=chat_id
                        )
                        if response["status"] == 200:

                            centrifugo_response = centrifugo_publish(
                                room=settings.ROOM_ID,
                                event="Delete Comment",
                                data=response,
                            )
                            if centrifugo_response.get("status_code", None) == 200:
                                return Response(
                                    response, status=status.HTTP_202_ACCEPTED
                                )
                            return Response(
                                "Comment deleted but Centrifugo is not available",
                                status=status.HTTP_424_FAILED_DEPENDENCY,
                            )
                        return Response(
                            data={"Comment not deleted"},
                            status=status.HTTP_400_BAD_REQUEST,
                        )
                    except Exception as error:
                        print(error)
                        return Response(
                            "Comment deleted but Centrifugo is not available",
                            status=status.HTTP_424_FAILED_DEPENDENCY,
                        )
                return Response(
                    data={"comment not found"}, status=status.HTTP_404_NOT_FOUND
                )
            return Response(
                data={"Unable to read collection"}, status=status.HTTP_400_BAD_REQUEST
            )
        return Response(data={"Bad request"}, status=status.HTTP_400_BAD_REQUEST)


class UpdateCommentView(APIView):
    @extend_schema(
        request=CommentSerializer,
        responses={200: CommentSerializer},
        description="update comments",
        methods=["PUT"],
    )
    def put(self, request, *args, **kwargs):

        """
        This endpoint is used to update a comment. All parameters except the comment_id are optional.

        Sample request body

        {
            "_id": "61ae33d95a3812d0a9d0b217",
            "plugin_id" : "616991e5ef1c19335a2869f4",
            "organization_id" : "619ba4671a5f54782939d384",
            "collection_name" : "chats",
            "room_id" : "61a4c1cd4f88198ec49dd636",
            "username" : "Pauline",
            "userId" : "619bab3b1a5f54782939d400",
            "imageUrl" : "https://i.ytimg.com/vi/ffcitRgiNDs/maxresdefault.jpg",
            "time" : 1638734338282,
            "richUiData" : {
                "blocks" : [{
                    "data" : {},
                    "depth" : 7,
                    "entityRanges" : [],
                    "inlineStyleRanges" : [],
                    "key" : "musicroom",
                    "text" :  "editing new chat endpoint",
                    "type" : "unstyled"
                    }],
                "entityMap" : {}
                        },
            "emojies" : [{
                "name" : "HNG dev",
                "emoji" : "laptop",
                "count" : 1
                }]
        }

        """
        serializer = CommentSerializer(data=request.data)

        if serializer.is_valid():
            payload = serializer.data
            chat_id = request.data["_id"]
            chat_data = read_data(settings.COMMENTS_COLLECTION, object_id=chat_id)

            if chat_data and chat_data["status"] == 200:
                if chat_data["data"]["_id"] == chat_id:
                    data = write_data(
                        settings.COMMENTS_COLLECTION,
                        object_id=chat_id,
                        payload=payload,
                        method="PUT",
                    )
                    if data["status"] == 200:
                        updated_object = read_data(settings.COMMENTS_COLLECTION)
                        updated_data = updated_object["data"][-1]
                        response_output = {
                            "event": "Comment Update",
                            "message": data.get("message"),
                            "data": {
                                "action": "comment updated successfully",
                                "update": updated_data,
                            },
                        }
                        centrifugo_response = centrifugo_publish(
                            room=settings.ROOM_ID,
                            event="Comment Update",
                            data=response_output,
                        )
                        if centrifugo_response.get("status_code", None) == 200:
                            return Response(response_output, status=status.HTTP_200_OK)
                        return Response(
                            "Comment updated but Centrifugo is not available",
                            status=status.HTTP_424_FAILED_DEPENDENCY,
                        )
                    return Response(
                        data={"message": "comment not updated"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                return Response(
                    data={"Invalid comment id"}, status=status.HTTP_404_NOT_FOUND
                )
            return Response(
                data={"Unable to read collection"}, status=status.HTTP_400_BAD_REQUEST
            )
        return Response(data={"Bad request"}, status=status.HTTP_400_BAD_REQUEST)


# room views
class RoomView(APIView):
    @extend_schema(
        request=RoomSerializer,
        responses={200: RoomSerializer},
        description="view rooms in the collection",
        methods=["GET"],
    )
    def get(self, request, *args, **kwargs):
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid():
            data = read_data(settings.ROOM_COLLECTION)
            if data["status"] == 200:
                return Response(data, status=status.HTTP_200_OK)
            return Response(
                data={"no rooms in collection"}, status=status.HTTP_404_NOT_FOUND
            )
        return Response(data={"Bad request"}, status=status.HTTP_400_BAD_REQUEST)


class RoomDetailView(APIView):
    @extend_schema(
        request=RoomSerializer,
        responses={200: RoomSerializer},
        description="view information about a specific room in the collection. Pass the roomid (_id) in the url",
        methods=["GET"],
    )
    def get(self, request, *args, **kwargs):
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid():
            pk = kwargs["_id"]
            data = read_data(settings.ROOM_COLLECTION, object_id=pk)
            if data["status"] == 200:
                return Response(data, status=status.HTTP_200_OK)
            return Response(
                data={"message": "room not found"}, status=status.HTTP_404_NOT_FOUND
            )
        return Response(data={"Bad request"}, status=status.HTTP_400_BAD_REQUEST)


class DeleteRoomView(APIView):
    @extend_schema(
        request=RoomSerializer,
        responses={200: RoomSerializer},
        description="delete a specific room from the collection",
        methods=["DELETE"],
    )
    def delete(self, request, *args, **kwargs):
        org_id = kwargs.get("org_id")
        room_id = kwargs.get("_id")
        collection = settings.ROOM_COLLECTION
        filter_data = {"organization_id": org_id}

        try:
            room = read_data(collection, object_id=room_id, filter_data=filter_data)
        except requests.exceptions.RequestException as e:
            print(e)
            return None

        if room:
            if room["status"] == 200:
                if room["data"]["_id"] == room_id:
                    response = delete_data(collection, object_id=room_id)
                    if response["status"] == 200:
                        return Response(data=response, status=status.HTTP_200_OK)
                    return Response(
                        data={"room not deleted"},
                        status=status.HTTP_424_FAILED_DEPENDENCY,
                    )
                return Response(data={"invalid room"}, status=status.HTTP_404_NOT_FOUND)
            return Response(
                data={room["message"]: "room not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        return Response(data={"invalid room_id"}, status=status.HTTP_404_NOT_FOUND)


class CreateRoom(APIView):
    serializer_class = RoomSerializer

    @extend_schema(
        request=RoomSerializer,
        responses={200: RoomSerializer},
        description="create a new room",
        methods=["GET", "POST"],
    )
    def get(self, request, *args, **kwargs):
        data = read_data(settings.ROOM_COLLECTION)
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):

        """
        This endpoint is used to create a new room

        Sample request body

        {
            "plugin_id": "61ae33d95a3812d0a9d0b217"
            "organization_id": "61ae33d95a3812d0a9d0b217"
            "collection_name": "room"
            "plugin_name": "Youtube music plugin"
            "room_name": "Music"
            "description": "New default music room"
            "created_by": "61ae33d95a3812d0a9d0b217"
            "is_private": False
            "is_archived": False
            "memberId": "61ae33d95a3812d0a9d0b217"
        }

        """
        org_id = request.data.get("org_id")
        memberId = request.data.get("memberId")
        collection = request.data.get("collection")
        room_name = request.data.get("room_name")
        description = request.data.get("description")
        plugin_name = request.data.get("plugin_name")
        plugin_id = request.data.get("plugin_id")

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():

            rooms = serializer.data

            rooms["org_id"] = org_id
            rooms["plugin_id"] = plugin_id

            data = write_data(settings.ROOM_COLLECTION, payload=rooms)
            if data and data.get("status_code", None) is None:

                room_url = (
                    f"https://api.zuri.chat/data/read/{plugin_id}/{collection}/{org_id}"
                )

                new_room = requests.request("GET", url=room_url)

                if new_room.status_code == 200:

                    data = {
                        "plugin_id": plugin_id,
                        "organization_id": org_id,
                        "collection_name": collection,
                        "bulk_write": False,
                        "payload": {
                            "room_name": room_name,
                            "plugin_name": plugin_name,
                            "description": description,
                            "created_by": memberId,
                            "is_private": False,
                            "is_archived": False,
                            "memberId": [memberId],
                        },
                    }

                    post_url = "https://api.zuri.chat/data/write"

                    new_room = requests.request(
                        "POST", url=post_url, data=json.dumps(data)
                    )

                    if new_room.status_code in [201, 200]:
                        return Response(data=data, status=status.HTTP_200_OK)

                    return Response(
                        data={"message": "room created"}, status=status.HTTP_200_OK
                    )
                return Response(
                    data={"message": "failed"}, status=status.HTTP_424_FAILED_DEPENDENCY
                )
            return Response(
                data={"Unable to write to collection"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(data={"Bad request"}, status=status.HTTP_400_BAD_REQUEST)


# user views
class UserCountView(APIView):
    @extend_schema(
        request=RoomSerializer,
        responses={200: RoomSerializer},
        description="get total count of users in the room",
        methods=["GET"],
    )
    def get(self, request, *args, **kwargs):

        serializer = RoomSerializer(data=request.data)
        room_id = kwargs.get("_id")
        if serializer.is_valid():
            room_data = read_data(settings.ROOM_COLLECTION, object_id=room_id)
            if room_data["status"] == 200:
                room_users = room_data["data"]["memberId"]
                if room_users:
                    user_count = len(room_users)
                    centrifugo_response = centrifugo_publish(
                        room=settings.ROOM_ID, event="user_count", data=user_count
                    )
                    if centrifugo_response.get("status_code", None) == 200:
                        return Response(user_count, status=status.status.HTTP_200_OK)
                    return Response(
                        "Centrifugo is not available",
                        status=status.HTTP_424_FAILED_DEPENDENCY,
                    )
                return Response(
                    data={"message": "no users in this room"}, status=status.HTTP_200_OK
                )
            return Response(
                data={"message": "room not found"}, status=status.HTTP_404_NOT_FOUND
            )
        return Response(data={"Bad request"}, status=status.HTTP_400_BAD_REQUEST)


class DeleteRoomUserView(APIView):
    @extend_schema(
        request=RemoveUserSerializer,
        responses={200: RemoveUserSerializer},
        description="view and remove users from the room list. Note: pass {'room_id':'xxxx', 'org_id': 'xxxx', 'memberId':'xxxx'} as the request parameters to remove a user",
        methods=["PUT"],
    )
    def remove_user(self, request, *args, **kwargs):

        room_data = read_data(settings.ROOM_COLLECTION)
        room_users = room_data["data"][0]["memberId"]
        room_id = room_data["data"][0]["_id"]
        user = request.data["memberId"]

        for x in room_users:
            if x == user:
                room_users.remove(x)
        return room_id, room_users

    def put(self, request, *args, **kwargs):

        """
        This endpoint is used to remove a user from the room.

        Sample request body

        {
            "room_id": "61a4c1cd4f88198ec49dd636",
            "org_id" : "619ba4671a5f54782939d384",
            "memberId":"619baa6a1a5f54782939d38e"
        }
        """

        room_id, updated_room = self.remove_user(request)
        user = request.data["memberId"]
        org_id = request.data["org_id"]
        payload = {"memberId": updated_room}

        data = write_data(
            settings.ROOM_COLLECTION, object_id=room_id, payload=payload, method="PUT"
        )
        if data["status"] == 200:
            sidebar_data = {
                "name": "Music Plugin",
                "description": "User joins the music room",
                "group_name": [],
                "category": "Entertainment",
                "show_group": False,
                "button_url": "/music",
                "public_rooms": [],
                "starred_rooms": [],
                "joined_rooms": [],
            }

            response_output = {
                "event": "remove_user_from_room",
                "message": "success",
                "data": {
                    "memberId": user,
                    "action": "user removed successfully",
                },
            }

            channel = f"{org_id}_{user}_sidebar"
            centrifugo_data = centrifugo_publish(
                room=channel, event="sidebar_update", data=sidebar_data
            )
            if centrifugo_data.get("status_code", None) == 200:
                return Response(data=response_output, status=status.HTTP_201_CREATED)
            return Response(
                data="User removed but centrifugo not available",
                status=status.HTTP_424_FAILED_DEPENDENCY,
            )
        return Response("User not removed", status=status.HTTP_400_BAD_REQUEST)


class RoomUserList(APIView):
    @extend_schema(
        request=RoomSerializer,
        responses={200: RoomSerializer},
        description="retrieve the list of users in a specific room. You need to pass the room_id (_id) in the url",
        methods=["GET"],
    )
    def get(self, request, *args, **kwargs):

        serializer = RoomSerializer(data=request.data)
        room_id = kwargs.get("_id")

        if serializer.is_valid():
            room_data = read_data(settings.ROOM_COLLECTION, object_id=room_id)
            if room_data["status"] == 200:
                room_users = room_data["data"]["memberId"]
                if room_users:
                    return Response(
                        data={"room_users": room_users}, status=status.HTTP_200_OK
                    )
                return Response(
                    data={"message": "no users in this room"}, status=status.HTTP_200_OK
                )

            return Response(
                data={"message": "room not found"}, status=status.HTTP_404_NOT_FOUND
            )
        return Response(data={"Bad request"}, status=status.HTTP_400_BAD_REQUEST)


class AddUserToRoomView(APIView):
    @extend_schema(
        request=AddToRoomSerializer,
        responses={200: AddToRoomSerializer},
        description="add new user to a room. # Note: this endpoint requires 'room_id':'xxx' and 'memberId':['xxx'] to add a user to the room",
        methods=["POST"],
    )
    def post(self, request, org_id, room_id):

        """
        This endpoint is used to add a user to the room.

        Sample request body

        {
            "room_id": "61a4c1cd4f88198ec49dd636",
            "memberId":["619baa6a1a5f54782939d38e"]
        }
        """

        helper = DataStorage()
        helper.organization_id = org_id
        serializer = AddToRoomSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.data
            room_id = data["room_id"]
            member_ids = data["memberId"]
            music_room = helper.read("musicroom", {"_id": room_id})
            if music_room and music_room.get("status_code", None) is None:
                users_id = music_room.get("memberId")
                new_members = list(set(member_ids).difference(set(users_id)))
                list(map(lambda x: users_id.append(x), new_members))
                if new_members:
                    response = helper.update(
                        "musicroom", room_id, {"memberId": users_id}
                    )
                    if response.get("status") == 200:
                        response_output = {
                            "event": "add_users_to_room",
                            "message": response.get("message"),
                            "data": {
                                "room_id": data["room_id"],
                                "new_member_ids": new_members,
                                "action": "user/users added successfully",
                            },
                        }
                        try:
                            for new_member_id in new_members:
                                music_data = {
                                    "room_image": "https://svgshare.com/i/aXm.svg",
                                    "room_url": f"/music/{room_id}",
                                }

                                sidebar_data = {
                                    "name": "Music Plugin",
                                    "description": "User joins the music room",
                                    "group_name": "Music",
                                    "category": "Entertainment",
                                    "show_group": True,
                                    "button_url": "/music",
                                    "public_rooms": [music_data],
                                    "joined_rooms": [music_data],
                                }

                                channel = f"{org_id}_{new_member_id}_sidebar"
                                centrifugo_data = centrifugo_publish(
                                    room=channel,
                                    event="sidebar_update",
                                    data=sidebar_data,
                                )

                            if (
                                centrifugo_data
                                and centrifugo_data.get("status_code") == 200
                            ):
                                return Response(
                                    data=response_output, status=status.HTTP_201_CREATED
                                )

                            return Response(
                                data="User/users added but centrifugo not available",
                                status=status.HTTP_424_FAILED_DEPENDENCY,
                            )
                        except Exception:
                            return Response(
                                data="centrifugo server not available",
                                status=status.HTTP_424_FAILED_DEPENDENCY,
                            )
                    return Response(
                        "User/users not added", status=status.HTTP_424_FAILED_DEPENDENCY
                    )
                return Response(
                    "Member/members already in room", status=status.HTTP_302_FOUND
                )
            return Response(
                "Data not available on ZC core",
                status=status.HTTP_424_FAILED_DEPENDENCY,
            )
        return Response(data={"Bad request"}, status=status.HTTP_400_BAD_REQUEST)


# plugin marketplace
class InstallView(APIView):
    @extend_schema(
        responses={200},
        description="install a plugin",
        methods=["POST"],
    )
    def post(self, request):
        plugin_id = settings.PLUGIN_ID
        user_id = request.data["user_id"]
        org_id = request.data["organisation_id"]
        token = request.headers["Authorization"]
        print(token)
        payload = {
            "plugin_id": plugin_id,
            "user_id": user_id,
            "organisation_id": org_id,
        }
        request_client = RequestClient()

        response = request_client.request(
            method="POST",
            url=f"https://api.zuri.chat/organizations/{org_id}/plugins",
            headers={"Authorization": token, "Content-Type": "application/json"},
            post_data=payload,
        )

        installed = response.response_data
        print(installed)
        if installed["status"] == 200:
            data = {
                "message": "Plugin successfully installed!",
                "success": True,
                "data": {"redirect_url": "/music"},
            }
            return Response(data=data, status=status.HTTP_201_CREATED)

        elif installed["status"] == 400:
            data = {
                "message": "Plugin has already been installed!",
                "success": False,
                "data": None,
            }
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)

        else:
            data = {
                "message": "There is an Error with this installation! Please contact Admin",
                "success": False,
                "data": None,
            }
            return Response(data=data, status=status.HTTP_424_FAILED_DEPENDENCY)


class UninstallView(APIView):
    @extend_schema(
        responses={200},
        description="uninstall a plugin",
        methods=["DELETE"],
    )
    def delete(self, request):
        plugin_id = settings.PLUGIN_ID
        user_id = request.data["user_id"]
        org_id = request.data["organisation_id"]
        token = request.headers["Authorization"]
        print(token)
        payload = {
            "plugin_id": plugin_id,
            "user_id": user_id,
            "organisation_id": org_id,
        }
        request_client = RequestClient()

        response = request_client.request(
            method="DELETE",
            url=f"https://api.zuri.chat/organizations/{org_id}/plugins/{plugin_id}",
            headers={"Authorization": token, "Content-Type": "application/json"},
            post_data=payload,
        )

        uninstalled = response.response_data
        print(uninstalled)
        if uninstalled["status"] == 200:
            data = {
                "message": "Uninstalled successfully!",
                "success": True,
                "data": None,
            }
            return Response(data=data, status=status.HTTP_201_CREATED)

        elif uninstalled["status"] == 400:
            data = {
                "message": "Oops! plugin does not exist",
                "success": False,
                "data": None,
            }
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)

        else:
            data = {
                "message": "There is an Error with this uninstallation! Please contact Admin",
                "success": False,
                "data": None,
            }
            return Response(data=data, status=status.HTTP_424_FAILED_DEPENDENCY)
