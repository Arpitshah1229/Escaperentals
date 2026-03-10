from django.urls import path
from . import views
from .views import check_availability ,booking_detail,host_bookings,approve_booking,reject_booking,update_booking_status,host_booking_detail

from .admin_views import admin_dashboard,admin_bookings_list,admin_update_booking_status

urlpatterns = [
    path('create/', views.create_booking),
    path('my-bookings/', views.user_bookings),
    path('cancel/<int:pk>/', views.cancel_booking),
    path('availability/<int:property_id>/', views.property_availability),
    path("check-availability/", check_availability),
    path("<int:pk>/", booking_detail, name="booking-detail"),
    path("host/bookings/", host_bookings),
    path("host/bookings/<int:pk>/", host_booking_detail),
    path("host/bookings/<int:pk>/approve/", approve_booking),
    path("host/bookings/<int:pk>/reject/", reject_booking),
    path("bookings/<int:booking_id>/status/", update_booking_status),
    
    path("admin/dashboard/", admin_dashboard),
    path("admin/bookings/", admin_bookings_list),
    path("admin/bookings/<int:pk>/status/", admin_update_booking_status),

]
