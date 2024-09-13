import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/index";
import SignIn from "./pages/sign-in";
import Home from "./pages/home";
import Catalogue from "./pages/catalogue";
import MapPortal from "./pages/map-portal";
import Analytics from "./pages/analytics";
import ExecutiveProfile from "./pages/executive-profile";
import Account from "./pages/account";
import About from "./pages/about";
import Help from "./pages/help";
import TermsOfUse from "./pages/terms-of-use";
import PrivacyPolicy from "./pages/privacy-policy";
import Error from "./pages/error";

import sign_console from "./assets/signature";

import "./main.css";

export default function Router() {
  const [authorization, setAuthorization] = React.useState(null);

  React.useEffect(function () {
    const token = localStorage.getItem("token");

    if (token) { setAuthorization(true); }
  }, []);

  return (
    <Routes>
      <Route path = "/">
        <Route index element = { <Index/> }/>
        <Route path = "sign-in" element = { <SignIn/> }/>
        <Route path = "home">
          <Route index element = { authorization ? <Home/> : <SignIn/> }/>
          <Route path = "catalogue" element = { authorization ? <Catalogue/> : <SignIn/> }/>
          <Route path = "map-portal" element = { authorization ? <MapPortal/> : <SignIn/> }/>
          <Route path = "analytics" element = { authorization ? <Analytics/> : <SignIn/> }/>
          <Route path = "executive-profile" element = { authorization ? <ExecutiveProfile/> : <SignIn/> }/>
        </Route>
        <Route path = "account" element = { authorization ? <Account/> : <SignIn/> }/>
        <Route path = "about" element = { <About/> }/>
        <Route path = "terms-of-use" element = { <TermsOfUse/> }/>
        <Route path = "privacy-policy" element = { <PrivacyPolicy/> }/>
        <Route path = "help" element = { <Help/> }/>
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