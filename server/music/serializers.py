from django.utils import timezone
from rest_framework import serializers


class MediaSerializer(serializers.Serializer):
    
    media_id = serializers.CharField()
    name = serializers.CharField()
    url = serializers.CharField()
    added_by = serializers.CharField()


class CommentSerializer(serializers.Serializer):
    
    message_content = serializers.CharField(max_length=256)
    user_name = serializers.CharField(max_length=256)
    created_datetime = serializers.DateTimeField(default=timezone.now, read_only=True)
    added_by = serializers.ListField(
        child=serializers.CharField(max_length=128), allow_empty=False, required=True
    )
    # avatar: string
    # time: number
    # name: string

    def __str__(self):
        return str()


class RoomSerializer(serializers.Serializer):
    
    org_id = serializers.CharField(max_length=128, required=True)
    user_ids = serializers.ListField(
        child=serializers.CharField(max_length=128), allow_empty=False, required=True
    )
    created_at = serializers.DateField(default=timezone.now, read_only=True)

    def __str__(self):
        return str()