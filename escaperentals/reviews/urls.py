from django.urls import path
from . import views

urlpatterns = [
    path('add/', views.add_review),
    path('property/<int:property_id>/', views.property_reviews),
]
