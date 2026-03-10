from django.shortcuts import render


from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Blog
from .serializers import BlogSerializer

@api_view(["GET"])
@permission_classes([AllowAny])
def blog_list(request):
    blogs = Blog.objects.filter(is_published=True).order_by("-published_date")
    serializer = BlogSerializer(blogs, many=True, context={"request": request})
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([AllowAny])
def blog_detail(request, slug):
    blog = Blog.objects.get(slug=slug, is_published=True)
    serializer = BlogSerializer(blog, context={"request": request})
    return Response(serializer.data)
