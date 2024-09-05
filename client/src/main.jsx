import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./app/landing";
import Home from "./app/home";
import Login from "./app/login";
import About from "./app/about";
import Feedback from "./app/feedback";
import Error from "./app/error";

import sign_console from "./assets/signature";

import "./main.css";

// function Router() {
//   function PrivateRoute ({ Component }) {
//     /*
//       const [someLocalVariable, setSomeLocalVariable] = React.useState(false);

//       React.useEffect(function () {
//         const key = localStorage.getItem("key");

//         if (key === valid) { setSomeLocalVariable(true); } 
//       }, [someGlobalVariable]);

//       return (someLocalVariable ? <Component /> : <Navigate to = "/login"/>);
//     */
         
//     return (false ? <Component /> : <Navigate to = "/login"/>);
//   };

//   return (
//     <Routes>
//       <Route path = "/">
//         <Route index element = { <Landing/> }/>
//         <Route path = "home" element = { <PrivateRoute Component = { <Home/> }/> }/>
//         <Route path = "login" element = { <Login/> }/>
//         <Route path = "about" element = { <About/> }/>
//         <Route path = "feedback" element = { <Feedback/> }/>
//         <Route path = "*" element = { <Error/> }/>
//       </Route>
//     </Routes>
//   );
// }

export default function Router() {
  return (
    <Routes>
      <Route path = "/">
        <Route index element = { <Landing/> }/>
        <Route path = "home" element = { <Landing/> }/>
        <Route path = "login" element = { <Login/> }/>
        <Route path = "about" element = { <About/> }/>
        <Route path = "feedback" element = { <Feedback/> }/>
        <Route path = "*" element = { <Error/> }/>
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <div id = "app">
          <Router/>
        </div>
      </BrowserRouter>
    </React.StrictMode>
  );
}

window.addEventListener("load", function () {
  ReactDOM
    .createRoot(document.getElementById("root"))
    .render(<App/>);

    sign_console();
  });