import React, { useState, useEffect }  from 'react';
import { AppBar, Collapse, CssBaseline, Grid, Card, Button, ButtonGroup, makeStyles, Container, TextField } from '@material-ui/core';
import { IconButton, Toolbar } from '@material-ui/core'
import { Link as Scroll } from 'react-scroll'
import { HashRouter as Router, Switch, Route, Link} from "react-router-dom";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';

import logo from '../../assets/logo.png'


//import functions from other folders
import './index.css';

import BG from '../../assets/satellite-bg.jpg';
import Aerial from '../../assets/Aerial.png';
import SeedsMLP from './seedsMLP';
import Significance from './significance';
import Footer from './Footer';
import AppsBar from './AppBar';


// import fonts from src/fonts folder

// import '../../fonts/Cardo/Cardo-Bold.ttf';
// import '../../fonts/league-spartan/LeagueSpartan-Bold.otf';
// import '../../fonts/libre-baskerville/LibreBaskerville-Bold.otf';

    // fontFamily:'Nunito',
    // fontFamily:'LeagueSpartan',
    // fontFamily:'GlacialIndifference',
    // fontFamily:'Montserrat',
    // fontFamily: 'Lora'

// colorschemes
// #000000
// #0d3c47
// #1b798e
// #29b5d5
// #70cee3
// #b7e6f1
// #fffefe
// #5aff3d
// #b6c4c7
// #ced8da
// #e6ebec
// #229922
const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundImage: `url(${BG})`,
    // backgroundColor: '#0c343d',
    // backgroundRepeat: "no-repeat",
    backgroundSize: 'cover',
    height: '10%',
    // fontFamily:'Montserrat',
  }, 
  body: {
    // backgroundImage: `url(${BG})`,
    backgroundImage: `url(${Aerial})`,

    // opacity: '80%',
    height: '100vh',
    width: '100vw',
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center',
    textAlign: 'center',
    // fontFamily:'Nunito',
    fontFamily:'LeagueSpartan',
    // fontFamily:'GlacialIndifference',
    // fontFamily:'Montserrat',
    // fontFamily: 'Lora'
    
  }, 
  title: {
    color: '#fffefe',
    fontSize:'3rem',
  },
  appbar: {
    // background: 'none',
    // background: '#122820',
    background: '#0d3c47',
    // fontFamily:'Nunito',
    fontFamily:'LeagueSpartan',
    // fontFamily:'GlacialIndifference',
    // fontFamily:'Montserrat',
    // fontFamily: 'Lora'
        // fontFamily:'Montserrat',
    // fontFamily: 'Lora'
    height: '10%',
    
  },  
  appbarTitle:{
    flexGrow: '1',
    // color: '#fffefe',
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#1b798e',
      padding:'3px',
      // border:"round",
    }
  },

  colorText: {
    color: "#5aff3d"
    // color: "#0c343d"
    // color: "#229922"
  },
  
  icon: {
    fontSize: '2.5rem',
    color: "#5aff3d",
  },
  
  buttonStyle1: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%',
    border: 0,
    borderRadius: 1,
    // boxShadow: '0 3px 5px 2px rgba(255,255,255,0.3)',
    // color: '#0c343d',
    color: '#fffefe',
    height: 48,
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
      // padding:'3px',
      }
  },

  login1: {
    border: 0,
    borderRadius: 1,
    backgroundColor: '#1b798e',
    color: '#ffffff',
    height: 48,
    padding: '0 30px',
    fontFamily:'Nunito',
        // fontFamily:'Montserrat',
    // fontFamily: 'Lora'
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922',
      padding:'30 px',
      // border:"round",
    }
  },
}));

export default function MainLanding(){
  const classes = useStyles(); //uses the const useStyles = makeStyles from above!
  const [page, setPage] = React.useState(null); 

  const [checked, setChecked]=useState(false);
  
  useEffect(()=>{
    setChecked(true);
  },[]
  )
  
  return (
  <div className = {classes.root}> 
    <CssBaseline/>
    <AppsBar/>
            <div className={classes.body} id="header">
              <Collapse in ={checked} 
              {...(checked ? { timeout: 1000 } : {})}
              collapsedHeight={50}
              >
                <h1 className={classes.title}>Welcome to <br/>
                <span className={classes.colorText}>SEED</span>s!</h1> 
                <Scroll 
                to='seeds-Img' 
                smooth={true}>
                <IconButton >
                  <ExpandMoreIcon className={classes.icon}/>
                </IconButton>
                </Scroll>
                
              </Collapse>
            </div>

        {/* <SeedsMLP/> */}
        <Significance/>
        <Footer/>

      </div>
  )}
  