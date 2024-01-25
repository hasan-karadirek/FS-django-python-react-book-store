from django.urls import path
from .views import SellBookView,GetOnSaleBookView,GetOnSaleBooksByBookPkView,AddToCartView,RemoveFromCartView


urlpatterns = [
    path('sell-book/', SellBookView.as_view(),name="sell-book"),
    path('get-book-on-sale/<int:salePk>/', GetOnSaleBookView.as_view(),name="get-book-on-sale"),
    path('get-books-on-sale-by-id/<int:bookPk>/', GetOnSaleBooksByBookPkView.as_view(),name="get-books-on-sale-by-id"),
    path('add-to-cart/<int:salePk>/', AddToCartView.as_view(),name="add-to-cart"),
    path('remove-from-cart/<int:salePk>/', RemoveFromCartView.as_view(),name="remove-from-cart"),

]
