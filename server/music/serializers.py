from django.utils import timezone
from rest_framework import serializers
from music.models import *

class MediaSerializer(serializers.Serializer):
    media_id = serializers.CharField()
    name = serializers.CharField()
    url = serializers.CharField()
    

class MemberSerializer(serializers.Serializer):
    
    _id = serializers.CharField(read_only=True)
    userId = serializers.CharField(read_only=False)
    name = serializers.CharField(max_length=256, read_only=True)
    avatar = serializers.CharField(max_length=256, required=False, read_only=True)
    email = serializers.CharField(max_length=256, read_only=False)
    job = serializers.CharField(max_length=256, required=False, read_only=False)

    def create(self, validated_data):
        return Member(**validated_data)

    def update(self, instance, validated_data):
        
        instance._id = validated_data.get('_id', instance._id)
        instance.userId = validated_data.get('userId', instance.userId)
        instance.name = validated_data.get('name', instance.name)
        instance.avatar = validated_data.get('avatar', instance.avatar)
        instance.email = validated_data.get('email', instance.email)
        instance.job = validated_data.get('job', instance.job)
        return instance

    def __str__(self):
        return str()


class CommentSerializer(serializers.Serializer):

    _id = serializers.CharField(read_only=True)
    message = serializers.CharField(max_length=256, required=False)
    userId = serializers.CharField(max_length=256, required=False)
    name = serializers.CharField(max_length=256, required=False)
    avatar = serializers.CharField(max_length=256, required=False)
    time = serializers.DateTimeField()
    #time = serializers.IntegerField()

    def create(self, validated_data):
        return Comment(**validated_data)

    def update(self, instance, validated_data):

        instance.message = validated_data.get('message', instance.message)
        instance.userId = validated_data.get('userId', instance.userId)
        instance.name = validated_data.get('name', instance.name)
        instance.avatar = validated_data.get('avatar', instance.avatar)
        instance.time = validated_data.get('time', instance.time)
        return instance

    def __str__(self):
        return str()


class RoomSerializer(serializers.Serializer):

    _id = serializers.CharField(read_only=True)
    room_name = serializers.CharField(max_length=100)   
    description = serializers.CharField(max_length=300, required=False)
    room_image = serializers.CharField(required=False)
    type_of_room = serializers.CharField(max_length=50, required=False)
    room_url = serializers.CharField(required=False)
    user_id = serializers.ListField(child=serializers.CharField(max_length=128), required=False, default=[])

    def create(self, validated_data):
        return Room(**validated_data)

    def update(self, instance, validated_data):
        instance.room_name = validated_data.get('room_name', instance.room_name)
        instance.description = validated_data.get('description', instance.description)
        instance.room_image = validated_data.get('room_image', instance.room_image)
        instance.type_of_room = validated_data.get('type_of_room', instance.type_of_room)
        instance.room_url = validated_data.get('room_url', instance.room_url)
        instance.user_id = validated_data.get('user_id', instance.user_id)
        return instance

    def __str__(self):
        return str()


class SongSerializer(serializers.Serializer):
    
    # _id = serializers.IntegerField(read_only=True)
    _id = serializers.CharField(read_only=False)
    title = serializers.CharField(required=False)
    duration = serializers.CharField(required=False)
    albumcover = serializers.CharField(required=False)
    url = serializers.CharField(required=False)
    addedBy = serializers.CharField(required=False)
    likedBy = serializers.CharField(required=False)

    def create(self, validated_data):
        return Song(_id=None, **validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.duration = validated_data.get('duration', instance.duration)
        instance.albumcover = validated_data.get('albumcover', instance.albumcover)
        instance.url = validated_data.get('url', instance.url)
        instance.addedBy = validated_data.get('addedBy', instance.addedBy)
        instance.likedBy = validated_data.get('likedBy', instance.likedBy)
        return instance

    def __str__(self):
        return str()

