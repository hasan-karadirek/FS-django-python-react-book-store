from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework import status,permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from core.custom_error_handler import CustomAPIException
from rest_framework.parsers import  FormParser, JSONParser
from .models import Customer
from store.models import Order
from store.serializers import OrderSerializer


class UserRegistrationAPIView(APIView):
    parser_classes = (FormParser,JSONParser)
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user=serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            order=None
            if request.COOKIES.get("session_id"):
                try:
                    order=Order.objects.get(session_id=request.COOKIES.get("session_id"),status="OPEN")
                    order.customer=user
                    order.save()
                except Order.DoesNotExist:
                    order=None
            orderSerializer=OrderSerializer(order) if order else None
            res_data={"success":True, "data":{"order":orderSerializer.data if orderSerializer else None, "customer":serializer.data, "token":token.key }}

            return Response(res_data, status=status.HTTP_201_CREATED)
        raise CustomAPIException(str(serializer.errors), status=400)


class LoginAPIView(APIView):
    parser_classes = (FormParser,JSONParser)
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        try:
            customer=Customer.objects.get(email=email)
        except Customer.DoesNotExist:
            raise CustomAPIException("Invalid Credentials", status=400)
        user = authenticate(username=customer.username,password=password)
        order=None
        if user:
            if request.COOKIES.get("session_id"):
                try:
                    order=Order.objects.get(session_id=request.COOKIES.get("session_id"),status="OPEN")
                    order.customer=customer
                    order.save()
                except Order.DoesNotExist:
                    order=None
            else:
                order_qs=Order.objects.filter(customer=user,status="OPEN").order_by("-id")
                if order_qs.exists():
                    order=order_qs.first()
            token, created = Token.objects.get_or_create(user=user)
            serializer=UserSerializer(customer)
            orderSerializer=OrderSerializer(order) if order else None
            return Response({"success":True,"data":{"token": token.key, "customer":serializer.data,"order":orderSerializer.data  if orderSerializer else None}})
        raise CustomAPIException("Invalid Credentials", status=400)


class LogoutAPIView(APIView):
    permission_classes={permissions.IsAuthenticated}
    def get(self, request):
        request.user.auth_token.delete()
        response=Response({"success":True},status=status.HTTP_200_OK)
        response.delete_cookie("session_id")
        response.delete_cookie("token")
        return response
