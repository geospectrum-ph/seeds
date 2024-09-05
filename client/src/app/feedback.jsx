import Header from "../components/header";
import Footer from "../components/footer";

export default function Feedback() {
  localStorage.setItem("active_page", "Feedback");

  return (
    <div id = "feedback" className = "page">
      <Header/>
      <div className = "body">
        <div>
          <div>{ "Feedback" }</div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}