from django.http import JsonResponse
from django.views import View
from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Songs
from django.db.models import query
from rest_framework import generics, serializers, status
from .serializers import SongsSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import mixins
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer

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

        # Create your views here
class SongsView(generics.ListAPIView):

    serializer_class =  SongsSerializer
    queryset = Songs.objects.all()
    # print(dir( serializer_class ))
