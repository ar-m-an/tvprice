from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from api.serializers import ProductSerializer
from inventory.models import Product
from elasticsearch import Elasticsearch
from django.http import JsonResponse

def index(request):
    return render(request, 'api/index.html', {})


class ProductList(APIView):

    # renderer_classes = (JSONRenderer,)

    def get(self, request):
        # products = Product.objects.all()
        # serializer = ProductSerializer(products, many=True)
        # return Response(serializer.data)
        es = Elasticsearch([{'host': 'localhost', 'port': 9200}])
        data = es.search(index='test2', doc_type='product')
        return JsonResponse([hit['_source'] for hit in data['hits']['hits']], safe=False) #[hit['source'] for hit in data['_hits']['hits']])