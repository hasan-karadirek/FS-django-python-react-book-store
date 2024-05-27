from django.http import JsonResponse
from .custom_exceptions import CustomAPIException
from rest_framework.exceptions import AuthenticationFailed, NotAuthenticated
from rest_framework.views import exception_handler


class CustomExceptionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_exception(self, request, exception):
        print(exception)
        if isinstance(exception, CustomAPIException):
            return JsonResponse(
                {
                    "success": False,
                    "msg": exception.message,
                    "name": exception.name,
                    "data": exception.data,
                },
                status=exception.status,
            )


def custom_exception_handler(exc, context):
    if isinstance(exc, (AuthenticationFailed, NotAuthenticated)):
        return JsonResponse(
            {
                "success": False,
                "msg": "Authentication failed. Please provide a valid token.",
                "name": "invalid_token",
            },
            status=401,
        )
    response = exception_handler(exc, context)
    return response
