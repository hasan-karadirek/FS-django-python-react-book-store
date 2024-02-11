from django.urls import path
from .views import MollieHookAPIView

urlpatterns = [
    path("mollie-hook/<int:orderId>/", MollieHookAPIView.as_view(), name="mollie-hook"),
]
