import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/utils";

const Suggestions = ({ strategy }) => {
  const [suggested, setSuggested] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchSuggested = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch(
        `${BASE_URL}/suggest/?strategy=${encodeURIComponent(
          strategy
        )}`
      );
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setSuggested(data);
    } catch (e) {
      console.error("Suggest error:", e);
      setErrorMsg("Failed to load suggestions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggested();
  }, [strategy]);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="heading">
        Critical Thinking Suggestions
      </h2>
      {loading && <p className="text-gray-400">Loading suggestions...</p>}
      {errorMsg && <p className="text-red-400">{errorMsg}</p>}
      {!loading && suggested.length === 0 && (
        <p className="text-gray-400">No suggestions yet.</p>
      )}
      <ul className="space-y-3">
        {suggested.map((task) => (
          <li
            key={task.id ?? `${task.title}-${task.due_date}`}
            className="p-4 bg-gray-700 rounded-lg"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold">{task.title}</h3>
                <p className="text-sm text-gray-300">
                  Due: {task.due_date} • Importance: {task.importance} • Effort:{" "}
                  {task.estimated_hours}h
                </p>
              </div>
              <span className="text-primary font-bold">
                Score: {task.score}
              </span>
            </div>
            <div className="text-sm text-gray-300">
              <p className="font-semibold">Why this is suggested:</p>
              <ul className="list-disc ml-5">
                {(task.critical_reasoning || task.explanation || []).map(
                  (reason, idx) => (
                    <li key={idx}>{reason}</li>
                  )
                )}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Suggestions;
