from rest_framework import serializers


class MediaSerializer(serializers.Serializer):
    media_id = serializers.CharField()
    name = serializers.CharField()
    url = serializers.CharField()


# class SongSerializer(serializers.Serializer):
    
#     _id = serializers.ReadOnlyField()
#     name = serializers.CharField(required=True)
#     images = serializers.ImageField(required=False)
#     added_by = serializers.CharField(required=True)
#     date = serializers.DateField(required=False)
#     time = serializers.TimeField(required=False)

#     def __str__(self):
#         return {self.name}


    
    