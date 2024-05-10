from django.urls import path
from .views import (
    AddToCartView,
    RemoveFromCartView,
    CheckOutView,
    OrderStatusView,
)


urlpatterns = [
    path("add-to-cart/<int:bookPk>/", AddToCartView.as_view(), name="add-to-cart"),
    path(
        "remove-from-cart/<int:bookPk>/",
        RemoveFromCartView.as_view(),
        name="remove-from-cart",
    ),
    path("checkout/", CheckOutView.as_view(), name="checkout"),
    path("order-status/<int:orderPk>/", OrderStatusView.as_view(), name="order-status"),
]
