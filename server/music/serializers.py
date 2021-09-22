from django.utils import timezone
from rest_framework import serializers


class MediaSerializer(serializers.Serializer):
    
    media_id = serializers.CharField()
    name = serializers.CharField()
    url = serializers.CharField()
    added_by = serializers.CharField()


class CommentSerializer(serializers.Serializer):
    
    message_content = serializers.CharField(max_length=256)
    created_datetime = serializers.DateTimeField(default=timezone.now, read_only=True)
    added_by = serializers.ListField(
        child=serializers.CharField(max_length=128), allow_null=False
    )
    user_name = serializers.ListField(
        child=serializers.CharField(max_length=128), allow_null=False
    )
    avatar = serializers.ListField(
        child=serializers.CharField(max_length=128), allow_null=True
    )
    
    def __str__(self):
        return str()


class RoomSerializer(serializers.Serializer):
    
    org_id = serializers.CharField(max_length=128, required=True)
    user_ids = serializers.ListField(
        child=serializers.CharField(max_length=128), allow_null=True
    )

    def __str__(self):
        return str()