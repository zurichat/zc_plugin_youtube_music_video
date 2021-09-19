from rest_framework import serializers
from django.utils import timezone

class MediaSerializer(serializers.Serializer):
    media_id = serializers.CharField()
    name = serializers.CharField()
    url = serializers.CharField()

class CommentSerializer(serializers.Serializer):
    user_id = serializers.UUIDField()
    created_datetime = serializers.DateTimeField(default=timezone.now())
    message_content = serializers.CharField(max_length=256)

