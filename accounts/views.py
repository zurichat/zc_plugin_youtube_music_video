from rest_framework.response import Response
from rest_framework import serializers, status
from rest_framework.decorators import api_view
from .api import Comment
from .serializers import CommentSerializer


@api_view(['GET', 'POST'])
def commentlistview(request):
    '''List all comments or create a new comment'''
    if request.method == 'GET':
        serializer = CommentSerializer(instance=comment.values(), many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            comment[max(Comment) + 1] = serializer.save()
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'PATCH'])
def commentdetailview(request, pk):
    try:
        comment = comments[int(pk)]
    except KeyError:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'GET':
        serializer = CommentSerializer(instance=comment)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CommentSerializer(instance=comment, data=request.data)
        if serializer.is_valid():
            comment[comment.id] = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PATCH':
        serializer = CommentSerializer(
            instance=comment, data=request.data, partial=True)
        if serializer.is_valid():
            comments[comment.id] = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
