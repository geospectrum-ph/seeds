import React from 'react';
import { Grid, TextField, makeStyles }  from '@material-ui/core';
import 'react-date-range/dist/styles.css'; // main style filenpm install --save react-date-range
import 'react-date-range/dist/theme/default.css'; // theme css file
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// react nice dates
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';
import { enUS } from 'date-fns/locale';

import './index.css';

// import contexts
import { SEEDSContext } from '../../../../context/SEEDSContext'

const useStyles = makeStyles((theme) => ({
  marginTop: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  calendarSize: {
    calendarWidth: '30ch',
    rangeColors: '#1b798e',
  },
  textField: {
    margin: theme.spacing(1),
    color: "1b798e",
  },
}));

export default function CalendarsDateRangePicker() {
  const classes = useStyles();
  const { setStartDate, setEndDate, startDateLocal, setStartDateLocal, endDateLocal, 
          setEndDateLocal } = React.useContext(SEEDSContext);

  const parseDate = (date) => {
    if (date){
      var splitdate = date.toLocaleString().split(",")[0].split("/")
      return (pad(splitdate[2],4).concat(pad(splitdate[0],2)).concat(pad(splitdate[1],2)))
    }
  };
  
  function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }  

  const handleStartDateChange = (date) => {
    setStartDateLocal(date);
    setStartDate(parseDate(date));
  };

  const handleEndDateChange = (date) => {
    setEndDateLocal(date);
    setEndDate(parseDate(date));
  };

  
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container direction="column">
        <Grid item xs={12}>
          {/* reactnice dates */}
          <DateRangePicker startDate={startDateLocal} endDate={endDateLocal} minimumLength={1}
            onStartDateChange={handleStartDateChange} onEndDateChange={handleEndDateChange}
            format='dd MMM yyyy' locale={enUS} calendarSize="small">
            {({ startDateInputProps, endDateInputProps, focus }) => (
              <Grid container direction ="row" justifyContent="space-between"
                alignItems="center" className={classes.marginTop}>
                <TextField variant="outlined" size ="small" placeholder='Start date' style={{width:'48%'}}
                  className={'input' + (focus === START_DATE ? ' -focused' : '')}
                  {...startDateInputProps} label="Start date"/> 
                <span className='date-range_arrow' />
                <TextField variant="outlined" size ="small" label="End date"
                  className={'input' + (focus === END_DATE ? ' -focused' : '')}
                  {...endDateInputProps} placeholder='End date' style={{width:'48%'}}/>
              </Grid>
            )}
          </DateRangePicker>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}