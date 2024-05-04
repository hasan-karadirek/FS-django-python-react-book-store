from django.urls import path
from .views import AddPostAPIView,UpdatePostAPIView

urlpatterns = [
    path("add-post/",AddPostAPIView.as_view(),name="add-post"),
    path("update-post/",UpdatePostAPIView.as_view(),name="update-post"),
]