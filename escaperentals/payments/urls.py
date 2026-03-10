from .admin_views import admin_payments_list
from django.urls import path 
from .views import confirm_payment

urlpatterns = [
    path("confirm/<int:booking_id>/", confirm_payment),
    path("admin/payments/", admin_payments_list),
    
]
    