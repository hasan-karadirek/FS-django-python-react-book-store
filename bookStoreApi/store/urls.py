from django.urls import path
from .views import SellBookView


urlpatterns = [
    path('sell-book/', SellBookView.as_view(),name="sell-book"),
]
