import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
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
        <Link to = "/help"><div className = "button" onClick = { function () { handleActiveButton("Help"); } }>{ "Help" }</div></Link>
        <Link to = "/login"><div className = "button" onClick = { function () { handleActiveButton("Log In"); } }>{ "Log In" }</div></Link>
      </div>
    </div>
  );
}