import React, { useContext }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Toolbar, Typography } from '@material-ui/core'
import { useHistory } from "react-router-dom";

import logo2 from '../../../assets/icons/0 Logo (3D Colored).png'

import { SEEDSContext } from '../../../context/SEEDSContext';

const useStyles = makeStyles(() => ({
  appbar: {
    background:  'rgba(122,136,155,1)'
  }, appbarTitle:{
    fontFamily: 'LeagueSpartan',
    color: '#fffefe',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end'
  }, colorText: {
    color: "#5aff3d"
  }, link: {
    color: '#0d3c47',
    '&:hover': {
      color: '#fffefe',
      padding:'0.5px',
      textDecoration: "underline"
    }
  }
}));

export default function Footer(){
  const classes = useStyles();
  const history = useHistory();    
  const {setAppBarValue} = useContext(SEEDSContext);

  function Copyright() {
    return (
      <Grid container direction="row" justifyContent="space-around" alignItems="center" style={{height:"100%"}}>
        <Grid item>
          <Typography >
            <a href="https://tinyurl.com/seeds-gms/" className={classes.link} target = "_blank">
              SEEDs
            </a>{' © '}
            {new Date().getFullYear()}
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
    <Toolbar className={classes.appbar} elevation = {5}>
      <Grid container direction="row" justifyContent="center" alignItems="center" style={{paddingBottom:10}}>
        <Grid item style={{paddingRight:20}} >
          <h1 className={classes.appbarTitle} style={{cursor: 'pointer'}} onClick={()=>{history.push('/')}}>
            <img src={logo2} style={{height:55, marginTop: 0}} onClick={()=>{history.push('/')}}/>
            <span className={classes.colorText}>SEED</span>s 
          </h1>
        </Grid> 
        <Grid item xs={11} sm={11} md={8} lg={5} >
          <Copyright/>
        </Grid>
      </Grid>
    </Toolbar>    
  )    
}