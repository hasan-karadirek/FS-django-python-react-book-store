from django.contrib import admin
from .models import (
    Book,
    BookTagAssociation,
    BookImage,
    Author,
    Language,
    Category,
    PublishingHouse,
    Tag,
)

class BookImageInline(admin.TabularInline):
    model = BookImage
    extra = 1

class BookAdmin(admin.ModelAdmin):
    search_fields = ["title", "author__name", "category__title"]
    inlines = [BookImageInline]  

admin.site.register(Book, BookAdmin)
admin.site.register(BookTagAssociation)
admin.site.register(Tag)
admin.site.register(BookImage)
admin.site.register(Author)
admin.site.register(PublishingHouse)
admin.site.register(Category)
admin.site.register(Language)
