# Smart Task Analyzer — Backend

This is the Python/Django REST Framework backend for Smart Task Analyzer. It exposes APIs to add tasks, list tasks, and suggest the top 3 tasks to focus on today with clear explanations.

---

## Setup Instructions

### Prerequisites

- Python 3.9+
- MySQL 8.0+

### Installation

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### Database Setup

Create a MySQL database and user:

```sql
CREATE DATABASE taskdb
```

### Update `.env`:

```
DJANGO_SECRET_KEY=your-dev-secret
DB_NAME=taskdb
MYSQL_USER=your-mysql-user
MYSQL_PASSWORD=your-mysql-password
MYSQL_HOST=your-mysql-host
MYSQL_PORT=your-mysql-port
```

### Run migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

### Start server:

```bash
python manage.py runserver
```

---

## API Endpoints

- `POST /api/tasks/add/` → Add a new task
- `GET /api/tasks/show/` → List all tasks
- `GET /api/tasks/suggest/?strategy=Smart Balance` → Suggest top 3 tasks

---

## Design Decisions

- MySQL chosen for stability and Django compatibility.
- JSONField used for dependencies (requires MySQL 8+).

---
