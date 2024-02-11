from rest_framework import serializers
from .models import Customer


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ("username", "email", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = Customer.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        return user
