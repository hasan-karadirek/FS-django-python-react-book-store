from book.models import Book
from core.custom_exceptions import CustomAPIException
from blog.models import Post, Form
from core.helpers import find_active_order
from store.serializers import OrderSerializer


class IsBookExist:
    def dispatch(self, request, bookPk, *args, **kwargs):
        try:
            book = Book.objects.get(pk=bookPk)
            request.book = book
        except Book.DoesNotExist:
            raise CustomAPIException("Book not found", 404)
        return super().dispatch(request, bookPk * args, **kwargs)


class IsSaleExist:
    def dispatch(self, request, bookPk, *args, **kwargs):
        try:
            book = Book.objects.get(pk=bookPk, status="OPEN")
            request.book = book
        except Book.DoesNotExist:
            raise CustomAPIException(
                "Book not found or no longer available",
                status=404,
                name="unavailable_books",
            )
        return super().dispatch(request, bookPk * args, **kwargs)


class IsPostExist:
    def dispatch(self, request, postPk, *args, **kwargs):
        try:
            post = Post.objects.get(pk=postPk)
            request.post = post
        except Post.DoesNotExist:
            raise CustomAPIException(
                "There is no such a post associated with this PK!", 404
            )
        return super().dispatch(request, postPk * args, **kwargs)


class IsFormExist:
    def dispatch(self, request, formPk, *args, **kwargs):
        try:
            form = Form.objects.get(pk=formPk)
            request.form = form
        except Form.DoesNotExist:
            raise CustomAPIException(
                "There is no such a form associated with this PK!", 404
            )
        return super().dispatch(request, formPk * args, **kwargs)
