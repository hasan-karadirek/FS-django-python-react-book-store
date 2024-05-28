from django.db import models
from book.models import Book
from customer.models import Customer
from django.db import transaction
from django.db.models import F
from core.custom_exceptions import CustomAPIException


class Address(models.Model):
    full_name = models.CharField(max_length=50, null=True)
    email = models.EmailField(null=True,)
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    postcode = models.CharField(max_length=10)
    country = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.postcode} - {self.city}"

    def save(self, *args, **kwargs):
        if self.full_name == None or self.email == None:
            try:
                order = Order.objects.get(address=self)
                if order.customer == None:
                    raise CustomAPIException(
                        status=400,
                        message="Guest customer should provide full name and email.",
                    )
            except Order.DoesNotExist:
                raise CustomAPIException(
                    status=404,
                    message="There is no order associated with this address.",
                )

        super().save(*args, **kwargs)


class Order(models.Model):
    statusChoices = [
        ("OPEN", "Open"),
        ("PAID", "Paid"),
        ("PENDING", "Pending"),
        ("CANCELED", "Canceled"),
        ("EXPIRED", "Expired"),
        ("FAILED", "Failed"),
    ]
    customer = models.ForeignKey(
        Customer, related_name="orders", on_delete=models.SET_NULL, null=True
    )
    session_id = models.CharField(max_length=255)
    cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    address = models.ForeignKey(
        Address, related_name="orders", on_delete=models.SET_NULL, null=True
    )
    status = models.CharField(
        max_length=50,
        choices=statusChoices,
        verbose_name="Status of the order",
        default="OPEN",
    )

    def __str__(self):
        return f"Order {self.id} "


class OrderDetail(models.Model):
    order = models.ForeignKey(
        Order, related_name="order_details", on_delete=models.CASCADE
    )
    book = models.ForeignKey(
        Book, related_name="order_details", on_delete=models.PROTECT
    )

    def __str__(self):
        return f"Order Detail for Order {self.order.id}"

    def save(self, *args, **kwargs):
        try:
            with transaction.atomic():

                book = Book.objects.get(pk=self.book_id)
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

                book = Book.objects.get(pk=self.book_id)
                # ? Use F() expression to avoid race conditions
                self.order.cost = F("cost") - book.price
                self.order.save()
                super().delete(*args, **kwargs)
        except (Book.DoesNotExist, Order.DoesNotExist):
            raise CustomAPIException("database orderDetail delete error", 500)
