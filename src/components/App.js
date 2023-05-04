// Importing useState and useEffect hooks from the React library
// and the StatusLine component from the StatusLine.js file
import { useState, useEffect } from "react";
import "../styles/App.scss";
import StatusLine from "./StatusLine";

// Defining the main App component
function App() {
  // Defining a state variable called 'tasks' with an initial value of an empty array
  const [tasks, setTasks] = useState([]);

  // Using the useEffect hook to load tasks from local storage when the component mounts
  useEffect(() => {
    loadTasksFromLocalStorage();
  }, []);

  // A function that adds an empty task to the 'tasks' state array with a given 'status' property
  function addEmptyTask(status) {
    // Finding the last task in the 'tasks' state array
    const lastTask = tasks[tasks.length - 1];

    // Setting the ID of the new task to be one greater than the ID of the last task
    let newTaskId = 1;
    if (lastTask !== undefined) {
      newTaskId = lastTask.id + 1;
    }

    // Adding the new task to the 'tasks' state array using the spread operator to maintain immutability
    setTasks((tasks) => [
      ...tasks,
      {
        id: newTaskId,
        title: "",
        description: "",
        urgency: "",
        status: status,
      },
    ]);
  }

  // A function that adds a new task to the 'tasks' state array
  function addTask(taskToAdd) {
    // Filtering out the task with the same ID as the taskToAdd parameter
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskToAdd.id;
    });

    // Creating a new array of tasks that includes the taskToAdd parameter using the spread operator
    let newTaskList = [...filteredTasks, taskToAdd];

    // Updating the 'tasks' state variable with the new array of tasks
    setTasks(newTaskList);

    // Saving the updated list of tasks to local storage
    saveTasksToLocalStorage(newTaskList);
  }

  // A function that deletes a task with a given ID from the 'tasks' state array
  function deleteTask(taskId) {
    // Filtering out the task with the given ID
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskId;
    });

    // Updating the 'tasks' state variable with the new array of tasks
    setTasks(filteredTasks);

    // Saving the updated list of tasks to local storage
    saveTasksToLocalStorage(filteredTasks);
  }

  // A function that moves a task with a given ID to a new status
  function moveTask(id, newStatus) {
    // Finding the task with the given ID
    let task = tasks.filter((task) => {
      return task.id === id;
    })[0];

    // Filtering out the task with the given ID
    let filteredTasks = tasks.filter((task) => {
      return task.id !== id;
    });

    // Updating the 'status' property of the task to the new status
    task.status = newStatus;

    // Creating a new array of tasks that includes the updated task using the spread operator
    let newTaskList = [...filteredTasks, task];

    // Updating the 'tasks' state variable with the new array of tasks
    setTasks(newTaskList);

    // Saving the updated list of tasks to local storage
    saveTasksToLocalStorage(newTaskList);
  }

  // A function that saves a given list of tasks to local storage
  function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // A function that loads tasks from local storage
  function loadTasksFromLocalStorage() {
    // Retrieving the 'tasks' item from local storage
    let loadedTasks = localStorage.getItem("tasks");

    // Parsing the JSON string into an array of tasks
    let tasks = JSON.parse(loadedTasks);

    // Updating the 'tasks' state variable with the loaded tasks, if any
    if (tasks) {
      setTasks(tasks);
    }
  }

  // The App component's render method
  return (
    <div className="App">
      <h1>Task Management</h1>
      <main>
        {/* Rendering three instances of the StatusLine component with different 'status' props */}
        <section>
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="Backlog"
          />
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="In Progress"
          />
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="Done"
          />
        </section>
      </main>
    </div>
  );
}

// Exporting the App component as the default export of this module
export default App;
