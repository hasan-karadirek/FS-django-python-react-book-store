import os
import django
import pandas as pd
from django.db import transaction

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "bookStoreApi.settings")
django.setup()

from book.models import (
    Book,
)


df = pd.read_excel("./archive.xlsx", engine="openpyxl")

def get_or_none(value):
    return None if pd.isna(value) else value


i = 0
id = 0
env_nos = []
for index, row in df.iterrows():
    env_nos.append(row["NO."])

books = Book.objects.all()

for book in books:
    if book.env_no not in env_nos:
        book.status = "SOLD"
        print(f"Book {book.title}-{book.env_no} status updated to SOLD")
        book.save()
