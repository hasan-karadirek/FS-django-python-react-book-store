from .serializers import OrderSerializer, CheckoutSerializer
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import OrderDetail, Order, Address
from core.mixins import IsSaleExist
from core.helpers import isTokenExpired
from core.custom_exceptions import CustomAPIException
from core.mollie import createMolliePayment
from django.db import transaction
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser


class AddToCartView(IsSaleExist, APIView):
    def post(self, request, *args, **kwargs):
        if str(request.user) == "AnonymousUser":
            if request.COOKIES.get("session_id") == None:
                raise CustomAPIException(
                    "Please provide session_id in cookies.", status=400
                )
            open_order, open_order_created = Order.objects.get_or_create(
                session_id=request.COOKIES.get("session_id"), status="OPEN"
            )
        else:
            isTokenExpired(request)
            order_qs = Order.objects.filter(
                customer=request.user, status="OPEN"
            ).order_by("-id")
            if order_qs.exists():
                open_order = order_qs.first()
                open_order_created = False
            else:
                open_order = Order.objects.create(customer=request.user, status="OPEN")
                open_order_created = True
        orderDetail, created = OrderDetail.objects.get_or_create(
            order=open_order or open_order_created, book=request.book
        )
        if not created:
            raise CustomAPIException("Book is already in your cart.", status=400)
        serializer = OrderSerializer(open_order)
        response = {"success": True, "data": serializer.data}
        return Response(response, status=status.HTTP_201_CREATED)


class RemoveFromCartView(IsSaleExist, APIView):
    def put(self, request, *args, **kwargs):
        if str(request.user) == "AnonymousUser":
            if request.COOKIES.get("session_id") == None:
                raise CustomAPIException(
                    "Please provide session_id in cookies.", status=400
                )
            open_order, open_order_created = Order.objects.get_or_create(
                session_id=request.COOKIES.get("session_id"), status="OPEN"
            )
        else:
            isTokenExpired(request)
            order_qs = Order.objects.filter(
                customer=request.user, status="OPEN"
            ).order_by("-id")
            if order_qs.exists():
                open_order = order_qs.first()
                open_order_created = False
            else:
                open_order = Order.objects.create(customer=request.user, status="OPEN")
                open_order_created = True

        if open_order_created:
            raise CustomAPIException("Book is already not in your cart.", status=400)
        try:
            orderDetail = OrderDetail.objects.get(
                order=open_order or open_order_created, book=request.book
            )
            orderDetail.delete()
            open_order.refresh_from_db()
        except OrderDetail.DoesNotExist:
            raise CustomAPIException("Book is already not in your cart.", status=400)
        serializer = OrderSerializer(open_order)
        response = {"success": True, "data": serializer.data}
        return Response(response, status=status.HTTP_201_CREATED)


class CheckOutView(APIView):

    parser_classes = [FormParser, JSONParser, MultiPartParser]

    def put(self, request, *args, **kwargs):
        checkoutSerializer = CheckoutSerializer(data=request.data)
        if checkoutSerializer.is_valid():
            if str(request.user) == "AnonymousUser":
                open_order, open_order_created = Order.objects.get_or_create(
                    session_id=request.COOKIES.get("session_id"), status="OPEN"
                )
            else:
                isTokenExpired(request)
                order_qs = Order.objects.filter(
                    customer=request.user, status="OPEN"
                ).order_by("-id")
                if order_qs.exists():
                    open_order = order_qs.first()
                    open_order_created = False
                else:
                    open_order = Order.objects.create(
                        customer=request.user, status="OPEN"
                    )
                    open_order_created = True

            if open_order_created or open_order.cost == 0:
                raise CustomAPIException(
                    "Your cart is empty! You can not continue to checkout.", status=400
                )

            deleted_details = []
            order_details = open_order.order_details.all()

            for order_detail in order_details:
                if order_detail.book.status != "OPEN":
                    order_detail.delete()
                    deleted_details.append(order_detail.book.title)

            if len(deleted_details) > 0:
                open_order.refresh_from_db()
                serializer = OrderSerializer(open_order)
                raise CustomAPIException(
                    "The book(s) you have added to your cart is not available anymore! {}".format(
                        *deleted_details
                    ),
                    status=404,
                    data=serializer.data,
                )
            try:

                with transaction.atomic():
                    for order_detail in order_details:
                        order_detail.book.status = "PENDING"
                        order_detail.book.save()

                    open_order.status = "PENDING"
                    open_order.address = Address.objects.create(
                        **checkoutSerializer.validated_data["address"]
                    )
                    open_order.save()
                    payment = createMolliePayment(
                        str(open_order.cost),
                        open_order.id,
                        checkoutSerializer.validated_data.get("redirectUrl"),
                    )
            except:
                open_order.refresh_from_db()
                raise CustomAPIException(
                    "Checkout can not process, please try again later.",
                    500,
                    data=open_order,
                )

            open_order.refresh_from_db()

            serializer = OrderSerializer(open_order)
            response_data = {
                "success": True,
                "data": {
                    "order": serializer.data,
                    "redirectUrl": payment["_links"]["checkout"]["href"],
                },
            }

            return Response(response_data, status=status.HTTP_200_OK)
        else:
            raise CustomAPIException(str(checkoutSerializer.errors), status=400)


class OrderStatusView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, orderPk, *args, **kwargs):
        try:
            order = Order.objects.get(id=orderPk)
            serializer = OrderSerializer(order)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Order.DoesNotExist:
            raise CustomAPIException(
                "There is no order associated with this id!", status=404
            )
