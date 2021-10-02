room_image = ["https://svgshare.com/i/aXm.svg"]

class change_room_image(APIView):

    def post(self, request):
        data = request.data
        room_image[0] = data['albumCover']
        return Response(room_image,status=status.HTTP_200_OK )
    print(room_image[0])