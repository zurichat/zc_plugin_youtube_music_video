from django.utils import timezone
from rest_framework import serializers
from music.models import *


class MemberSerializer(serializers.Serializer):

    _id = serializers.CharField(read_only=True)
    userId = serializers.ListField(
        child=serializers.CharField(max_length=128), required=False, default=[]
    )
    name = serializers.ListField(child=serializers.CharField(read_only=True))
    avatar = serializers.ListField(child=serializers.CharField(read_only=True))
    email = serializers.CharField(max_length=256, read_only=False)
    job = serializers.ListField(child=serializers.CharField(read_only=True))

    def create(self, validated_data):
        return Member(**validated_data)

    def update(self, instance, validated_data):

        instance._id = validated_data.get("_id", instance._id)
        instance.userId = validated_data.get("userId", instance.userId)
        instance.name = validated_data.get("name", instance.name)
        instance.avatar = validated_data.get("avatar", instance.avatar)
        instance.email = validated_data.get("email", instance.email)
        instance.job = validated_data.get("job", instance.job)
        instance.save()
        return instance

    def __str__(self):
        return str()


class SongSerializer(serializers.Serializer):

    _id = serializers.CharField(read_only=False)
    title = serializers.CharField(required=False)
    duration = serializers.CharField(required=False)
    albumcover = serializers.CharField(required=False)
    url = serializers.CharField(required=False)
    userId = serializers.CharField(required=False)
    addedBy = serializers.CharField(required=False)
    likedBy = serializers.ListField(
        child=serializers.CharField(max_length=128), required=False, default=[]
    )
    time = serializers.IntegerField(required=False)

    def create(self, validated_data):
        return Song(**validated_data)

    def update(self, instance, validated_data):

        instance._id = validated_data.get("_id", instance._id)
        instance.title = validated_data.get("title", instance.title)
        instance.duration = validated_data.get("duration", instance.duration)
        instance.albumcover = validated_data.get("albumcover", instance.albumcover)
        instance.url = validated_data.get("url", instance.url)
        instance.userId = validated_data.get("userId", instance.userId)
        instance.addedBy = validated_data.get("addedBy", instance.addedBy)
        instance.likedBy = validated_data.get("likedBy", instance.likedBy)
        instance.time = validated_data.get("time", instance.time)
        instance.save()
        return instance

    def __str__(self):
        return str()


class CommentSerializer(serializers.Serializer):

    _id = serializers.CharField(read_only=True)
    message = serializers.CharField(max_length=256, required=False)
    userId = serializers.CharField(max_length=100, required=False)
    name = serializers.CharField(max_length=256, required=False)
    avatar = serializers.CharField(max_length=256, required=False)
    time = serializers.IntegerField(required=False)

    def create(self, validated_data):
        return Comment(**validated_data)

    def update(self, instance, validated_data):

        instance.message = validated_data.get("message", instance.message)
        instance.userId = validated_data.get("userId", instance.userId)
        instance.name = validated_data.get("name", instance.name)
        instance.avatar = validated_data.get("avatar", instance.avatar)
        instance.time = validated_data.get("time", instance.time)
        return instance

    def __str__(self):
        return str()


class RoomSerializer(serializers.Serializer):

    _id = serializers.CharField(read_only=True)
    room_name = serializers.CharField(max_length=100, required=False)
    description = serializers.CharField(max_length=300, required=False)
    private = serializers.BooleanField(default=False, required=False)
    room_url = serializers.CharField(max_length=300, required=False)
    memberId = serializers.ListField(
        child=serializers.CharField(max_length=128), required=False, default=[]
    )

    def create(self, validated_data):
        return Room(**validated_data)

    def update(self, instance, validated_data):
        instance.room_name = validated_data.get("room_name", instance.room_name)
        instance.description = validated_data.get("description", instance.description)
        instance.private = validated_data.get("private", instance.private)
        instance.room_url = validated_data.get("room_url", instance.room_url)
        instance.memberId = validated_data.get("memberId", instance.memberId)
        return instance

    def __str__(self):
        return str()


class AddToRoomSerializer(serializers.Serializer):
    room_id = serializers.CharField(max_length=100)
    member_id = serializers.CharField(max_length=100)


class FaveSerializer(serializers.Serializer):
    _id = serializers.CharField(read_only=True)
    userId = serializers.CharField(max_length=100)
    songId = serializers.CharField(max_length=100)
    like = serializers.BooleanField(default=False, required=False)

    def create(self, validated_data):
        return Fave(**validated_data)

    def update(self, instance, validated_data):

        instance._id = validated_data.get("_id", instance._id)
        instance.userId = validated_data.get("userId", instance.userId)
        instance.songId = validated_data.get("songId", instance.songId)
        instance.like = validated_data.get("like", instance.like)
        instance.save()
        return instance

    def __str__(self):
        return str()
