import "./landing.css";

export default function Landing() {
  localStorage.setItem("active_page", "Landing");

  return (
    <div className = "page" id = "landing">
      <div>
        <div>{ "Welcome to" }</div>
        <div>{ "SEEDs" }</div>
      </div>
    </div>
  );
}