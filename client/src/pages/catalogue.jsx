import Header from "../components/header";
import Footer from "../components/footer";

export default function Catalogue() {
  localStorage.setItem("active-page", "catalogue");

  return (
    <div id = "catalogue" className = "page">
      <Header/>
      <div className = "body">
        <div>
          <div>{ "Catalogue" }</div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}