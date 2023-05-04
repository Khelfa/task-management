// Importing React and ReactDOM libraries
import React from "react";
import ReactDOM from "react-dom";

// Importing the App component
import App from "./components/App";

// Rendering the App component inside the root element
ReactDOM.render(
  // Enabling strict mode for additional checks
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  // Selecting the root DOM element to render the app in
  document.getElementById("root")
);
