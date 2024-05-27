from django.urls import path
from .views import UserRegistrationAPIView, LoginAPIView, LogoutAPIView, CustomerDashboardApiView

urlpatterns = [
    path("register/", UserRegistrationAPIView.as_view(), name="register"),
    path("login/", LoginAPIView.as_view(), name="login"),
    path("logout/", LogoutAPIView.as_view(), name="logout"),
    path("dashboard/", CustomerDashboardApiView.as_view(), name="dashboard"),
]
