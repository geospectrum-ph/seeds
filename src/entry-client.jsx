import React from "react";
import ReactDOMClient from "react-dom/client";

import App from "./App";

import "./index.css";

ReactDOMClient.hydrateRoot(
  document.getElementById("root"),
  <React.StrictMode>
    <App/>
  </React.StrictMode>
)