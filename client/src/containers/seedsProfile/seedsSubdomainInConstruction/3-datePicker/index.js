import React, {useContext, useState} from 'react';
import axios from 'axios';
import { Grid }  from '@material-ui/core';

import 'react-date-range/dist/styles.css'; // main style filenpm install --save react-date-range
import 'react-date-range/dist/theme/default.css'; // theme css file
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// react nice dates
import { DateRangePicker, START_DATE, END_DATE } from '@bjarkehs/react-nice-dates';
import '@bjarkehs/react-nice-dates/build/style.css';
import { enUS } from 'date-fns/locale';
import './index.css';

// import contexts
import { SEEDSContext } from '../../../../context/SEEDSContext'
import { MapContext } from '../../../../context/MapContext'
import { FeaturesContext } from '../../../../context/FeaturesContext'

const useStyles = makeStyles((theme) => ({
  marginTop: {
    marginTop: theme.spacing(2),
    width: '100%',
  }, calendarSize: {
    calendarWidth: '30ch',
    rangeColors: '#1b798e',
  }, textField: {
    margin: theme.spacing(1),
    color: "1b798e",
  },
}));

export default function CalendarsDateRangePicker() {
  const classes = useStyles();
  const parseDate = (date) => {
    if (date){
    var splitdate = date.toLocaleString().split(",")[0].split("/")
    return (pad(splitdate[2],4).concat(pad(splitdate[0],2)).concat(pad(splitdate[1],2)))}
  };
  
  function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }  
  
  const handleStartDateChange = (date) => {
    const fetchData = async() => {
      const res = await axios(`https://seeds.geospectrum.com.ph/healthmapper/brgy/single`, {
      // const res = await axios(`http://localhost:5000/healthmapper/brgy/single`, {
        params: {
          brgy_id: profileLoc,
          startdate: parseDate(date),
          enddate: endDate
        }
      }); //ito yung gagamitin pag sa web yung server

      setHealthSelect(res.data)

      const res_graph = await axios(`https://seeds.geospectrum.com.ph/healthmapper/graph`, {params: {brgy_id: profileLoc}} );
      // const res_graph = await axios(`http://localhost:5000/healthmapper/graph`, {params: {brgy_id: profileLoc}} );
      setDiseaseMapperGraph(res_graph.data)
    }
    fetchData();
    setStartDateLocal(date);
    setStartDate(parseDate(date));
  };
  const handleEndDateChange = () => {

  };

  const { profileLoc }  = useContext(MapContext);

  const { setHealthSelect, setDiseaseMapperGraph } = useContext(FeaturesContext);

  // react nice dates
  const {setStartDate, endDate} = useContext(SEEDSContext);
  const [startDateLocal, setStartDateLocal] = useState(null);
  const [endDateLocal, setEndDateLocal] = useState(null);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container direction="column" xs={12}>
        <Grid item xs={12}  >
          {/* reactnice dates */}
          <DateRangePicker startDate={startDateLocal} endDate={endDateLocal}
            onStartDateChange={handleStartDateChange} onEndDateChange={handleEndDateChange}
            minimumLength={1} format='dd MMM yyyy' locale={enUS} calendarSize="small">
            {({ startDateInputProps, endDateInputProps, focus }) => (
              <Grid container direction="row" justifyContent="space-between"
                alignItems="center" className={classes.marginTop}>
                <TextField variant="outlined" size ="small" placeholder='Start date'
                  className={'input' + (focus === START_DATE ? ' -focused' : '')}
                  {...startDateInputProps} style={{width:'48%'}} label="Start date"/> 
                <span className='date-range_arrow'/>
                <TextField variant="outlined" size ="small" placeholder='End date'
                  className={'input' + (focus === END_DATE ? ' -focused' : '')}
                  {...endDateInputProps} style={{width:'48%'}} label="End date"
                />
              </Grid>
            )}
          </DateRangePicker>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}