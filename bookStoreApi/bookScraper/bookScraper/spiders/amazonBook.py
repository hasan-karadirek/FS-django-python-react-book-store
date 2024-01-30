import scrapy


class AmazonbookSpider(scrapy.Spider):
    name = "amazonBook"
    allowed_domains = ["amazon.com"]
    start_urls = ["https://amazon.com/s?k/"]

    def __init__(self, ean, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.ean = ean


    def parse(self, response):
        print("hasan", response)

    def start_requests(self):
        
        yield scrapy.Request(url=self.start_urls[0]+self.ean, callback=self.parse)
        
