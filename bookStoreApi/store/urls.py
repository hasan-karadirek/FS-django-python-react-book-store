from django.urls import path
from .views import SellBookView,GetOnSaleBookView


urlpatterns = [
    path('sell-book/', SellBookView.as_view(),name="sell-book"),
    path('get-book-on-sale/<int:pk>/', GetOnSaleBookView.as_view(),name="get-book-on-sale"),
]
