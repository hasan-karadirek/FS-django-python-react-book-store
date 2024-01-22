from rest_framework import serializers
from .models import Book, Author, PublishingHouse, BookImage

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'name']

class PublishingHouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PublishingHouse
        fields = ['id', 'name']

class BookImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookImage
        # The 'image' field will output the URL path of the image
        fields = ['id', 'image']

class BookSerializer(serializers.ModelSerializer):
    # Nested serializers to show details of the relationships
    author = AuthorSerializer(read_only=True)
    publishing_house = PublishingHouseSerializer(read_only=True)
    images = BookImageSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = ['id', 'ean', 'name', 'author', 'publishing_house', 'images']
