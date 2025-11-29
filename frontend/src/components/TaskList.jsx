import { AllTasks, Suggestions } from "./";

const TaskList = ({ strategy }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Suggestions strategy={strategy} />
      <AllTasks />
    </div>
  );
};

export default TaskList;
