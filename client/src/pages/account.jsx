import Header from "../components/header";
import Footer from "../components/footer";

export default function Account() {
  localStorage.setItem("active-page", "account");

  return (
    <div id = "account" className = "page">
      <Header/>
      <div className = "body">
        <div>
          <div>{ "account" }</div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}