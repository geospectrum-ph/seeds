export default function Error() {
  localStorage.setItem("active_page", "Error");

  return (
    <div className = "page">
      <p>Error</p>
    </div>
  );
}