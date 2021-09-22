from django.utils import timezone
from rest_framework import serializers


class MediaSerializer(serializers.Serializer):
    media_id = serializers.CharField()
    name = serializers.CharField()
    url = serializers.CharField()


class CommentSerializer(serializers.Serializer):
    user_id = serializers.CharField(max_length=256)
    created_datetime = serializers.CharField(max_length=256)
    message_content = serializers.CharField(max_length=256)
