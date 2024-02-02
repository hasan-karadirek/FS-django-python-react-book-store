import scrapy
class AmazonbookSpider(scrapy.Spider):
    name = "amazonBook"
    allowed_domains = ["amazon.com"]
    start_urls = ["https://amazon.com/s?k="]

    def __init__(self, ean, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.ean = ean


    def parse(self, response):
        
        print("hasan", response)
        self.logger.info("hasan")
        self.crawler.engine.close_spider(self, 'Finished processing the single request')
    def start_requests(self):
        
        self.logger.info("started scrapy lol")
        yield scrapy.Request(url=self.start_urls[0]+self.ean, callback=self.parse,headers={'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'})
        
