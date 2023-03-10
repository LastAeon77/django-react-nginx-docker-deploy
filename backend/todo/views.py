# from django.shortcuts import render
from rest_framework import generics, status
from .models import Todo
from .serializers import TodoSerializer
from rest_framework.views import APIView
from rest_framework.response import Response


# Create your views here.
class TodoSerial(generics.ListAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class TodoCreate(APIView):
    # note that there's no permission settings at the moment.
    # If you want to restrict it, you will need to either start adjusting permissions or check user.
    def post(sekf,request,format="json"):
        serializer = TodoSerializer(data=request)
        if serializer.is_valid():
            serializer.save()
            return Response("New todo has been created!", status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)