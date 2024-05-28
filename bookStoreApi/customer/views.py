from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import (
    UserSerializer,
    ForgotPasswordSerializer,
    ResetPasswordSerializer,
)
from core.custom_error_handler import CustomAPIException
from rest_framework.parsers import FormParser, JSONParser
from .models import Customer
from store.models import Order
from store.serializers import OrderSerializer
from django.core.mail import send_mail
from django.conf import settings


class UserRegistrationAPIView(APIView):
    parser_classes = (FormParser, JSONParser)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            send_mail(
                "You are registered.",
                "You are registered Le Fleneur Amsterdam Book Store's website.",
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                fail_silently=True,
            )
            token, created = Token.objects.get_or_create(user=user)
            order = None
            if request.COOKIES.get("session_id"):
                try:
                    order = Order.objects.get(
                        session_id=request.COOKIES.get("session_id"), status="OPEN"
                    )
                    order.customer = user
                    order.save()
                except Order.DoesNotExist:
                    order = None
            orderSerializer = OrderSerializer(order) if order else None
            res_data = {
                "success": True,
                "data": {
                    "order": orderSerializer.data if orderSerializer else None,
                    "customer": serializer.data,
                    "token": token.key,
                },
            }

            return Response(res_data, status=status.HTTP_201_CREATED)
        raise CustomAPIException(str(serializer.errors), status=400)


class LoginAPIView(APIView):
    parser_classes = (FormParser, JSONParser)

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        try:
            customer = Customer.objects.get(email=email)
        except Customer.DoesNotExist:
            raise CustomAPIException("Invalid Credentials", status=400)
        user = authenticate(username=customer.username, password=password)
        order = None
        if user:
            if request.COOKIES.get("session_id"):
                try:
                    order = Order.objects.get(
                        session_id=request.COOKIES.get("session_id"), status="OPEN"
                    )
                    order.customer = customer
                    order.save()
                except Order.DoesNotExist:
                    order = None
            else:
                order_qs = Order.objects.filter(customer=user, status="OPEN").order_by(
                    "-id"
                )
                if order_qs.exists():
                    order = order_qs.first()
            token, created = Token.objects.get_or_create(user=user)
            serializer = UserSerializer(customer)
            orderSerializer = OrderSerializer(order) if order else None
            return Response(
                {
                    "success": True,
                    "data": {
                        "token": token.key,
                        "customer": serializer.data,
                        "order": orderSerializer.data if orderSerializer else None,
                    },
                }
            )
        raise CustomAPIException("Invalid Credentials", status=400)


class LogoutAPIView(APIView):
    permission_classes = {permissions.IsAuthenticated}

    def get(self, request):
        request.user.auth_token.delete()
        response = Response({"success": True}, status=status.HTTP_200_OK)
        response.delete_cookie("session_id")
        response.delete_cookie("token")
        return response


class ForgotPasswordAPIView(APIView):
    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        if serializer.is_valid():
            try:
                customer = Customer.objects.get(
                    email=serializer.validated_data["email"]
                )
                token, created = Token.objects.get_or_create(user=customer)
                if not created:
                    token.delete()

                    token = Token.objects.create(user=customer)

                    send_mail(
                        "Password Reset Link - La Fleneur Amsterdam",
                        f"You can reset your password by following link: http:localhost:8080/customer/resetpassword?token={token.key}",
                        settings.DEFAULT_FROM_EMAIL,
                        [customer.email],
                        fail_silently=True,
                    )
            except Customer.DoesNotExist:
                raise CustomAPIException(
                    "There is no such a user associated with this email.",
                    status=status.HTTP_404_NOT_FOUND,
                )

        return Response({"success": True}, status=status.HTTP_200_OK)


class ResetPasswordAPIView(APIView):
    def post(self, request):
        token_key = request.query_params.get("token", None)
        if not token_key:
            raise CustomAPIException(
                "Please provide a valid token", status=status.HTTP_400_BAD_REQUEST
            )
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            try:
                token = Token.objects.get(key=token_key)
                user = token.user
                new_password = serializer.validated_data["password"]
                user.set_password(new_password)
                user.save()
                token.delete()
                send_mail(
                    "Your password is reseted - La Fleneur Amsterdam",
                    f"You have reseted your password",
                    settings.DEFAULT_FROM_EMAIL,
                    [user.email],
                    fail_silently=True,
                )
            except Token.DoesNotExist:
                raise CustomAPIException(
                    "Your password reset token is not correct",
                    status=status.HTTP_400_BAD_REQUEST,
                )

        return Response({"success": True}, status=status.HTTP_200_OK)


class CustomerDashboardAPIView(APIView):
    permission_classes = {permissions.IsAuthenticated}

    def get(self, request):
        orders = Order.objects.filter(customer=request.user).exclude(
            status__in=["OPEN"]
        )
        orderSerializer = OrderSerializer(orders, many=True)
        customerSerializer = UserSerializer(request.user)
        response = {"success": True, "data": {}}
        response["data"]["orders"] = orderSerializer.data
        response["data"]["customer"] = customerSerializer.data
        return Response(response, status=status.HTTP_200_OK)
