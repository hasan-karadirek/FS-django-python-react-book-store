from rest_framework import serializers

class MollieHookSerializer(serializers.ModelSerializer):
    id=serializers.CharField(max_length = 100)