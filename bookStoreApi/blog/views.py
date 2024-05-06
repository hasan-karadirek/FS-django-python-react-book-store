from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from core.custom_exceptions import CustomAPIException
from core.mixins import IsPostExist
from .serializers import PostSerializer,FormSerializer

# Create your views here.
class AddPostAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)  # To handle file uploads
    permission_classes = [permissions.IsAdminUser]

    def post(self, request, *args, **kwargs):
        serializer = PostSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            raise CustomAPIException(str(serializer.errors), status=400)

class UpdatePostAPIView(IsPostExist, APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.IsAdminUser]

    def put(self, request, pk, *args, **kwargs):

        serializer = PostSerializer(request.post, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            raise CustomAPIException(str(serializer.errors), status=400)

class DeletePostAPIView(IsPostExist, APIView):
    permission_classes = [permissions.IsAdminUser]

    def delete(self, request, pk, *args, **kwargs):
        request.post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CreateFormAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)  # To handle file uploads

    def post(self, request, *args, **kwargs):
        serializer = FormSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            raise CustomAPIException(str(serializer.errors), status=400)