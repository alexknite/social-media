# Generated by Django 5.1.7 on 2025-04-06 18:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0013_alter_myuser_bio"),
    ]

    operations = [
        migrations.AddField(
            model_name="myuser",
            name="id",
            field=models.BigAutoField(
                auto_created=True,
                default=1,
                primary_key=True,
                serialize=False,
                verbose_name="ID",
            ),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="myuser",
            name="username",
            field=models.CharField(max_length=50, unique=True),
        ),
    ]
