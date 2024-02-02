from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
from bookScraper.bookScraper.spiders.amazonBook import AmazonbookSpider

def run_book_spider(ean):
    process = CrawlerProcess(get_project_settings())
    process.crawl(AmazonbookSpider, ean=ean)
    process.start()
