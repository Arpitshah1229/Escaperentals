from django.shortcuts import render

# Create your views here.

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Review
from .serializers import ReviewSerializer
from properties.models import Property


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_review(request):
    property_id = request.data.get('property')
    rating = request.data.get('rating')
    comment = request.data.get('comment')

    if not property_id or not rating:
        return Response(
            {'error': 'Property and rating are required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        property = Property.objects.get(id=property_id)
    except Property.DoesNotExist:
        return Response({'error': 'Property not found'}, status=404)

    # Prevent duplicate reviews
    if Review.objects.filter(user=request.user, property=property).exists():
        return Response(
            {'error': 'You have already reviewed this property'},
            status=status.HTTP_400_BAD_REQUEST
        )

    review = Review.objects.create(
        user=request.user,
        property=property,
        rating=rating,
        comment=comment
    )

    serializer = ReviewSerializer(review)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def property_reviews(request, property_id):
    reviews = Review.objects.filter(property_id=property_id)
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)
