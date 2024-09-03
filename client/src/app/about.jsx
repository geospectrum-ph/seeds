export default function About() {
  localStorage.setItem("active_page", "About");
  
  return (
    <div className = "page">
      <p>About</p>
    </div>
  );
}