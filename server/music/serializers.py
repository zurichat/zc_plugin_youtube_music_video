from django.utils import timezone
from rest_framework import serializers


class MembersSerializer(serializers.Serializer):
    user_id = serializers.CharField()
    user_name = serializers.CharField(max_length=256, read_only=False)
    avatar = serializers.CharField(max_length=256, required=False, read_only=False)

    def __str__(self):
        return str()


class MediaSerializer(serializers.Serializer):
    media_id = serializers.CharField()
    title = serializers.CharField()
    duration = serializers.CharField()
    albumCover = serializers.CharField()
    url = serializers.CharField()
    added_by = serializers.ListField(read_only=True, child=MembersSerializer())
    likedBy = serializers.ListField(read_only=True, child=MembersSerializer())

    def __str__(self):
        return str()


class CommentSerializer(serializers.Serializer):
    plugin_id = serializers.ReadOnlyField()
    message = serializers.CharField(max_length=256)
    time = serializers.DateTimeField(default=timezone.now, read_only=True)
    commenter = serializers.ListField(read_only=True, child=MembersSerializer())

    # user_id = serializers.ListField(child=serializers.CharField(max_length=128), required=False, default=[])
    # name = serializers.CharField(max_length=256)
    # avatar = serializers.CharField(max_length=256)

    def __str__(self):
        return str()


class RoomSerializer(serializers.Serializer):

    org_id = serializers.ReadOnlyField()
    plugin_id = serializers.ReadOnlyField()
    room_name = serializers.CharField(max_length=100)   
    description = serializers.CharField(max_length=300, required=False)
    room_image = serializers.CharField(required=False)
    type_of_room = serializers.CharField(max_length=50, required=False)
    room_url = serializers.CharField(required=False)
    member = serializers.ListField(read_only=True, child=MembersSerializer())
    # user_id = serializers.ListField(child=serializers.CharField(max_length=128), required=False, default=[])

    def __str__(self):
        return str()