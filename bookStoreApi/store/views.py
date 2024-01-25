
from .serializers import BookOnSaleSerializer,OrderDetailSerializer,OrderSerializer
from rest_framework import status,permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .models import BookOnSale,OrderDetail,Order
from book.serializers import BookSerializer
from core.mixins import IsBookExist,IsSaleExist
class SellBookView(APIView):
    parser_classes = (MultiPartParser, FormParser)  # To handle file uploads
    permission_classes=[permissions.IsAuthenticated]

    def post(self,request, *args, **kwargs):
        serializer=BookOnSaleSerializer(data=request.data,context={'request':request})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class GetOnSaleBookView(IsSaleExist,APIView):

    def get(self,request,salePk,*args,**kwargs):
        
        serializer=BookOnSaleSerializer(request.bookOnSale)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
class GetOnSaleBooksByBookPkView(IsBookExist, APIView):

    def get(self,request,bookPk,*args,**kwargs):
        
        
        books_on_sale=BookOnSale.objects.filter(book=request.book,status="OPEN")
        bookOnSaleSerializer=BookOnSaleSerializer(books_on_sale,many=True)
        bookSerializer=BookSerializer(request.book)
        response_data=bookSerializer.data
        response_data["on_sale_books"]=bookOnSaleSerializer.data
       
        return Response(response_data,status=status.HTTP_200_OK)
class AddToCartView(IsSaleExist,APIView):
    permission_classes=[permissions.IsAuthenticated]
    def post(self,request,*args,**kwargs):
        open_order,open_order_created=Order.objects.get_or_create(customer=request.user,status="OPEN")
        orderDetail,created=OrderDetail.objects.get_or_create(order=open_order or open_order_created,book_on_sale=request.bookOnSale)
        if not created:
            return Response({"message":"Book is already in your cart."},status=status.HTTP_400_BAD_REQUEST)
        serializer=OrderSerializer(open_order)

        return Response(serializer.data,status=status.HTTP_201_CREATED)
class RemoveFromCartView(IsSaleExist,APIView):
    permission_classes=[permissions.IsAuthenticated]
    def put(self,request,*args,**kwargs):
        open_order,open_order_created=Order.objects.get_or_create(customer=request.user,status="OPEN")
        try:
            orderDetail = OrderDetail.objects.get(order=open_order or open_order_created, book_on_sale=request.bookOnSale)
            orderDetail.delete()
            open_order.refresh_from_db()
        except OrderDetail.DoesNotExist:
            return Response({"message":"Book is already not in your cart."},status=status.HTTP_400_BAD_REQUEST)
        print(open_order)
        serializer=OrderSerializer(open_order)

        return Response(serializer.data,status=status.HTTP_201_CREATED)
class CheckOutView(APIView):
    permission_classes=[permissions.IsAuthenticated]
    
    def put(self,request,*args,**kwargs):
        open_order,open_order_created=Order.objects.get_or_create(customer=request.user,status="OPEN")
        if open_order_created or open_order.cost==0:
            return Response({"message":"Your cart is empty! You can not continue to checkout."},status=status.HTTP_400_BAD_REQUEST)
        deleted_detail=0
        for order_detail in open_order.order_details.all():
            if order_detail.book_on_sale.status != "OPEN":
                order_detail.delete()
                deleted_detail+=1
        if deleted_detail>0:
            open_order.refresh_from_db()
            serializer=OrderSerializer(open_order)
            return Response({"message":"The book(s) you have added to your cart is not available anymore! {}".format(order_detail.book_on_sale.book.name),"order":serializer.data},status=status.HTTP_404_NOT_FOUND)
        
        for order_detail in open_order.order_details.all():
            order_detail.book_on_sale.status="PENDING"
            order_detail.book_on_sale.save()
        open_order.status="PENDING"
        open_order.save()
        open_order.refresh_from_db()
        serializer=OrderSerializer(open_order)
        return Response(serializer.data,status=status.HTTP_200_OK)
