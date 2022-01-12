import re

from django.conf import settings
from django.core.paginator import Paginator
from drf_spectacular.utils import extend_schema
from music.serializer.song import (DeleteSongSerializer, LikeSongSerializer,
                                   SongLikeCountSerializer, SongSerializer)
from music.utils.data_access import (centrifugo_publish, delete_data,
                                     get_video, read_data, room_image,
                                     write_data)
from music.utils.dataStorage import DataStorage
from music.utils.pagination import SearchPagination
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


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
            try:
                data = read_data(settings.SONG_COLLECTION)
                if data["status"] == 200:
                    return Response(data, status=status.HTTP_200_OK)
                return Response(
                    data={"no songs in collection"}, status=status.HTTP_204_NO_CONTENT
                )

            except Exception:
                return Response(
                    data="Error reading collection",
                    status=status.HTTP_424_FAILED_DEPENDENCY,
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
            try:
                data = write_data(settings.SONG_COLLECTION, payload=payload)
                if data["status"] == 200:
                    centrifugo_response = centrifugo_publish(
                        room=settings.ROOM_ID, event="New song added", data=data
                    )
                    if centrifugo_response.get("status_code", None) == 200:
                        return Response(data, status=status.HTTP_200_OK)
                    return Response(
                        "Song added but Centrifugo is not available",
                        status=status.HTTP_424_FAILED_DEPENDENCY,
                    )
                return Response(data, status=status.HTTP_400_BAD_REQUEST)
            except Exception:
                return Response(
                    data="Error writing to collection",
                    status=status.HTTP_424_FAILED_DEPENDENCY,
                )
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
            if song_data["status"] == 200:
                song_data["data"]["_id"] == song_id
                try:
                    response = delete_data(settings.SONG_COLLECTION, object_id=song_id)
                except Exception:
                    return None

                if response["status"] == 200:
                    centrifugo_response = centrifugo_publish(
                        room=settings.ROOM_ID,
                        event="Song deleted",
                        data=response,
                    )
                    if centrifugo_response.get("status_code", None) == 200:
                        return Response(response, status=status.HTTP_202_ACCEPTED)
                    return Response(
                        "Song deleted but Centrifugo is not available",
                        status=status.HTTP_424_FAILED_DEPENDENCY,
                    )
                return Response(
                    data={"song not deleted"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            return Response(data={"Song not found"}, status=status.HTTP_400_BAD_REQUEST)
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
