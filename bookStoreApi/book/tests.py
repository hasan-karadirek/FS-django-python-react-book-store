from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from django.core.files.uploadedfile import SimpleUploadedFile

User = get_user_model()


class AddBookTests(APITestCase):
    def setUp(self):
        # Setup
        self.add_book_url = reverse("add-book")
        self.user_data = {
            "username": "testuser",
            "email": "test@example.com",
            "password": "testpassword123",
        }
        self.user = User.objects.create_user(**self.user_data)
        self.token, created = Token.objects.get_or_create(user=self.user)
        self.book_data = {
            "author": "Orhan Pamuk",
            "publishing_house": "Hasan's House",
            "name": "Aklimdaki Salak",
            "ean": "1234262890112",
        }
        with open("media/book_images/test_image.jpg", "rb") as img:
            uploaded_image = SimpleUploadedFile(
                "test_image.jpg", img.read(), content_type="image/jpeg"
            )
            self.book_data["uploaded_images"] = uploaded_image

    def test_add_book_success(self):
        """
        Add book in success with 1 image.
        """
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        response = self.client.post(
            self.add_book_url, self.book_data, format="multipart"
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, f"{response}")
        self.assertEqual(self.book_data["author"], response.data["author"])
        self.assertEqual(
            self.book_data["publishing_house"], response.data["publishing_house"]
        )
        self.assertEqual(self.book_data["name"], response.data["name"])
        self.assertEqual(self.book_data["ean"], response.data["ean"])
        self.assertTrue(len(response.data["images"]) == 1)

    def test_add_book_fail_missing_author(self):
        """
        Add book in fail (missing author).
        """
        self.book_data.pop("author")
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        response = self.client.post(
            self.add_book_url, self.book_data, format="multipart"
        )
        self.assertEqual(
            response.status_code, status.HTTP_400_BAD_REQUEST, f"{response}"
        )

    def test_add_book_fail_missing_name(self):
        """
        Add book in fail (missing name).
        """
        self.book_data.pop("name")
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        response = self.client.post(
            self.add_book_url, self.book_data, format="multipart"
        )
        self.assertEqual(
            response.status_code, status.HTTP_400_BAD_REQUEST, f"{response}"
        )

    def test_add_book_fail_existed_book(self):
        """
        Add book in fail (already exist ean).
        """

        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        response = self.client.post(
            self.add_book_url, self.book_data, format="multipart"
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, f"{response}")

        response2 = self.client.post(
            self.add_book_url, self.book_data, format="multipart"
        )
        self.assertTrue(response2.status_code == status.HTTP_400_BAD_REQUEST)

    def test_add_book_fail_unauthorized(self):
        """
        Add book in fail unauthorized.
        """
        response = self.client.post(
            self.add_book_url, self.book_data, format="multipart"
        )
        self.assertEqual(
            response.status_code, status.HTTP_401_UNAUTHORIZED, f"{response}"
        )
