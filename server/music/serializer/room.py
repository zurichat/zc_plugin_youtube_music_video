from rest_framework import serializers


class RoomSerializer(serializers.Serializer):
    _id = serializers.CharField(read_only=True)
    room_name = serializers.CharField(max_length=100, required=False)
    plugin_name = serializers.CharField(max_length=300, required=False)
    plugin_id = serializers.CharField(max_length=300, required=False)
    org_id = serializers.CharField(max_length=300, required=False)
    collection = serializers.CharField(max_length=300, required=False)
    description = serializers.CharField(max_length=300, required=False)
    created_by = serializers.CharField(max_length=100, required=False)
    is_private = serializers.BooleanField(default=False, required=False)
    is_archived = serializers.BooleanField(default=False, required=False)
    memberId = serializers.ListField(
        child=serializers.CharField(max_length=128), required=False, default=[]
    )


class UpdateRoomSerializer(serializers.Serializer):
    _id = serializers.CharField(read_only=True)
    room_name = serializers.CharField(max_length=100, required=False)
    description = serializers.CharField(max_length=300, required=False)
    is_private = serializers.BooleanField(default=False, required=False)
    is_archived = serializers.BooleanField(default=False, required=False)


class AddToRoomSerializer(serializers.Serializer):
    room_id = serializers.CharField(max_length=100)
    memberId = serializers.ListField(
        child=serializers.CharField(max_length=100), allow_empty=False, default=[]
    )


class RemoveUserSerializer(serializers.Serializer):
    room_id = serializers.CharField(max_length=100)
    org_id = serializers.CharField(max_length=100)
    memberId = serializers.CharField(max_length=100)
