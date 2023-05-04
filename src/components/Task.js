// Importing the task.scss file for styling and the useState hook from React
import "../styles/task.scss";
import { useState } from "react";

// Defining the Task component as a default export
export default function Task(props) {
  // Destructuring the props object to get the required properties
  const { addTask, deleteTask, moveTask, task } = props;

  // Defining state variables to track the urgency level, collapse status, and form action
  const [urgencyLevel, setUrgencyLevel] = useState(task.urgency);
  const [collapsed, setCollapsed] = useState(task.isCollapsed);
  const [formAction, setFormAction] = useState("");

  // A function that sets the urgency level based on the clicked radio button
  function setUrgency(event) {
    setUrgencyLevel(event.target.attributes.urgency.value);
  }

  // A function that handles form submission (save or delete)
  function handleSubmit(event) {
    event.preventDefault();

    if (formAction === "save") {
      // If the form is collapsed, expand it
      if (collapsed) {
        setCollapsed(false);
      } else {
        // Otherwise, create a new task object with the updated values and add it to the tasks array
        let newTask = {
          id: task.id,
          title: event.target.elements.title.value,
          description: event.target.elements.description.value,
          urgency: urgencyLevel,
          status: task.status,
          isCollapsed: true,
        };

        addTask(newTask);
        setCollapsed(true);
      }
    }

    if (formAction === "delete") {
      // If the form action is delete, remove the task from the tasks array
      deleteTask(task.id);
    }
  }

  // A function that handles moving a task to the left (backlog or in progress)
  function handleMoveLeft() {
    let newStatus = "";

    if (task.status === "In Progress") {
      newStatus = "Backlog";
    } else if (task.status === "Done") {
      newStatus = "In Progress";
    }

    if (newStatus !== "") {
      moveTask(task.id, newStatus);
    }
  }

  // A function that handles moving a task to the right (in progress or done)
  function handleMoveRight() {
    let newStatus = "";

    if (task.status === "Backlog") {
      newStatus = "In Progress";
    } else if (task.status === "In Progress") {
      newStatus = "Done";
    }

    if (newStatus !== "") {
      moveTask(task.id, newStatus);
    }
  }

  // The Task component's render method
  return (
    <div className={`task ${collapsed ? "collapsedTask" : ""}`}>
      {/* A button that moves the task to the left (backlog or in progress) */}
      <button onClick={handleMoveLeft} className="button moveTask">
        &#171;
      </button>
      {/* A form that allows editing the task */}
      <form onSubmit={handleSubmit} className={collapsed ? "collapsed" : ""}>
        {/* An input for the task title */}
        <input
          type="text"
          className="title input"
          name="title"
          placeholder="Enter Title"
          disabled={collapsed}
          defaultValue={task.title}
        />
        {/* A textarea for the task description */}
        <textarea
          rows="2"
          className="description input"
          name="description"
          placeholder="Enter Description"
          defaultValue={task.description}
        />
        {/* Radio buttons for the task urgency level */}
        <div className="urgencyLabels">
          <label className={`low ${urgencyLevel === "low" ? "selected" : ""}`}>
            <input
              urgency="low"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
            low
          </label>
          <label
            className={`medium ${urgencyLevel === "medium" ? "selected" : ""}`}
          >
            <input
              urgency="medium"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
            medium
          </label>
          <label
            className={`high ${urgencyLevel === "high" ? "selected" : ""}`}
          >
            <input
              urgency="high"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
            high
          </label>
        </div>
        {/* A button that saves or edits the task */}
        <button
          onClick={() => {
            setFormAction("save");
          }}
          className="button"
        >
          {collapsed ? "Edit" : "Save"}
        </button>
        {/* A button that deletes the task */}
        {collapsed && (
          <button
            onClick={() => {
              setFormAction("delete");
            }}
            className="button delete"
          >
            X
          </button>
        )}
      </form>
      {/* A button that moves the task to the right (in progress or done) */}
      <button onClick={handleMoveRight} className="button moveTask">
        &#187;
      </button>
    </div>
  );
}
