from rest_framework import serializers
from .models import Customer


class UserSerializer(serializers.ModelSerializer):


    class Meta:
        model = Customer
        fields = ("username", "email", "password","first_name", "last_name")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = Customer.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"]
        )
        return user
