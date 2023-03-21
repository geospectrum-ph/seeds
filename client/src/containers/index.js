import React, {useContext, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from 'axios';

import MainLanding from "./mainLanding";
import MainWindow from './mainWindow';

import { FeaturesContext } from '../context/FeaturesContext.js';
import { AdminContext } from '../context/AdminContext';
import { SEEDSContext } from '../context/SEEDSContext';

function  App() {
  const {setBrgysList}  = useContext(FeaturesContext);
  const {setLoginDetails} = useContext(AdminContext)
  const {selectedIndex, appBarValue} = useContext(SEEDSContext)

  function scroll() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  useEffect (() => {
    scroll()
  }, [selectedIndex, appBarValue])
  
  useEffect(()=>{

    const fetchData = async () => {
      const names = await axios('http://ec2-52-90-134-187.compute-1.amazonaws.com/getdata/barangays/',);
      setBrgysList(names.data.values);
    };

    fetchData();
  }, [])

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setLoginDetails(foundUser);
    }
  }, []);
  
  return (
    <Router>
      <Switch>
        <Route path="/seeds" >
          <MainWindow />
        </Route>
        <Route path="/">
          <MainLanding/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
