from django.utils import timezone
from rest_framework import serializers


class MediaSerializer(serializers.Serializer):
    media_id = serializers.CharField()
    name = serializers.CharField()
    url = serializers.CharField()


class CommentSerializer(serializers.Serializer):
    userId = serializers.CharField(max_length=256)
    avatar = serializers.CharField(max_length=256)
    time = serializers.IntegerField(max_value=None, min_value=None)
    message = serializers.CharField(max_length=256)
    name = serializers.CharField(max_length=256)
