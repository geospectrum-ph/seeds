/*
import React from "react";

function Home() {
  return (
    <p>Home</p>
  );
}

function Test() {
  return (
    <p>Test</p>
  );
}

function Error() {
  return (
    <p>Error</p>
  );
}

export default function App() {
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
  );
};
*/

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path = "/" element = { <p>Home</p> }/>
        <Route path = "/test" element = { <p>Test</p> }/>
        <Route path = "*" element = { <p>Error</p> }/> 
      </Routes>
    </BrowserRouter>
  );
}