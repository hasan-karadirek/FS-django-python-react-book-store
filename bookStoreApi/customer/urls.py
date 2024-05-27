from django.urls import path
from .views import UserRegistrationAPIView, LoginAPIView, LogoutAPIView, CustomerDashboardAPIView,ForgotPasswordAPIView,ResetPasswordAPIView

urlpatterns = [
    path("register/", UserRegistrationAPIView.as_view(), name="register"),
    path("login/", LoginAPIView.as_view(), name="login"),
    path("logout/", LogoutAPIView.as_view(), name="logout"),
    path("dashboard/", CustomerDashboardAPIView.as_view(), name="dashboard"),
    path("forgotpassword/", ForgotPasswordAPIView.as_view(), name="forgot-password"),
    path("resetpassword/", ResetPasswordAPIView.as_view(), name="reset-password"),
]
