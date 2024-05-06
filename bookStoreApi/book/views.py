from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Book
from .serializers import BookSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from core.custom_exceptions import CustomAPIException
from core.mixins import IsBookExist
from django.db.models import Exists, OuterRef, Count, Q
from store.models import BookOnSale, Book
from django.core.paginator import Paginator, EmptyPage


class AddBookAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)  # To handle file uploads
    permission_classes = [permissions.IsAuthenticated]

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
        open_sales = BookOnSale.objects.filter(book=OuterRef("pk"), status="OPEN")
        books = Book.objects.annotate(
            has_open_sale=Exists(open_sales),
            saleCount=Count("bookonsale", filter=Q(bookonsale__status="OPEN")),
        )
        search_query = request.query_params.get("search", None)
        if search_query:
            books = books.filter(
                Q(name__icontains=search_query)
                | Q(author__name__icontains=search_query)
                | Q(ean__icontains=search_query)
                | Q(publishing_house__name__icontains=search_query)
            )
        books = books.order_by("-has_open_sale")

        page_number = request.query_params.get("page", 1)

        paginator = Paginator(books, 20)

        try:
            page = paginator.page(page_number)
        except EmptyPage:
            raise CustomAPIException("No more pages", status=404)

        serializer = BookSerializer(page, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetOrCreateBookByEANView(APIView):

    def get(self, request, *args, **kwargs):

        ean = request.query_params.get("ean", None)

        if not ean:
            raise CustomAPIException("Please provide a valid EAN!", status=400)
        try:
            book = Book.objects.get(ean=ean)
        except Book.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer = BookSerializer(book)
        return Response(serializer.data, status=status.HTTP_200_OK)
