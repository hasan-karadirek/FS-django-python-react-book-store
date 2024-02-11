from rest_framework import serializers


class MollieHookSerializer(serializers.Serializer):
    id = serializers.CharField(max_length=100)
