from django.urls import path
from .views import AddPostAPIView,UpdatePostAPIView,DeletePostAPIView,CreateFormAPIView, GetPostsAPIView,GetPostAPIView

urlpatterns = [
    path("add-post/",AddPostAPIView.as_view(),name="add-post"),
    path("update-post/<int:postPk>/",UpdatePostAPIView.as_view(),name="update-post"),
    path("delete-post/<int:postPk>/",DeletePostAPIView.as_view(),name="delete-post"),
    path("get-posts/",GetPostsAPIView.as_view(),name="get-posts"),
    path("get-post/<int:postPk>",GetPostAPIView.as_view(),name="get-post"),
    path("create-form/",CreateFormAPIView.as_view(),name="create-form"),
]