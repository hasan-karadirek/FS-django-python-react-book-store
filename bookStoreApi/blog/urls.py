from django.urls import path
from .views import AddPostAPIView,UpdatePostAPIView,DeletePostAPIView,CreateFormAPIView

urlpatterns = [
    path("add-post/",AddPostAPIView.as_view(),name="add-post"),
    path("update-post/",UpdatePostAPIView.as_view(),name="update-post"),
    path("delete-post/",DeletePostAPIView.as_view(),name="delete-post"),
    path("create-form/",CreateFormAPIView.as_view(),name="create-form"),
]