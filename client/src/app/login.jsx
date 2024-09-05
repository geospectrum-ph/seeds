import Header from "../components/header";
import Footer from "../components/footer";

export default function Login() {
  localStorage.setItem("active_page", "Log In");

  return (
    <div id = "login" className = "page">
      <Header/>
      <div className = "body">
        <div>
          <div>{ "Log In!" }</div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}