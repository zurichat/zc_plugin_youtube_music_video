from rest_framework import serializers

from .api import Comment
from .models import Songs


class CommentSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(max_length=50)
    created_at = serializers.DateTimeField()
    message = serializers.CharField(max_length=256)

    def create(self, validated_data):
        return Comment(id=None, **validated_data)

    def update(self, instance, validated_data):
        for field, value in validated_data.items():
            setattr(instance, field, value)
        return instance


#Song ModelSerializers
class SongsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Songs
        fields = '__all__'