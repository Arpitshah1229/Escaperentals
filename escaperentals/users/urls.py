from django.urls import path
from . import views
from .admin_views import admin_users_list

urlpatterns = [
    path('register/', views.register),
    path('login/', views.login),
    path("admin/users/", admin_users_list),
]
