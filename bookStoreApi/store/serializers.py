from rest_framework import serializers
from .models import BookOnSale,BookOnSaleImage
from book.models import Book


class BookOnSaleImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookOnSaleImage
        fields = ["book",'image']
class BookOnSaleSerializer(serializers.ModelSerializer):
    book=serializers.CharField(max_length=50)
    images = BookOnSaleImageSerializer(many=True,read_only=True)
    onSale_images=serializers.ListField(
        child=serializers.ImageField(max_length = 255),
        write_only=True
    )
    class Meta:
        model = BookOnSale
        fields = ["book","condition","price","images","onSale_images"]
    def create(self,validated_data):
        images_data=validated_data.pop("onSale_images")
        bookId=validated_data.pop("book")
        customer=self.context["request"].user
        try:
            book=Book.objects.get(id=bookId)
        except Book.DoesNotExist:
            raise serializers.ValidationError({"book": "A book with this ID does not exist."})

        on_sale_book=BookOnSale.objects.create(book=book,customer=customer,**validated_data)


        for image_data in images_data:
            BookOnSaleImage.objects.create(book=on_sale_book, image=image_data)

        return on_sale_book
