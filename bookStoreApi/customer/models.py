from django.contrib.auth.models import AbstractUser
from django.db import models

class Customer(AbstractUser):
    email = models.EmailField(unique=True, blank=False, null=False)

