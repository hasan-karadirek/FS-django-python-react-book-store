from django.contrib import admin
from .models import Post, Form, FormImage


class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'content', 'created_at')
class FormAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at') 
admin.site.register(Form,FormAdmin)
admin.site.register(Post,PostAdmin)
admin.site.register(FormImage)
