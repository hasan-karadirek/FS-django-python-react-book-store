from store.models import BookOnSale
from book.models import Book
from rest_framework.exceptions import NotFound

class IsBookExist:
    def dispatch(self, request,bookPk, *args, **kwargs):
        try:
            book = Book.objects.get(pk=bookPk)
            request.book=book
        except Book.DoesNotExist:
            raise NotFound(detail="Book not found")
        return super().dispatch(request,bookPk *args, **kwargs)
class IsSaleExist:
    def dispatch(self, request,salePk, *args, **kwargs):
        try:
            bookOnSale=BookOnSale.objects.get(pk=salePk,status="OPEN")
            request.bookOnSale=bookOnSale
        except BookOnSale.DoesNotExist:
            raise NotFound(detail="Book not found or no longer available")
        return super().dispatch(request,salePk *args, **kwargs)