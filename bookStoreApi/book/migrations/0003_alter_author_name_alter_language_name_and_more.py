# Generated by Django 4.2.9 on 2024-06-13 14:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("book", "0002_book_ant_book_cost_book_description_book_loc_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="author",
            name="name",
            field=models.CharField(max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name="language",
            name="name",
            field=models.CharField(max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name="publishinghouse",
            name="name",
            field=models.CharField(max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name="tag",
            name="name",
            field=models.CharField(max_length=255, unique=True),
        ),
    ]
