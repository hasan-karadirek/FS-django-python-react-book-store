from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from core.custom_exceptions import CustomAPIException
from core.mixins import IsPostExist
from .serializers import PostSerializer,FormSerializer
from .models import Post
from django.core.paginator import Paginator, EmptyPage

# Create your views here.
class AddPostAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser,JSONParser)  # To handle file uploads
    permission_classes = [permissions.IsAdminUser]

    def post(self, request, *args, **kwargs):
        serializer = PostSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            raise CustomAPIException(str(serializer.errors), status=400)

class UpdatePostAPIView(IsPostExist, APIView):
    parser_classes = (MultiPartParser, FormParser,JSONParser)
    permission_classes = [permissions.IsAdminUser]

    def put(self, request, postPk, *args, **kwargs):
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
class GetPostsAPIView( APIView):
    
    def get(self, request, *args, **kwargs):
        books=Post.objects.all()
        paginator=Paginator(books,10)
        page_number = request.query_params.get("page", 1)
        try:
            page = paginator.page(page_number)
        except EmptyPage:
            raise CustomAPIException("No more pages", status=404)
        serializer=PostSerializer(page,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
class GetPostAPIView( IsPostExist,APIView):
    
    def get(self, request, *args, **kwargs):

        serializer=PostSerializer(request.post)
        return Response(serializer.data,status=status.HTTP_200_OK)

class CreateFormAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser) 
    def post(self, request, *args, **kwargs):
        serializer = FormSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            raise CustomAPIException(str(serializer.errors), status=400)