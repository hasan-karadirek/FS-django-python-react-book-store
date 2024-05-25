from django.core.paginator import Paginator, EmptyPage
from core.custom_exceptions import CustomAPIException
from rest_framework.authtoken.models import Token
from django.utils import timezone
from datetime import timedelta  



def pagination(instances,size,page_number):
    paginator=Paginator(instances,size)
    try:
        page = paginator.page(page_number)
    except EmptyPage:
        raise CustomAPIException("No more pages", status=404)
    return page


def isTokenExpired(request):
    print("heyhey",str(request.user))
    if str(request.user)!="AnonymousUser":
        try:
            print("heyhey",str(request.user))
            token = Token.objects.get(user=request.user.id)
            if timezone.now() - token.created > timedelta(hours=12):
                token.delete()
                raise CustomAPIException("Token has expired. Please login again.",401)
        except Token.DoesNotExist:
            raise CustomAPIException("Invalid Token.",401)
    