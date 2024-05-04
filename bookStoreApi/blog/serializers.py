from rest_framework import serializers
from .models import Post
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