from django.utils import timezone
from rest_framework import serializers


class UserSerializer(serializers.Serializer):
    
    user_id = serializers.CharField(max_length=50, read_only=True)
    name = serializers.CharField(max_length=256, read_only=True)
    avatar = serializers.CharField(max_length=256, required=False, read_only=True)
    token = serializers.CharField(max_length=500, required=False, read_only=True)

    def __str__(self):
        return str(self.name)
    

class MediaSerializer(serializers.Serializer):
    
    media_id = serializers.CharField()
    name = serializers.CharField()
    url = serializers.CharField()
    added_by = serializers.CharField()


class CommentSerializer(serializers.Serializer):
    
    _id = serializers.ReadOnlyField()
    message = serializers.CharField(max_length=256)
    time = serializers.DateTimeField(default=timezone.now, read_only=True)
    user_id = serializers.ListField(child=serializers.CharField(max_length=128), required=False, default=[])

    def __str__(self):
        return str(self.message)

    def update(self, instance, validated_data):
        
        instance["_id"] = validated_data.get("_id", instance["_id"])
        instance["message"] = validated_data.get("message", instance["message"])
        instance["time"] = validated_data.get("time", instance["time"])
        instance["user_id"] = validated_data.get("user_id", instance["user_id"])
        
        return instance


class RoomSerializer(serializers.Serializer):
    
    _id = serializers.ReadOnlyField()
    org_id = serializers.CharField(max_length=100, required=False)
    room_name = serializers.CharField(max_length=100)   
    description = serializers.CharField(max_length=300)
    type_of_room = serializers.CharField(max_length=50, required=True)
    user_id = serializers.ListField(child=serializers.CharField(max_length=128), required=False, default=[])

    def __str__(self):
        return str(self.room_name)


class SongSerializer(serializers.Serializer):

    _id = serializers.ReadOnlyField()
    title = serializers.CharField(max_length=100, required=False)
    duration = serializers.CharField(max_length=100)   
    albumCover = serializers.CharField(max_length=300)
    url = serializers.URLField(max_length=200, min_length=None, allow_blank=False)
    # addedBy = UserSerializer(many=True, read_only=True)
    # added_by = serializers.ListField(child=serializers.CharField(max_length=128), allow_empty=False, required=True)
    added_by = serializers.ListField(child=serializers.CharField(max_length=128), required=False, default=[])
    likedBy = serializers.NullBooleanField(required=False)

    def __str__(self):
        return str(self.title)

