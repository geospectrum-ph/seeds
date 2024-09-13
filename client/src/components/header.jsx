import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [authorization, setAuthorization] = React.useState(null);

  React.useEffect(function () {
    const token = localStorage.getItem("token");

    if (token) { setAuthorization(true); }
  }, []);

  function handleActiveButton(value) {
    const buttons = document.getElementById("header").getElementsByClassName("button");

    if (value === "sign-out") {
      for (let button of buttons) { button.classList.remove("active"); }
      localStorage.removeItem("token");
    }
    else {
      for (let button of buttons) {
        if (button.innerText === value) { button.classList.add("active"); }
        else { button.classList.remove("active"); }
      }
    }
  }

  return (
    <div id = "header">
      <div>
        <Link to = "/" className = "title" onClick = { function () { handleActiveButton("index"); } }>
          <div>{ "🌱" }</div>
          <div>{ "SEEDs" }</div>
        </Link>
      </div>
      {
        authorization ? 
        <div>
          <Link to = "/home" className = "button" onClick = { function () { handleActiveButton("home"); } }>{ "Home" }</Link>
          <Link to = "/" className = "button" onClick = { function () { handleActiveButton("sign-out"); } }>{ "Sign Out" }</Link>
        </div>
        :
        <div>
          <Link to = "/sign-in" className = "button" onClick = { function () { handleActiveButton("sign-in"); } }>{ "Sign In" }</Link>
        </div>
      }
    </div>
  );
}