# Generated by Django 3.2.4 on 2021-09-02 13:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_auto_20210902_1358'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comment',
            options={'ordering': ('created_at',)},
        ),
    ]
