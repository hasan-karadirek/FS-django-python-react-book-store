from .serializers import OrderSerializer, CheckoutSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import OrderDetail, Order, Address
from core.mixins import IsSaleExist
from core.helpers import isTokenExpired, find_active_order
from core.custom_exceptions import CustomAPIException
from core.mollie import createMolliePayment
from django.db import transaction
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from book.models import Book
from decimal import Decimal, ROUND_HALF_UP


class AddToCartView(IsSaleExist, APIView):
    def post(self, request, *args, **kwargs):
        open_order, open_order_created = find_active_order(request)
        orderDetail, created = OrderDetail.objects.get_or_create(
            order=open_order or open_order_created, book=request.book
        )
        if not created:
            raise CustomAPIException("Book is already in your cart.", status=400)
        serializer = OrderSerializer(open_order)
        response = {"success": True, "data": serializer.data}
        return Response(response, status=status.HTTP_201_CREATED)


class RemoveFromCartView(APIView):
    def put(self, request, bookPk, *args, **kwargs):
        open_order, open_order_created = find_active_order(request)

        if open_order_created:
            orderSerializer = OrderSerializer(open_order)
            raise CustomAPIException(
                "Book is already not in your cart.",
                data=orderSerializer.data,
                status=400,
            )
        try:
            book = Book.objects.get(id=bookPk)
            orderDetail = OrderDetail.objects.get(order=open_order, book=book)
            orderDetail.delete()
            open_order.refresh_from_db()
        except OrderDetail.DoesNotExist or Book.DoesNotExist:
            orderSerializer = OrderSerializer(open_order)
            raise CustomAPIException(
                "Book is already not in your cart.",
                data=orderSerializer.data,
                status=400,
            )
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

                    order_qs.exclude(id=open_order.id).delete()
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
                """TODO: in frontend handle new cart"""
                raise CustomAPIException(
                    "The book(s) you have added to your cart is not available anymore! {}".format(
                        *deleted_details
                    ),
                    status=404,
                    name="unavailable-books",
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
                    total_cost = float(open_order.cost) + open_order.post_cost

                    payment = createMolliePayment(
                        str(
                            Decimal(total_cost).quantize(
                                Decimal("0.00"), rounding=ROUND_HALF_UP
                            )
                        ),
                        open_order.id,
                        checkoutSerializer.validated_data.get("redirectUrl"),
                    )
            except Exception as e:
                open_order.refresh_from_db()

                raise CustomAPIException(
                    f"Checkout can not process, please try again later. {e}", 500,
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
    def get(self, request, orderPk, *args, **kwargs):
        try:
            order = Order.objects.get(id=orderPk)
            serializer = OrderSerializer(order)
            if request.user.is_authenticated:
                if order.customer.id != request.user.id:
                    raise CustomAPIException(
                        "You do not have authorization for this order- code-1",
                        status=status.HTTP_401_UNAUTHORIZED,
                    )
            else:
                if request.COOKIES.get(
                    "session_id"
                ) == None or order.session_id != request.COOKIES.get("session_id"):
                    raise CustomAPIException(
                        "You do not have authorization for this order code-2",
                        status=status.HTTP_401_UNAUTHORIZED,
                    )

            return Response(
                {"data": serializer.data, "success": True}, status=status.HTTP_200_OK
            )
        except Order.DoesNotExist:
            raise CustomAPIException(
                "There is no order associated with this id!", status=404
            )


from django.views.generic import TemplateView


class RobotsTxtView(TemplateView):
    template_name = "robots.txt"
    content_type = "text/plain"
