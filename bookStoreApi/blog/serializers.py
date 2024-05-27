from rest_framework import serializers
from .models import Post, FormImage, Form
from core.mixins import IsPostExist
from core.custom_exceptions import CustomAPIException


class PostSerializer(serializers.ModelSerializer):
    title = serializers.CharField(required=False)
    content = serializers.CharField(required=False)
    image = serializers.ImageField(required=False)
    id = serializers.IntegerField(read_only=True)  # Add field for object id
    created = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Post
        fields = ["id", "title", "content", "image", "created"]

    def create(self, validated_data):
        if (
            "title" not in validated_data
            or "content" not in validated_data
            or "image" not in validated_data
        ):
            raise CustomAPIException(
                "Title, content and image are required field for creating a post!", 404
            )
        image = validated_data.pop("image")
        title = validated_data.pop("title")
        content = validated_data.pop("content")

        post = Post.objects.create(title=title, content=content, image=image)

        return post

    def update(self, instance, validated_data):

        instance.title = validated_data.get("title", instance.title)
        instance.content = validated_data.get("content", instance.content)
        instance.image = validated_data.get("image", instance.image)

        instance.save()

        return instance


class FormImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormImage
        fields = ["image"]


class FormSerializer(serializers.ModelSerializer):
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(max_length=255), write_only=True, required=False
    )
    images = FormImageSerializer(many=True, read_only=True)

    class Meta:
        model = Form
        fields = ["id", "name", "email", "message", "images", "uploaded_images"]

    def create(self, validated_data):
        images_data = validated_data.pop("uploaded_images", [])

        form = Form.objects.create(**validated_data)
        for image_data in images_data:
            FormImage.objects.create(form=form, image=image_data)
        return form
