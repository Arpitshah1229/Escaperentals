# from django.shortcuts import render

# from rest_framework.permissions import AllowAny
# from rest_framework.decorators import permission_classes
# # Create your views here.
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from .models import HomeHero

# @api_view(["GET"])
# @permission_classes([AllowAny])
# def home_hero(request):
#     hero = HomeHero.objects.filter(is_active=True).first()
#     if not hero:
#         return Response({"title": "", "subtitle": "", "image": ""})

#     return Response({
#         "title": hero.title,
#         "subtitle": hero.subtitle,
#         "image": request.build_absolute_uri(hero.image.url)
#     })


from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import HomeHero

class HomeHeroView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        hero = HomeHero.objects.filter(is_active=True).first()

        if not hero:
            return Response({
                "title": "",
                "subtitle": "",
                "image": ""
            })

        return Response({
            "title": hero.title,
            "subtitle": hero.subtitle,
            "image": request.build_absolute_uri(hero.image.url)
        })
