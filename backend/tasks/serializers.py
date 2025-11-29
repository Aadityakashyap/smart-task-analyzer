from rest_framework import serializers
from .models import Task
from .scoring import calculate_score, explain_choice

class TaskSerializer(serializers.ModelSerializer):
    score = serializers.SerializerMethodField()
    explanation = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = ['id', 'title', 'due_date', 'estimated_hours', 'importance', 'dependencies', 'score', 'explanation']

    def get_score(self, obj):
        return calculate_score({
            "title": obj.title,
            "due_date": obj.due_date,
            "estimated_hours": obj.estimated_hours,
            "importance": obj.importance,
            "dependencies": obj.dependencies
        })

    def get_explanation(self, obj):
        return explain_choice({
            "title": obj.title,
            "due_date": obj.due_date,
            "estimated_hours": obj.estimated_hours,
            "importance": obj.importance,
            "dependencies": obj.dependencies
        })
