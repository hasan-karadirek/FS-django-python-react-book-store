from rest_framework import status,permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Book
from .serializers import BookSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from core.custom_exceptions import CustomAPIException
from core.mixins import IsBookExist

class AddBookAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)  # To handle file uploads
    permission_classes=[permissions.IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        serializer = BookSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            raise CustomAPIException(str(serializer.errors), status=400)
        
class UpdateBookAPIView(IsBookExist,APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes=[permissions.IsAdminUser]

    def put(self, request, pk, *args, **kwargs):

        serializer = BookSerializer(request.book, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            raise CustomAPIException(str(serializer.errors), status=400)
class DeleteBookAPIView(IsBookExist,APIView):
    permission_classes=[permissions.IsAdminUser]
    def delete(self, request, pk, *args, **kwargs):

        request.book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
class GetBookAPIView(IsBookExist,APIView):
    
    def get(self, request, pk, *args, **kwargs):

        serializer=BookSerializer(request.book)
        return Response(serializer.data, status=status.HTTP_200_OK)
class GetBooksAPIView(APIView):
    
    def get(self, request,  *args, **kwargs):
        
        books = Book.objects.all()

        serializer=BookSerializer(books,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)