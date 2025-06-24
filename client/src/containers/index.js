import * as React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import { AdminContext } from "../context/AdminContext";
import { FeaturesContext } from "../context/FeaturesContext.js";
import { SEEDSContext } from "../context/SEEDSContext";

import MainWindow from "./mainWindow";
import MainLanding from "./mainLanding";

function App() {
  const { setLoginDetails } = React.useContext(AdminContext);
  const { setBrgysList } = React.useContext(FeaturesContext);
  const { selectedIndex, appBarValue } = React.useContext(SEEDSContext);

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [selectedIndex, appBarValue]);
  
  React.useEffect(() => {
    const fetchData = async () => {
      const names = await axios("https://seeds.geospectrum.com.ph/getdata/barangays/",);

      setBrgysList(names.data.values);
    };

    fetchData();

    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      
      setLoginDetails(foundUser);
    }
  }, []);
  
  return (
    <Router>
      <Switch>
        <Route path = "/seeds" >
          <MainWindow/>
        </Route>
        <Route path = "/">
          <MainLanding/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
