from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import QuerySet
from .models import Task
from .serializers import TaskSerializer
from .scoring import calculate_score, explain_choice

class AddTask(APIView):
    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            task = Task.objects.create(
                title=serializer.validated_data['title'],
                due_date=serializer.validated_data['due_date'],
                estimated_hours=serializer.validated_data['estimated_hours'],
                importance=serializer.validated_data['importance'],
                dependencies=serializer.validated_data.get('dependencies', [])
            )
            out = TaskSerializer(task).data
            return Response(out, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ShowTasks(APIView):
    def get(self, request):
        tasks: QuerySet[Task] = Task.objects.all().order_by('due_date')
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SuggestTasks(APIView):
    def get(self, request):
        strategy = request.GET.get('strategy', 'Smart Balance')

        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        data = serializer.data

        if strategy == "Fastest Wins":
            sorted_tasks = sorted(data, key=lambda x: int(x['estimated_hours']))
        elif strategy == "High Impact":
            sorted_tasks = sorted(data, key=lambda x: int(x['importance']), reverse=True)
        elif strategy == "Deadline Driven":
            sorted_tasks = sorted(data, key=lambda x: x['due_date'])
        else:
            sorted_tasks = sorted(data, key=lambda x: int(x['score']), reverse=True)

        top_three = sorted_tasks[:3]

        for t in top_three:
            t['critical_reasoning'] = explain_choice(t)

        return Response(top_three, status=status.HTTP_200_OK)
