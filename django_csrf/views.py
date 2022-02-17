from django.http import HttpRequest, JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie

def csrf(request: HttpRequest):
    return JsonResponse({
        'csrfToken': get_token(request=request)
    })

@ensure_csrf_cookie
def ping(request: HttpRequest):
    return JsonResponse({
        'result': 'OK'
    })
