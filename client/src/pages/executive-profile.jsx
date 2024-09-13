import Header from "../components/header";
import Footer from "../components/footer";

export default function ExecutiveProfile() {
  localStorage.setItem("active-page", "executive-profile");

  return (
    <div id = "executive-profile" className = "page">
      <Header/>
      <div className = "body">
        <div>
          <div>{ "Executive Profile" }</div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}