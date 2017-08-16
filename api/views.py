from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from api.serializers import ProductSerializer
from inventory.models import Product


def index(request):
    return render(request, 'api/index.html', {})


class ProductList(APIView):

    renderer_classes = (JSONRenderer,)

    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
