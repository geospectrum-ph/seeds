import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./app/home";
import AboutSEEDs from "./app/about-seeds";
import ContactUs from "./app/contact-us";
import Error from "./app/error";

import sign_console from "./assets/signature";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = { <Home/> }/>
        <Route path = "/home" element = { <Home/> }/>
        <Route path = "/about-seeds" element = { <AboutSEEDs/> }/>
        <Route path = "/contact-us" element = { <ContactUs/> }/>
        <Route path = "*" element = { <Error/> }/> 
      </Routes>
    </BrowserRouter>
  );
}

window.addEventListener("load", function () {
  ReactDOM
    .createRoot(document.getElementById("root"))
    .render(
      <React.StrictMode>
        <App/>
      </React.StrictMode>
    );

  sign_console();
});