import Header from "../components/header";
import Footer from "../components/footer";

export default function TermsOfUse() {
  localStorage.setItem("active-page", "terms-of-use");

  return (
    <div id = "terms-of-use" className = "page">
      <Header/>
      <div className = "body">
        <div>
          <div>{ "Terms of Use" }</div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}