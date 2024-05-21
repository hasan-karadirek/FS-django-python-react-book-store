from django.contrib import admin
from .models import Book, BookTagAssociation, BookImage,Author,Language,Category,PublishingHouse,Tag


class BookAdmin(admin.ModelAdmin):
    search_fields = ['title', 'author__name',"category__title"]
admin.site.register(Book,BookAdmin)
admin.site.register(BookTagAssociation)
admin.site.register(Tag)
admin.site.register(BookImage)
admin.site.register(Author)
admin.site.register(PublishingHouse)
admin.site.register(Category)
admin.site.register(Language)

