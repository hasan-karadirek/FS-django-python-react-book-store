from django.urls import path
from .views import (
    SellBookView,
    GetOnSaleBookView,
    GetOnSaleBooksByBookPkView,
    AddToCartView,
    RemoveFromCartView,
    CheckOutView,
    OrderStatusView,
)


urlpatterns = [
    path("sell-book/", SellBookView.as_view(), name="sell-book"),
    path(
        "get-book-on-sale/<int:salePk>/",
        GetOnSaleBookView.as_view(),
        name="get-book-on-sale",
    ),
    path(
        "get-books-on-sale-by-id/<int:bookPk>/",
        GetOnSaleBooksByBookPkView.as_view(),
        name="get-books-on-sale-by-id",
    ),
    path("add-to-cart/<int:salePk>/", AddToCartView.as_view(), name="add-to-cart"),
    path(
        "remove-from-cart/<int:salePk>/",
        RemoveFromCartView.as_view(),
        name="remove-from-cart",
    ),
    path("checkout/", CheckOutView.as_view(), name="checkout"),
    path("order-status/<int:orderPk>/", OrderStatusView.as_view(), name="order-status"),
]
