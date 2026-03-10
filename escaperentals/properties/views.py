from django.shortcuts import render

# Create your views here.
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view,permission_classes
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from users.permissions import IsHost, IsAdmin
from .models import PropertyImage
from rest_framework import status
from categories.models import Category

from rest_framework.response import Response
from .models import Property
from .serializers import PropertySerializer,PropertyImageUploadSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from bookings.models import Booking




@api_view(['GET'])
def property_list(request):
    properties = Property.objects.all()

    # Filters (frontend-ready)
    location = request.GET.get('location')
    guests = request.GET.get('guests')
    category = request.GET.get('category')
    featured = request.GET.get('featured')

    if location:
        properties = properties.filter(location__icontains=location)

    if guests:
        properties = properties.filter(guests__gte=guests)

    if category:
        properties = properties.filter(category__name__icontains=category)
        
    if featured == "true":
        properties = properties.filter(is_featured=True)


    serializer = PropertySerializer(properties, many=True , context={"request": request})
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def property_detail(request, pk):
    try:
        property = Property.objects.get(pk=pk)
    except Property.DoesNotExist:
        return Response({'error': 'Property not found'}, status=404)

    serializer = PropertySerializer(property , context={"request": request})
    return Response(serializer.data)






@api_view(['POST'])
@permission_classes([IsAuthenticated, IsHost | IsAdmin])
def create_property(request):
    title = request.data.get('title')
    description = request.data.get('description')
    location = request.data.get('location')
    price = request.data.get('price_per_night')
    guests = request.data.get('guests')
    category_id = request.data.get('category')

    if not all([title, location, price, guests, category_id]):
        return Response(
            {'error': 'All fields are required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        category = Category.objects.get(id=category_id)
    except Category.DoesNotExist:
        return Response({'error': 'Invalid category'}, status=400)

    property = Property.objects.create(
        title=title,
        description=description,
        location=location,
        price_per_night=price,
        guests=guests,
        category=category,
        host=request.user
    )

    serializer = PropertySerializer(property)
    return Response(serializer.data, status=status.HTTP_201_CREATED)




@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsHost | IsAdmin])
def update_property(request, pk):
    try:
        property = Property.objects.get(pk=pk, host=request.user)
    except Property.DoesNotExist:
        return Response({'error': 'Property not found or not authorized'}, status=404)

    serializer = PropertySerializer(property, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=400)



@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsHost | IsAdmin])
def delete_property(request, pk):
    try:
        property = Property.objects.get(pk=pk, host=request.user)
    except Property.DoesNotExist:
        return Response({'error': 'Property not found or not authorized'}, status=404)

    property.delete()
    return Response({'message': 'Property deleted successfully'})


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsHost | IsAdmin])
def upload_property_image(request):
    property_id = request.data.get('property')
    image = request.FILES.get('image')

    if not property_id or not image:
        return Response(
            {'error': 'Property and image are required'},
            status=400
        )

    try:
        property = Property.objects.get(id=property_id)
    except Property.DoesNotExist:
        return Response({'error': 'Property not found'}, status=404)

    # Ownership check (host can upload only for own property)
    if request.user.profile.role == 'host' and property.host != request.user:
        return Response(
            {'error': 'You are not allowed to upload images for this property'},
            status=403
        )

    property_image = PropertyImage.objects.create(
        property=property,
        image=image
    )

    serializer = PropertyImageUploadSerializer(property_image)
    return Response(serializer.data, status=201)


class PropertyBookedDatesAPIView(APIView):
    def get(self, request, pk):
        bookings = Booking.objects.filter(
            property_id=pk,
            status__in=["pending", "confirmed"]
        )

        data = []
        for b in bookings:
            data.append({
                "check_in": b.check_in,
                "check_out": b.check_out
            })

        return Response(data)
    

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_properties(request):
    properties = Property.objects.filter(host=request.user)
    serializer = PropertySerializer(
        properties,
        many=True,
        context={"request": request}
    )
    return Response(serializer.data)


# @api_view(["PATCH"])
# @permission_classes([IsAuthenticated, IsAdmin])
# def approve_property(request, pk):
#     print("APPROVE API HIT", pk)
#     property = get_object_or_404(Property, pk=pk)
#     property.is_approved = True
#     property.save()
#     return Response({"message": "Property approved"})

# @api_view(["POST"])
# @permission_classes([IsAuthenticated, IsAdmin])
# def reject_property(request, pk):
#     property = get_object_or_404(Property, pk=pk)
#     property.is_approved = False
#     property.save()
#     return Response({"message": "Property rejected"})

