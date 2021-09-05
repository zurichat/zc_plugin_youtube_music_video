from rest_framework.response import Response
from rest_framework import status, viewsets, generics, serializers, mixins
from .api import Comment
from .serializers import CommentSerializer
from django.http import JsonResponse
from django.views import View
from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Songs
from django.db.models import query
from .serializers import SongsSerializer
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from rest_framework import status
from .serializers import PlaylistSerializer
from models import Playlist

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

#create views for songs model
#A dictionary was created to add dummy data

class SongsView(generics.ListAPIView, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin, mixins.DestroyModelMixin ):

    serializer_class =  SongsSerializer
    queryset = Songs.objects.all()
    lookup_field = 'id'


    def get(self,request, id=None):
        # this gets the number of songs in the DB
        queryset = self.get_queryset()

        if id:
            return self.retrieve(request)
        # if the array is empty, the default at the beginning, it returns this 
        # dummy data
        elif id == None and len(queryset) == 0:
            data = {
                    "id": 8,
                    "title": "Essence (ft Tems)",
                    "artiste": "Wizkid",
                    "album": "Made in Lagos",
                    "media_thumbnail": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2Fm77FDcKg96Q%2Fmaxresdefault.jpg&f=1&nofb=1",
                    "media_url": "https://www.youtube.com/watch?v=jipQpjUA_o8",
                    "likes": 12,
                    "time_added": "2021-09-04T09:54:08.834178Z"
                }
            return JsonResponse(data)
        else:
            return self.list(request)

    def post(self,request):
        return self.create(request)

    def put(self,request, id=None):
        return self.update(request, id)

    def delete(self,request, id=None):
        return self.destroy(request, id)



@api_view(['GET', ])
def api_playlist_views(request):
    data = {
            "title": "Youtube Media Playlist",
            "songs": "Wizkid",
            "created_date": "2020",
            "updated_date": "2021",
        }
    try:
        playlist=Playlist.objects.all()
    except Playlist.DoestNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = PlaylistSerializer(playlist)
        return JsonResponse(data)