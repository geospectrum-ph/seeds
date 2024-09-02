
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path = "/" element = { <p>Home</p> }/>
        <Route path = "/test" element = { <p>Test</p> }/>
        <Route path = "*" element = { <p>Error</p> }/> 
      </Routes>
    </BrowserRouter>
  );
}