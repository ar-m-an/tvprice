from django.db import models
# from django.contrib.postgres import fields


class Product(models.Model):
    title = models.CharField(max_length=100)
    url = models.URLField()
    price = models.IntegerField()
    image = models.URLField()
    category = models.CharField(max_length=50)
    # spec = fields.HStoreField()
