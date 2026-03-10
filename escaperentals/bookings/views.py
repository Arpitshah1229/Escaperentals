# from django.shortcuts import render
# from django.views.decorators.csrf import csrf_exempt

# # Create your views here.
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status
# from .models import Booking
# from .serializers import BookingSerializer
# from properties.models import Property
# from datetime import date

# from datetime import timedelta
# from django.utils.dateparse import parse_date



# def is_property_available(property, start_date, end_date):
#     overlapping_bookings = Booking.objects.filter(
#         property=property,
#         start_date__lt=end_date,
#         end_date__gt=start_date,
#         status='booked'
#     )
#     return not overlapping_bookings.exists()


# @csrf_exempt
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])

# def create_booking(request):
#     property_id = request.data.get('property')
#     start_date = request.data.get('start_date')
#     end_date = request.data.get('end_date')

#     if not property_id or not start_date or not end_date:
#         return Response(
#             {'error': 'Property, start date and end date are required'},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     try:
#         property = Property.objects.get(id=property_id)
#     except Property.DoesNotExist:
#         return Response({'error': 'Property not found'}, status=404)

#     if not is_property_available(property, start_date, end_date):
#         return Response(
#             {'error': 'Property not available for selected dates'},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     # calculate nights
#     nights = (date.fromisoformat(end_date) - date.fromisoformat(start_date)).days
#     if nights <= 0:
#         return Response({'error': 'Invalid date range'}, status=400)

#     total_price = nights * property.price_per_night

#     booking = Booking.objects.create(
#         user=request.user,
#         property=property,
#         start_date=start_date,
#         end_date=end_date,
#         total_price=total_price
#     )

#     serializer = BookingSerializer(booking)
#     return Response(serializer.data, status=status.HTTP_201_CREATED)



# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def user_bookings(request):
#     bookings = Booking.objects.filter(user=request.user)
#     serializer = BookingSerializer(bookings, many=True)
#     return Response(serializer.data)


# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def cancel_booking(request, pk):
#     try:
#         booking = Booking.objects.get(pk=pk, user=request.user)
#     except Booking.DoesNotExist:
#         return Response({'error': 'Booking not found'}, status=404)

#     booking.status = 'cancelled'
#     booking.save()

#     return Response({'message': 'Booking cancelled successfully'})



# @api_view(['GET'])
# def property_availability(request, property_id):
#     bookings = Booking.objects.filter(
#         property_id=property_id,
#         status='booked'
#     )

#     booked_dates = []

#     for booking in bookings:
#         current_date = booking.start_date
#         while current_date < booking.end_date:
#             booked_dates.append(current_date.isoformat())
#             current_date += timedelta(days=1)

#     return Response({
#         'property': property_id,
#         'booked_dates': booked_dates
#     })


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from datetime import datetime, timedelta

from .models import Booking
from .serializers import BookingSerializer,BookingDetailSerializer
from properties.models import Property



# =========================
# HELPER: CHECK AVAILABILITY
# =========================
def is_property_available(property_obj, check_in, check_out):
    overlapping = Booking.objects.filter(
        property=property_obj,
        status__in=['pending', 'confirmed']
    ).filter(
        check_in__lt=check_out,
        check_out__gt=check_in
    )
    return not overlapping.exists()


# =========================
# CREATE BOOKING
# =========================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_booking(request):

    property_id = request.data.get('property')
    check_in = request.data.get('check_in')
    check_out = request.data.get('check_out')
    guests = request.data.get('guests')

    if not all([property_id, check_in, check_out, guests]):
        return Response(
            {'error': 'All fields are required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        property_obj = Property.objects.get(id=property_id)
    except Property.DoesNotExist:
        return Response(
            {'error': 'Property not found'},
            status=status.HTTP_404_NOT_FOUND
        )

    # Convert string → date
    try:
        check_in_date = datetime.strptime(check_in, "%Y-%m-%d").date()
        check_out_date = datetime.strptime(check_out, "%Y-%m-%d").date()
    except ValueError:
        return Response(
            {'error': 'Invalid date format (YYYY-MM-DD)'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Availability check
    if not is_property_available(property_obj, check_in_date, check_out_date):
        return Response(
            {'error': 'Property not available for selected dates'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Calculate nights
    nights = (check_out_date - check_in_date).days
    if nights <= 0:
        return Response(
            {'error': 'Invalid date range'},
            status=status.HTTP_400_BAD_REQUEST
        )

    total_price = nights * property_obj.price_per_night

    booking = Booking.objects.create(
        user=request.user,
        property=property_obj,
        check_in=check_in_date,
        check_out=check_out_date,
        guests=guests,
        total_price=total_price,
        status='pending'
    )

    serializer = BookingSerializer(booking)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


# =========================
# USER BOOKINGS
# =========================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_bookings(request):
    bookings = Booking.objects.filter(user=request.user)
    serializer = BookingDetailSerializer(bookings, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def booking_detail(request, pk):
    try:
        booking = Booking.objects.select_related("property").get(
            pk=pk,
            user=request.user
        )
    except Booking.DoesNotExist:
        return Response(
            {"error": "Booking not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = BookingDetailSerializer(booking)
    return Response(serializer.data)



# =========================
# CANCEL BOOKING
# =========================
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def cancel_booking(request, pk):
    try:
        booking = Booking.objects.get(pk=pk, user=request.user)
    except Booking.DoesNotExist:
        return Response(
            {'error': 'Booking not found'},
            status=status.HTTP_404_NOT_FOUND
        )

    booking.status = 'cancelled'
    booking.save()

    return Response({'message': 'Booking cancelled successfully'})


# =========================
# PROPERTY AVAILABILITY (CALENDAR)
# =========================
# @api_view(['GET'])
# def property_availability(request, property_id):

#     bookings = Booking.objects.filter(
#         property_id=property_id,
#         status__in=['pending', 'confirmed']
#     )

#     booked_dates = []

#     for booking in bookings:
#         current = booking.check_in
#         while current < booking.check_out:
#             booked_dates.append(current.isoformat())
#             current += timedelta(days=1)

#     return Response({
#         'property': property_id,
#         'booked_dates': booked_dates
#     })

@api_view(['GET'])
def property_availability(request, property_id):
    bookings = Booking.objects.filter(
        property_id=property_id,
        status__in=['pending', 'confirmed']
    )

    data = []
    for b in bookings:
        data.append({
            "check_in": b.check_in,
            "check_out": b.check_out
        })

    return Response(data)


@api_view(['POST'])
def check_availability(request):
    property_id = request.data.get("property")
    check_in = request.data.get("check_in")
    check_out = request.data.get("check_out")

    try:
        property_obj = Property.objects.get(id=property_id)
    except Property.DoesNotExist:
        return Response({"available": False}, status=404)

    try:
        check_in_date = datetime.strptime(check_in, "%Y-%m-%d").date()
        check_out_date = datetime.strptime(check_out, "%Y-%m-%d").date()
    except:
        return Response({"available": False}, status=400)

    if check_out_date <= check_in_date:
        return Response({"available": False}, status=400)

    available = is_property_available(property_obj, check_in_date, check_out_date)

    nights = (check_out_date - check_in_date).days
    total_price = nights * property_obj.price_per_night if available else 0

    return Response({
        "available": available,
        "total_price": total_price
    })


# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def host_bookings(request):
#     if request.user.role != "host":
#         return Response(
#             {"error": "Not authorized"},
#             status=status.HTTP_403_FORBIDDEN
#         )

#     bookings = Booking.objects.filter(property__host=request.user)
#     serializer = BookingSerializer(bookings, many=True)
#     return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def host_bookings(request):
    bookings = Booking.objects.filter(
        property__host=request.user
    )

    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data)

# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def host_booking_detail(request, pk):
#     if request.user.role != "host":
#         return Response({"detail": "Unauthorized"}, status=403)

#     try:
#         booking = Booking.objects.get(
#             id=pk,
#             property__host=request.user
#         )
#     except Booking.DoesNotExist:
#         return Response({"detail": "Booking not found"}, status=404)

#     serializer = BookingSerializer(booking)
#     return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def host_booking_detail(request, pk):
    try:
        booking = Booking.objects.select_related(
            "property", "user"
        ).prefetch_related(
            "property__images"
        ).get(
            id=pk,
            property__host=request.user
        )
    except Booking.DoesNotExist:
        return Response(
            {"detail": "Booking not found"},
            status=404
        )

    serializer = BookingDetailSerializer(booking)
    return Response(serializer.data)



@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def approve_booking(request, pk):
    try:
        booking = Booking.objects.get(
            pk=pk,
            property__host=request.user
        )
    except Booking.DoesNotExist:
        return Response(
            {"error": "Booking not found"},
            status=404
        )

    booking.status = "confirmed"
    booking.save()

    return Response({"message": "Booking approved"})


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def reject_booking(request, pk):
    try:
        booking = Booking.objects.get(
            pk=pk,
            property__host=request.user
        )
    except Booking.DoesNotExist:
        return Response(
            {"error": "Booking not found"},
            status=404
        )

    booking.status = "cancelled"
    booking.save()

    return Response({"message": "Booking rejected"})



# @api_view(["PUT"])
# @permission_classes([IsAuthenticated])
# def update_booking_status(request, booking_id):
#     """
#     Host can approve or reject a booking
#     """
#     try:
#         booking = Booking.objects.get(id=booking_id)
#     except Booking.DoesNotExist:
#         return Response(
#             {"error": "Booking not found"},
#             status=status.HTTP_404_NOT_FOUND
#         )

#     new_status = request.data.get("status")

#     if new_status not in ["confirmed", "rejected"]:
#         return Response(
#             {"error": "Invalid status"},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     # OPTIONAL (recommended): only host can update
#     if booking.property.host != request.user:
#         return Response(
#             {"error": "Not authorized"},
#             status=status.HTTP_403_FORBIDDEN
#         )

#     booking.status = new_status
#     booking.save()

#     return Response(
#         {
#             "message": "Booking status updated",
#             "status": booking.status
#         },
#         status=status.HTTP_200_OK
#     )




@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_booking_status(request, pk):
    try:
        booking = Booking.objects.get(pk=pk)
    except Booking.DoesNotExist:
        return Response({"error": "Booking not found"}, status=404)

    # Optional: host-only check
    # if booking.property.host != request.user:
    #     return Response({"error": "Not allowed"}, status=403)

    status_value = request.data.get("status")

    if status_value not in ["confirmed", "cancelled"]:
        return Response(
            {"error": "Invalid status"},
            status=400
        )

    booking.status = status_value
    booking.save()

    return Response({
        "message": "Booking status updated",
        "status": booking.status
    })
