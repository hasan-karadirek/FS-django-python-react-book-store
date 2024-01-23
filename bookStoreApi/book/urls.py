from django.urls import path
from .views import AddBookAPIView, UpdateBookAPIView

urlpatterns = [
    path('add-book/', AddBookAPIView.as_view(), name='add-book'),
    path('update-book/<int:pk>/', UpdateBookAPIView.as_view(), name='update-book'),

]
