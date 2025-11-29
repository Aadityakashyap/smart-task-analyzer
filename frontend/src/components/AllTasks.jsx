import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/utils";

const AllTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchAll = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch(`${BASE_URL}/show/`);
      const data = await res.json();
      setAllTasks(data);
    } catch (e) {
      console.error(e);
      setErrorMsg("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="heading">All Tasks</h2>
      {loading && <p className="text-gray-400">Loading suggestions...</p>}
      {errorMsg && <p className="text-red-400">{errorMsg}</p>}
      {!loading && allTasks.length === 0 ? (
        <p className="text-gray-400">No tasks yet. Add one above.</p>
      ) : (
        <ul className="space-y-3">
          {allTasks.map((task) => (
            <li
              key={task.id}
              className="p-4 bg-gray-700 rounded-lg flex justify-between items-center"
            >
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllTasks;
