from django.urls import path
from .views import (
    AddBookAPIView,
    UpdateBookAPIView,
    DeleteBookAPIView,
    GetBookAPIView,
    GetBooksAPIView,
)

urlpatterns = [
    path("add-book/", AddBookAPIView.as_view(), name="add-book"),
    path("update-book/<int:bookPk>/", UpdateBookAPIView.as_view(), name="update-book"),
    path("delete-book/<int:bookPk>/", DeleteBookAPIView.as_view(), name="delete-book"),
    path("<int:bookPk>/", GetBookAPIView.as_view(), name="get-book"),
    path("", GetBooksAPIView.as_view(), name="get-books"),
]
