from django.db import models
from book.models import Book
from customer.models import Customer
from django.db import transaction
from django.db.models import F
from core.custom_exceptions import CustomAPIException




class Order(models.Model):
    statusChoices = [
        ("OPEN", "Open"),
        ("PAID", "Paid"),
        ("PENDING", "Pending"),
    ]
    customer = models.ForeignKey(
        Customer, related_name="orders", on_delete=models.SET_NULL, null=True
    )
    address = models.TextField(max_length=500, blank=False, default="Address")
    cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    status = models.CharField(
        max_length=50,
        choices=statusChoices,
        verbose_name="Status of the order",
        default="OPEN",
    )

    def __str__(self):
        return f"Order {self.id} by {self.customer.username}"


class OrderDetail(models.Model):
    order = models.ForeignKey(
        Order, related_name="order_details", on_delete=models.CASCADE
    )
    book = models.ForeignKey(
        Book, related_name="order_details",on_delete=models.PROTECT
    )

    def __str__(self):
        return f"Order Detail for Order {self.order.id}"

    def save(self, *args, **kwargs):
        try:
            with transaction.atomic():

                book =Book.objects.get(pk=self.book_id)
                # ? Use F() expression to avoid race conditions
                self.order.cost = F("cost") + book.price
                self.order.save()

                self.order.refresh_from_db()

                super().save(*args, **kwargs)
        except (Book.DoesNotExist, Order.DoesNotExist):
            raise CustomAPIException("database orderDetail save error", 500)

    def delete(self, *args, **kwargs):
        try:
            with transaction.atomic():

                book =Book.objects.get(pk=self.book_id)
                # ? Use F() expression to avoid race conditions
                self.order.cost = F("cost") - book.price
                self.order.save()
                super().delete(*args, **kwargs)
        except (Book.DoesNotExist, Order.DoesNotExist):
            raise CustomAPIException("database orderDetail delete error", 500)
