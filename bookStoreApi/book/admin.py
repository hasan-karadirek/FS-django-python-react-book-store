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
class BookTagInline(admin.TabularInline):
    model = BookTagAssociation
    extra = 1

class BookAdmin(admin.ModelAdmin):
    search_fields = ["id","title", "author__name", "category__title", "env_no", "isbn","loc","publishing_house__name","author__name"]
    list_display = ["title", "author", "category", "env_no", "isbn","loc","publishing_house","author","language","cover"]
    inlines = [BookImageInline,BookTagInline]  

admin.site.register(Book, BookAdmin)
admin.site.register(BookTagAssociation)
admin.site.register(Tag)
admin.site.register(BookImage)
admin.site.register(Author)
admin.site.register(PublishingHouse)
admin.site.register(Category)
admin.site.register(Language)
