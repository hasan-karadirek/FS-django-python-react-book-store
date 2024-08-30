from rest_framework import serializers
from .models import OrderDetail, Order, Address
from book.serializers import BookSerializer
from core.custom_exceptions import CustomAPIException


class OrderDetailSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)

    class Meta:
        model = OrderDetail
        fields = ["id", "order", "book"]


class AddressSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(max_length=50)
    email = serializers.EmailField()
    street = serializers.CharField(max_length=255)
    city = serializers.CharField(max_length=255)
    postcode = serializers.CharField(max_length=10)
    country = serializers.CharField(max_length=50)

    class Meta:
        model = Address
        fields = ["full_name", "email", "street", "city", "postcode", "country"]


class OrderSerializer(serializers.ModelSerializer):
    order_details = OrderDetailSerializer(many=True, read_only=True)
    address = AddressSerializer()

    class Meta:
        model = Order
        fields = [
            "id",
            "customer",
            "cost",
            "address",
            "status",
            "order_details",
            "post_cost",
        ]


class CheckoutSerializer(serializers.Serializer):
    address = AddressSerializer()
    redirectUrl = serializers.CharField()
