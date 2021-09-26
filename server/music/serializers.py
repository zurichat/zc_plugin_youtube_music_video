from django.utils import timezone
from rest_framework import serializers


class MembersSerializer(serializers.Serializer):
    user_id = serializers.CharField()
    user_name = serializers.CharField()
    avatar = serializers.CharField()

    def __str__(self):
        return str()


class MediaSerializer(serializers.Serializer):
    media_id = serializers.CharField()
    name = serializers.CharField()
    url = serializers.CharField()
    added_by = serializers.CharField()


class CommentSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=256)
    time = serializers.IntegerField(max_value=None, min_value=None)
    userId = serializers.CharField(max_length=256)
    name = serializers.CharField(max_length=256)
    avatar = serializers.CharField(max_length=256)

    # added_by = serializers.ListField(
    #     child=serializers.CharField(max_length=128), allow_null=False
    # )

    def __str__(self):
        return str()


class RoomSerializer(serializers.Serializer):
    org_id = serializers.CharField()
    room_name = serializers.CharField()
    room_url = serializers.CharField()
    room_image = serializers.CharField()
    description = serializers.CharField()

    def __str__(self):
        return str()
