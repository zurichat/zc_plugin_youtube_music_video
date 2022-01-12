from rest_framework import serializers


class SongSerializer(serializers.Serializer):
    _id = serializers.CharField(read_only=True)
    plugin_id = serializers.CharField(read_only=True)
    organization_id = serializers.CharField(required=False)
    collection_name = serializers.CharField(read_only=True)
    room_id = serializers.CharField(required=False)
    title = serializers.CharField(required=False)
    duration = serializers.CharField(required=False)
    albumcover = serializers.CharField(required=False)
    url = serializers.CharField(required=False)
    userId = serializers.CharField(max_length=100, required=False)
    addedBy = serializers.CharField(required=False)
    likedBy = serializers.ListField(
        child=serializers.CharField(max_length=128), required=False, default=[]
    )
    time = serializers.IntegerField(required=False)


class LikeSongSerializer(serializers.Serializer):
    song_id = serializers.CharField(max_length=100)
    memberId = serializers.CharField(max_length=100)


class SongLikeCountSerializer(serializers.Serializer):
    songId = serializers.CharField(max_length=100)
    userId = serializers.CharField(max_length=100)


class DeleteSongSerializer(serializers.Serializer):
    _id = serializers.CharField(max_length=100)
