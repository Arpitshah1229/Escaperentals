from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from payments.models import Payment

@api_view(["GET"])
@permission_classes([IsAdminUser])
def admin_payments_list(request):
    payments = Payment.objects.select_related("booking").order_by("-created_at")

    data = []
    for p in payments:
        booking = p.booking
        user = None

        # ✅ safely resolve user
        if booking and hasattr(booking, "user") and booking.user:
            user = booking.user.username

        data.append({
            "id": p.id,
            "payment_id": p.payment_id,
            "booking_id": booking.id if booking else None,
            "user": user,
            "amount": p.amount,
            "status": p.status,
            "created_at": p.created_at,
        })

    return Response(data)



# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAdminUser
# from rest_framework.response import Response
# from payments.models import Payment

# @api_view(["GET"])
# @permission_classes([IsAdminUser])
# def admin_payments_list(request):
#     payments = Payment.objects.select_related(
#         "user", "booking"
#     ).order_by("-created_at")
    
#     if booking and hasattr(booking, "user") and booking.user:
#         user = booking.user.username

#     data = [
#         {
#             "id": p.id,
#             "booking_id": p.booking.id if p.booking else None,
#             "user": p.user.username,
#             "amount": p.amount,
#             "method": p.payment_method,
#             "status": p.status,
#             "created_at": p.created_at,
#         }
#         for p in payments
#     ]

#     return Response(data)
