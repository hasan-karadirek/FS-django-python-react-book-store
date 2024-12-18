from django.db import models
from django.conf import settings
import datetime
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.text import slugify

# Author Model
class Author(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


# Publishing House Model
class PublishingHouse(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class Language(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class Category(models.Model):
    title = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.title


# Book Model
class Book(models.Model):
    coverChoices = [
        ("PAPERBACK", "Paperback"),
        ("HARDCOVER", "Hardcover"),
        ("POCKET", "Pocket"),
    ]
    conditionChoices = [
        ("NEW", "New"),
        ("LIKE_NEW", "Like New"),
        ("GOOD", "Good"),
        ("REASONABLE", "Reasonable"),
        ("NOT_SPECIFIED", "Not Specified"),
    ]
    statusChoices = [
        ("OPEN", "Open"),
        ("SOLD", "Sold"),
        ("PENDING", "Pending"),
        ("DRAFT", "Draft"),
    ]
    isbn = models.CharField(max_length=20, null=True)
    env_no = models.IntegerField(unique=True)
    title = models.CharField(max_length=500)
    author = models.ForeignKey(
        Author, related_name="books", on_delete=models.SET_NULL, null=True
    )
    language = models.ForeignKey(
        Language, related_name="books", on_delete=models.SET_NULL, null=True
    )
    cover = models.CharField(
        default="Paperback",
        max_length=50,
        choices=coverChoices,
        verbose_name="Cover type of the book",
        null=True,
    )
    publishing_house = models.ForeignKey(
        PublishingHouse, related_name="books", on_delete=models.SET_NULL, null=True
    )
    year = models.IntegerField(
        validators=[
            MinValueValidator(1700),
            MaxValueValidator(datetime.date.today().year),
        ],
        null=True,
    )
    edition = models.CharField(max_length=255)
    category = models.ForeignKey(
        Category, related_name="books", on_delete=models.SET_NULL, null=True
    )
    description = models.CharField(max_length=5000, null=True, default="No description")
    condition_description = models.CharField(max_length=1500, null=True)
    condition = models.CharField(
        default="New",
        max_length=50,
        choices=conditionChoices,
        verbose_name="Condition of the book",
    )
    tags = models.ManyToManyField(Tag, through="BookTagAssociation")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    entry = models.DateField(default=datetime.datetime.now)
    status = models.CharField(
        default="Draft",
        max_length=50,
        choices=statusChoices,
        verbose_name="Status of the book",
    )
    page = models.IntegerField(validators=[MinValueValidator(0),], null=True, default=0)
    ant = models.IntegerField(default=0, null=True)
    cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    remain = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    loc = models.CharField(max_length=255, default="no-loc")
    supplier = models.CharField(max_length=255, default="unknown supplier")
    slug = models.CharField(max_length=255, null=True)

    def __str__(self):
        return f"{self.title if self.title else ''} - {self.author.name if self.author else ''} - {self.year if self.year else ''}"

    def save(self, *args, **kwargs):
        if self.slug == None:
            self.slug = slugify(
                f"{self.title} {self.author} {self.year} {self.env_no}"[0:255]
            )
        self.remain = self.price - self.cost
        super().save(*args, **kwargs)


class BookImage(models.Model):
    book = models.ForeignKey(Book, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="book_images/")

    def __str__(self):
        return f"{self.book.title} - {self.image.url}"


class BookTagAssociation(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("book", "tag")
