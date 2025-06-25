import React, { useContext }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Toolbar, Typography } from '@material-ui/core'
import { useHistory } from "react-router-dom";

import logo from '../../../assets/icons/0 Logo (3D Colored).png'

import { SEEDSContext } from '../../../context/SEEDSContext';

const useStyles = makeStyles(() => ({
  appbar: {
    background: "var(--color-black)",
  },
  footerLogo: {
    height: "24px",
  },
  appbarTitle:{
    fontFamily: "'Outfit', sans-serif",
    color: '#fffefe',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    cursor: 'pointer'
  }, colorText: {
    color: "#5aff3d"
  }, link: {
    color: '#0d3c47',
    '&:hover': {
      color: '#fffefe',
      textDecoration: "underline"
    }
  }
}));

export default function Footer(){
  const classes = useStyles();
  const history = useHistory();    
  const {setAppBarValue} = useContext(SEEDSContext);

  const handleHistory = (path) => {
    if (history.location.pathname !== path) {
      history.push(path);
    }
  };

  function Copyright () {
    return (
      <Grid container direction="row" justifyContent="space-around" alignItems="center">
        <Grid item>
          <Typography >
            {'Copyright © '}
            <a href="https://tinyurl.com/seeds-gms/" className={classes.link}>
              Geospectrum.SEEDs
            </a>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Grid>
        <Grid item>
          <Typography style={{color: '#0d3c47'}}>All rights reserved</Typography>
        </Grid>|
        <Grid item>
          <Typography className={classes.link} onClick={()=>{history.push('/termsOfUse'); setAppBarValue('')}}>
            Terms of Use
          </Typography>
        </Grid>|
        <Grid item>
          <Typography className={classes.link} onClick={()=>{history.push('/privacyPolicy'); setAppBarValue('')}}>
            Privacy Policy
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return(
    <Toolbar className={classes.appbar}>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Grid item>
          <h4 className = { classes.appbarTitle } onClick = { () => { handleHistory("/"); }}>
            <img className = { classes.footerLogo } src = { logo }/>
            <span className = { classes.colorText }>
              <span>SEED</span>
              <span>s</span>
            </span> 
          </h4>
        </Grid> 
        <Grid item xs = { 11 } sm = { 11 } md = { 8 } lg = { 5 }>
          <Copyright/>
        </Grid>
      </Grid>
    </Toolbar>    
  )    
}