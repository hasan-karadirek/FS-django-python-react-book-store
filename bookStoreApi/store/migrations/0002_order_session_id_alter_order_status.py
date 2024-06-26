# Generated by Django 4.2.9 on 2024-06-06 01:38

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("store", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="order",
            name="session_id",
            field=models.CharField(default=django.utils.timezone.now, max_length=255),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="order",
            name="status",
            field=models.CharField(
                choices=[
                    ("OPEN", "Open"),
                    ("PAID", "Paid"),
                    ("PENDING", "Pending"),
                    ("CANCELED", "Canceled"),
                    ("EXPIRED", "Expired"),
                    ("FAILED", "Failed"),
                ],
                default="OPEN",
                max_length=50,
                verbose_name="Status of the order",
            ),
        ),
    ]
