
from .serializers import BookOnSaleSerializer
from rest_framework import status,permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .models import BookOnSale

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

class GetOnSaleBookView(APIView):

    def get(self,request,pk,*args,**kwargs):
        try:
            bookOnSale=BookOnSale.objects.get(pk=pk)
        except BookOnSale.DoesNotExist:
            return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer=BookOnSaleSerializer(bookOnSale)
        return Response(serializer.data,status=status.HTTP_200_OK)