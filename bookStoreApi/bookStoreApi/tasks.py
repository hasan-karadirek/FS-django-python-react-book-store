

from celery import shared_task
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
import logging

from bookScraper.bookScraper.spiders.amazonBook import AmazonbookSpider

# Define your Celery task to run the spider
@shared_task
def run_spider_task(ean):
    runner = CrawlerProcess(get_project_settings())
    runner.crawl(AmazonbookSpider, ean=ean)