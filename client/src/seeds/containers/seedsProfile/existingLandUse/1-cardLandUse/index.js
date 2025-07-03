import React, {useContext} from 'react';
import { Paper } from '@material-ui/core';
import { Grid, Typography, makeStyles } from '@material-ui/core/'

import MultipleSelect from "../2-dropDown";

import {FeaturesContext} from '../../../../context/FeaturesContext';

const useStyles = makeStyles((theme) => ({
  root: {
    padding:10,
    borderRadius: 0,
    textAlign: 'center',
    '& .MuiCardHeader-root': {
      backgroundColor:"#1b798e",
      width:"100%",
      color:"#1b798e",
      backgroundColor:"#000000"
    }, '& .MuiCardHeader-title': {
      fontSize: '1.2rem',
      fontFamily: "GlacialIndifference"
    }, '& .MuiTypography-h1': {
      fontSize: "3.0rem",
      color: "#0c343d",
      fontFamily: "'Outfit', sans-serif"
    }, '& .MuiTypography-h2': {
      fontFamily: "Nunito",
      fontSize: "1rem",
      color: "#0c343d"
    }, '& .MuiTypography-h3': {
      fontFamily: "GlacialIndifference",
      fontSize: "0.9rem",
      color: '#0c343d',
      '&:hover': {
        color: '#0c343d'
      }
    }, '& .MuiTypography-h4': {
      fontSize: "0.9rem",
      color: '#0d3c47',
      backgroundColor: "#ffffff",
      border: "2px solid #1b798e",
      cursor: 'pointer',
      padding: '5px'
    }, '& .MuiTypography-h5': {
      fontSize: "2.0rem",
      color: "#0c343d",
      fontFamily: "'Outfit', sans-serif"
    }, '& .MuiTypography-h6': {
      fontSize: "0.8rem",
      color: "#1b798e",
      fontFamily: "'Outfit', sans-serif"
    }
  }, summary : {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    borderRadius: 0,
  },
}));

export default function CardLandUse() {
  const classes = useStyles();

  const { landUseCategory }  = useContext(FeaturesContext);

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" style={{padding:20}}> 
      <Grid item xs={12}>
        <MultipleSelect />
      </Grid>
      <Grid item xs={12}>
        {landUseCategory ?
          <Paper className={classes.summary}>
            <Typography variant="h5" style={{fontFamily:"'Outfit', sans-serif", fontWeight:700}}>
              {Math.round(landUseCategory.area/100)/100}
            </Typography>
            <Typography> {landUseCategory.name}</Typography>
            <Typography> Area (in hectares) </Typography>
          </Paper>
        : <Paper className={classes.summary}>
            <Typography variant="h5" style={{fontFamily:"'Outfit', sans-serif", fontWeight:700}}>
              N/A
            </Typography>
            <Typography> Selected Land Use</Typography>
            <Typography> Area (in hectares) </Typography>
          </Paper>
        }{landUseCategory?
          <Paper className={classes.summary}>
            <Typography variant="h5" style={{fontFamily:"'Outfit', sans-serif", fontWeight:700}}>
              {landUseCategory.percent}
            </Typography>
            <Typography> {landUseCategory.name}</Typography>
            <Typography> Percent covered in barangay (%) </Typography>
          </Paper>
        : <Paper className={classes.summary}>
            <Typography variant="h5" style={{fontFamily:"'Outfit', sans-serif", fontWeight:700}}>N/A</Typography>
            <Typography> Selected Land Use</Typography>
            <Typography> Percent covered in barangay (%) </Typography>
          </Paper>}
      </Grid>
    </Grid>
  );
}