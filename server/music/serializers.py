from django.utils import timezone
from rest_framework import serializers


class UserSerializer(serializers.Serializer):
    
    _id = serializers.ReadOnlyField()
    name = serializers.CharField(max_length=256)
    avatar = serializers.CharField(max_length=256)

    def __str__(self):
        return str()


class MediaSerializer(serializers.Serializer):
    
    media_id = serializers.CharField()
    name = serializers.CharField()
    url = serializers.CharField()
    added_by = serializers.CharField()


class CommentSerializer(serializers.Serializer):
    
    _id = serializers.ReadOnlyField()
    message = serializers.CharField(max_length=256)
    created = serializers.DateTimeField(default=timezone.now, read_only=True)
    added_by = UserSerializer(many=True, read_only=True)
    
    # message = serializers.CharField(max_length=256)
    # time = serializers.IntegerField(max_value=None, min_value=None)
    # userId = serializers.CharField(max_length=256)
    # name = serializers.CharField(max_length=256)
    # avatar = serializers.CharField(max_length=256)
    
    # added_by = serializers.ListField(
    #     child=serializers.CharField(max_length=128), allow_null=False
    # )
    
    def __str__(self):
        return str()


class RoomSerializer(serializers.Serializer):
    
    _id = serializers.ReadOnlyField()
    room_name = serializers.CharField(max_length=100)
    description = serializers.CharField(max_length=300)
    type = serializers.CharField(max_length=50, required=True)
    members = UserSerializer(many=True, read_only=True)

    def __str__(self):
        return str()




