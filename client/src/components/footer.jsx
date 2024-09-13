import { Link } from "react-router-dom";

export default function Footer() {
  function handleActiveButton(value) {
    const buttons = document.getElementById("header").getElementsByClassName("button");

    for (let button of buttons) {
      if (button.innerText === value) { button.classList.add("active"); }
      else { button.classList.remove("active"); }
    }
  }

  return (
    <div id = "footer">
      <div>
        <Link to = "/" onClick = { function () { handleActiveButton("index"); } }>{ "SEEDs © 2024" }</Link>
      </div>
      <div>{ "•" }</div>
      <div>
        <Link to = "/about" onClick = { function () { handleActiveButton("about"); } }>{ "About" }</Link>
      </div>
      <div>{ "•" }</div>
      <div>
        <a href = "https://github.com/geospectrum-ph/seeds" target = "_blank">{ "Documentation" }</a>
      </div>
      <div>{ "•" }</div>
      <div>
        <Link to = "/terms-of-use" onClick = { function () { handleActiveButton("terms-of-use"); } }>{ "Terms of Use" }</Link>
      </div>
      <div>{ "•" }</div>
      <div>
        <Link to = "/privacy-policy" onClick = { function () { handleActiveButton("privacy-policy"); } }>{ "Privacy Policy" }</Link>
      </div>
      <div>{ "•" }</div>
      <div>
        <a href = "https://geospectrum.com.ph" target = "_blank">{ "GEOSPECTRUM" }</a>
      </div>
    </div>
  );
}