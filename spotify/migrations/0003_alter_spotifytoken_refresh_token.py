# Generated by Django 5.1 on 2024-08-12 17:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0002_rename_users_spotifytoken_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spotifytoken',
            name='refresh_token',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
    ]
