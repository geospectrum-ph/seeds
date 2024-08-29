import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

window.onload = function () {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  );
};
