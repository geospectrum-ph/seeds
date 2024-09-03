import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import Landing from "./app/landing";
import Home from "./app/home";
import Login from "./app/login";
import About from "./app/about";
import Feedback from "./app/feedback";
import Error from "./app/error";

import sign_console from "./assets/signature";

import "./main.css";

function Header() {
  function handleActiveButton(value) {
    const buttons = document.getElementById("header").getElementsByClassName("button");

    for (let button of buttons) {
      if (button.innerText === value) { button.classList.add("active"); }
      else { button.classList.remove("active"); }
    }
  }

  React.useEffect(function () {
    const active_page = localStorage.getItem("active_page");

    if (active_page) { handleActiveButton(active_page); }
  }, []);

  return (
    <div id = "header">
      <div>
        <div>{ "🌱" }</div>
        <div>{ "SEEDs" }</div>
      </div>
      <div>
        <Link to = "/home"><div className = "button" onClick = { function () { handleActiveButton("Home"); } }>{ "Home" }</div></Link>
        <Link to = "/about"><div className = "button" onClick = { function () { handleActiveButton("About"); } }>{ "About" }</div></Link>
        <Link to = "/feedback"><div className = "button" onClick = { function () { handleActiveButton("Feedback"); } }>{ "Feedback" }</div></Link>
        <Link to = "/login"><div className = "button" onClick = { function () { handleActiveButton("Log In"); } }>{ "Log In" }</div></Link>
      </div>
    </div>
  );
}

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

function Router() {
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

function Footer() {
  return (
    <div id = "footer">
      <div>{ "SEEDs © 2024" }</div>
      <div>{ "•" }</div>
      <div>{ "All Rights Reserved" }</div>
      <div>{ "•" }</div>
      <div>{ "Terms of Use" }</div>
      <div>{ "•" }</div>
      <div>{ "Privacy Policy" }</div>
    </div>
  );
}

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <div id = "app">
          <Header/>
          <Router/>
          <Footer/>
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