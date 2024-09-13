import Header from "../components/header";
import Footer from "../components/footer";

export default function MapPortal() {
  localStorage.setItem("active-page", "map-portal");

  return (
    <div id = "map-portal" className = "page">
      <Header/>
      <div className = "body">
        <div>
          <div>{ "Map Portal" }</div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}