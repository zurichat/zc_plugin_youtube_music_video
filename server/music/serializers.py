from django.utils import timezone
from rest_framework import serializers


class MediaSerializer(serializers.Serializer):
    
    media_id = serializers.CharField()
    name = serializers.CharField()
    url = serializers.CharField()
    added_by = serializers.CharField()


class CommentSerializer(serializers.Serializer):
    
    message_content = serializers.CharField(max_length=256)
    created_datetime = serializers.DateTimeField(default=timezone.now, read_only=True)
    added_by = serializers.ListField(
        child=serializers.CharField(max_length=128), allow_null=False
    )
    
    def __str__(self):
        return str()


class RoomSerializer(serializers.Serializer):
    
    org_id = serializers.CharField(max_length=128, required=True)
    user_ids = serializers.ListField(
        child=serializers.CharField(max_length=128), allow_null=True
    )

    def __str__(self):
        return str()


# class UserSerializer(serializers.Serializer):
    
#     user_ids = serializers.CharField(max_length=256)
#     user_name = serializers.CharField(max_length=256)
#     avatar = serializers.CharField(max_length=256)

#     def __str__(self):
#         return str()


# class TrackSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Track
#         fields = ['order', 'title', 'duration']

# class AlbumSerializer(serializers.ModelSerializer):
#     tracks = TrackSerializer(many=True)

#     class Meta:
#         model = Album
#         fields = ['album_name', 'artist', 'tracks']

#     def create(self, validated_data):
#         tracks_data = validated_data.pop('tracks')
#         album = Album.objects.create(**validated_data)
#         for track_data in tracks_data:
#             Track.objects.create(album=album, **track_data)
#         return album