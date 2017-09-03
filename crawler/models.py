from django.db import models
from django.contrib.postgres.fields import JSONField


class Vendor(models.Model):
    name = models.CharField(max_length=50, unique=True)
    crawler_class = models.CharField(max_length=50)
    start_url = models.URLField(max_length=256)


class ListPage(models.Model):
    vendor = models.ForeignKey(Vendor)
    url = models.URLField(max_length=512, unique=True)


class Product(models.Model):
    title = models.CharField(max_length=50)
    price = models.IntegerField()
    vendor = models.ForeignKey(Vendor)
    url = models.URLField(max_length=512, unique=True)
    image = models.URLField(max_length=512)
    spec = JSONField()

    def elastic_index(self, connection, index_name):
        data = {
            'title': self.title,
            'price': self.price,
            'vendor': self.vendor.name,
            'url': self.url,
            'image': self.image
        }
        data.update(self.spec)
        try:
            connection.index(index=index_name, doc_type='product', id=self.id, body=data)
        except:
            print('UNABLE INDEXING PRODUCT WITH ID %d ON ELASTICSEARCH.' % self.id)



