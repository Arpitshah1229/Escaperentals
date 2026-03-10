from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from properties.models import Property

@api_view(["GET"])
@permission_classes([IsAdminUser])
def admin_properties_list(request):
    properties = Property.objects.select_related("host").order_by("-created_at")

    data = [
        {
            "id": p.id,
            "title": p.title,
            "host": p.host.username,
            "location": p.location,
            # "price": p.price_per_night,
            # "status": "approved" if p.is_approved else "pending",
            "price_per_night": p.price_per_night,
            "is_approved": p.is_approved,
            
            "created_at": p.created_at,
        }
        for p in properties
    ]

    return Response(data)


@api_view(["POST"])
@permission_classes([IsAdminUser])
def approve_property(request, pk):
    
    prop = Property.objects.get(pk=pk)
    prop.is_approved = True
    prop.save()
    return Response({"message": "Property approved"})


@api_view(["POST"])
@permission_classes([IsAdminUser])
def reject_property(request, pk):
    prop = Property.objects.get(pk=pk)
    prop.is_approved = False
    prop.save()
    return Response({"message": "Property rejected"})






# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAdminUser
# from rest_framework.response import Response
# from properties.models import Property

# @api_view(["GET"])
# @permission_classes([IsAdminUser])
# def admin_properties_list(request):
#     properties = Property.objects.select_related("host").order_by("-created_at")

#     data = [
#         {
#             "id": p.id,
#             "title": p.title,
#             "host": p.host.username,
#             "location": p.location,
#             "price": p.price_per_night,
#             "status": "approved" if p.is_approved else "pending",
#             "created_at": p.created_at,
#         }
#         for p in properties
#     ]

#     return Response(data)

# @api_view(["POST"])
# @permission_classes([IsAdminUser])
# def approve_property(request, pk):
#     prop = Property.objects.get(pk=pk)
#     prop.is_approved = True
#     prop.save()
#     return Response({"message": "Property approved"})


# @api_view(["POST"])
# @permission_classes([IsAdminUser])
# def reject_property(request, pk):
#     prop = Property.objects.get(pk=pk)
#     prop.is_approved = False
#     prop.save()
#     return Response({"message": "Property rejected"})
