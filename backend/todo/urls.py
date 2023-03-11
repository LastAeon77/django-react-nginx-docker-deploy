from django.urls import path
from . import views

app_name = "todo"

urlpatterns = [
    path("todo", views.TodoSerial.as_view(), name="todoListView"), 
    path("todo_create", views.TodoCreate.as_view(), name="todoUpdateView"),
 
]