from rest_framework.views import APIView
from .serializers import MollieHookSerializer
from core.mollie import getPayment
from store.models import Order
from core.custom_exceptions import CustomAPIException
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from core import create_email


class MollieHookAPIView(APIView):
    def post(self, request, orderId, *args, **kwargs):
        serializer = MollieHookSerializer(data=request.data)
        if serializer.is_valid():
            paymentId = serializer.data["id"]
            payment = getPayment(paymentId)
            try:
                order = Order.objects.get(id=orderId)
                if payment.status == "paid":
                    order.status = "PAID"
                    order.save()
                    for detail in order.order_details.all():
                        detail.book.status = "SOLD"
                        detail.save()
                    send_mail(
                        "Order Confirmation - Le Flaneur Amsterdam",
                        "We have recieved your order.",
                        settings.DEFAULT_FROM_EMAIL,
                        [
                            order.customer.email
                            if order.customer
                            else order.address.email
                        ],
                        fail_silently=True,
                        html_message=create_email.order_confirmation_email(order)
                    )
                elif payment.status in ["failed", "canceled", "expired"]:
                    order.status = payment.status.upper()
                    for detail in order.order_details.all():
                        detail.book.status = "OPEN"
                        detail.save()
                    order.save()
                    
                    send_mail(
                        "Payment Failed - Le Flaneur Amsterdam",
                        "Your payment is failed.",
                        settings.DEFAULT_FROM_EMAIL,
                        [order.customer.email if order.customer else order.email],
                        fail_silently=True,
                        html_message=create_email.payment_failed_email(order)
                    )
                return Response(status=status.HTTP_200_OK)
            except Order.DoesNotExist:
                raise CustomAPIException(
                    "order id: {} does not exist!".format(orderId), status=404
                )
        raise CustomAPIException("Invalid Data", status=400)
