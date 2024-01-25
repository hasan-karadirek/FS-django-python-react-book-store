
from .serializers import BookOnSaleSerializer,OrderDetailSerializer,OrderSerializer
from rest_framework import status,permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .models import BookOnSale,OrderDetail
from book.serializers import BookSerializer
from core.mixins import OpenOrderMixin,IsBookExist,IsSaleExist
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
        open_order=OpenOrderMixin().get_or_create_open_order(request)
        orderDetail,created=OrderDetail.objects.get_or_create(order=open_order,book_on_sale=request.bookOnSale)
        if not created:
            return Response({"message":"Book is already in your cart."},status=status.HTTP_400_BAD_REQUEST)
        serializer=OrderSerializer(open_order)

        return Response(serializer.data,status=status.HTTP_201_CREATED)
