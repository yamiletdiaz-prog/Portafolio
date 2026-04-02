from django.db import models


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField(max_length=2000)
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Mensaje de contacto'
        verbose_name_plural = 'Mensajes de contacto'

    def __str__(self):
        return f'{self.name} - {self.subject}'
