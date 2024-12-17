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
    if request.user.is_authenticated:
        try:
            token = Token.objects.get(user=request.user.id)
            if timezone.now() - token.created > timedelta(hours=720):
                token.delete()
                raise CustomAPIException(
                    "Token has expired. Please login again.", 401, name="expired_token"
                )
        except Token.DoesNotExist:
            raise CustomAPIException("Invalid Token.", 401, name="invalid_token")


def find_active_order(request):
    if request.user.is_authenticated:
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
    else:
        if request.COOKIES.get("session_id") == None:
            raise CustomAPIException(
                "Please provide session_id in cookies.", status=400
            )
        open_order, open_order_created = Order.objects.get_or_create(
            session_id=request.COOKIES.get("session_id"), status="OPEN"
        )

    return open_order, open_order_created

# Utility function to format serializer errors
def format_serializer_errors(errors):
    messages = []
    for field, field_errors in errors.items():
        # Join all error messages for a field into a single string
        messages.append(f"{field}: {', '.join([str(err) for err in field_errors])}")
    return " | ".join(messages)  # Join all field error messages
