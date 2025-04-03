import os
import django
import pandas as pd
from django.db import transaction

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "bookStoreApi.settings")
django.setup()

from book.models import (
    Book,
    Author,
    PublishingHouse,
    Language,
    Category,
    Tag,
    BookTagAssociation,
)


df = pd.read_excel("./archive.xlsx", engine="openpyxl")


def get_or_none(value):
    return None if pd.isna(value) else value


i = 0
id = 0

   
for index, row in df.iterrows():
    i = index
    id = row["NO."]
    book= Book.objects.filter(env_no=id).first()
    if book:
        print(f"Book with env_no {id} already exists")
        continue
    author = None
    if get_or_none(row["AUTEUR"]):
        author, _ = Author.objects.get_or_create(name=row["AUTEUR"])
    publishing_house = None
    if get_or_none(row["UITGEVER"]):
        publishing_house, _ = PublishingHouse.objects.get_or_create(
            name=row["UITGEVER"]
        )
    language = None
    if get_or_none(row["CATALOGUS"]):
        language, _ = Language.objects.get_or_create(name=row["TAAL"])
    category = None
    if get_or_none(row["CATALOGUS"]):
        category, _ = Category.objects.get_or_create(title=row["CATALOGUS"])
    condition = ""
    
    if get_or_none(row["BOL CONDITION"]) == "nieuw":
        condition="NEW"
    elif get_or_none(row["BOL CONDITION"]) == "als nieuw":
        condition="LIKE_NEW"
    elif get_or_none(row["BOL CONDITION"]) == "goed":
        condition="GOOD"
    else:
        condition="REASONABLE"
    try:
        with transaction.atomic():
            book = Book.objects.create(
                isbn=get_or_none(row["ISBN bol+winkeltjes"]),
                env_no=row["NO."],
                title=row["TITEL"],
                author=get_or_none(author),
                language=language,
                cover=get_or_none(row["KAFT"]),
                publishing_house=publishing_house,
                year=get_or_none(row["JAAR"])
                if isinstance(get_or_none(row["JAAR"]), int)
                else None,
                edition=get_or_none(row["DRUK"]),
                category=category,
                condition=condition,
                condition_description=get_or_none(row["CONDITIE"]),
                price=row["PRIJS"],
                entry=pd.to_datetime(row["ENTRY"]),
                status="OPEN",
                page=row["BLDZ."],
                ant=row["ANT"],
                cost=row["KOST"],
                loc=row["LOC"],
                supplier=row["BRON"],
            )

            tags = str(row["TREFWOORDEN"]).split(",")
            for tag_name in tags:
                tag, _ = Tag.objects.get_or_create(name=tag_name.strip())
                BookTagAssociation.objects.get_or_create(book=book, tag=tag)
        print("Book imported successfully!")
    except Exception as e:
        print(f"An error occurred: {e} - {i} - {df.iloc[i].to_dict()}")
        print(f"{df.iloc[i].to_dict()}")
        print(f"{df.iloc[i-1].to_dict()}")
