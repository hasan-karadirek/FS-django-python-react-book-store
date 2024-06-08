from django.urls import path
from .views import (
    AddBookAPIView,
    UpdateBookAPIView,
    DeleteBookAPIView,
    GetBookAPIView,
    GetBooksAPIView,
    GetAllCategoriesApiView,
    GetAllLanguagesApiView,
    ExportBooksAPIView,
    UpdateBooksAPIView,
)

urlpatterns = [
    path("add-book/", AddBookAPIView.as_view(), name="add-book"),
    path("update-book/<int:bookPk>/", UpdateBookAPIView.as_view(), name="update-book"),
    path("delete-book/<int:bookPk>/", DeleteBookAPIView.as_view(), name="delete-book"),
    path("categories/", GetAllCategoriesApiView.as_view(), name="get-categories"),
    path("languages/", GetAllLanguagesApiView.as_view(), name="get-languages"),
    path("export-books/", ExportBooksAPIView.as_view(), name="export-books"),
    path("update-books/", UpdateBooksAPIView.as_view(), name="update-books"),
    path("<str:slug>/", GetBookAPIView.as_view(), name="get-book"),
    path("", GetBooksAPIView.as_view(), name="get-books"),
]
