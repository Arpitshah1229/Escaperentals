from django.db import models

# Create your models here.

from django.contrib.auth.models import User
from properties.models import Property

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE , related_name="reviews")
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="reviews")
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.property.title} - {self.rating}"
