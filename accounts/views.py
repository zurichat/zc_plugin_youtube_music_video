from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status, viewsets

from .api import Comment
from .serializers import CommentSerializer
from django.http import JsonResponse
from django.views import View

#A dictionary created for the sake of passing dummy data
# actual data would be gotten from the database when connected

comments = {
    1: Comment(id=1, username = 'Joseph', created_at = '30 minutes ago' , message= 'I like this music'),
    2: Comment(id=2, username = 'Amara', created_at = '35 minutes ago', message= 'This music is dope'),
    3: Comment(id=3, username = 'Ken', created_at ='40 minutes ago' , message= 'This track is something else'),
}

class CommentViewSet(viewsets.ViewSet):
    serializer_class = CommentSerializer

    def list(self,request):
        serializer = CommentSerializer(instance = comments.values(), many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = CommentSerializer(data= request.data)
        if serializer.is_valid():

            comments[max(comments)+1] = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        try:
            comment = comments[int(pk)]
        except KeyError:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = CommentSerializer(instance=comment)
        return Response(serializer.data)


    def update(self, request, pk=None):
        try:
            comment = comments[int(pk)]
        except KeyError:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = CommentSerializer( instance = comment, data= request.data)
        if serializer.is_valid():
            comments[max(comments)+1] = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None):
        try:
            comment = comments[int(pk)]
        except KeyError:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = CommentSerializer( instance = comment, data= request.data, partial=True)
        if serializer.is_valid():
            comments[max(comments)+1] = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PluginInfo(View):

    def get(self, request):
        data = {
            "plugin_name": "Youtube Music Video Plugin",
            "description": "This is a plugin that allows individuals in an organization to add music and video links from YouTube. These links are added to a shared playlist so that anyone in that organization can listen to or watch any of the shared videos or songs.",
            "plugin_structure": "Monolith",
            "team name": "Team Pythagoras",
            "plugin_url": "music.zuri.chat",
            "information_url": "music.zuri.chat/info",
            "sidebar_url": "music.zuri.chat/sidebar",
        }
        return JsonResponse(data)


class Test_report(View):

    def get(self, request):
        return render(request,"report/index.html")





    
        



