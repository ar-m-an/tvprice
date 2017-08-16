from django.conf.urls import url
from .views import ProductList

urlpatterns = [
    url(r'^products/', ProductList.as_view())
]