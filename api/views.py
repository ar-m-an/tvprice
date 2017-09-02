from django.shortcuts import render
from elasticsearch import Elasticsearch
from django.http import JsonResponse
import certifi

def index(request):
    return render(request, 'api/index.html', {})


def get_products(request):
    # Parse Pagination Parameters
    page = int(request.GET.get('page', '1'))
    product_per_page = int(request.GET.get('productPerPage', '20'))

    # Parse Filter Data from GET Parameters
    filters = [{}]
    brands = request.GET.getlist('selectedBrands[]')
    min_price = request.GET.get('minPrice')
    max_price = request.GET.get('maxPrice')
    min_size = request.GET.get('minSize')
    max_size = request.GET.get('maxSize')
    port = request.GET.get('port', 'all')

    if brands:
        filters.append({'terms': {'brand': [brand.lower() for brand in brands]}})
    if min_size:
        filters.append({'range': {'size': {"gte": int(min_size), "lte": int(max_size)}}})
    if min_price:
        filters.append({'range': {'price': {"gte": int(min_price), "lte": int(max_price)}}})
    if port != 'all':
        filters.append({'term': {'port': port}})

    # Send Query to ElasticSearch
    es = Elasticsearch(
        ["https://8769418f30f93ada7d1a1d64a0e88683.eu-west-1.aws.found.io/"],
        port=9243,
        http_auth="elastic:ZiYmDPty1GVCLnkHrI14ixLb",
        use_ssl=True,
        verify_certs=True,
        ca_certs=certifi.where())

    data = es.search(index='test2', doc_type='product', body={
        'from': (page - 1) * product_per_page,
        'size': product_per_page,

        "query": {
            "bool": {
                "must": [{'match_all': {}}],
                "filter": [filters]
            }
        }
    })

    product_data = {
        'products': [hit['_source'] for hit in data['hits']['hits']],
        'totalProducts': data['hits']['total']
    }

    return JsonResponse(product_data, safe=False)