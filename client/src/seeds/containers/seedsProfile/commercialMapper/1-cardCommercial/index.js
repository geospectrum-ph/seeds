import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box, Paper } from '@material-ui/core/'

import MultipleSelect from "../2-dropDown"; 
import CalendarsDateRangePicker from "../3-datePicker";

import { FeaturesContext } from '../../../../context/FeaturesContext';

const useStyles = makeStyles((theme) => ({
  summary : {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    borderRadius: 5,
    textJustify:"center"
  }
}));

export default function SampleCardPop() {
  const classes = useStyles();

  const { commercialSelect, commercialClassSelect }  = useContext(FeaturesContext);

  const [capitalizationTotal, setCT] = useState();
  const [employeesTotal, setET] = useState();
  const [institutionCount, setIC] = useState();

  useEffect(() => {
    if (commercialSelect && commercialClassSelect){
      setCT(commercialSelect? (commercialSelect.properties
        .filter(obj => {return obj.class === commercialClassSelect})[0]['capitalization_total']):0)
      setET(commercialSelect? (commercialSelect.properties
        .filter(obj => {return obj.class === commercialClassSelect})[0]['employees_total']):0)
      setIC(commercialSelect? (commercialSelect.properties
        .filter(obj => {return obj.class === commercialClassSelect})[0]['institution_count']):0)
    };
  }, [commercialSelect, commercialClassSelect])

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" style={{padding:20}}>
      <Grid item xs={12}>
        <MultipleSelect/>
      </Grid>
      <Grid item xs={12}>
        <CalendarsDateRangePicker/>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.summary}>
          <Typography variant="h5" style={{fontFamily:"'Outfit', sans-serif", fontWeight:700}}>
            {commercialSelect ? capitalizationTotal: <div>N/A</div>}
          </Typography>
          <Typography>Capitalization</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.summary}>
          <Typography variant="h5" style={{fontFamily:"'Outfit', sans-serif", fontWeight:700}}>
            {commercialSelect ? employeesTotal: <div>N/A</div>}
          </Typography>
          <Typography>Employee Count</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.summary}>
          <Typography variant="h5" style={{fontFamily:"'Outfit', sans-serif", fontWeight:700}}>
            {commercialSelect ? institutionCount: <div>N/A</div>}
          </Typography>
          <Typography>Institution Count</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}