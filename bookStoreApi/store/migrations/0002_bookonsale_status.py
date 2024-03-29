# Generated by Django 4.2.9 on 2024-01-24 19:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("store", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="bookonsale",
            name="status",
            field=models.CharField(
                choices=[("OPEN", "Open"), ("SOLD", "Sold"), ("PENDING", "Pending")],
                default="OPEN",
                max_length=50,
                verbose_name="Status of the Selling",
            ),
        ),
    ]
