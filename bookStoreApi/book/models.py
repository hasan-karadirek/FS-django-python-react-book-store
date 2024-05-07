from django.db import models
from django.conf import settings
import datetime

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
class Language(models.Model):
    name=models.CharField(max_length=255)

    def __str__(self):
        return self.name
class Tag(models.Model):
    name=models.CharField(max_length=255)
    def __str__(self):
        return self.name
class Category(models.Model):
    title=models.CharField(max_length=255, unique=True)
    
    def __str__(self):
        return self.title

# Book Model
class Book(models.Model):
    coverChoices = [
        ("PAPERBACK", "Paperback"),
        ("HARDCOVER", "Hardcover"),
        ("POCKET", "Pocket")
    ]
    conditionChoices = [
        ("NEW", "New"),
        ("LIKE_NEW", "Like New"),
        ("GOOD", "Good"),
        ("REASONABLE", "Reasonable"),
    ]
    statusChoices = [
        ("OPEN", "Open"),
        ("SOLD", "Sold"),
        ("PENDING", "Pending"),
        ("DRAFT", "Draft"),
    ]
    Isbn = models.CharField(max_length=20,null=True)
    env_no=models.IntegerField(unique=True)
    title = models.CharField(max_length=255)
    author = models.ForeignKey(Author,related_name="author")
    language=models.ForeignKey(Language,related_name="language")
    cover= models.CharField(
        max_length=50,
        choices=coverChoices,
        verbose_name="Cover type of the book",
    )
    publishing_house = models.ForeignKey(PublishingHouse)
    year=models.IntegerField(min=1700,max=datetime.date.today().year)
    edition=models.CharField(max_length=255)
    category=models.ForeignKey(Category,related_name="category")
    condition_description=models.CharField(max_length=255)
    condition=models.CharField(
        max_length=50,
        choices=conditionChoices,
        verbose_name="Condition of the book",
    )
    tags=models.ForeignKey(Tag, related_name="tag")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    entry=models.DateField(default=datetime.now(datetime.timezone.utc))
    status=models.CharField(
        max_length=50,
        choices=statusChoices,
        verbose_name="Status of the book",
    )



    def __str__(self):
        return f"{self.title} - {self.author.name} - {self.year}"


class BookImage(models.Model):
    book = models.ForeignKey(Book, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="book_images/")

    def __str__(self):
        return f"{self.book.title} - {self.image.url}"
