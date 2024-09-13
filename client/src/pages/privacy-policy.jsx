import Header from "../components/header";
import Footer from "../components/footer";

export default function PrivacyPolicy() {
  localStorage.setItem("active-page", "privacy-policy");

  return (
    <div id = "privacy-policy" className = "page">
      <Header/>
      <div className = "body">
        <div>
          <div>{ "Privacy Policy" }</div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}