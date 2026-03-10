from django.urls import path 
from . import views 
from .views import PropertyBookedDatesAPIView

from .admin_views import (admin_properties_list,approve_property,reject_property, )

urlpatterns = [
    path('', views.property_list),
    path('<int:pk>/', views.property_detail),
    
    
    path('create/', views.create_property),
    path('update/<int:pk>/', views.update_property),
    path('delete/<int:pk>/', views.delete_property),
    path('upload-image/', views.upload_property_image),
    
    
    path("<int:pk>/booked-dates/", PropertyBookedDatesAPIView.as_view()),
    path("my-properties/", views.my_properties),
    
    path("admin/properties/", admin_properties_list),
    path("admin/properties/<int:pk>/approve/", approve_property),
    path("admin/properties/<int:pk>/reject/", reject_property),
    path("properties/<int:pk>/approve/", approve_property),
    path("admin/properties/<int:pk>/reject/", reject_property),


]
