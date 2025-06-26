import React, { useState, useEffect, useContext }  from 'react';
import { Route } from "react-router-dom";
import { makeStyles, Grid, Collapse } from '@material-ui/core';
import axios from 'axios';

//import functions from other folders
import './index.css';

import MLP from '../../assets/MLP.JPG';
// import BG from '../../assets/BG_SG_new2.jpg';
import BG from '../../assets/BG_new_PH2.jpg';
import Footer from './footer';
import AppsBar from './appBar'
import AboutUs from './appBar/aboutUs'
import ContactUs from './appBar/contactUs'
import Products from './appBar/features'
import Login from './appBar/login/index'
import PrivacyPolicy from './footer/privacyPolicy'
import TermsOfUse from './footer/termsOfUse';
import Scroll from '../scroll';
import ForgotPassword from './forgotPassword'
import ResetPassword from './resetPassword'

import { AdminContext } from '../../context/AdminContext'

const useStyles = makeStyles(() => ({
  title: {
    color: 'var(--color-black)',
    fontSize:'4rem'
  }, colorText: {
    color: "var(--color-green-dark)",
  }, icon: {
    fontSize: '2.5rem',
    color: "#5aff3d"
  }, container: {
    
                            // background: `linear-gradient(rgba(255, 255, 255, 1.00), rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.00)), url(${ BG }) no-repeat center center`,
                            //                             // background: `url(${ BG }) no-repeat center center`,
                            // backgroundSize: "cover",
                            background: "var(--color-gray-light)",
    height: "100%",
    backgroundRepeat: 'no-repeat',
    fontFamily:"'Outfit', sans-serif"
  },
  mainPhoto: {
    display: "flex",
    flex: "1 1 0",

    width: "100%",

    background: `linear-gradient(rgba(255, 255, 255, 1.00), rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.00)), url(${ BG }) no-repeat center center`,
    backgroundSize: "cover",
  },
  mainLanding: {
    height: "auto",

    boxSizing: "border-box",
    padding: "48px",
    gap: "12px",

    background: "var(--color-red-dark)",

    "&> :nth-of-type(1)": {
      font: "800 72px/1 'Outfit', sans-serif",
      color: "var(--color-white)",
    },

    "&> :nth-of-type(2)": {
      font: "800 72px/1 'Outfit', sans-serif",
      color: "var(--color-white)",

      "&> :nth-of-type(1)": {
        color: "var(--color-green-dark)",
      },
    },
  }
}));

export default function MainLanding(){
  const classes = useStyles(); //uses the const useStyles = makeStyles from above!
  const [checked, setChecked]=useState(false);
  const {setGroupPrivilege} = useContext(AdminContext)
  
  useEffect(()=>{
    setChecked(true);
    const fetchData = async () => {
      const userGroupPrivileges = await axios.get("https://seeds.geospectrum.com.ph/groupprivilege");
      setGroupPrivilege(userGroupPrivileges.data);
    }
    fetchData()
  },[])

  return (
    <Grid id = "main-landing" className = { classes.container } container direction = "column">
      <Grid item>
        <AppsBar/>
      </Grid>
      <Grid item>
        <Route exact path = "/">
          <Grid container direction = "column" justifyContent = "flex-start" alignItems = "center">
            <Grid item className = { classes.mainPhoto }/>
            <Grid item className = { classes.mainLanding } container direction = "row" justifyContent = "center"  alignItems = "center">
              <span>{ "Welcome to" }</span>
              <span>
                <span>SEED</span>
                <span>s!</span>
              </span>
            </Grid>
          </Grid>
        </Route>
          
        <Route path="/login">
          <Login />
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

        <Route path="/privacyPolicy">
          <PrivacyPolicy/>
        </Route>

        <Route path="/termsOfUse">
          <TermsOfUse/>
        </Route>

        <Route path="/forgotPassword">
          <ForgotPassword/>
        </Route>
        
        <Route path="/resetPassword/:id/:token" component={ResetPassword}/> 

        <Footer/>
      </Grid>
    </Grid> 
  )
}