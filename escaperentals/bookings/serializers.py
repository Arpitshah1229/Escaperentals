# from rest_framework import serializers
# from .models import Booking

# class BookingSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Booking
#         fields = [
#             'id',
#             'user',
#             'property',
#             'start_date',
#             'end_date',
#             'total_price',
#             'status'
#         ]
#         read_only_fields = ['user', 'status']



from rest_framework import serializers
from .models import Booking
from datetime import date
from django.contrib.auth.models import User
from properties.models import Property


class UserMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]


class PropertyMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ["id", "title", "location"]



class BookingSerializer(serializers.ModelSerializer):
    user = UserMiniSerializer(read_only=True)
    property = PropertyMiniSerializer(read_only=True)
    class Meta:
        model = Booking
        fields = [
            'id',
            'user',
            'property',
            'check_in',
            'check_out',
            'guests',
            'total_price',
            'status',
            'created_at',
        ]
        read_only_fields = [
            'user',
            'total_price',
            'status',
            'created_at',
        ]

    def validate(self, data):
        if data['check_in'] >= data['check_out']:
            raise serializers.ValidationError(
                "Check-out date must be after check-in date"
            )

        if data['check_in'] < date.today():
            raise serializers.ValidationError(
                "Cannot book past dates"
            )

        return data
    
    
# =========================
# BOOKING DETAIL SERIALIZER
# (Used for booking success page)
# =========================
class BookingDetailSerializer(serializers.ModelSerializer):
    property = serializers.SerializerMethodField()
    nights = serializers.SerializerMethodField()

    class Meta:
        model = Booking
        fields = [
            "id",
            "property",
            "check_in",
            "check_out",
            "guests",
            "total_price",
            "status",
            "nights",
        ]

    def get_property(self, obj):
        """
        Returns property data needed by frontend
        """
        return {
            "id": obj.property.id,
            "title": obj.property.title,
            "location": obj.property.location,
            "images": [
                {"image": img.image.url}
                for img in obj.property.images.all()
            ],
        }

    def get_nights(self, obj):
        return (obj.check_out - obj.check_in).days
