from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from django.contrib.auth import get_user_model
from rest_framework.response import Response

User = get_user_model()

@api_view(["GET"])
@permission_classes([IsAdminUser])
def admin_users_list(request):
    users = User.objects.all().order_by("-date_joined")

    def get_role(user):
        if user.is_superuser:
            return "admin"
        if user.is_staff:
            return "host"
        return "user"

    data = [
        {
            "id": u.id,
            "username": u.username,
            "email": u.email,
            "role": get_role(u),
            "is_active": u.is_active,
            "date_joined": u.date_joined,
        }
        for u in users
    ]

    return Response(data)
