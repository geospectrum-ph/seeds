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
    color: '#fffefe',
    fontSize:'4rem'
  }, colorText: {
    color: "#5aff3d"
  }, icon: {
    fontSize: '2.5rem',
    color: "#5aff3d"
  }, container: {
    
                            background: `linear-gradient(rgba(0, 0, 0, 0.00), rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75)), url(${ BG }) no-repeat center center`,
                            backgroundSize: "cover",
    height: "100%",
    backgroundRepeat: 'no-repeat',
    fontFamily:"'Outfit', sans-serif"
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
          <Grid container >
            <Grid item xs = { 12 } md = { 10 } lg = { 7 } container direction = "column" justifyContent="flex-end" 
              alignItems="flex-start" style={{paddingLeft:"10vw", paddingBottom:"2vh"}}>
              <Collapse in ={checked} {...(checked ? { timeout: 1000 } : {})} collapsedSize={250}>
                <h1 className={classes.title}>Welcome to 
                  <div><span className={classes.colorText}>SEED</span>s!</div>
                </h1> 
              </Collapse>
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