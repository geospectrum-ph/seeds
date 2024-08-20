import React, { useState, useEffect }  from 'react';
import { AppBar, Collapse, CssBaseline, Grid, Card, Button, ButtonGroup, makeStyles, Container, TextField } from '@material-ui/core';
import { IconButton, Toolbar } from '@material-ui/core'
import { Link as Scroll } from 'react-scroll'
import { HashRouter as Router, Switch, Route, Link, useHistory} from "react-router-dom";

import logo2 from '../../../assets/logo2.png'

const useStyles = makeStyles((theme) => ({
    appbar: {
      background: '#0d3c47',
      fontFamily:'LeagueSpartan',
    },
    appbarTitle:{
      color: '#fffefe',
      '&:hover': {
        padding:'0.5px',
      }
    },
    ff: {
      marginLeft: '20px',
      marginRight: '750px',
    },
    colorText: {
      color: "#5aff3d",
      // color: "#0c343d"
      // color: "#229922"
    },
    buttonStyle1: {
      // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%',
      border: 0,
      borderRadius: 0,
      color: '#fffefe',
      height: '9vh',
      width: '100vw',
      fontSize: '1rem',
      padding: '0 30px',
      // fontFamily:'Nunito',
      fontFamily:'LeagueSpartan',
      // fontFamily:'GlacialIndifference',
      // fontFamily:'Montserrat',
      // fontFamily: 'Lora'
      '&:hover': {
        color: '#fffefe',
        backgroundColor: '#1b798e',
        // padding:'30px',
        }
    },
    login1: {
      border: 0,
      borderRadius: 0,
      backgroundColor: '#1b798e',
      color: '#ffffff',
      fontSize: '1rem',
      height: '9vh',
      width: '100vw',
      padding: '0 30px',
      // fontFamily:'Nunito',
      fontFamily:'LeagueSpartan',
      // fontFamily:'GlacialIndifference',
      // fontFamily:'Montserrat',
      // fontFamily: 'Lora'
      '&:hover': {
        color: '#fffefe',
        backgroundColor: '#229922',
        // padding:'30 px',
        // border:"round",
      }
    },
  }));


export default function AppsBar(){
    const classes = useStyles();
    const [page, setPage] = React.useState(null);
    const history = useHistory();
    return(
      <div>
          <AppBar className={classes.appbar} elevation = {5} >  
            <Toolbar>
              <h1 className={classes.appbarTitle} onClick={()=>{history.push('/')}}>
                <span className={classes.colorText}>SEED</span>s
              </h1> 
              <img src={logo2} style={{height:40}} onClick={()=>{history.push('/')}} className={classes.ff}/>
              <Button className = {classes.buttonStyle1} onClick={()=>{history.push('/aboutUs')}}>About Us</Button>
              <Button className = {classes.buttonStyle1} onClick={()=>{history.push('/features')}}>Features</Button>
              <Button className = {classes.buttonStyle1} onClick={()=>{history.push('/contactUs')}}>Contact Us</Button>
              <Button className = {classes.login1} onClick={()=>{history.push('/landing')}}>Login</Button>      
            </Toolbar>
          </AppBar>
      </div>
    )
  }