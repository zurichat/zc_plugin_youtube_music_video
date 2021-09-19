from rest_framework import serializers


class MediaSerializer(serializers.Serializer):
    media_id = serializers.CharField()
    name = serializers.CharField()
    url = serializers.CharField()


class EventSerializer(serializers.Serializer):
    """
    Creating  a serializer class for events
    """
    _id = serializers.ReadOnlyField()
    event_title = serializers.CharField(required=True)
    start_date = serializers.DateField(required=True)
    end_date = serializers.DateField(required=True)
    start_time = serializers.TimeField(required=True)
    end_time = serializers.TimeField(required=True)
    time_zone = serializers.CharField(required=True)
    description = serializers.CharField(max_length=250, required=True)
    all_day = serializers.BooleanField(required=False)
    event_tag = serializers.CharField(required=True)
    event_colour = serializers.CharField(required=True)
    images = serializers.ImageField(required=False)

    def __str__(self):
        return f"{self.event_title} created successfully"