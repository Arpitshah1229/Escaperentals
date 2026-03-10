# from django.contrib import admin

# # Register your models here.
# from .models import Booking

# admin.site.register(Booking)

from django.contrib import admin
from .models import Booking

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user',
        'property',
        'check_in',
        'check_out',
        'status',
        'total_price',
    )
    list_filter = ('status',)