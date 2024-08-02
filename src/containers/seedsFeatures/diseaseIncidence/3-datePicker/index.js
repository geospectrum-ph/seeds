import React, {useEffect, useContext, useState} from 'react';
import axios from 'axios';

// import Lightpick from "lightpick";
import { Grid, Paper, Typography, InputLabel }  from '@material-ui/core';

import 'react-date-range/dist/styles.css'; // main style filenpm install --save react-date-range
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


// react nice dates
import { DateRangePicker, START_DATE, END_DATE } from '@bjarkehs/react-nice-dates';
import 'react-nice-dates/build/style.css';
import { enUS } from 'date-fns/locale';
import './index.css';

// import contexts
import { SEEDSContext } from '../../../../context/SEEDSContext'
import { MapContext } from '../../../../context/MapContext'
import { FeaturesContext } from '../../../../context/FeaturesContext'



const useStyles = makeStyles((theme) => ({
  // root: {
  //   '& > *': {
  //     margin: theme.spacing(1),
  //     width: '90%',
  //   },
  // },
  marginTop: {
    marginTop: theme.spacing(2),
    width: '100%',

  },

  calendarSize: {
    calendarWidth: '30ch',
    // calendarHeight:
    rangeColors: '#1b798e',
  },
  textField: {
    margin: theme.spacing(1),
    // minWidth: 300,
    color: "1b798e",
    // minWidth: 210,
    // m
  },
}));

export default function CalendarsDateRangePicker() {
  const classes = useStyles();

  const parseDate = (date) => {
    if (date){
    var splitdate = date.toLocaleString().split(",")[0].split("/")
    // console.log(typeof splitdate,splitdate)
    return (pad(splitdate[2],4).concat(pad(splitdate[0],2)).concat(pad(splitdate[1],2)))}
  };
  
  function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }  

  const handleStartDateChange = (date) => {
  
    
    const fetchData = async() => {
      const res = await axios(`http://localhost:5000/healthmapper/brgy/single`, 
      {params: {brgy_id: healthLoc,
                startdate: parseDate(date),
                enddate: endDate}}); //ito yung gagamitin pag sa web yung server
                

      setHealthSelect(res.data)
      

      const res_graph = await axios(`http://localhost:5000/healthmapper/graph`, 
      {params: {brgy_id: healthLoc}} );
      // console.log(res_graph.data.values);
      setHealthMapperGraph(res_graph.data)
  
      
    }

    // const fetchData = async() => {
    //   const res = await axios(`https://seeds.geospectrum.com.ph/healthmapper/brgy/single`, 
    //   {params: {brgy_id: healthLoc,
    //             startdate: parseDate(date),
    //             enddate: endDate}}); //ito yung gagamitin pag sa web yung server
                

    //   setHealthSelect(res.data)
      

    //   const res_graph = await axios(`https://seeds.geospectrum.com.ph/healthmapper/graph`, 
    //   {params: {brgy_id: healthLoc}} );
    //   // console.log(res_graph.data.values);
    //   setHealthMapperGraph(res_graph.data)
  
      
    // }
    
    

    fetchData();
    setStartDateLocal(date);
    setStartDate(parseDate(date));
  };
  const handleEndDateChange = (date) => {
    
    // typeof date
    // console.log(typeof date)

    const fetchData = async() => {
      const res = await axios.get('http://localhost:5000/healthmapper/brgy/single',
      {params: {brgy_id: healthLoc,
                startdate: startDate,
                enddate: parseDate(date)}}); //ito yung gagamitin pag sa web yung server

      setHealthSelect(res.data)
      // console.log("HEALTH SELECT");
      // console.log(healthSelect)

      const res_graph = await axios.get('http://localhost:5000/healthmapper/graph',
      {params: {brgy_id: healthLoc}} );
      // console.log(res_graph.data);
      setHealthMapperGraph(res_graph.data)
    }

    // const fetchData = async() => {
    //   const res = await axios.get('https://seeds.geospectrum.com.ph/healthmapper/brgy/single',
    //   {params: {brgy_id: healthLoc,
    //             startdate: startDate,
    //             enddate: parseDate(date)}}); //ito yung gagamitin pag sa web yung server

    //   setHealthSelect(res.data)
    //   // console.log("HEALTH SELECT");
    //   // console.log(healthSelect)

    //   const res_graph = await axios.get('https://seeds.geospectrum.com.ph/healthmapper/graph',
    //   {params: {brgy_id: healthLoc}} );
    //   // console.log(res_graph.data);
    //   setHealthMapperGraph(res_graph.data)
    // }
    fetchData();
    setEndDateLocal(date);
    setEndDate(parseDate(date));
    // console.log("date",startDate, endDate)
  
   
  };

  const { healthLoc, setHealthLoc }  = useContext(MapContext);

  const { setHealthSelect, setHealthMapperGraph , healthSelect} = useContext(FeaturesContext);

  const {startDate, setStartDate, endDate, setEndDate} = useContext(SEEDSContext);
  const [startDateLocal, setStartDateLocal] = useState(null);
  const [endDateLocal, setEndDateLocal] = useState(null);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>

    <div>
      <Grid container direction="column" xs={12} 
      // style={{backgroundColor:"#000000"}}
      >
        <Grid item xs={12}  >
        {/* reactnice dates */}
          <DateRangePicker
            startDate={startDateLocal}
            endDate={endDateLocal}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
            minimumLength={1}
            format='dd MMM yyyy'
            locale={enUS}
            calendarSize="small"
          >
            {({ startDateInputProps, endDateInputProps, focus }) => (
              <Grid 
              // className='date-range' 
              container direction ="row"
              // justify="space-around"
              justify="space-between"
              alignItems="center" 
              className={classes.marginTop}
              >
                <TextField variant="outlined" size ="small"
                  className={'input' + (focus === START_DATE ? ' -focused' : '')}
                  {...startDateInputProps}
                  placeholder='Start date'
                  style={{width:'48%'}}
                  label="Start date"
                /> 
                <span className='date-range_arrow' />
                <TextField variant="outlined"  size ="small"
                  className={'input' + (focus === END_DATE ? ' -focused' : '')}
                  {...endDateInputProps}
                  placeholder='End date'
                  style={{width:'48%'}}
                  label="End date"
                />
              </Grid>
            )}
          </DateRangePicker>
        </Grid>
      </Grid>
    </div>
    </MuiPickersUtilsProvider>


  
  );
}

// export default DatePicker;

