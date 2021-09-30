from django.utils import timezone
from rest_framework import serializers


class MembersSerializer(serializers.Serializer):
    user_id = serializers.CharField()
    user_name = serializers.CharField(max_length=256, read_only=True)
    avatar = serializers.CharField(max_length=256, required=False, read_only=True)
    token = serializers.CharField(max_length=500, required=False, read_only=True)

    def __str__(self):
        return str()


class MediaSerializer(serializers.Serializer):
    media_id = serializers.CharField()
    name = serializers.CharField()
    url = serializers.CharField()
    added_by = serializers.CharField()


class CommentSerializer(serializers.Serializer):

    plugin_id = serializers.ReadOnlyField()
    message = serializers.CharField(max_length=256)
    time = serializers.DateTimeField(default=timezone.now, read_only=True)
    user_id = serializers.ListField(child=serializers.CharField(max_length=128), required=False, default=[])
    name = serializers.CharField(max_length=256)
    avatar = serializers.CharField(max_length=256)

    # added_by = serializers.ListField(
    #     child=serializers.CharField(max_length=128), allow_null=False
    # )

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
    user_id = serializers.ListField(child=serializers.CharField(max_length=128), required=False, default=[])

    def __str__(self):
        return str()