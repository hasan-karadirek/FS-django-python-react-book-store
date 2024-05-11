from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Book
from .serializers import BookSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from core.custom_exceptions import CustomAPIException
from core.mixins import IsBookExist
from core.helpers import pagination
from django.db.models import Q
from store.models import  Book


class AddBookAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)  # To handle file uploads
    permission_classes = [permissions.IsAdminUser]

    def post(self, request, *args, **kwargs):
        serializer = BookSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            raise CustomAPIException(str(serializer.errors), status=400)


class UpdateBookAPIView(IsBookExist, APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.IsAdminUser]

    def put(self, request, pk, *args, **kwargs):

        serializer = BookSerializer(request.book, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            raise CustomAPIException(str(serializer.errors), status=400)


class DeleteBookAPIView(IsBookExist, APIView):
    permission_classes = [permissions.IsAdminUser]

    def delete(self, request, pk, *args, **kwargs):

        request.book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class GetBookAPIView(IsBookExist, APIView):

    def get(self, request, pk, *args, **kwargs):

        serializer = BookSerializer(request.book)
        return Response(serializer.data, status=status.HTTP_200_OK)

class GetBooksAPIView(APIView):

    def get(self, request, *args, **kwargs):

        # Subquery to check for open sales for a book
        category_query = request.query_params.get("category",None)
        if category_query:
            books = Book.objects.filter(category__name=category_query)
        else:
            books = Book.objects.all()
        search_query = request.query_params.get("search", None)
        if search_query:
            books = books.filter(
                Q(status="OPEN") 
                &                 
                (
                Q(title__icontains=search_query)
                | Q(author__name__icontains=search_query)
                | Q(isbn__icontains=search_query)
                | Q(publishing_house__name__icontains=search_query)
                | Q(tags__name__icontains=search_query)

                )
            ).distinct() 

        page_number = request.query_params.get("page", 1)

        page=pagination(books,20,page_number)

        serializer = BookSerializer(page, many=True)
        response={"data":serializer.data,"success":True}
        return Response(response, status=status.HTTP_200_OK)

