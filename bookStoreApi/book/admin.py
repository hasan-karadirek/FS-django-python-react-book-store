from django.contrib import admin
from .models import Book, BookTagAssociation, BookImage,Author,Language,Category,PublishingHouse

admin.site.register(Book)
admin.site.register(BookTagAssociation)
admin.site.register(BookImage)
admin.site.register(Author)
admin.site.register(PublishingHouse)
admin.site.register(Category)
admin.site.register(Language)

