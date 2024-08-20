import React, {useContext}  from 'react';
import { Paper, Grid, Card, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { SEEDSContext } from '../../../context/SEEDSContext'


const useStyles = makeStyles((theme) => ({
  root1: {
    justify:"center",
    formControlLabel: {
      fontSize: '0.5em',
      height: '0.5em',
      lineHeight: '0.5em',
    }, marginTop: {
      marginTop: theme.spacing(2),
    }, marginTop2: {
      marginTop: theme.spacing(5),
    }, borderRadius: 0,
  }, root1: {
    justify:"center",
    formControlLabel: {
    fontSize: '0.5em',
    height: '0.5em',
    lineHeight: '0.5em',
  }, marginTop: {
    marginTop: theme.spacing(2),
  }, marginTop2: {
    marginTop: theme.spacing(5),
  }, borderRadius: 0,
    '& .MuiCardHeader-root': {
      color:"#1b798e",
      backgroundColor:"#fffefe",
      textAlign: "left",
      justifyContent: "left",
      alignItems:"left",
      alignContent:"left",
      justify:"left",
    }, '& .MuiCardHeader-title': {
      fontSize: '1.2rem',
      textAlign: "center",
      fontFamily: "GlacialIndifference",
    }, '& .MuiTypography-h1': {
      fontSize: "1.5rem",
      color: "#0c343d",
      fontFamily: "LeagueSpartan",
    }, '& .MuiTypography-h2': {
      fontFamily: "Nunito",
      fontSize: "1rem",
      color: "#0c343d",
    }, '& .MuiTypography-h3': {
      fontFamily: "GlacialIndifference",
      fontSize: "0.9rem",
      color: '#0c343d',
      '&:hover': {
        color: '#0c343d',
      }
    }, '& .MuiTypography-h4': {
      fontSize: "0.9rem",
      color: '#0d3c47',
      backgroundColor: "#ffffff",
      border: "2px solid #1b798e",
      cursor: 'pointer',
      padding: '5px',
    },
  },
}));


export default function SubdomainInConstruction() {
  const classes = useStyles();
  const { currentDomain, currentSubdomain }  = useContext(SEEDSContext);
  
  return (
    <Grid container direction="column" spacing={2} className={classes.root1}>
      <br></br>
      ON-GOING CONSTRUCTION
      <Grid item container xs={12} spacing={2}>
        <Grid item xs={12} md={8} lg={8}>
          <Paper elevation={3} style={{
              backgroundColor:"#FFFEFE", 
              borderRadius:0, 
              height: '70vh', 
              width:"100%", 
              borderRadius:0
            }}>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper elevation={3} style={{width:"100%", borderRadius:0, height:"70vh", overflow:"hidden"}}>
            <Card style={{backgroundColor:"#FFFEFE", color:"#1b798e", borderRadius:0, }}>
              <CardHeader title={currentSubdomain} subheader={currentDomain}
                titleTypographyProps={{style: {textAlign: "left", fontSize:"1.5rem", wordWrap:"break-word"}}}>
              </CardHeader>
            </Card>
          </Paper>
        </Grid>
      </Grid>

      <Grid item container xs={12} spacing={2}>
        <Grid item xs={12} md={12} lg={8} container>
          <Paper elevation={3} style={{height: 420, borderRadius:0, width:"100%", textAlign:"center", overflow:"hidden"}}>
            <br/><br/>
            <Grid style={{padding:30}} container direction="row" spacing={2}>
            </Grid>
          </Paper >
        </Grid>
        <Grid item xs={12} md={12} lg={4} >
          <Paper elevation={3} style={{height: 420, borderRadius:0, width:"100%", overflow:"hidden"}}>
            <br/>
              <Grid style={{padding:50}} container direction="row" spacing={2}
                justifyContent="center" alignItems="center">
              </Grid>
          </Paper> 
        </Grid>
      </Grid>

      <Grid item container xs={12} spacing={2}>
        <Grid item container>
          <Paper elevation={3} style={{height: '100%', borderRadius:0, width:"100%"}}>
            <div style={{ height: '70vh', width: '100%' }}>
            </div>
          </Paper>     
        </Grid>
      </Grid>
    </Grid>
  );
}