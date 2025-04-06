# book/tasks.py
from django.core.mail import EmailMessage
from io import BytesIO
from celery import shared_task
from django.utils import timezone
from .models import Book  
import openpyxl

@shared_task
def export_books_and_send_email(recipient_email):
    workbook = openpyxl.Workbook()
    sheet = workbook.active

    header = [
        "ID", "NO.", "AUTEUR", "TITEL", "TAAL", "KAFT", "UITGEVER", "JAAR",
        "DRUK", "CATALOGUS", "BLDZ.", "CONDITIE", "TREFWOORDEN", "PRIJS",
        "ANT", "KOST", "REM", "BRON", "LOC", "ENTRY", "ISBN bol+winkeltjes"
    ]
    sheet.append(header)

    books = Book.objects.filter(status="OPEN").all()

    for book in books:
        row = [
            book.id,
            book.env_no,
            book.author.name if book.author else "",
            book.title,
            book.language.name if book.language else "",
            book.cover,
            book.publishing_house.name if book.publishing_house else "",
            book.year,
            book.edition,
            book.category.title if book.category else "",
            book.page,
            book.condition_description,
            ", ".join([tag.name for tag in book.tags.all()]),
            book.price,
            book.ant,
            book.cost,
            book.remain,
            book.supplier,
            book.loc,
            book.entry,
            book.isbn,
        ]
        sheet.append(row)

    # Save Excel file to memory
    file_stream = BytesIO()
    workbook.save(file_stream)
    file_stream.seek(0)

    # Send the email
    filename = f"books_{timezone.now().strftime('%Y%m%d_%H%M%S')}.xlsx"
    email = EmailMessage(
        subject="Exported Book List",
        body="Please find the exported book list attached.",
        to=[recipient_email]
    )
    email.attach(filename, file_stream.getvalue(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    email.send()

    return f"Export completed and email sent to {recipient_email}"
