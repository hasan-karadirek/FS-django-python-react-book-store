from django.urls import path
from .views import (
    AddPostAPIView,
    UpdatePostAPIView,
    DeletePostAPIView,
    CreateFormAPIView,
    GetPostsAPIView,
    GetPostAPIView,
    DeleteFormAPIView,
    GetFormAPIView,
    GetFormsAPIView,
)

urlpatterns = [
    path("add-post/", AddPostAPIView.as_view(), name="add-post"),
    path("update-post/<int:postPk>/", UpdatePostAPIView.as_view(), name="update-post"),
    path("delete-post/<int:postPk>/", DeletePostAPIView.as_view(), name="delete-post"),
    path("get-posts/", GetPostsAPIView.as_view(), name="get-posts"),
    path("get-post/<int:postPk>/", GetPostAPIView.as_view(), name="get-post"),
    path("create-form/", CreateFormAPIView.as_view(), name="create-form"),
    path("delete-form/<int:formPk>/", DeleteFormAPIView.as_view(), name="delete-form"),
    path("get-forms/", GetFormsAPIView.as_view(), name="get-forms"),
    path("get-form/<int:formPk>/", GetFormAPIView.as_view(), name="get-form"),
]
