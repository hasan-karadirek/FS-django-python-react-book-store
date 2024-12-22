from django.contrib import admin
from .models import Order, OrderDetail, Address

class OrderDetailInline(admin.TabularInline):
    model = OrderDetail
    extra = 1
class OrderAdmin(admin.ModelAdmin):
    search_fields = ["address__email","customer__email"]
    list_display=("id","customer","address","status","created_at")
    inlines = [OrderDetailInline]

# Register your models here.
admin.site.register(Order,OrderAdmin)
admin.site.register(OrderDetail)
admin.site.register(Address)
