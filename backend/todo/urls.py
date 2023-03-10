from django.urls import path
from . import views

app_name = "todo"

urlpatterns = [
    path("todo", views.SkillSerial.as_view(), name="todoListView"), 
    path("todo_uodate", views.SkillEgoSerial.as_view(), name="todoUpdateView"),
 
]