import React, {useContext, useEffect} from 'react';
import MainLanding from "./mainLanding/index.js";
import Landing from "./login/index.js";
import MainWindow from './mainWindow/index.js';
import SeedsMapPortal from './leftNav/seedsMapPortal/index.js'
import AboutUs from "./mainWinAppBar/aboutUs/index.js";
import ContactUs from "./mainWinAppBar/contactUs/index.js";
import Products from "./mainWinAppBar/features/index.js";
import SeedsFeatures from "./seedsFeatures/index.js";
// import SeedsTableData from "./seedsFeatures/seedsTableData";
import SeedsTableData from "./seedsFeatures/seedsTableData/index.js";
// import SeedsTableData from 

import { HashRouter as Router, Switch, Route, Link, useHistory} from "react-router-dom";
// import PopulateSeeds from "../containers/leftNavDraw/drawers/populateSeeds";
// import PopulateSeeds from "../dialog/populateSeeds";
// import SeedsCatalogue from './leftNav'
import SeedsCatalogue from './leftNav/seedsCatalogue/index.js';
import SeedsPopulate from './leftNav/seedsPopulate/index.js';
import SeedsOverview from './seedsFeatures/seedsOverview/index.js';
// import SeedsFeatures from "../containers/seedsFeatures";
// import SeedsMapPortal from '../map';
// import LeftNav from '../containers/leftNav2'

import AppsBar from "./mainLanding/AppBar/index.js";
// import SubTabs from  './seedsNANI';
import axios from 'axios';

import { FeaturesContext } from '../context/FeaturesContext.js';

function AppPage() {

  const {setBrgysList}  = useContext(FeaturesContext);

  useEffect(()=>{

    const fetchData = async () => {
      const names = await axios('https://seeds.geospectrum.com.ph/getdata/barangays/',);
      setBrgysList(names.data.values);
    };

    fetchData();
  }, [])
 
  return (

    <div>
      {/* <Grid item className="seeds" xs={1}>
        <LeftNav />
      </Grid> */}
      <Router>
        <Switch>

          <Route path="/map" >
            <MainWindow />
          </Route>

{/* LEFT NAVIGATION ROUTES */}

        {/* <Route path="/map/seedspopulate" >
            <SeedsPopulate />
          </Route>

          <Route exact path="/map/seedscatalogue" >
            <SeedsCatalogue/>
          </Route> 

          <Route exact path="/map/seedsmapportal" >
            <SeedsMapPortal/>
          </Route>

          <Route exact path="/map/seedsprofile" >
            <SeedsFeatures />
          </Route>

          <Route exact path="/map/seedsprofile/overview" >
            
          </Route> */}

{/* SEEDS PROFILE ROUTES

          <Route exact path="/map/seedsprofile/social" >
             <MainWindow /> 
          </Route>

          <Route exact path="/map/seedsprofile/economic" >
            <MainWindow />
          </Route>

          <Route exact path="/map/seedsprofile/environmental" >
            <MainWindow />
          </Route>

          <Route exact path="/map/seedsprofile/demographic" >
            <MainWindow />
          </Route>

{/* SEEDS ANALYTICS ROUTES */}

          {/* <Route exact path="/map/seedsanalytics" >
          </Route> */}



          <Route path="/landing">
            <Landing />
          </Route>

          <Route path="/aboutUs"> 
            <AboutUs/>
          </Route>

          <Route path="/contactUs">
            <ContactUs/>
          </Route>

          <Route path="/features">
            <Products/>
          </Route>
          
          <Route exact path="/seedsTableData" >
            <SeedsTableData/>
          </Route>

          <Route exact path="/" >
            <MainLanding/>
          </Route>
        </Switch>
        
      </Router>
      
    </div>
  );
}

export default AppPage;