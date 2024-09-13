import Header from "../components/header";
import Footer from "../components/footer";

export default function Index() {
  localStorage.setItem("active-page", "index");

  return (
    <div id = "index" className = "page">
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