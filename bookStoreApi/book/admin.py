from django.contrib import admin
from .models import Book, BookTagAssociation, BookImage

admin.site.register(Book)
admin.site.register(BookTagAssociation)
admin.site.register(BookImage)

