from django.utils import timezone
from rest_framework import serializers
from .models import Room, RoomUser


class RoomUserSerializer(serializers.Serializer):
    
    _id = serializers.ReadOnlyField()
    name = serializers.CharField(max_length=256)
    avatar = serializers.CharField(max_length=256)

    def create(self, validated_data):
        return RoomUser(**validated_data)

    # def update(self, instance, validated_data):
    #     instance._id = validated_data.get('_id', instance._id)
    #     instance.name = validated_data.get('name', instance.name)
    #     instance.avatar = validated_data.get('avatar', instance.avatar)
        
    #     return instance

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
    time = serializers.DateTimeField(default=timezone.now, read_only=True)
    # added_by = RoomUserSerializer(many=True, read_only=True)
    
    userId = serializers.CharField(max_length=256)
    name = serializers.CharField(max_length=256)
    # avatar = serializers.CharField(max_length=256)
    
    # added_by = serializers.ListField(
    #     child=serializers.CharField(max_length=128), allow_null=False
    # )
    
    def __str__(self):
        return str()


class RoomSerializer(serializers.Serializer):
    
    _id = serializers.ReadOnlyField()
    org_id = serializers.CharField(max_length=100, required=False)
    room_name = serializers.CharField(max_length=100)
    description = serializers.CharField(max_length=300)
    type = serializers.CharField(max_length=50, required=True)
    members = RoomUserSerializer(many=True, read_only=True)

    def create(self, validated_data):
        return Room(**validated_data)

    # def update(self, instance, validated_data):
    #     instance._id = validated_data.get('_id', instance._id)
    #     instance.room_name = validated_data.get('room_name', instance.room_name)
    #     instance.description = validated_data.get('description', instance.description)
    #     instance.type = validated_data.get('type', instance.type)
    #     instance.members = validated_data.get('members', instance.members)
        # return instance

    def __str__(self):
        return str()



