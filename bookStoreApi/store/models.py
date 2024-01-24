from django.db import models
from book.models import Book
from customer.models import Customer
class BookOnSale(models.Model):
    conditionChoices = [
    ("NEW", 'New'),
    ("LIKE_NEW", 'Like New'),
    ("GOOD", 'Good'),
    ("POOR", 'Poor'),
    ]

    book=models.ForeignKey(Book, on_delete=models.CASCADE)
    customer=models.ForeignKey(Customer, on_delete=models.CASCADE)
    condition=models.CharField(max_length=50,choices=conditionChoices,verbose_name="Condition of the Book")
    price=models.DecimalField(max_digits=10, decimal_places=2)
    description=models.CharField(max_length=255)

    def __str__(self):
        return f'{self.book.name} - {self.customer.username}'  
class BookOnSaleImage(models.Model):
    book = models.ForeignKey(BookOnSale, related_name='on_sale_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='on_sale_images/')  

    def __str__(self):
        return f'{self.book.book.name} - {self.image.url}'  
    

