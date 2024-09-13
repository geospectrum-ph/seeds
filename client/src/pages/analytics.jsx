import Header from "../components/header";
import Footer from "../components/footer";

export default function Analytics() {
  localStorage.setItem("active-page", "analytics");

  return (
    <div id = "analytics" className = "page">
      <Header/>
      <div className = "body">
        <div>
          <div>{ "Analytics" }</div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}