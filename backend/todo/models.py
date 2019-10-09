from django.db import models

class Todo(models.Model):
    title = models.CharField(max_length=120)
    content = models.TextField()
    done = models.BooleanField(default=False)
    year = models.IntegerField(default=2019)
    month = models.IntegerField(default=1)
    date = models.IntegerField(default=1)
