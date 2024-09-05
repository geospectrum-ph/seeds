import React from "react";

export default function Climb() {
  React.useEffect(function () {
    const button = document.getElementById("climb");

    button.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    });

    window.addEventListener("scroll", function () {
      button.style.display = window.scrollY > 0 ? "flex" : "none";
    });
  }, []);

  return (
    <div id = "climb" className = "button">{ "▲" }</div>
  );
}