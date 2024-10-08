from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from book.models import Book  # Assuming you have a Book model


class StaticViewSitemap(Sitemap):
    priority = 0.5
    changefreq = "daily"

    def items(self):
        return ["home"]

    def location(self, item):
        return reverse(item)

    def get_urls(self, page=1, site=None, protocol="https", **kwargs):
        return super().get_urls(page=page, site=site, protocol=protocol, **kwargs)


class BookListSitemap(Sitemap):
    priority = 0.8
    changefreq = "weekly"

    def items(self):
        return Book.objects.values("category__title", "language__name").distinct()

    def location(self, item):
        return f'/shop/books?page=1&search=&category={item["category__title"]}&language={item["language__name"]}'

    def get_urls(self, page=1, site=None, protocol="https", **kwargs):
        return super().get_urls(page=page, site=site, protocol=protocol, **kwargs)


class BookSitemap(Sitemap):
    priority = 0.8
    changefreq = "weekly"

    def items(self):
        return Book.objects.values("slug")

    def location(self, item):
        return f'/shop/books/{item["slug"]}'

    def get_urls(self, page=1, site=None, protocol="https", **kwargs):
        return super().get_urls(page=page, site=site, protocol=protocol, **kwargs)
