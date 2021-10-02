from config.settings import *
from django.utils.text import slugify
from rest_framework import serializers
from music.models import *


class MediaSerializer(serializers.Serializer):
    media_id = serializers.CharField()
    name = serializers.CharField()
    url = serializers.CharField()


class MemberSerializer(serializers.Serializer):
    _id = serializers.CharField(max_length=50, required=True, help_text="member id")
    role = serializers.CharField(max_length=30, required=False)
    pronoun = serializers.CharField(max_length=10, required=False)
    email = serializers.CharField(max_length=30, required=False)


class CommentSerializer(serializers.Serializer):
    _id = serializers.CharField(read_only=True)
    message = serializers.CharField(max_length=256, required=False)
    userId = serializers.CharField(read_only=True)
    # userId = serializers.CharField(max_length=256, required=False)
    name = serializers.CharField(max_length=256, required=False)
    avatar = serializers.CharField(max_length=256, required=False)
    # time = serializers.DateTimeField()
    time = serializers.IntegerField()

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


class MusicRoomSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=70, required=True, help_text="music room name")
    created_by = serializers.CharField(max_length=50, required=True)
    description = serializers.CharField(required=False)
    public = serializers.BooleanField(default=False)

    def validate_name(self, name):
        """
        checks if a name already exists in an organization
        """
        data = {"name": name.lower()}
        response = read_data(ROOM_COLLECTION, data)
        if isinstance(response, list):
            raise serializers.ValidationError({"error": "name exist in organisation"})
        return name

    def to_representation(self, instance):
        instance = dict(instance)
        member_id = instance.get("created_by")
        slug = slugify(instance.get("name"))
        musicroom = MusicRoom(**instance, slug=slug)
        musicroom.users = {member_id: {"_id": member_id}}
        data = {ROOM_COLLECTION: musicroom}
        return data


class MusiccRoomSerializer(serializers.Serializer):
    # leave this serializer this way, this should be used in place of the one above for documentation
    name = serializers.CharField(max_length=70, required=True, help_text="music room name")
    created_by = serializers.CharField(max_length=50, required=True)
    description = serializers.CharField(required=False)
    public = serializers.BooleanField(default=False)
    users = serializers.DictField(child=MemberSerializer(many=True), required=False,
                                  help_text="list of members in a room"),


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
