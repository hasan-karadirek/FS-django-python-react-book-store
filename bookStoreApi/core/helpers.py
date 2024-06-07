from django.core.paginator import Paginator, EmptyPage
from core.custom_exceptions import CustomAPIException
from rest_framework.authtoken.models import Token
from django.utils import timezone
from datetime import timedelta
from store.models import Order


def pagination(instances, size, page_number):
    paginator = Paginator(instances, size)
    try:
        page = paginator.page(page_number)
    except EmptyPage:
        raise CustomAPIException("No more pages", status=404)
    return {
        "total": paginator.count,
        "total_pages": paginator.num_pages,
        "current_page": int(page_number),
        "page_size": size,
        "page": page,
    }


def isTokenExpired(request):
    if str(request.user) != "AnonymousUser":
        try:
            token = Token.objects.get(user=request.user.id)
            if timezone.now() - token.created > timedelta(hours=24):
                token.delete()
                raise CustomAPIException(
                    "Token has expired. Please login again.", 401, name="expired_token"
                )
        except Token.DoesNotExist:
            raise CustomAPIException("Invalid Token.", 401, name="invalid_token")

def find_active_order(request):
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
        order_qs = Order.objects.filter(customer=request.user, status="OPEN").order_by(
            "-id"
        )
        if order_qs.exists():
            open_order = order_qs.first()
            open_order_created = False
        else:
            open_order = Order.objects.create(customer=request.user, status="OPEN")
            open_order_created = True
    return open_order, open_order_created

