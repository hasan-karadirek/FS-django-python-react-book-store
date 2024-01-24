from django.urls import path
from .views import SellBookView,GetOnSaleBookView,GetOnSaleBooksByBookPkView


urlpatterns = [
    path('sell-book/', SellBookView.as_view(),name="sell-book"),
    path('get-book-on-sale/<int:pk>/', GetOnSaleBookView.as_view(),name="get-book-on-sale"),
    path('get-books-on-sale-by-id/<int:bookPk>/', GetOnSaleBooksByBookPkView.as_view(),name="get-books-on-sale-by-id"),

]
