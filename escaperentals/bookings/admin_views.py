from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from django.db.models import Sum

from django.contrib.auth import get_user_model
from bookings.models import Booking
from properties.models import Property  # adjust if your app name differs

User = get_user_model()


@api_view(["GET"])
@permission_classes([IsAdminUser])
def admin_dashboard(request):
    total_users = User.objects.count()
    total_properties = Property.objects.count()
    total_bookings = Booking.objects.count()

    revenue = Booking.objects.filter(
        status="confirmed"
    ).aggregate(total=Sum("total_price"))["total"] or 0

    recent_bookings = Booking.objects.select_related(
        "user", "property"
    ).order_by("-created_at")[:5]

    return Response({
        "stats": {
            "users": total_users,
            "properties": total_properties,
            "bookings": total_bookings,
            "revenue": revenue,
        },
        "recent_bookings": [
            {
                "id": b.id,
                "property": b.property.title,
                "guest": b.user.username,
                "amount": b.total_price,
                "status": b.status,
            }
            for b in recent_bookings
        ]
    })


@api_view(["GET"])
@permission_classes([IsAdminUser])
def admin_bookings_list(request):
    bookings = Booking.objects.select_related(
        "user", "property"
    ).order_by("-created_at")

    data = [
        {
            "id": b.id,
            "property": b.property.title,
            "user": b.user.username,
            "check_in": b.check_in,
            "check_out": b.check_out,
            "amount": b.total_price,
            "status": b.status,
            "created_at": b.created_at,
        }
        for b in bookings
    ]

    return Response(data)


@api_view(["POST"])
@permission_classes([IsAdminUser])
def admin_update_booking_status(request, pk):
    booking = Booking.objects.get(pk=pk)
    status = request.data.get("status")

    if status not in ["confirmed", "cancelled"]:
        return Response({"error": "Invalid status"}, status=400)

    booking.status = status
    booking.save()

    return Response({"message": "Booking status updated"})
