from django.utils import timezone
from rest_framework import serializers


class MembersSerializer(serializers.Serializer):
    user_id = serializers.CharField()

    def __str__(self):
        return str()


class MediaSerializer(serializers.Serializer):
    media_id = serializers.CharField()
    name = serializers.CharField()
    url = serializers.CharField()
    added_by = serializers.CharField()


class CommentSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=256)
    created_at = serializers.DateTimeField(default=timezone.now, read_only=True)
    userId = serializers.CharField(max_length=256)
    user_name = serializers.CharField(max_length=256)
    avatar = serializers.CharField(max_length=256)

    # added_by = serializers.ListField(
    #     child=serializers.CharField(max_length=128), allow_null=False
    # )

    def __str__(self):
        return str()


class RoomSerializer(serializers.Serializer):
    org_id = serializers.CharField(required=True)
    room_name = serializers.CharField()
    description = serializers.CharField()
    room_user_ids = serializers.ListField(child=MembersSerializer(many=True), allow_empty=False, required=True)

    def __str__(self):
        return str()
