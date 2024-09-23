from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
import copy
import re
from django.core import mail
from django.core.files.uploadedfile import SimpleUploadedFile

User = get_user_model()
admin_data = {
            "username": "testadmin",
            "email": "testadmin@example.com",
            "password": "testpassword123",
            "first_name":"test firstname",
            "last_name":" test lastname"
        }
user_data= {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "testpassword123",
            "first_name":"test firstname",
            "last_name":" test lastname"
        }
test_posts=[
    {"title":"test title 1", "content":"Test Content 1"},
    {"title":"test title 2", "content":"Test Content 2"},
    {"title":"test title 3", "content":"Test Content 3"},
]

class AdminAddPostTests(APITestCase):
    def setUp(self):
        self.add_post_url=reverse("add-post")
        self.admin = User.objects.create_superuser(**admin_data)
        self.token, created = Token.objects.get_or_create(user=self.admin)
        self.user = User.objects.create_user(**user_data)
        self.user_token,_=Token.objects.get_or_create(user=self.user)
    def get_uploaded_image(self):
        # Open the image file again for each test, ensuring it can be consumed again
        with open("frontend/static/react/80887bb7de155027243bc644e9d757e8.jpeg", "rb") as img:
            return SimpleUploadedFile(
                "test_image.jpg", img.read(), content_type="image/jpeg"
            )
    def test_add_post_success(self):
        """
        Success: admin adds post.
        """
        test_posts[0]["image"]=self.get_uploaded_image()
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token.key}")
        response=self.client.post(self.add_post_url,test_posts[0],format="multipart")
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)
    def test_add_post_fail_missing_title(self):
        """
        Fail: admin adds post.(missing title)
        """
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token.key}")
        response=self.client.post(self.add_post_url,{"content":test_posts[0]["content"],"image":self.get_uploaded_image()},format="multipart")
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
    def test_add_post_fail_missing_content(self):
        """
        Fail: admin adds post.(missing content)
        """
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token.key}")
        response=self.client.post(self.add_post_url,{"title":test_posts[0]["title"],"image":self.get_uploaded_image()},format="multipart")
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
    def test_add_post_fail_missing_image(self):
        """
        Fail: admin adds post.(missing image)
        """
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token.key}")
        response=self.client.post(self.add_post_url,{"title":test_posts[0]["title"],"content":test_posts[0]["content"]},format="multipart")
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
    def test_add_post_fail_forbidden(self):
        """
        Fail: admin adds post.(no admin user (forbidden))
        """
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.user_token.key}")
        response=self.client.post(self.add_post_url,{"title":test_posts[0]["title"],"content":test_posts[0]["content"],"image":self.get_uploaded_image()},format="multipart")
        self.assertEqual(response.status_code,status.HTTP_403_FORBIDDEN)
    def test_add_post_fail_unauthorization(self):
        """
        Fail: admin adds post.(unauthorized)
        """
        response=self.client.post(self.add_post_url,{"title":test_posts[0]["title"],"content":test_posts[0]["content"],"image":self.get_uploaded_image()},format="multipart")
        self.assertEqual(response.status_code,status.HTTP_401_UNAUTHORIZED)
class AdminUpdatePostTests(APITestCase):
    def setUp(self):
        
        self.add_post_url=reverse("add-post")
        self.admin = User.objects.create_superuser(**admin_data)
        self.token, created = Token.objects.get_or_create(user=self.admin)
        self.user = User.objects.create_user(**user_data)
        self.user_token,_=Token.objects.get_or_create(user=self.user)

        # add test post
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token.key}")
        response=self.client.post(self.add_post_url,{"title":test_posts[0]["title"],"content":test_posts[0]["content"],"image":self.get_uploaded_image()})
        
        self.update_post_url=reverse("update-post",kwargs={"postPk":response.data["id"]})
        
    def get_uploaded_image(self):
        # Open the image file again for each test, ensuring it can be consumed again
        with open("frontend/static/react/80887bb7de155027243bc644e9d757e8.jpeg", "rb") as img:
            return SimpleUploadedFile(
                "test_image.jpg", img.read(), content_type="image/jpeg"
            )
    def get_uploaded_update_image(self):
        # Open the image file again for each test, ensuring it can be consumed again
        with open("frontend/static/react/a8ca80b38d57b9930d9dee0ecc142c05.jpeg", "rb") as img:
            return SimpleUploadedFile(
                "test_image.jpg", img.read(), content_type="image/jpeg"
            )
    def test_update_post_success(self):
        """
        Success: admin updates post.
        """
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token.key}")
        response=self.client.put(self.update_post_url,{"title":test_posts[1]["title"],"content":test_posts[1]["content"],"image":self.get_uploaded_update_image()})
        self.assertTrue(response.data["title"],test_posts[1]["title"])
        self.assertTrue(response.data["content"],test_posts[1]["content"])
        self.assertIn("a8ca80b38d57b9930d9dee0ecc142c05.jpeg",response.data["image"]) "image control"