from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Book, Category, Language
from .serializers import BookSerializer, CategorySerializer, LanguageSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from core.custom_exceptions import CustomAPIException
from core.mixins import IsBookExist
from core.helpers import pagination
from django.db.models import Q


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
        response = {"data": serializer.data, "success": True}
        return Response(response, status=status.HTTP_200_OK)


class GetBooksAPIView(APIView):
    def get(self, request, *args, **kwargs):

        # Subquery to check for open sales for a book
        category_query = request.query_params.get("category", None)
        language_query = request.query_params.get("language", None)
        filter_criteria = {"status": "OPEN"}

        if category_query:
            filter_criteria["category__title"] = category_query
        if language_query:
            filter_criteria["language__name"] = language_query
        books = Book.objects.filter(**filter_criteria)
        search_query = request.query_params.get("search", None)
        if search_query:
            books = books.filter(
                (
                    Q(title__icontains=search_query)
                    | Q(author__name__icontains=search_query)
                    | Q(isbn__icontains=search_query)
                    | Q(publishing_house__name__icontains=search_query)
                    | Q(tags__name__icontains=search_query)
                )
            ).distinct()

        page_number = request.query_params.get("page", 1)
        paginated_data = pagination(books, 20, page_number)
        page = paginated_data["page"]

        serializer = BookSerializer(page, many=True)
        paginated_data["page"] = serializer.data

        response = {"data": paginated_data, "success": True}
        return Response(response, status=status.HTTP_200_OK)


class GetAllCategoriesApiView(APIView):
    def get(self, request, *args, **kwargs):

        categories = Category.objects.all().distinct()

        serializer = CategorySerializer(categories, many=True)
        response = {"data": serializer.data, "success": True}
        return Response(response, status=status.HTTP_200_OK)


class GetAllLanguagesApiView(APIView):
    def get(self, request, *args, **kwargs):
        languages = Language.objects.all().distinct()
        serializer = LanguageSerializer(languages, many=True)
        response = {"data": serializer.data, "success": True}
        return Response(response, status=status.HTTP_200_OK)
