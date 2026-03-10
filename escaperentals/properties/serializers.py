from rest_framework import serializers
from .models import Property, PropertyImage


class PropertyImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = PropertyImage
        fields = ['id', 'image']

    def get_image(self, obj):
        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url
   


class PropertySerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)
    category = serializers.StringRelatedField()
    category_id = serializers.IntegerField(source="category.id", read_only=True)
    host = serializers.StringRelatedField()

    class Meta:
        model = Property
        fields = [
            'id',
            'title',
            'description',
            'location',
            'price_per_night',
            'guests',
            
            'property_type',
            'bedrooms',
            'beds',
            'bathrooms',
            'latitude',
            'longitude',
            'is_featured',
            
            'is_approved',
            'category',
            'category_id',
            'host',
            'images'
        ]


class PropertyImageUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ['id', 'image', 'property']
