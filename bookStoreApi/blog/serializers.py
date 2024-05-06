from rest_framework import serializers
from .models import Post,FormImage,Form
from core.mixins import IsPostExist

class PostSerializer(serializers.ModelSerializer):
    title = serializers.CharField()
    content = serializers.CharField()
    image=serializers.ImageField()

    class Meta:
        model=Post
        fields=["title","content","image"]

    def create(self, validated_data):
        image=validated_data.pop("image")
        title=validated_data.pop("title")
        content=validated_data.pop("content")

        post=Post.objects.create(title=title,content=content,image=image)
        
        return post
    def update(self, instance, validated_data):
        image=validated_data.pop("image",None)
        if image:
            instance.image=image
        title=validated_data.pop("title",None)
        if title:
            instance.title=title
        content=validated_data.pop("content")
        if content:
            instance.content=content
        instance.save()
        return instance


class FormImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormImage
        fields = ["form", "image"]

class FormSerializer(serializers.ModelSerializer):
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(max_length=255), write_only=True
    )
    images=FormImageSerializer(many=True,read_only=True)

    class Meta:
        model=Post
        fields=["name","email","message","images"]

    def create(self, validated_data):
        images_data = validated_data.pop("uploaded_images")
        

        form=Form.objects.create(**validated_data)

        for image_data in images_data:
            FormImage.objects.create(form=form, image=image_data)
        return form
        