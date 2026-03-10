from django.shortcuts import render

# Create your views here.
import uuid
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from bookings.models import Booking
from payments.models import Payment

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def confirm_payment(request, booking_id):
    try:
        booking = Booking.objects.get(id=booking_id, user=request.user)
    except Booking.DoesNotExist:
        return Response({"error": "Booking not found"}, status=404)

    # prevent double payment
    if hasattr(booking, "payment"):
        return Response({"message": "Payment already done"})

    # ✅ create dummy payment
    payment = Payment.objects.create(
        booking=booking,
        payment_id=f"PAY_{uuid.uuid4().hex[:10].upper()}",
        amount=booking.total_price,
        status="paid",
    )

    # ✅ confirm booking
    booking.status = "confirmed"
    booking.save()

    return Response({
        "message": "Payment successful",
        "payment_id": payment.payment_id
    })
