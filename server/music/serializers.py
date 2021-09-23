from django.utils import timezone
from rest_framework import serializers


class UserSerializer(serializers.Serializer):
    
    user_ids = serializers.CharField(max_length=256)
    user_name = serializers.CharField(max_length=256)
    avatar = serializers.CharField(max_length=256)

    def __str__(self):
        return str()

class MediaSerializer(serializers.Serializer):
    
    media_id = serializers.CharField()
    name = serializers.CharField()
    url = serializers.CharField()
    added_by = serializers.CharField()


class CommentSerializer(serializers.Serializer):
    
    message_content = serializers.CharField(max_length=256)
    created_datetime = serializers.DateTimeField(default=timezone.now, read_only=True)
    added_by = UserSerializer(many=True)
    
    # added_by = serializers.ListField(
    #     child=serializers.CharField(max_length=128), allow_null=False
    # )
    
    def __str__(self):
        return str()


class RoomSerializer(serializers.Serializer):
    
    org_id = serializers.CharField(max_length=128, required=True)
    user_ids = UserSerializer(many=True)

    def __str__(self):
        return str()




