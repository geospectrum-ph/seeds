import Header from "../components/header";
import Footer from "../components/footer";

export default function Help() {
  localStorage.setItem("active-page", "help");

  return (
    <div id = "help" className = "page">
      <Header/>
      <div className = "body">
        <div>
          <div>{ "Help" }</div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}