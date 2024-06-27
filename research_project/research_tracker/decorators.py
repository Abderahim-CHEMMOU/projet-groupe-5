# research_tracker/decorators.py

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

def csrf_exempt_view(view):
    """
    Exempt a view from CSRF verification.
    """
    @method_decorator(csrf_exempt)
    def wrapped_view(*args, **kwargs):
        return view(*args, **kwargs)
    return wrapped_view
