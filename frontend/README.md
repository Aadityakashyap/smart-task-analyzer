# Smart Task Analyzer — Frontend

This is the React.js + Tailwind CSS frontend for Smart Task Analyzer. It provides a UI to add tasks, view all tasks, and see top 3 suggested tasks with explanations.

---

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
cd frontend
npm install
```

### Run Development Server

```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## Features

- **Task Form** → Add new tasks (title, due date, effort, importance, dependencies comma seperated)
- **Task List** → View all tasks stored in backend
- **Critical Thinking Suggestions** → Shows top 3 tasks with explanations
- **Strategy Toggle** → Choose prioritization mode:
  - Smart Balance
  - Fastest Wins
  - High Impact
  - Deadline Driven

---

## API Integration

Frontend communicates with backend via fetch:

- `POST http://127.0.0.1:8000/api/tasks/add/`
- `GET http://127.0.0.1:8000/api/tasks/show/`
- `GET http://127.0.0.1:8000/api/tasks/suggest/?strategy=Smart%20Balance`

---

## Design Decisions

- TailwindCSS for utility-first styling.
- Components split into `TaskForm`, `TaskList`, `StrategyToggle`, `AllTask` `Suggestions` for clarity.
- State managed with React hooks (`useState`, `useEffect`).

---
