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
        fields = ["book",'image']

class BookSerializer(serializers.ModelSerializer):
    author = serializers.CharField()
    publishing_house = serializers.CharField()
    images = BookImageSerializer(many=True,read_only=True)
    uploaded_images=serializers.ListField(
        child=serializers.ImageField(max_length = 1000000),
        write_only=True
    )
    class Meta:
        model = Book
        fields = ['ean', 'name', 'author', 'publishing_house', 'images','uploaded_images']

    def create(self, validated_data):
        # pop before create Book obj
        images_data = validated_data.pop('uploaded_images')
        
        # Get or create the author
        author_name = validated_data.pop('author')
        author, _ = Author.objects.get_or_create(name=author_name)
        
        # Get or create the publishing house
        publishing_house_name = validated_data.pop('publishing_house')
        publishing_house, _ = PublishingHouse.objects.get_or_create(name=publishing_house_name)

        
        # Create the book instance
        book = Book.objects.create(author=author, publishing_house=publishing_house, **validated_data)

        # Handle book images
        
        for image_data in images_data:
            BookImage.objects.create(book=book, image=image_data)
        return book
