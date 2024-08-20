import React, {useContext} from 'react';

import { Paper, Grid, Typography, makeStyles } from '@material-ui/core';

import MultipleSelect from "../2-dropDown";
import CalendarsDateRangePicker from "../../diseaseIncidence/3-datePicker"

// import CalendarsDateRangePicker from "../";
import {SEEDSContext} from '../../../../context/SEEDSContext';

const useStyles = makeStyles((theme) => ({
  root: {
    padding:10,
    borderRadius: 0,
    textAlign: 'center',
    '& .MuiCardHeader-root': {
      backgroundColor:"#1b798e",
      width:"100%",
      color:"#1b798e",
      backgroundColor:"#000000",
    }, '& .MuiCardHeader-title': {
      fontSize: '1.2rem',
      fontFamily: "GlacialIndifference"
    }, '& .MuiTypography-h1': {
      fontSize: "3.0rem",
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
    }, '& .MuiTypography-h5': {
      fontSize: "2.0rem",
      color: "#0c343d",
      fontFamily: "LeagueSpartan",
    }, '& .MuiTypography-h6': {
      fontSize: "0.8rem",
      color: "#1b798e",
      fontFamily: "LeagueSpartan",
    },
  }, summary : {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    borderRadius: 0,
  }, active : {
    marginTop: theme.spacing(2),
    color: "#29b5d5",
    padding: theme.spacing(1),
    borderRadius: 0,
  }, recovered : {
    marginTop: theme.spacing(2),
    color: "#5aff3d",
    padding: theme.spacing(1),
    borderRadius: 0,
  }, death : {
    marginTop: theme.spacing(2),
    color: "#8C271E",
    padding: theme.spacing(1),
    borderRadius: 0,
  }, total : {
    marginTop: theme.spacing(2),
    color: "#1b798e",
    padding: theme.spacing(1),
    borderRadius: 0,
  },
}));

export default function SampleCardHazard() {
  const classes = useStyles();
  const { currentSubdomain }  = useContext(SEEDSContext);
 
  return (
    <Grid container direction="column" justifyContent="flex-end" alignItems="center" className={classes.root}> 
      <Grid item xs ={10}>                    
        <MultipleSelect />
        <CalendarsDateRangePicker/>       
      </Grid>

      <Grid item style={{width:'80%' }}>
        <Paper className={classes.summary}>
          {(currentSubdomain == "") ? <Typography></Typography> :
            <Typography variant="h2">This feature is in construction</Typography>}
        </Paper>
      </Grid>
      
      <Grid item style={{width:'80%' }}>
        <Paper className={classes.summary}>

        </Paper>
      </Grid>
      <Grid item style={{width:'80%' }}>
        <Paper className={classes.summary}>

        </Paper>
      </Grid>
      <Grid item style={{width:'80%' }}>
        <Paper className={classes.summary}>

        </Paper>
      </Grid>
    </Grid>
  );
}