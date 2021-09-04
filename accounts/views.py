from django.http import JsonResponse
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


# Create your all views here
class SongsView(generics.ListAPIView, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin, mixins.DestroyModelMixin ):

    serializer_class =  SongsSerializer
    queryset = Songs.objects.all()
    lookup_field = 'id'



    def get(self,request, id=None):
        if id:
            return self.retrieve(request)
        else:
            return self.list(request)

    def post(self,request):
        return self.create(request)

    def put(self,request, id=None):
        return self.update(request, id)

    def delete(self,request, id=None):
        return self.destroy(request, id)