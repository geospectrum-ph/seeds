import { BrowserRouter, Routes, Route } from "react-router-dom";

function Home() {
  return (
    <p>Home</p>
  );
}

function Test() {
  return (
    <p>Test</p>
  );
}

function Error() {
  return (
    <p>Error</p>
  );
}

export default function App() {
  return (
    <BrowserRouter basename = "/">
      <Routes>
        <Route path = "home" element = { <Home/> }/>
        <Route path = "test" element = { <Test/> }/>
        <Route path = "*" element = { <Error/> }/>
      </Routes>
    </BrowserRouter>
  );
}