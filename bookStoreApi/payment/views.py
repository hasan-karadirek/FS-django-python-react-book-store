from rest_framework.views import APIView
from .serializers import MollieHookSerializer
from core.mollie import getPayment
from store.models import Order
from core.custom_exceptions import CustomAPIException
from rest_framework.response import Response
from rest_framework import status


class MollieHookAPIView(APIView):
    def post(self, request, orderId, *args, **kwargs):
        serializer= MollieHookSerializer(data=request.data)
        if serializer.is_valid():
            paymentId=serializer.data["id"]
            payment=getPayment(paymentId)
            try:
                order=Order.objects.get(id=orderId)
                if payment.status=="paid":
                    order.status="PAID"
                    order.save()
                elif payment.status in ["failed","canceled","expired"]:
                    order.status="OPEN"
                    order.save()
                return Response(status=status.HTTP_200_OK)
            except Order.DoesNotExist:
                raise CustomAPIException("order id: {}".format(orderId),status=404)
        raise CustomAPIException("",status=400)
