import { useState } from "react";
import { BASE_URL } from "../utils/utils";

const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    due_date: "",
    estimated_hours: "",
    importance: "",
    dependencies: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const normalizePayload = () => {
    const deps = (task.dependencies || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    return {
      title: task.title,
      due_date: task.due_date,
      estimated_hours: Number(task.estimated_hours),
      importance: Number(task.importance),
      dependencies: deps,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ message: "", type: "" });
    try {
      const payload = normalizePayload();
      const res = await fetch(`${BASE_URL}/add/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }
      const data = await res.json();
      setMsg({ message: "Task added successfully!", type: "success" });
      console.log("Saved:", data);
      setTask({
        title: "",
        due_date: "",
        estimated_hours: "",
        importance: "",
        dependencies: "",
      });
    } catch (error) {
      console.error("Add task error:", error);
      setMsg({ message: "Failed to add task. Check console.", type: "failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg shadow-md mb-6"
    >
      <h2 className="heading">Add Task</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={task.title}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          type="date"
          name="due_date"
          value={task.due_date}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          type="number"
          name="estimated_hours"
          placeholder="Estimated Hours"
          value={task.estimated_hours}
          onChange={handleChange}
          className="input-field"
          min="1"
          required
        />
        <input
          type="number"
          name="importance"
          placeholder="Importance (1-10)"
          value={task.importance}
          onChange={handleChange}
          className="input-field"
          min="1"
          max="10"
          required
        />
        <input
          type="text"
          name="dependencies"
          placeholder="Dependencies (comma-separated IDs or names)"
          value={task.dependencies}
          onChange={handleChange}
          className="input-field"
        />
        {msg && msg?.message && (
          <p
            className={`w-full p-2 rounded bg-transparent ${
              msg?.type === "success" ? "bg-primary" : "text-red-400"
            }`}
          >
            {msg?.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="mt-4 bg-primary text-black px-4 py-2 rounded hover:bg-teal-400 transition"
        disabled={loading}
      >
        {loading ? "Adding Task..." : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
