import React from "react";

import Header from "../components/header";
import Footer from "../components/footer";
import Climb from "../assets/climb";

export default function About() {
  localStorage.setItem("active_page", "About");



  return (
    <div id = "about" className = "page">
      <Header/>
      <div className = "body">
        <div>
          <div>{ "About " }<span>{ "SEED" }</span>{ "s" }</div>
        </div>
        <div>
          <div>{ "SEEDs is a project developed and maintained by " }<a href = "https://geospectrum.com.ph" target = "_blank">{ "Geospectrum Analytics Services, Inc." }</a>{ " It is is a web portal and GIS application that provides Local Government Units (LGUs) with a tool to effectively utilize the spatial and textual information about and within their locality." }</div>
          <br/>
          <div>{ "SEEDs is built using the Javascript programming language, through the full MERN stack of MongoDB, Express.js, React.js, and Node.js, with Vite.js for the front-end development. MongoDB is a document-oriented database used to store the web application's data. Node.js and its web framework, Express.js, handles server-side requests and processes while React.js handles client-side functionalities and the user interface. The full-stack three-tier JavaScript-based architecture of the web application allows for efficiency during project development and maintenance and scalability in data handling and project management. The project utilizes multiple APIs and various open-source JavaScript-based libraries, including Leaflet for the visualization of spatial data and Material UI for the general front-end layout and properties of SEEDs." }</div>
          <br/>
          <div>{ "SEEDs is built using the Javascript programming language, through the full MERN stack of MongoDB, Express.js, React.js, and Node.js, with Vite.js for the front-end development. MongoDB is a document-oriented database used to store the web application's data. Node.js and its web framework, Express.js, handles server-side requests and processes while React.js handles client-side functionalities and the user interface. The full-stack three-tier JavaScript-based architecture of the web application allows for efficiency during project development and maintenance and scalability in data handling and project management. The project utilizes multiple APIs and various open-source JavaScript-based libraries, including Leaflet for the visualization of spatial data and Material UI for the general front-end layout and properties of SEEDs." }</div>
        </div>
        <div>
          <div>{ "For more details about the development of the website and usage of the program and any section of the code, and for more information about Geospectrum Analytics Services, Inc., please visit " }<a href = "https://www.geospectrum.com.ph" target = "_blank">{ "https://www.geospectrum.com.ph" }</a>{ " or reach out through "}<a href = "mailto:it.support@geospectrum.com.ph">{ "it.support@geospectrum.com.ph" }</a>{ "." }</div>
        </div>
      </div>
      <Footer/>
      <Climb/>
    </div>
  );
}