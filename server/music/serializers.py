from django.utils import timezone
from rest_framework import serializers
# from .models import Room, RoomUser


class RoomUserSerializer(serializers.Serializer):
    
    name = serializers.CharField(max_length=256)
    avatar = serializers.CharField(max_length=256)

    # roomuser = RoomUser('Paula', 'headphones')
    # serializer = RoomUserSerializer(roomuser)

    # serializer.data

    # def create(self, validated_data):
    #     # return RoomUser(**validated_data)
    #     return roomuser

    def __str__(self):
        return str()


class MediaSerializer(serializers.Serializer):
    
    media_id = serializers.CharField()
    name = serializers.CharField()
    url = serializers.CharField()
    added_by = serializers.CharField()


class CommentSerializer(serializers.Serializer):
    
    message = serializers.CharField(max_length=256)
    time = serializers.DateTimeField(default=timezone.now, read_only=True)
    added_by = RoomUserSerializer(many=True, read_only=True)
    
    # userId = serializers.CharField(max_length=256)
    # name = serializers.CharField(max_length=256)
    # avatar = serializers.CharField(max_length=256)
    
    # added_by = serializers.ListField(
    #     child=serializers.CharField(max_length=128), allow_null=False
    # )
    
    def __str__(self):
        return str()


class RoomSerializer(serializers.Serializer):
    
    org_id = serializers.CharField(max_length=100, required=False)
    room_name = serializers.CharField(max_length=100)
    members = RoomUserSerializer(many=True, read_only=True)

    # def create(self, validated_data):
    #     return Room(**validated_data)

    def __str__(self):
        return str()


class RoomInfoSerializer(serializers.Serializer):
    
    room_id = RoomSerializer(many=True, read_only=True)
    org_id = serializers.CharField(max_length=100, required=False)
    room_name = serializers.CharField(max_length=100)
    description = serializers.CharField(max_length=300)
    type_of_room = serializers.CharField(max_length=50, required=True)
    members = RoomUserSerializer(many=True, read_only=True)

    def __str__(self):
        return str()
