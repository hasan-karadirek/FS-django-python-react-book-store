from rest_framework import serializers
from .models import OrderDetail, Order
from book.serializers import BookSerializer
from core.custom_exceptions import CustomAPIException




class OrderDetailSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)

    class Meta:
        model = OrderDetail
        fields = ["id","order", "book"]


class OrderSerializer(serializers.ModelSerializer):
    order_details = OrderDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ["id", "customer", "cost", "address", "status", "order_details"]


class CheckoutSerializer(serializers.Serializer):
    redirectUrl = serializers.CharField()
