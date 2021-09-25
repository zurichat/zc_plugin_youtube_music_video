from django.utils import timezone
from rest_framework import serializers


class UserSerializer(serializers.Serializer):
    
    user_id = serializers.CharField(max_length=50, read_only=True)
    name = serializers.CharField(max_length=256, read_only=True)
    avatar = serializers.CharField(max_length=256, required=False, read_only=True)
    token = serializers.CharField(max_length=500, required=False, read_only=True)
    

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
        
        print(validated_data)
        instance["_id"] = validated_data.get("_id", instance["_id"])
        instance["message"] = validated_data.get("message", instance["message"])
        instance["time"] = validated_data.get("time", instance["time"])
        instance["user_id"] = validated_data.get("user_id", instance["user_id"])
        
        return instance


class MessageSerializer(serializers.Serializer):
    sender_id = serializers.CharField(max_length=128)
    room_id = serializers.CharField(max_length=128)
    message = serializers.CharField()
    media = serializers.ListField(
        child=serializers.URLField(), allow_empty=True, required=False, default=[]
    )
    read = serializers.BooleanField(default=False, required=False)
    pinned = serializers.BooleanField(default=False, )
    saved_by = serializers.ListField(
        child=serializers.CharField(max_length=128), required=False, default=[]
    )
    threads = serializers.ListField(
        required=False, default=[], child=ThreadSerializer()
    )
    reactions = serializers.ListField(
        required=False, default=[], child=EmojiSerializer()
    )
    created_at = serializers.DateTimeField(default=timezone.now)

    def update(self, instance, validated_data):
        print(validated_data)
        instance["sender_id"] = validated_data.get(
            "sender_id", instance["sender_id"])
        instance["room_id"] = validated_data.get(
            "room_id", instance["room_id"])
        instance["message"] = validated_data.get(
            "message", instance["message"])

        return instance



class RoomSerializer(serializers.Serializer):
    
    _id = serializers.ReadOnlyField()
    org_id = serializers.CharField(max_length=100, required=False)
    room_name = serializers.CharField(max_length=100)   
    description = serializers.CharField(max_length=300)
    type_of_room = serializers.CharField(max_length=50, required=True)
    user_id = serializers.ListField(child=serializers.CharField(max_length=128), allow_empty=False, required=True)


class SongSerializer(serializers.Serializer):

    _id = serializers.ReadOnlyField()
    title = serializers.CharField(max_length=100, required=False)
    duration = serializers.CharField(max_length=100)   
    albumCover = serializers.CharField(max_length=300)
    url = serializers.URLField(max_length=200, min_length=None, allow_blank=False)
    # addedBy = UserSerializer(many=True, read_only=True)
    added_by = serializers.ListField(child=serializers.CharField(max_length=128), allow_empty=False, required=True)
    likedBy = serializers.NullBooleanField(required=False)

