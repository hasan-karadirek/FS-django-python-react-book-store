from django.db import models
from book.models import Book
from customer.models import Customer
from django.db import transaction
from django.db.models import F, Sum
from core.custom_exceptions import CustomAPIException
from decimal import Decimal


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
    cost = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal("0.00"))
    address = models.ForeignKey(
        Address, related_name="orders", on_delete=models.SET_NULL, null=True
    )
    status = models.CharField(
        max_length=50,
        choices=statusChoices,
        verbose_name="Status of the order",
        default="OPEN",
    )
    post_cost = models.DecimalField(
        max_digits=10, decimal_places=2, default=Decimal("0.00")
    )
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return f"Order {self.id} "

    def save(self, *args, **kwargs):
        if self.pk:
            cost = (
                self.order_details.aggregate(total_cost=Sum("book__price"))[
                    "total_cost"
                ]
                or 0.00
            )

            order_details_count = self.order_details.count()
            if order_details_count == 1:
                self.post_cost = 3.50
            elif order_details_count > 1 and cost < 50.00:
                self.post_cost = 6.00
            elif cost >= 50.00:
                self.post_cost = 0.00
        super().save(*args, **kwargs)


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
        is_new = self.pk is None
        try:
            with transaction.atomic():
                super().save(*args, **kwargs)
                if is_new:
                    book = Book.objects.get(pk=self.book_id)
                    # ? Use F() expression to avoid race conditions
                    self.order.cost = F("cost") + book.price
                    self.order.save()

                    self.order.refresh_from_db()

        except (Book.DoesNotExist, Order.DoesNotExist):
            raise CustomAPIException("database orderDetail save error", 500)

    def delete(self, *args, **kwargs):
        try:
            with transaction.atomic():
                super().delete(*args, **kwargs)
                book = Book.objects.get(pk=self.book_id)
                # ? Use F() expression to avoid race conditions
                self.order.cost = F("cost") - book.price
                self.order.save()

        except (Book.DoesNotExist, Order.DoesNotExist):
            raise CustomAPIException("database orderDetail delete error", 500)
