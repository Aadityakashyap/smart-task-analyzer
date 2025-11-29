from django.urls import path
from .views import AddTask, ShowTasks, SuggestTasks

urlpatterns = [
    path('api/tasks/add/', AddTask.as_view(), name='add_task'),
    path('api/tasks/show/', ShowTasks.as_view(), name='show_tasks'),
    path('api/tasks/suggest/', SuggestTasks.as_view(), name='suggest_tasks'),
]
