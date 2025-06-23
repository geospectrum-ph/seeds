import React, { useState } from 'react'
import { enGB } from 'date-fns/locale'
import { DatePicker } from '@bjarkehs/react-nice-dates'
// import 'react-nice-dates/build/style.css'
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  marginTop: {
    marginTop: theme.spacing(2),
    width: '100%',
  }, calendarSize: {
    calendarWidth: '30ch',
    rangeColors: '#1b798e',
  }, textField: {
    marginTop: theme.spacing(1),
    color: "1b798e",
  },
}));

export default function DatePickerExample() {
  const [date, setDate] = useState(new Date())
  const classes = useStyles();
  return (
    <DatePicker  date={date} onDateChange={setDate} locale={enGB}>
      {({ inputProps }) => (
        <TextField variant="outlined" focused fullWidth className={classes.textField} {...inputProps}/>
      )}
    </DatePicker>
  )
}