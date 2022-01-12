from django.conf import settings
from drf_spectacular.utils import extend_schema
from music.serializer.chat import (CommentSerializer, DeleteChatSerializer,
                                   UpdateCommentSerializer)
from music.utils.data_access import (centrifugo_publish, delete_data,
                                     read_data, room_image, write_data)
from music.utils.dataStorage import DataStorage
from requests.api import request
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


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
            try:
                data = read_data(settings.COMMENTS_COLLECTION)
                if data["status"] == 200:
                    return Response(data, status=status.HTTP_200_OK)
                return Response(
                    data={"Error reading data"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except Exception:
                return Response(
                    data={"message": "Error reading from collection"},
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
            try:
                data = write_data(
                    settings.COMMENTS_COLLECTION, payload=payload, method="POST"
                )
                if data["status"] == 200:
                    centrifugo_response = centrifugo_publish(
                        room=settings.ROOM_ID, event="New comment", data=data
                    )
                    if centrifugo_response.get("status_code", None) == 200:
                        return Response(data, status=status.HTTP_200_OK)
                    return Response(
                        data={
                            "message": "Comment added but Centrifugo is not available"
                        },
                        status=status.HTTP_424_FAILED_DEPENDENCY,
                    )
                return Response(
                    data={"message": "comment not created"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except Exception:
                return Response(
                    data={"message": "Error writing to collection"},
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
            if chat_data["status"] == 200:
                chat_data["data"]["_id"] == chat_id
                try:
                    response = delete_data(
                        settings.COMMENTS_COLLECTION, object_id=chat_id
                    )
                except Exception:
                    return None

                if response["status"] == 200:
                    centrifugo_response = centrifugo_publish(
                        room=settings.ROOM_ID,
                        event="Delete Comment",
                        data=response,
                    )
                    if centrifugo_response.get("status_code", None) == 200:
                        return Response(response, status=status.HTTP_202_ACCEPTED)
                    return Response(
                        data={"Comment deleted but Centrifugo is not available"},
                        status=status.HTTP_424_FAILED_DEPENDENCY,
                    )
                return Response(
                    data={"Comment not deleted"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            return Response(
                data={"Comment not found"}, status=status.HTTP_404_NOT_FOUND
            )
        return Response(data={"Bad request"}, status=status.HTTP_400_BAD_REQUEST)


class UpdateCommentView(APIView):
    @extend_schema(
        request=UpdateCommentSerializer,
        responses={200: CommentSerializer},
        description="update comments",
        methods=["PUT"],
    )
    def put(self, request, *args, **kwargs):

        """
        This endpoint is used to update a comment. Constants like plugin_id, user_id are not editable. All other parameters except the comment_id are optional.

        Sample request body

        {
            "_id": "61ae33d95a3812d0a9d0b217",
            "richUiData" : {
                "blocks" : [{
                    "data" : {},
                    "depth" : 3,
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
        serializer = UpdateCommentSerializer(data=request.data)

        if serializer.is_valid():
            payload = serializer.data
            chat_id = request.data["_id"]
            chat_data = read_data(settings.COMMENTS_COLLECTION, object_id=chat_id)

            if chat_data["status"] == 200:
                chat_data["data"]["_id"] == chat_id
                try:
                    data = write_data(
                        settings.COMMENTS_COLLECTION,
                        object_id=chat_id,
                        payload=payload,
                        method="PUT",
                    )
                except Exception:
                    return None

                if data["status"] == 200:
                    centrifugo_response = centrifugo_publish(
                        room=settings.ROOM_ID,
                        event="Comment Update",
                        data=data,
                    )
                    if centrifugo_response.get("status_code", None) == 200:
                        return Response(data, status=status.HTTP_200_OK)
                    return Response(
                        "Comment updated but Centrifugo is not available",
                        status=status.HTTP_424_FAILED_DEPENDENCY,
                    )
                return Response(
                    data={"message": "comment not updated"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            return Response(
                data={"Comment not found"}, status=status.HTTP_400_BAD_REQUEST
            )
        return Response(data={"Bad request"}, status=status.HTTP_400_BAD_REQUEST)
