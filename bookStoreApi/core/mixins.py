from store.models import BookOnSale
from book.models import Book
from rest_framework.exceptions import NotFound
from core.custom_exceptions import CustomAPIException
from blog.models import Post


class IsBookExist:
    def dispatch(self, request, bookPk, *args, **kwargs):
        try:
            book = Book.objects.get(pk=bookPk)
            request.book = book
        except Book.DoesNotExist:
            raise CustomAPIException("Book not found", 404)
        return super().dispatch(request, bookPk * args, **kwargs)


class IsSaleExist:
    def dispatch(self, request, salePk, *args, **kwargs):
        try:
            bookOnSale = BookOnSale.objects.get(pk=salePk, status="OPEN")
            request.bookOnSale = bookOnSale
        except BookOnSale.DoesNotExist:
            raise CustomAPIException("Book not found or no longer available", 404)
        return super().dispatch(request, salePk * args, **kwargs)
    
class IsPostExist:
    def dispatch(self, request, postPk, *args, **kwargs):
        try:
            post = Post.objects.get(pk=postPk)
            request.post = post
        except Post.DoesNotExist:
            raise CustomAPIException("There is no such a post associated with this PK!", 404)
        return super().dispatch(request, postPk * args, **kwargs)
