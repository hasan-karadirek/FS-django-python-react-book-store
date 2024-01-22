from django.db import models
from django.conf import settings

# Author Model
class Author(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

# Publishing House Model
class PublishingHouse(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

# Book Model
class Book(models.Model):
    ean = models.CharField(max_length=13, unique=True)
    name = models.CharField(max_length=255)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    publishing_house = models.ForeignKey(PublishingHouse, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
class BookImage(models.Model):
    book = models.ForeignKey(Book, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='book_images/',max_length=1000000)  

    def __str__(self):
        return f'{self.book.name} - {self.image.url}'  
