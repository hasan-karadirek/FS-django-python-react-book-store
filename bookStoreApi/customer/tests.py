from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
import copy
import re
from django.core import mail

User = get_user_model()
user_data = {
            "username": "testuser",
            "email": "test@example.com",
            "password": "testpassword123",
            "first_name":"test firstname",
            "last_name":" test lastname"
        }


class CustomerRegisterTests(APITestCase):
    def setUp(self):
        # Setup
        self.register_url = reverse("register")

    def test_user_registration_success(self):
        """
        Success: Create a new user.
        """
        case_user_data = copy.deepcopy(user_data)
        response = self.client.post(self.register_url, case_user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["success"], True)
        self.assertTrue("token" in response.data["data"], True)
        self.assertTrue("order" in response.data["data"], True)
        self.assertTrue("username" in response.data["data"]["customer"])
        self.assertTrue("email" in response.data["data"]["customer"])
        self.assertFalse("password" in response.data["data"]["customer"])

    def test_user_registration_missing_password(self):
        """
        Fail: Create a new user (missing password).
        """
        case_user_data = copy.deepcopy(user_data).pop("password")
        response = self.client.post(self.register_url, case_user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_registration_missing_email(self):
        """
        Fail: Create a new user (missing email).
        """
        case_user_data = copy.deepcopy(user_data).pop("email")
        response = self.client.post(self.register_url, case_user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_registration_missing_username(self):
        """
        Fail: Create a new user (missing username).
        """
        case_user_data = copy.deepcopy(user_data).pop("username")
        response = self.client.post(self.register_url, case_user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    def test_user_registration_invalid_email_format(self):
        """
        Fail: Create a new user (invalid email format).
        """
        case_user_data = copy.deepcopy(user_data)
        case_user_data["email"]="invalid-email.com"
        response = self.client.post(self.register_url, case_user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    def test_user_registration_duplicate_email(self):
        """
        Fail: Create a new user (duplicate email format).
        """
        case_user_data = copy.deepcopy(user_data)
        self.client.post(self.register_url, case_user_data, format="json")
        response=self.client.post(self.register_url, case_user_data, format="json")
        print(response,response.json())
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue("unique" in response.json()["msg"])


class CustomerLoginTests(APITestCase):
    def setUp(self):
        # Setup
        self.login_url = reverse("login")
        self.user = User.objects.create_user(**user_data)

    def test_user_login_success(self):
        """
        Success: Login user.
        """
        case_user_data = copy.deepcopy(user_data)
        response = self.client.post(self.login_url, {"email":self.case_user_data["email"],"password":case_user_data["password"]}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue("token" in response.data["data"])
        self.assertTrue("customer" in response.data["data"])
        self.assertTrue("order" in response.data["data"])
        self.assertTrue("password" not in response.data["data"]["customer"])
    def test_user_login_invalid_credentials(self):
        """
        Fail: Login user (invalid credentials).
        """
        case_user_data = copy.deepcopy(user_data)
        response = self.client.post(self.login_url, {"email":case_user_data["email"],"password":"wrongpassword"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue("token" not in response.json())
    def test_user_login_missing_password(self):
        """
        Fail: Login user (missing password).
        """
        case_user_data = copy.deepcopy(user_data)
        response = self.client.post(self.login_url, {"email":case_user_data["email"]}, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue("token" not in response.json())

    def test_user_login_missing_email(self):
        """
        Fail: Login user (missing username).
        """
        case_user_data = copy.deepcopy(user_data)
        response = self.client.post(self.login_url, {"password":case_user_data["password"]}, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    def test_user_login_not_exist_user(self):
        """
        Fail: Login for not exist user
        """
        case_user_data = copy.deepcopy(user_data)
        response = self.client.post(self.login_url, {"email":"not_exist_email@gmail.com","password":case_user_data["password"]}, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class CustomerLogoutTests(APITestCase):
    def setUp(self):
        # Setup
        self.logout_url = reverse("logout")
        self.user_data = copy.deepcopy(user_data)
        self.user = User.objects.create_user(**self.user_data)
        self.token, created = Token.objects.get_or_create(user=self.user)

    def test_user_logout_success(self):
        """
        Success: User Logout.
        """
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        response = self.client.get(self.logout_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_user_logout_fail(self):
        """
        Fail: User Logout (Unauthorized)
        """
        response = self.client.get(self.logout_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class CustomerForgotPasswordTests(APITestCase):
    def setUp(self):
        # Setup
        self.forgot_password_url = reverse("forgotpassword")
        case_user_data = copy.deepcopy(user_data)
        self.user = User.objects.create_user(**case_user_data)
    def test_user_forgot_password_success(self):
        """
        Success: forget user email send!
        """
        case_user_data = copy.deepcopy(user_data)
        response=self.client.post(self.forgot_password_url,{"email":case_user_data["email"]})
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(len(mail.outbox),1)
        self.assertIn(self.user.email,mail.outbox[0].to)
        self.assertIn("Password Reset Link",mail.outbox[0].subject)      
        self.assertIn("resetpassword?token=",mail.outbox[0].body)
    def test_user_forgot_password_fail(self):
        """
        Fail: forget user email not send! (invalid email)
        """
        response=self.client.post(self.forgot_password_url,{"email":"test_email@gmail.com"})
        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)

class CustomerResetPasswordTests(APITestCase):
    def setUp(self):
        # Setup
        self.forgot_password_url = reverse("forgotpassword")
        self.reset_password_url = reverse("resetpassword")
        case_user_data = copy.deepcopy(user_data)
        self.user = User.objects.create_user(**case_user_data)
        # trigger passwordforgot email
        self.client.post(self.forgot_password_url,{"email":case_user_data["email"]})
        match=re.search(r"token=(\w+)", mail.outbox[0].body)
        if match:
            self.token=match.group(1)
        else:
            self.token=None
    def test_user_reset_password_success(self):
        """
        Success: Reset user password
        """
        reset_url=f"{self.reset_password_url}?token={self.token}"
        response=self.client.post(reset_url,{"password":"123456"}, format="json")
        self.assertEqual(response.status_code,status.HTTP_200_OK)

        # login with new password
        login_url=reverse("login")
        login_response=self.client.post(login_url,{"email":self.user.email,"password":"123456"}, format="json")
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)
        self.assertIn("token", login_response.data["data"]) 
    
    def test_user_reset_password_missing_new_password(self):
        """
        Fail: Reset user password (missing new password)
        """
        reset_url=f"{self.reset_password_url}?token={self.token}"
        response=self.client.post(reset_url,{}, format="json")
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
    def test_user_reset_password_invalid_token(self):
        """
        Fail: Reset user password (invalid Token)
        """
        reset_url=f"{self.reset_password_url}?token={self.token}test"
        response=self.client.post(reset_url,{"password":"123456"}, format="json")
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)

class CustomerAuthTests(APITestCase):
    def setUp(self):
        # Setup
        self.dashboard_url = reverse("dashboard")
        self.user = User.objects.create_user(**user_data)
        self.token, created = Token.objects.get_or_create(user=self.user)
    def test_customer_dashboard_success(self):
        """
        Success: customer get dashboard infos.
        """
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token.key}")
        response=self.client.get(self.dashboard_url)
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertTrue("data" in response.data)
        self.assertTrue("success" in response.data)
        self.assertEqual(response.data["success"], True)
        self.assertTrue("orders" in response.data["data"])
        self.assertTrue("customer" in response.data["data"])
    def test_customer_dashboard_fail(self):
        """
        Fail: customer get dashboard infos. (Token missing)
        """
        response=self.client.get(self.dashboard_url)
        self.assertEqual(response.status_code,status.HTTP_401_UNAUTHORIZED)
    def test_customer_dashboard_invalid_token(self):
        """
        Fail: customer get dashboard infos. (invalid token)
        """
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token.key} asda")
        response=self.client.get(self.dashboard_url)
        self.assertEqual(response.status_code,status.HTTP_401_UNAUTHORIZED)

class AdminAuthTests(APITestCase):
    def setUp(self):
        # Setup
        self.admin_url = reverse("verify-admin")
        self.user = User.objects.create_superuser(**user_data)
        self.token, created = Token.objects.get_or_create(user=self.user)
    def test_admin_verification(self):
        """
        Success: verify admin.
        """
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token.key}")
        response=self.client.get(self.admin_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("success",response.data)
        self.assertEqual(response.data["success"], True)
    def test_admin_verification_missing_token(self):
        """
        Fail: verify admin.(missing token)
        """
        response=self.client.get(self.admin_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    def test_admin_verification_invalid_token(self):
        """
        Fail: verify admin.(invalid token)
        """
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token.key} asd")
        response=self.client.get(self.admin_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)