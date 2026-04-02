from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import ContactMessage
import json


def home(request):
    return render(request, 'index.html')


@require_http_methods(["POST"])
def contact(request):
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'

    name = request.POST.get('name', '').strip()
    email = request.POST.get('email', '').strip()
    subject = request.POST.get('subject', '').strip()
    message = request.POST.get('message', '').strip()

    if not all([name, email, subject, message]):
        if is_ajax:
            return JsonResponse({'status': 'error', 'message': 'Todos los campos son requeridos.'}, status=400)
        return render(request, 'index.html', {'form_error': 'Todos los campos son requeridos.'})

    ContactMessage.objects.create(
        name=name,
        email=email,
        subject=subject,
        message=message,
    )

    if is_ajax:
        return JsonResponse({'status': 'success', 'message': '¡Mensaje enviado correctamente!'})

    return render(request, 'index.html', {'form_success': '¡Mensaje enviado correctamente!'})
