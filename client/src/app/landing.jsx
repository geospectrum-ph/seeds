import Header from "../components/header";
import Footer from "../components/footer";

export default function Landing() {
  localStorage.setItem("active_page", "Landing");

  return (
    <div id = "landing" className = "page">
      <Header/>
      <div className = "body">
        <div>
          <div>{ "Welcome to" }</div>
          <div>{ "SEEDs" }</div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}