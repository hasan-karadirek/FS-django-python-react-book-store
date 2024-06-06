from rest_framework import serializers
from .models import (
    Book,
    Author,
    PublishingHouse,
    BookImage,
    Language,
    Category,
    Tag,
    BookTagAssociation,
)


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ["id", "name"]


class PublishingHouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PublishingHouse
        fields = ["id", "name"]


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ["id", "name"]


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name"]


class BookTagSerializer(serializers.ModelSerializer):
    tag = TagSerializer(read_only=True)

    class Meta:
        model = BookTagAssociation
        fields = ["tag"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "title"]


class BookImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookImage
        fields = ["book", "image"]


class BookSerializer(serializers.ModelSerializer):
    isbn = serializers.CharField(max_length=20, allow_blank=True)
    env_no = serializers.IntegerField()
    title = serializers.CharField(max_length=255)
    author = serializers.CharField(max_length=255)
    language = serializers.CharField(max_length=255)
    publishing_house = serializers.CharField(max_length=255)
    cover = serializers.ChoiceField(choices=Book.coverChoices)
    year = serializers.IntegerField()
    edition = serializers.CharField(max_length=255)
    category = serializers.CharField(max_length=255)
    condition_description = serializers.CharField(max_length=255)
    condition = serializers.ChoiceField(choices=Book.conditionChoices)
    price = serializers.DecimalField(max_digits=10, decimal_places=2)
    entry = serializers.DateField(write_only=True)
    status = serializers.ChoiceField(choices=Book.statusChoices)
    tags = BookTagSerializer(source="booktagassociation_set", many=True, required=False)
    tag_names = serializers.ListField(
        child=serializers.CharField(max_length=100), write_only=True
    )
    images = BookImageSerializer(many=True, required=False)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(max_length=255), write_only=True
    )

    class Meta:
        model = Book
        fields = [
            "id",
            "isbn",
            "env_no",
            "title",
            "author",
            "publishing_house",
            "language",
            "cover",
            "year",
            "edition",
            "category",
            "condition_description",
            "condition",
            "price",
            "entry",
            "status",
            "tags",
            "tag_names",
            "images",
            "uploaded_images",
            "description"
        ]

    def create(self, validated_data):
        # pop before create Book obj
        images_data = validated_data.pop("uploaded_images", [])
        tag_names = validated_data.pop("tag_names", [])

        # Get or create the author
        author_name = validated_data.pop("author")
        author, _ = Author.objects.get_or_create(name=author_name)

        # Get or create the publishing house
        publishing_house_name = validated_data.pop("publishing_house")
        publishing_house, _ = PublishingHouse.objects.get_or_create(
            name=publishing_house_name
        )
        # language
        language_name = validated_data.pop("language")
        language, _ = Language.objects.get_or_create(name=language_name)
        # category
        category_title = validated_data.pop("category")
        category, _ = Category.objects.get_or_create(title=category_title)
        print(validated_data, images_data, tag_names)
        # Create the book instance
        book = Book.objects.create(
            author=author,
            publishing_house=publishing_house,
            language=language,
            category=category,
            **validated_data
        )

        # Handle book images]
        book_images = []
        for image_data in images_data:
            book_img = BookImage.objects.create(book=book, image=image_data)
            book_images.append(book_img)
        # Handle tags
        for tag_name in tag_names:
            tag, _ = Tag.objects.get_or_create(name=tag_name)
            BookTagAssociation.objects.create(book=book, tag=tag)

        return book

    def update(self, instance, validated_data):
        images_data = validated_data.pop("uploaded_images", [])
        tag_names = validated_data.pop("tag_names", [])

        instance.isbn = validated_data.get("isbn", instance.isbn)
        instance.title = validated_data.get("title", instance.title)
        instance.env_no = validated_data.get("env_no", instance.env_no)
        instance.cover = validated_data.get("cover", instance.cover)
        instance.year = validated_data.get("year", instance.year)
        instance.edition = validated_data.get("edition", instance.edition)
        instance.condition_description = validated_data.get(
            "condition_description", instance.condition_description
        )
        instance.condition = validated_data.get("condition", instance.condition)
        instance.price = validated_data.get("price", instance.price)
        instance.entry = validated_data.get("entry", instance.entry)
        instance.status = validated_data.get("status", instance.status)

        author_name = validated_data.pop("author", None)
        if author_name:
            author, _ = Author.objects.get_or_create(name=author_name)
            instance.author = author

        publishing_house_name = validated_data.pop("publishing_house", None)
        if publishing_house_name:
            publishing_house, _ = PublishingHouse.objects.get_or_create(
                name=publishing_house_name
            )
            instance.publishing_house = publishing_house
        category_title = validated_data.pop("category", None)
        if category_title:
            category, _ = Category.objects.get_or_create(title=category_title)
            instance.category = category
        language_name = validated_data.pop("language", None)
        if language_name:
            language, _ = Language.objects.get_or_create(name=language_name)
            instance.language = language

        instance.save()

        book_images = []
        if images_data:
            for image_data in images_data:
                img = BookImage.objects.create(book=instance, image=image_data)
                book_images.append(img)
        if tag_names:
            for tag_name in tag_names:
                tag, _ = Tag.objects.get_or_create(name=tag_name,)
                BookTagAssociation.objects.get_or_create(tag=tag, book=instance)

        return instance


class UpdateBooksSerializer(serializers.Serializer):
    file = serializers.FileField()

    def validate_file(self, value):
        if not value.name.endswith(".xlsx"):
            raise serializers.ValidationError(
                "Invalid file type. Please upload an xlsx file."
            )
        return value
