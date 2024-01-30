from scrapy.crawler import CrawlerProcess
from scrapy.settings import Settings
from bookScraper.bookScraper.spiders.amazonBook import AmazonbookSpider

async def run_book_spider(ean):
    scrapy_settings = Settings()
    scrapy_settings.setmodule("bookScraper.bookScraper.settings")

    process = CrawlerProcess(settings=scrapy_settings)
    process.crawl(AmazonbookSpider, ean=ean)
    process.start()

