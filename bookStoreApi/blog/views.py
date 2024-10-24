from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from core.custom_exceptions import CustomAPIException
from core.mixins import IsPostExist, IsFormExist
from .serializers import PostSerializer, FormSerializer
from .models import Post, Form
from core.helpers import pagination
from django.core.mail import send_mail
from django.conf import settings
import os

# Create your views here.
class AddPostAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)  # To handle file uploads
    permission_classes = [permissions.IsAdminUser]

    def post(self, request, *args, **kwargs):
        serializer = PostSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            raise CustomAPIException(str(serializer.errors), status=400)


class UpdatePostAPIView(IsPostExist, APIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
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


class GetPostsAPIView(APIView):
    def get(self, request, *args, **kwargs):

        books = Post.objects.all()
        paginated_data = pagination(books, 10, request.query_params.get("page", 1))
        page = paginated_data["page"]
        serializer = PostSerializer(page, many=True)
        return Response(
            {"success": True, "data": serializer.data}, status=status.HTTP_200_OK
        )


class GetPostAPIView(IsPostExist, APIView):
    def get(self, request, *args, **kwargs):
        serializer = PostSerializer(request.post)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CreateFormAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def post(self, request, *args, **kwargs):
        serializer = FormSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            # Add email
            send_mail(
                    f"{serializer.validated_data['name']} send  a form. Le Flaneur Amsterdam",
                    f"You received a form from {serializer.validated_data['name']}. You can view the form by following link: {os.getenv('BASE_SERVER_URL')}/admin/blog/form/{serializer.validated_data['id']}",
                    settings.DEFAULT_FROM_EMAIL,
                    [settings.DEFAULT_FROM_EMAIL],
                    fail_silently=True
                )
            send_mail(
                    "We received your form. Le Flaneur Amsterdam",
                    "We received your form. We will contact with you as soon as possible.",
                    settings.DEFAULT_FROM_EMAIL,
                    [serializer.validated_data["email"]],
                    fail_silently=True
                )
            response = {"success": True, "data": serializer.data}
            return Response(response, status=status.HTTP_201_CREATED)
        else:
            raise CustomAPIException(str(serializer.errors), status=400)


class DeleteFormAPIView(IsFormExist, APIView):
    permission_classes = [permissions.IsAdminUser]
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def delete(self, request, formPk, *args, **kwargs):
        request.form.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class GetFormsAPIView(APIView):
    permission_classes = [permissions.IsAdminUser]
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def get(self, request, *args, **kwargs):
        forms = Form.objects.all()

        page = pagination(forms, 10, request.query_params.get("page", 1))
        serializer = FormSerializer(page, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetFormAPIView(IsFormExist, APIView):
    permission_classes = [permissions.IsAdminUser]
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def get(self, request, formPk, *args, **kwargs):

        serializer = FormSerializer(request.form)
        return Response(serializer.data, status=status.HTTP_200_OK)
