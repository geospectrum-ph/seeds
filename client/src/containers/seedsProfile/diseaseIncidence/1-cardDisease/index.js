import React, {useContext} from 'react';
import { Grid, Typography, makeStyles, Paper, Box} from '@material-ui/core/'

import MultipleSelect from "../2-dropDown";
import CalendarsDateRangePicker from "../3-datePicker";

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
  }, summary : {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    borderRadius: 0
  }
}));

export default function CardDisease() {
  const classes = useStyles();
  const { diseaseSelect }  = useContext(FeaturesContext);

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" style={{padding:20}}> 
      <Grid item xs={12}>                    
        <MultipleSelect />
      </Grid>       
      <Grid item xs={12}>                    
        <CalendarsDateRangePicker/>       
      </Grid> 
      <Grid item xs={12}>
        <Paper className={classes.summary}>
          <Typography variant="h5" style={{fontFamily:"LeagueSpartan", fontWeight:700}}>
            {diseaseSelect ? diseaseSelect.properties.active: <>N/A</>}
          </Typography>
          <Typography>Active</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.summary}>
          <Typography variant="h5" style={{fontFamily:"LeagueSpartan", fontWeight:700}}>
            {diseaseSelect ? diseaseSelect.properties.recovered: <>N/A</>}
          </Typography>
          <Typography>Recovered</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.summary}>
          <Typography variant="h5" style={{fontFamily:"LeagueSpartan", fontWeight:700}}>
            {diseaseSelect ? diseaseSelect.properties.death: <>N/A</>}
          </Typography>
          <Typography>Death</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.summary}>
          <Typography variant="h5" style={{fontFamily:"LeagueSpartan", fontWeight:700}}>
            {(diseaseSelect && diseaseSelect.properties.active !== "N/A") ? 
              diseaseSelect.properties.active + diseaseSelect.properties.recovered + diseaseSelect.properties.death
            : <>N/A</>}
          </Typography>
          <Typography>Total</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}