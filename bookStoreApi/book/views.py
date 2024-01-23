from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Book
from .serializers import BookSerializer
from rest_framework.parsers import MultiPartParser, FormParser

class AddBookAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)  # To handle file uploads
    
    def post(self, request, *args, **kwargs):
        serializer = BookSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class UpdateBookAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def put(self, request, pk, *args, **kwargs):
        try:
            book = Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = BookSerializer(book, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class DeleteBookAPIView(APIView):
    
    def delete(self, request, pk, *args, **kwargs):
        try:
            book = Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
class GetBookAPIView(APIView):
    
    def get(self, request, pk, *args, **kwargs):
        try:
            book = Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer=BookSerializer(book)
        return Response(serializer.data, status=status.HTTP_200_OK)
class GetBooksAPIView(APIView):
    
    def get(self, request,  *args, **kwargs):
        
        books = Book.objects.all()

        serializer=BookSerializer(books,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)