from django.db import models
from django.utils import timezone


# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    image = models.ImageField(upload_to="book_images/")
    created_at = models.DateTimeField(default=timezone.now, auto_now_add=True, null=True)

    def __str__(self):
        return self.title


class Form(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(blank=False, null=False)
    message = models.TextField()
    created_at = models.DateTimeField(default=timezone.now, auto_now_add=True, null=True)

    def __str__(self):
        return self.name


class FormImage(models.Model):
    form = models.ForeignKey(Form, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="form_images/")

    def __str__(self):
        return f"{self.form.name} - {self.image.url}"
