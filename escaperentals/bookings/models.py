# from django.db import models

# # Create your models here.

# from django.contrib.auth.models import User
# from properties.models import Property

# class Booking(models.Model):
#     STATUS_CHOICES = (
#         ('booked', 'Booked'),
#         ('cancelled', 'Cancelled'),
#     )

#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     property = models.ForeignKey(Property, on_delete=models.CASCADE)
#     start_date = models.DateField()
#     end_date = models.DateField()
#     total_price = models.DecimalField(max_digits=10, decimal_places=2)
#     status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='booked')

#     def __str__(self):
#         return f"{self.user.username} - {self.property.title}"





from django.db import models
from django.contrib.auth.models import User
from properties.models import Property


class Booking(models.Model):

    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="bookings"
    )

    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name="bookings"
    )

    # Dates (calendar logic)
    check_in = models.DateField()
    check_out = models.DateField()

    # Booking details
    guests = models.PositiveIntegerField()

    # PricingY
    total_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} → {self.property.title}"
