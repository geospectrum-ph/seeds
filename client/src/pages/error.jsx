import Header from "../components/header";
import Footer from "../components/footer";

export default function Error() {
  localStorage.setItem("active-page", "error");

  return (
    <div id = "error" className = "page">
      <Header/>
      <div className = "body">
        <div>
          <div>{ "Error" }</div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}