import React from "react";

import logo from "/favicons/favicon.ico";

export default function App() {
  const [count, setCount]  =  React.useState(0);

  window.onload = function () {
    document
      .getElementById("test-btn")
      .addEventListener("click", function () {
        setCount((count)  => (count + 1));
      });
  };

  return (
    <>
      <div>
        <a href = "https://vitejs.dev" target = "_blank">
          <img src = { logo }/>
        </a>
        <a href = "https://react.dev" target = "_blank">
          <img src = { logo }/>
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className = "card">
        <button id = "test-btn">count is { count }</button>
        <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
      </div>
      <p className = "read-the-docs">Click on the Vite and React logos to learn more.</p>
    </>
  )
};