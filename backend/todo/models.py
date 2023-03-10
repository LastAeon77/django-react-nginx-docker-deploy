from django.db import models

# Create your models here.

class Todo(models.Model):
    name=models.TextField()
    description = models.TextField()
    def __str__(self):
        return self.name