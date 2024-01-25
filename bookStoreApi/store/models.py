from django.db import models
from book.models import Book
from customer.models import Customer
from django.db import transaction
from django.db.models import F

class BookOnSale(models.Model):
    conditionChoices = [
    ("NEW", 'New'),
    ("LIKE_NEW", 'Like New'),
    ("GOOD", 'Good'),
    ("POOR", 'Poor'),
    ]
    statusChoices = [
    ("OPEN", 'Open'),
    ("SOLD", 'Sold'),
    ("PENDING", 'Pending'),
    ]

    book=models.ForeignKey(Book, on_delete=models.CASCADE)
    customer=models.ForeignKey(Customer, on_delete=models.CASCADE)
    condition=models.CharField(max_length=50,choices=conditionChoices,verbose_name="Condition of the Book")
    price=models.DecimalField(max_digits=10, decimal_places=2)
    description=models.CharField(max_length=255)
    status=models.CharField(max_length=50, choices=statusChoices,verbose_name="Status of the Selling",default="OPEN")

    def __str__(self):
        return f'{self.book.name} - {self.customer.username}'  
class BookOnSaleImage(models.Model):
    book = models.ForeignKey(BookOnSale, related_name='on_sale_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='on_sale_images/')  

    def __str__(self):
        return f'{self.book.book.name} - {self.image.url}'  
    

class Order(models.Model):
    statusChoices = [
    ("OPEN", 'Open'),
    ("PAID", 'Sold'),
    ("PENDING", 'Pending'),
    ]
    customer = models.ForeignKey(Customer, related_name='orders', on_delete=models.CASCADE)
    address = models.TextField(max_length=500, blank=False,default="Address")
    cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    status=models.CharField(max_length=50, choices=statusChoices,verbose_name="Status of the order",default="OPEN")

    def __str__(self):
        return f"Order {self.id} by {self.customer.username}"  
    
class OrderDetail(models.Model):
    order = models.ForeignKey(Order, related_name="order_details", on_delete=models.CASCADE)
    book_on_sale = models.ForeignKey(BookOnSale, related_name="book_on_sale", on_delete=models.CASCADE)

    def __str__(self):
        return f"Order Detail for Order {self.order.id}"

    def save(self, *args, **kwargs):
        with transaction.atomic():
            try:
                book_on_sale = BookOnSale.objects.get(pk=self.book_on_sale_id)
                # ? Use F() expression to avoid race conditions
                self.order.cost = F('cost') + book_on_sale.price
                self.order.save()

                
                self.order.refresh_from_db()

                super().save(*args, **kwargs)
            except (BookOnSale.DoesNotExist, Order.DoesNotExist):
                raise Exception("database orderDetail save error")
        
    def delete(self, *args, **kwargs):
        with transaction.atomic():
            try:
                book_on_sale = BookOnSale.objects.get(pk=self.book_on_sale_id)
                # ? Use F() expression to avoid race conditions
                self.order.cost = F('cost') - book_on_sale.price
                self.order.save()
                super().delete(*args, **kwargs)
            except (BookOnSale.DoesNotExist, Order.DoesNotExist):
                raise Exception("database orderDetail delete error")

