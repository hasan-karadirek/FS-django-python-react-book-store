from django.urls import path
from .views import AddBookAPIView

urlpatterns = [
    path('add-book/', AddBookAPIView.as_view(), name='add-book'),

]
