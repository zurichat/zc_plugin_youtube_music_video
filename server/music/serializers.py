from rest_framework import serializers


class MediaSerializer(serializers.Serializer):
    media_id = serializers.CharField()
    name = serializers.CharField()
    url = serializers.CharField()



class RoomSerializer(serializers.Serializer):

    # This part is to create a template for the data needed to be stored in the
    # db
    org_id = serializers.CharField(max_length=128, required=True)

    plugin_id = serializers.CharField(max_length=128, required=True)

    collection_name = serializers.CharField(max_length=128, required=True)

    # name of the room  = music room
    room_name = serializers.CharField(max_length=128, required=True)

    # public or private
    room_type = serializers.CharField(max_length=128, required=True)

    # current playing song
    current_song = serializers.CharField(max_length=128, required=True)
    # is the room private or public
    action = serializers.CharField(max_length=128, required=True)

    # list of users in the room
    room_user_ids = serializers.ListField(child=serializers.CharField(max_length=128),
                                           allow_empty=True, required=True)
    
    # TODO : add room_description and other info



