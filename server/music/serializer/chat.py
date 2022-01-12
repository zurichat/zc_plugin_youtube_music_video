from rest_framework import serializers


class DeleteChatSerializer(serializers.Serializer):
    _id = serializers.CharField(max_length=100)


class EmojiSerializer(serializers.Serializer):  # for the emojis
    name = serializers.CharField(max_length=256, required=False)
    emoji = serializers.CharField(max_length=256, required=False)
    count = serializers.IntegerField(default=0, required=False)


class BlockSerializer(serializers.Serializer):  # for the block
    data = serializers.DictField(
        child=serializers.CharField(max_length=128),
        allow_empty=True,
        required=False,
        default={},
    )
    depth = serializers.IntegerField(default=0, required=False)
    entityRanges = serializers.ListField(
        child=serializers.CharField(max_length=128),
        allow_empty=True,
        required=False,
        default=[],
    )
    inlineStyleRanges = serializers.ListField(
        child=serializers.CharField(max_length=128),
        allow_empty=True,
        required=False,
        default=[],
    )
    key = serializers.CharField(max_length=256, required=False)
    text = serializers.CharField(max_length=256, required=False)
    type = serializers.CharField(max_length=256, required=False)


class UiDataSerializer(serializers.Serializer):  # for the ui data
    blocks = serializers.ListField(
        child=BlockSerializer(), required=False, allow_empty=True, default=[]
    )
    entityMap = serializers.DictField(
        child=serializers.CharField(max_length=128),
        allow_empty=True,
        required=False,
        default={},
    )


class CommentSerializer(serializers.Serializer):  # for the chat
    _id = serializers.CharField(read_only=True)
    plugin_id = serializers.CharField(required=False)
    organization_id = serializers.CharField(required=False)
    collection_name = serializers.CharField(required=False)
    room_id = serializers.CharField(required=False)
    username = serializers.CharField(max_length=256, required=False)
    userId = serializers.CharField(max_length=100, required=False)
    emojies = serializers.ListField(
        required=False, allow_empty=True, default=[], child=EmojiSerializer()
    )
    richUiData = UiDataSerializer(required=False, allow_null=True)
    imageUrl = serializers.CharField(max_length=256, required=False)
    time = serializers.IntegerField(required=False)


class UpdateCommentSerializer(serializers.Serializer):  # for the chat
    _id = serializers.CharField(read_only=True)
    emojies = serializers.ListField(
        required=False, allow_empty=True, default=[], child=EmojiSerializer()
    )
    richUiData = UiDataSerializer(required=False, allow_null=True)
