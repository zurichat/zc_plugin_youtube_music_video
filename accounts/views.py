from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .api import Comments
from .serializers import CommentSerializer

#A dictionary created for the sake of passing dummy data
# actual data would be gottrn from the database when connected

comments = {
	1: Comments(id =1, username = 'Joseph', created_at = , message= 'I like this music')
	2: Comments(id =2, username = 'Amara', created_at = , message= 'This music is dope')
	3: Comments(id =3, username = 'Ken', created_at = , message= 'This track is something else')
}


@api_view( ['GET', 'POST'] )
def Comment_list(request):
	'''List all comments or create a new comment'''
	if request.method == 'GET':
		serializer = CommentSerializer(instance = comments.values(), many=True)
		return Response(serializer.data)

	elif request.method == 'POST':
		serializer = CommentSerializer(data=request.data)
		if serializer.is_valid():
			comments[max(comments)+1] = serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
		

@api_view( ['GET', 'PUT','PATCH'] )
def Comment_Detail(request, pk):
    '''Retrieve, update or Comment Instance'''
    try:
    	comment = comments[int(pk)]
    except KeyError:
    	return Response(status= status.HTTP_404_NOT_FOUND)
	except ValueError:
    	return Response(status= status.HTTP_400_BAD_REQUEST)

 	if request.method == 'GET':
 		serializer = CommentSerializer(instance=comment)
 		return Response(serializer.data)

	elif request.method == 'PUT':
		serializer = CommentSerializer( instance = comment, data= request.data)

		if serializer.is_valid():
			comments[comment.id] = serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	elif request.method == 'PATCH':
		serializer = CommentSerializer (instance = comment, 
										data = request.data, partial =True)
		if serializer.is_valid():
			comments[comment.id] = serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



