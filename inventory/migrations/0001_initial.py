# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-13 21:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('url', models.URLField()),
                ('price', models.IntegerField()),
                ('image', models.URLField()),
                ('category', models.CharField(max_length=50)),
            ],
        ),
    ]
