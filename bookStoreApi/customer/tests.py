from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

User = get_user_model()


class CustomerRegisterTests(APITestCase):
    def setUp(self):
        # Setup
        self.register_url = reverse("register")
        self.user_data = {
            "username": "testuser",
            "email": "test@example.com",
            "password": "testpassword123",
        }

    def test_user_registration_success(self):
        """
        Create a new user in success.
        """
        response = self.client.post(self.register_url, self.user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue("username" in response.data)
        self.assertTrue("email" in response.data)
        self.assertFalse("password" in response.data)

    def test_user_registration_missing_password(self):
        """
        Create a new user in fail (missing password).
        """
        self.user_data.pop("password")
        response = self.client.post(self.register_url, self.user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_registration_missing_email(self):
        """
        Create a new user in fail (missing email).
        """
        self.user_data.pop("email")
        response = self.client.post(self.register_url, self.user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_registration_missing_username(self):
        """
        Create a new user in fail (missing username).
        """
        self.user_data.pop("username")
        response = self.client.post(self.register_url, self.user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class CustomerLoginTests(APITestCase):
    def setUp(self):
        # Setup
        self.login_url = reverse("login")
        self.user_data = {
            "username": "testuser",
            "email": "test@example.com",
            "password": "testpassword123",
        }
        self.user = User.objects.create_user(**self.user_data)

    def test_user_login_success(self):
        """
        Login user in success.
        """
        self.user_data.pop("email")
        response = self.client.post(self.login_url, self.user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue("token" in response.data)

    def test_user_login_missing_password(self):
        """
        Login user in fail (missing password).
        """
        self.user_data.pop("email")
        self.user_data.pop("password")
        response = self.client.post(self.login_url, self.user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue("token" not in response.data)

    def test_user_login_missing_password(self):
        """
        Login user in fail (missing username).
        """
        self.user_data.pop("email")
        self.user_data.pop("username")
        response = self.client.post(self.login_url, self.user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class CustomerLogoutTests(APITestCase):
    def setUp(self):
        # Setup
        self.logout_url = reverse("logout")
        self.user_data = {
            "username": "testuser",
            "email": "test@example.com",
            "password": "testpassword123",
        }
        self.user = User.objects.create_user(**self.user_data)
        self.token, created = Token.objects.get_or_create(user=self.user)

    def test_user_logout_success(self):
        """
        Login user in fail (missing username).
        """
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        response = self.client.post(self.logout_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # again without token
        response = self.client.post(self.logout_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
