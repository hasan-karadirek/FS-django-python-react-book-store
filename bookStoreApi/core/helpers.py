from django.core.paginator import Paginator, EmptyPage
from core.custom_exceptions import CustomAPIException



def pagination(instances,size,page_number):
    paginator=Paginator(instances,size)
    try:
        page = paginator.page(page_number)
    except EmptyPage:
        raise CustomAPIException("No more pages", status=404)
    return page