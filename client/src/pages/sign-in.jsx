import React from "react";

import axios from "axios";

import Header from "../components/header";
import Footer from "../components/footer";

export default function SignIn() {
  localStorage.setItem("active_page", "sign-in");

  React.useEffect(function () {
    const form = document.getElementById("sign-in-form");

    async function submit(username, password) {
      const url = "http://localhost:3000/";

      await axios
        .post(url + "users/sign-in/", {
          email: username,
          password: password
        })
        .then(function (response) {
          console.log("response:");
          console.log(response);
        })
        .catch(function (error) {
          console.log("error:");
          console.log(error);
        });
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const username = document.getElementById("sign-in-username").value;
      const password = document.getElementById("sign-in-password").value;

      if (username !== "" && password !== "") {
        submit(username, password);
      }

      form.reset();
    });
  }, []);

  return (
    <div id = "sign-in" className = "page">
      <Header/>
      <div className = "body">
        <form id = "sign-in-form" method = "post">
          <div>
            <div>
              <label htmlFor = "sign-in-username">{ "Username" }</label>
            </div>
            <div>
              <input type = "text" id = "sign-in-username" name = "username" placeholder = "" required/>
            </div>
          </div>
          <div>
            <div>
              <label htmlFor = "sign-in-password">{ "Password" }</label>
            </div>
            <div>
              <input type = "password" id = "sign-in-password" name = "password" placeholder = "" required/>
            </div>
          </div>
          <div>
            <input id = "sign-in-submit" className = "button" type = "submit" value = "Submit"/>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  );
}