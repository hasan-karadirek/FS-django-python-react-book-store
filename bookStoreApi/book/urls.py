from django.urls import path
from .views import AddBookAPIView, UpdateBookAPIView, DeleteBookAPIView, GetBookAPIView, GetBooksAPIView,GetOrCreateBookByEANView

urlpatterns = [
    path('add-book/', AddBookAPIView.as_view(), name='add-book'),
    path('update-book/<int:pk>/', UpdateBookAPIView.as_view(), name='update-book'),
    path('delete-book/<int:pk>/', DeleteBookAPIView.as_view(), name='delete-book'),
    path('<int:pk>/', GetBookAPIView.as_view(), name='get-book'),
    path('get-book-by-ean/', GetOrCreateBookByEANView.as_view(), name='get-or-create-book-by-ean'),
    path('', GetBooksAPIView.as_view(), name='get-books'),

]
