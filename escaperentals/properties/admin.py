from django.contrib import admin

# Register your models here.
from .models import Property,PropertyImage

#admin.site.register(Property)
#admin.site.register(PropertyImage)

class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 5   # shows ' ' image upload fields by default
    
@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    inlines = [PropertyImageInline]
    list_display = ('title', 'location', 'price_per_night', 'guests')


@admin.register(PropertyImage)
class PropertyImageAdmin(admin.ModelAdmin):
    list_display = ('property', 'image')