import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

let router;

if (typeof(window) !== "undefined") {
  function Test() {
    return (<span>test</span>);
  }

  function Hmmm() {
    return (<span>hmmm</span>);
  }

  router = createBrowserRouter([
    {
      path: "/",
      element: <Test/>,
      children: []
    },
    {
      path: "*",
      element: <Hmmm/>,
      children: []
    }
  ]);
}

export default function App() {
  return (router ? <RouterProvider router = { router }/> : null);
}