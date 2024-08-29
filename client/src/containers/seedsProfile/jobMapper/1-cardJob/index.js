import React, {useContext, useEffect} from 'react';
import { red } from '@material-ui/core/colors';
import { Paper, Grid, Typography, makeStyles } from '@material-ui/core';

import {FeaturesContext} from '../../../../context/FeaturesContext';

import MultipleSelectJob from '../2-dropDown';
import CalendarsDateRangePickerJob from '../3-datePicker';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 0,
    padding:10,
    maxWidth:"100%",
    justify: "center",
    textAlign: 'center',
    '& .MuiCardHeader-root': {
      color:"#1b798e"
    }, '& .MuiCardHeader-title': {
      fontSize: '1.2rem',
      fontFamily: "GlacialIndifference"
    }, '& .MuiTypography-h1': {
      fontSize: "1.5rem",
      color: "#0c343d",
      fontFamily: "LeagueSpartan"
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
      fontFamily: "LeagueSpartan"
    }, '& .MuiTypography-h6': {
      fontSize: "0.8rem",
      color: "#1b798e",
      fontFamily: "LeagueSpartan"
    }
  }, backButton: {
    color: '#0d3c47',
    backgroundColor: "#ffffff",
    border: "2px solid #1b798e",
    cursor: 'pointer'
  }, fabButton: {
    border: 4,
    borderRadius: 0,
    borderColor: '#0c343d',
    color: '#0c343d',
    height: 30,
    fontSize: '1rem',
    opacity: '2',
    '&:hover': {
      color: '#0c343d',
      backgroundColor: '#5aff3d'
    }
  }, cardheader: {
    maxWidth: '80%',
    backgroundColor:"#1b798e",
    color:"#fffefe"
  }, media: {
    height: 0
  }, expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  }, expandOpen: {
    transform: 'rotate(180deg)'
  }, expandedWindow: {
    height: '65.5vh'
  }, avatar: {
    backgroundColor: red[500]
  }, summary : {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1), 
    borderRadius: 0
  }, papermap: {
    justify: "center",
    textAlign: 'center'
  }
}));

export default function CardJob() {
  const classes = useStyles();

  const { jobSelect }  = useContext(FeaturesContext);

  var underemployed
  var unemployed
  var employed

  useEffect(()=>{
    if (jobSelect) {
      underemployed = jobSelect ? (
        jobSelect['properties'].filter(obj => {
          return obj.job_class === "Underemployed"
        })[0] ? jobSelect['properties'].filter(obj => {
          return obj.job_class === "Underemployed"})
        [0]['total'] : 0
      ) : 0
      unemployed = jobSelect ? (
        jobSelect['properties'].filter(obj => {
          return obj.job_class === "Unemployed"
        })[0] ? jobSelect['properties'].filter(obj => {
          return obj.job_class === "Unemployed"
        })[0]['total'] : 0
      ) :0
      employed = jobSelect ? (
        jobSelect['properties'].reduce(function(a, b){
          return a + b['total'];
        }, 0))-(underemployed+unemployed) :0
    }
  },[jobSelect])

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" style={{padding:20}}>
      <Grid item xs={12}>
        <MultipleSelectJob />
      </Grid>
      <Grid item xs={12}>
        <CalendarsDateRangePickerJob/>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.summary}>
          <Typography variant="h5" style={{ fontFamily:"LeagueSpartan", fontWeight:700}}>
            {jobSelect ? employed: <div>N/A</div>}
          </Typography>
          <Typography >Employed</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.summary}>
          <Typography variant="h5" style={{ fontFamily:"LeagueSpartan", fontWeight:700}}>
            {jobSelect ? underemployed: <div>N/A</div>}
          </Typography>
          <Typography>Underemployed</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.summary}>
          <Typography variant="h5" style={{ fontFamily:"LeagueSpartan", fontWeight:700}}>
            {jobSelect ? unemployed: <div>N/A</div>}
          </Typography>
          <Typography>Unemployed</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}