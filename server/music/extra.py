
# class AddToRoomView(APIView):  # working
#     @staticmethod
#     def adduser_id(request):
#         room_data = read_data(settings.ROOM_COLLECTION)
#         room_users = room_data["data"][0]["memberId"]
#         _id = room_data["data"][0]["_id"]
#         new_user = request.data["memberId"]
#         # TODO: Do a check for existing user before appending
#         room_users.append(new_user)
#         return _id, room_users

#     def get(self, request, *args, **kwargs):
#         data = read_data(settings.ROOM_COLLECTION)
#         return Response(data)

#     def post(self, request, *args, **kwargs):
#         _id, updated_room = self.adduser_id(request)

#         payload = {"memberId": updated_room}

#         data = write_data(
#             settings.ROOM_COLLECTION, object_id=_id, payload=payload, method="PUT"
#         )

#         centrifugo_post(plugin_id, {"event": "entered_room", "data": data})
#         return Response(data, status=status.HTTP_202_ACCEPTED)
#         # Note: use {"memberId": ""} to add 

# path(
#         "room/<str:_id>/adduser", AddToRoomView.as_view(), name="adduser"
# #     ),
# path("test", MediaView.as_view(), name="test"),

# class MediaView(APIView):
#     def get(self, request):
#         payload = {"email": "hng.user01@gmail.com", "password": "password"}

#         data = read_data("test_collection")

#         centrifugo_post(plugin_id, {"event": "join_room"})
#         return Response(data)



# class MediaSerializer(serializers.Serializer):
#     mediaid = serializers.CharField(read_only=True)
#     name = serializers.CharField()
#     url = serializers.CharField()

    # def create(self, validated_data):
    #     return Media(**validated_data)

    # def update(self, instance, validated_data):
    #     instance.mediaid = validated_data.get("mediaid", instance.mediaid)
    #     instance.name = validated_data.get("name", instance.name)
    #     instance.url = validated_data.get("url", instance.url)
    #     instance.save()
    #     return instance

    # def __str__(self):
    #     return str()


