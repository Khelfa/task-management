// Importing the statusLine.scss file for styling and the Task component
import "../styles/statusLine.scss";
import Task from "./Task";

// Defining the StatusLine component as a default export
export default function StatusLine(props) {
  // Destructuring the props object to get the required properties
  const { status, tasks, addTask, deleteTask, addEmptyTask, moveTask } = props;

  let taskList, tasksForStatus;

  // A function that adds an empty task to the 'tasks' state array with the current status
  function handleAddEmpty() {
    addEmptyTask(status);
  }

  // Filtering the 'tasks' array to get only tasks with the current status
  if (tasks) {
    tasksForStatus = tasks.filter((task) => {
      return task.status === status;
    });
  }

  // Creating an array of Task components for the current status
  if (tasksForStatus) {
    taskList = tasksForStatus.map((task) => {
      return (
        <Task
          addTask={(task) => addTask(task)}
          deleteTask={(id) => deleteTask(id)}
          moveTask={(id, status) => moveTask(id, status)}
          key={task.id}
          task={task}
        />
      );
    });
  }

  // The StatusLine component's render method
  return (
    <div className="statusLine">
      <h3>{status}</h3>
      {/* Rendering the array of Task components */}
      {taskList}
      {/* A button that adds an empty task to the 'tasks' state array with the current status */}
      <button onClick={handleAddEmpty} className="button addTask">
        +
      </button>
    </div>
  );
}
