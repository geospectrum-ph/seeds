import Header from "../components/header";
import Footer from "../components/footer";

export default function Home() {
  localStorage.setItem("active_page", "Home");

  return (
    <div id = "home" className = "page">
      <Header/>
      <div className = "body">
        <div>
          <div>{ "Home" }</div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}