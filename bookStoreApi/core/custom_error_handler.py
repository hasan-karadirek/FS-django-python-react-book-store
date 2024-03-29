from django.http import JsonResponse
from .custom_exceptions import CustomAPIException


class CustomExceptionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_exception(self, request, exception):
        if isinstance(exception, CustomAPIException):
            return JsonResponse(
                {"message": exception.message, "data": exception.data},
                status=exception.status,
            )
