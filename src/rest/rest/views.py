from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from pymongo import MongoClient
from . serializer import *

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']
collection = db['todos']

class TodoListView(APIView):

    def get(self, request):
        todos = list(collection.find({}, {'_id': 0}))
        return Response(todos, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        if "text" not in data:
            return Response({"error": "Todos is required"}, status=status.HTTP_400_BAD_REQUEST)

        new_todo = {
            "text": data["text"]
        }

        result = collection.insert_one(new_todo)
        return Response({"id": str(result.inserted_id)}, status=status.HTTP_201_CREATED)

