import { useState } from "react";
import { StrategyToggle, TaskForm, TaskList } from "./components";

const App = () => {
  const [strategy, setStrategy] = useState("Smart Balance");

  return (
    <div className="bg-secondary text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold text-primary mb-6">
        Smart Task Analyzer
      </h1>
      <TaskForm />
      <StrategyToggle strategy={strategy} setStrategy={setStrategy} />
      <TaskList strategy={strategy} />
    </div>
  );
};

export default App;
