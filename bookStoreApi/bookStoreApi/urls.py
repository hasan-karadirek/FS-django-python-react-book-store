"""
URL configuration for bookStoreApi project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include, re_path
from frontend.views import index
from core.sitemap import StaticViewSitemap, BookSitemap, BookListSitemap
from django.contrib.sitemaps.views import sitemap
from store.views import RobotsTxtView

sitemaps = {
    "static": StaticViewSitemap,
    "books": BookSitemap,
    "bookLists": BookListSitemap,
}

urlpatterns = [
    path("admin/", admin.site.urls),
    path("robots.txt", RobotsTxtView.as_view(), name="robots_txt"),
    path("sitemap.xml", sitemap, {"sitemaps": sitemaps}, name="sitemap"),
    path("api/store/", include("store.urls")),
    path("api/customer/", include("customer.urls")),
    path("api/blog/", include("blog.urls")),
    path("api/book/", include("book.urls")),
    path("api/payment/", include("payment.urls")),
]


urlpatterns.append(re_path(r"^.*$", index, name="home"))
