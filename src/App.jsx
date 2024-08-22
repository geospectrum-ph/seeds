import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./framework/error";
import LandingPage from "./framework/landing";

const routes = [
  {
    path: "/",
    errorElement: <ErrorPage/>,
    children: [  
      {
        index: true,
        element: <LandingPage/>
      }
    ]
  },
  {
    path: "*",
    element: <ErrorPage/>
  }
];

let router;

if (typeof(window) !== "undefined") {
  router = createBrowserRouter(routes);
}

export default function App() {
  return (router ? <RouterProvider router = { router }/> : null);
}