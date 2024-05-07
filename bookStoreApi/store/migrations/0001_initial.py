# Generated by Django 4.2.9 on 2024-05-07 18:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("book", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="BookOnSale",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "condition",
                    models.CharField(
                        choices=[
                            ("NEW", "New"),
                            ("LIKE_NEW", "Like New"),
                            ("GOOD", "Good"),
                            ("POOR", "Poor"),
                        ],
                        max_length=50,
                        verbose_name="Condition of the Book",
                    ),
                ),
                ("price", models.DecimalField(decimal_places=2, max_digits=10)),
                ("description", models.CharField(max_length=255)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("OPEN", "Open"),
                            ("SOLD", "Sold"),
                            ("PENDING", "Pending"),
                        ],
                        default="OPEN",
                        max_length=50,
                        verbose_name="Status of the Selling",
                    ),
                ),
                (
                    "book",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="book.book"
                    ),
                ),
                (
                    "customer",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Order",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("address", models.TextField(default="Address", max_length=500)),
                (
                    "cost",
                    models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
                ),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("OPEN", "Open"),
                            ("PAID", "Sold"),
                            ("PENDING", "Pending"),
                        ],
                        default="OPEN",
                        max_length=50,
                        verbose_name="Status of the order",
                    ),
                ),
                (
                    "customer",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="orders",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="OrderDetail",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "book_on_sale",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="book_on_sale",
                        to="store.bookonsale",
                    ),
                ),
                (
                    "order",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="order_details",
                        to="store.order",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="BookOnSaleImage",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("image", models.ImageField(upload_to="on_sale_images/")),
                (
                    "book",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="on_sale_images",
                        to="store.bookonsale",
                    ),
                ),
            ],
        ),
    ]
