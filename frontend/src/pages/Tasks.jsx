import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TasksPage() {
  const { tasks, setTasks } = useContext(TaskContext);

  return (
    <div>
      <h1>All Tasks</h1>
      {tasks.map(task => (
        <p key={task._id}>{task.title}</p>
      ))}
    </div>
  );
}

export default TasksPage;
