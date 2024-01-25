from rest_framework.response import Response
from rest_framework import status,permissions
from store.models import Order,BookOnSale
from book.models import Book
from rest_framework.exceptions import NotFound,NotAuthenticated,ValidationError

class OpenOrderMixin:
    def get_or_create_open_order(self, request):
        open_order = Order.objects.filter(customer=request.user, status='OPEN').first()
        if not open_order:
            open_order = Order.objects.create(customer=request.user, status='OPEN')
        return open_order
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