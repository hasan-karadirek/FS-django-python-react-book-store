from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.conf import settings
import os


class Command(BaseCommand):
    help = "Create a superuser"

    def handle(self, *args, **options):
        User = get_user_model()
        if not User.objects.filter(
            username=os.environ.get("DJANGO_SUPERUSER_USERNAME")
        ).exists():
            User.objects.create_superuser(
                username=os.environ.get("DJANGO_SUPERUSER_USERNAME"),
                email=os.environ.get("DJANGO_SUPERUSER_EMAIL"),
                password=os.environ.get("DJANGO_SUPERUSER_PASSWORD"),
            )
            self.stdout.write(
                self.style.SUCCESS("Successfully created a new superuser")
            )
