import React, { useState, useEffect }  from 'react';
import { AppBar, Collapse, CssBaseline, Grid, Card, Button, ButtonGroup, makeStyles, Container, TextField } from '@material-ui/core';
import { IconButton, Toolbar } from '@material-ui/core'
import { Link as Scroll } from 'react-scroll'
import { HashRouter as Router, Switch, Route, Link, useHistory} from "react-router-dom";

//import functions from other folders
// import './index.css';

import EcoIcon from '@material-ui/icons/Eco';

const useStyles = makeStyles((theme) => ({
    appbar: {
      // background: 'none',
      // color: '#122820',
      background: '#404040',
      // fontFamily:'Nunito',
      fontFamily:'LeagueSpartan',
      // fontFamily:'GlacialIndifference',
      // fontFamily:'Montserrat',
      // fontFamily: 'Lora'
      boxShadow: '0 3px 5px 2px rgba(0,0,0,3)',
      //   height: '10%',
    },  
    appbarTitle:{
      flexGrow: '1',
      color: '#fffefe',
      // '&:hover': {
      //   color: '#fffefe',
      //   backgroundColor: '#1b798e',
      //   padding:'3px',
      //   border:"round",
      // }
    },
    colorText: {
      color: "#5aff3d"
      // color: "#0c343d"
      // color: "#229922"
    },
  
  
    icon: {
      // backgroundColor: '#0c343d',
      color: '#fffefe',
      // '&:hover': {
      //   color: '#fffefe',
      //   backgroundColor: '#1b798e'
      // }
    },
  }));

  
export default function Footer(){
    const classes = useStyles();
    const [page, setPage] = React.useState(null);
    const history = useHistory();    
    return(
      <div>
        <Toolbar className={classes.appbar} elevation = {5} >
          <h1 className={classes.appbarTitle} onClick={()=>{history.push('/')}}><span className={classes.colorText}>SEED</span>s <EcoIcon className={classes.icon}/></h1> 
        </Toolbar>         
      </div>
    )    
  }