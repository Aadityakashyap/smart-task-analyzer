from datetime import date, datetime

def _to_date(value):
    if isinstance(value, datetime):
        return value.date()
    if isinstance(value, date):
        return value
    if isinstance(value, str):
        return datetime.strptime(value, "%Y-%m-%d").date()
    raise ValueError("Invalid date type")

def calculate_score(task):
    today = date.today()
    due_date = _to_date(task['due_date'])

    if due_date < today:
        urgency = 20
    else:
        days_left = (due_date - today).days
        urgency = max(0, 10 - days_left)

    importance = int(task['importance']) * 2 # multiplier by 2 emphasizes high-impact

    estimated = int(task['estimated_hours'])
    quickwin = max(0, 10 - estimated)

    deps = task.get('dependencies') or []
    dependency_bonus = 5 if len(deps) > 0 else 0

    return urgency + importance + quickwin + dependency_bonus

def explain_choice(task):
    reasons = []
    today = date.today()
    due_date = _to_date(task['due_date'])

    if due_date <= today:
        reasons.append("Deadline is today or overdue — time-critical.")
    elif (due_date - today).days <= 2:
        reasons.append("Deadline is approaching within 2 days — act soon.")

    if int(task['importance']) >= 8:
        reasons.append("High-impact task (importance ≥ 8).")
    elif int(task['importance']) >= 6:
        reasons.append("Moderately important task (importance ≥ 6).")

    if int(task['estimated_hours']) <= 3:
        reasons.append("Quick win (≤ 3 hours) — low effort, fast momentum.")

    if (task.get('dependencies') or []):
        reasons.append("Completing this unblocks other dependent tasks.")

    if not reasons:
        reasons.append("Balanced priority based on urgency, impact, and effort.")

    return reasons
