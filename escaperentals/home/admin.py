from django.contrib import admin


from .models import HomeHero

@admin.register(HomeHero)
class HomeHeroAdmin(admin.ModelAdmin):
    list_display = ("title", "is_active")