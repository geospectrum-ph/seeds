import React, {useContext, useState} from 'react';
import { Grid, TextField }  from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// react nice dates
import { DateRangePicker, START_DATE, END_DATE } from '@bjarkehs/react-nice-dates';
import 'react-nice-dates/build/style.css';
import { enUS } from 'date-fns/locale';

// import contexts
import { SEEDSContext } from '../../../../context/SEEDSContext'

const useStyles = makeStyles((theme) => ({
  marginTop: {
    marginTop: theme.spacing(2),
    width: '100%'
  }, calendarSize: {
    calendarWidth: '30ch',
    rangeColors: '#1b798e'
  }, textField: {
    margin: theme.spacing(1),
    color: "1b798e"
  }
}));

export default function CalendarsDateRangePicker() {
  const classes = useStyles();

  const {setStartDate, setEndDate} = useContext(SEEDSContext);

  const [startDateLocal, setStartDateLocal] = useState(null);
  const [endDateLocal, setEndDateLocal] = useState(null);

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
    setStartDateLocal(date);
    setStartDate(parseDate(date));
  };

  const handleEndDateChange = (date) => {
    setEndDateLocal(date);
    setEndDate(parseDate(date));
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container direction="column" xs={12}>
        <Grid item xs={12}  >
          {/* reactnice dates */}
          <DateRangePicker startDate={startDateLocal} endDate={endDateLocal}
            onStartDateChange={handleStartDateChange} onEndDateChange={handleEndDateChange}
            minimumLength={1} format='dd MMM yyyy' locale={enUS} calendarSize="small">
            {({ startDateInputProps, endDateInputProps, focus }) => (
              <Grid container direction ="row" justifyContent="space-between" alignItems="center" 
                className={classes.marginTop}>
                <TextField variant="outlined" size ="small" placeholder='Start date'
                  className={'input' + (focus === START_DATE ? ' -focused' : '')}
                  {...startDateInputProps}  style={{width:'48%'}} label="Start date"/> 
                <span className='date-range_arrow' />
                <TextField variant="outlined" size ="small" placeholder='End date'
                  className={'input' + (focus === END_DATE ? ' -focused' : '')}
                  {...endDateInputProps} style={{width:'48%'}} label="End date"/>
              </Grid>
            )}
          </DateRangePicker>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}