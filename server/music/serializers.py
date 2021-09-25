from django.utils import timezone
from rest_framework import serializers


class UserSerializer(serializers.Serializer):
    
    user_id = serializers.CharField(max_length=256)
    name = serializers.CharField(max_length=256)
    avatar = serializers.CharField(max_length=256, required=False)
    token = serializers.CharField(max_length=500, required=False)
    
#6146d1e1845b436ea04d1031
class MediaSerializer(serializers.Serializer):
    
    media_id = serializers.CharField()
    name = serializers.CharField()
    url = serializers.CharField()
    added_by = serializers.CharField()


class CommentSerializer(serializers.Serializer):
    
    _id = serializers.ReadOnlyField()
    message = serializers.CharField(max_length=256)
    time = serializers.DateTimeField(default=timezone.now, read_only=True)
    user_id = serializers.ListField(
        child=serializers.CharField(max_length=128), allow_null=False
    )


class RoomSerializer(serializers.Serializer):
    
    _id = serializers.ReadOnlyField()
    org_id = serializers.CharField(max_length=100, required=False)
    room_name = serializers.CharField(max_length=100)   
    description = serializers.CharField(max_length=300)
    type_of_room = serializers.CharField(max_length=50, required=True)
    user_id = serializers.ListField(
        child=serializers.CharField(max_length=128), allow_null=False
    )

class SongSerializer(serializers.Serializer):

    _id = serializers.ReadOnlyField()
    title = serializers.CharField(max_length=100, required=False)
    duration = serializers.CharField(max_length=100)   
    albumCover = serializers.CharField(max_length=300)
    url = serializers.URLField(max_length=200, min_length=None, allow_blank=False)
    # addedBy = UserSerializer(many=True, read_only=True)
    added_by = serializers.ListField(
        child=serializers.CharField(max_length=128), allow_null=False
    )
    likedBy = serializers.NullBooleanField()




  