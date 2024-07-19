import React, { useState, useEffect }  from 'react';
import { AppBar, Collapse, CssBaseline, Grid, Card, Button, ButtonGroup, makeStyles, Container, TextField, Typography, Paper } from '@material-ui/core';
import { IconButton, Toolbar } from '@material-ui/core'
import { HashRouter as Router, Switch, Route, Link} from "react-router-dom";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { PeopleIcon, AccountBalanceIcon, PublicIcon, MapIcon }  from '@material-ui/icons';
// import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
// import PublicIcon from '@material-ui/icons

//import functions from other folders


const useStyles = makeStyles({
  root: {
    backgroundColor: '#fffefe',
    // backgroundImage: `url(${BG})`,
    width: '100vw',
    minHeight: '75vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '40px',
  },
  title: {
    color: '#000000',
    fontSize:'2rem',
        // fontFamily:'Nunito',
        fontFamily:'LeagueSpartan',
        // fontFamily:'GlacialIndifference',
        // fontFamily:'Montserrat',
        // fontFamily: 'Lora'
  },
  desc: {
    color: '#000000',
    fontSize:'1.rem',
    // fontFamily:'Nunito',
    fontFamily:'LeagueSpartan',
    // fontFamily:'GlacialIndifference',
    // fontFamily:'Montserrat',
    // fontFamily: 'Lora'
    // margin: '40px',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    margin:'10px',
  },
});

export default function Significance() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <br/>
      <Typography className={classes.title}>Significance</Typography>
      
      <div 
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      justify="center"
      >
        <Grid  container  >
          <Grid item xs ={6} > 
          <Paper className={classes.desc} >In this modern age, information plays a significant role in managing workflows and business logic. The use of information technology such as management system and databases allow business operations to run smoothly and provide better amenities to their clients.
            </Paper>  </Grid>
          <Grid item xs ={6}> 
          <Paper className={classes.desc}>SEEDs utilized this technology for the LGUs in order for them to provide better public services to their constituents.
          <br></br><br></br><br></br>
          </Paper>
          
          </Grid>
        </Grid>
        
        {/* <Typography >H1 TO!</Typography>
        <Typography >H2 TO!</Typography> */}
      </div>
      
        
    </div>
  );
}