export default function Home() {
  localStorage.setItem("active_page", "Home");

  return (
    <div className = "page">
      <p>Home</p>
    </div>
  );
}