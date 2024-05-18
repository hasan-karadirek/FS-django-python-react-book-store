import os
import django
import pandas as pd

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bookStoreApi.settings')
django.setup()

from book.models import Book, Author, PublishingHouse, Language, Category, Tag, BookTagAssociation

# Load the data
df = pd.read_excel('./core/example_books.xlsx')

# Iterate through the DataFrame
for index, row in df.iterrows():
    # Create or retrieve the author
    author, created = Author.objects.get_or_create(name=row['AUTEUR'])
    
    # Similarly for PublishingHouse, Language, and Category
    publishing_house, _ = PublishingHouse.objects.get_or_create(name=row['UITGEVER'])
    language, _ = Language.objects.get_or_create(name=row['TAAL'])
    category, _ = Category.objects.get_or_create(title=row['CATALOGUS'])

    

    # Now create the Book instance
    book = Book.objects.create(
        isbn=row['ISBN bol+winkeltjes'],
        env_no=row['NO.'],
        title=row['TITEL'],
        author=author,
        language=language,
        cover=row['KAFT'],
        publishing_house=publishing_house,
        year=row['JAAR'],
        edition=row['DRUK'],
        category=category,
        condition="NEW",
        condition_description=row['CONDITIE'],
        price=row['PRIJS'],
        entry=pd.to_datetime(row['ENTRY']),
        status='OPEN'  # or another status based on your business logic
    )

    # If there are tags, handle them similarly
    tags = str(row['TREFWOORDEN']).split(',')  # Assuming tags are comma-separated
    for tag_name in tags:
        tag, _ = Tag.objects.get_or_create(name=tag_name.strip())
        BookTagAssociation.objects.create(book=book, tag=tag)

print("Data imported successfully!")
