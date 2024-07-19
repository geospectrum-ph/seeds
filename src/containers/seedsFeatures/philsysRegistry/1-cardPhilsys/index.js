import React, {useContext} from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

import { AppBar, Button, ButtonGroup, Toolbar, Paper } from '@material-ui/core';
import { Divider, TextField, InputAdornment, Tabs, Tab, ThemeProvider, Tooltip } from '@material-ui/core/';
import { Grid, Typography, makeStyles, Fab, withStyles, Menu, MenuItem, Box} from '@material-ui/core/'
import { List, ListItem, ListItemText, } from '@material-ui/core/'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import MultipleSelect from "../2-dropDown";
import CalendarsDateRangePicker from "../3-datePicker";
// import CalendarsDateRangePicker from "../";
import {FeaturesContext} from '../../../../context/FeaturesContext';
// import GeneralDatePicker from '../../components/datepicker'

const useStyles = makeStyles((theme) => ({
root: {
  borderRadius: 0,
  textAlign: 'center',
  '& .MuiCardHeader-root': {
    backgroundColor:"#1b798e",
    width:"100%",
    color:"#1b798e",
    backgroundColor:"#000000",
  },
  '& .MuiCardHeader-title': {
    fontSize: '1.2rem',
    // color:"#fffefe",
    fontFamily: "GlacialIndifference",

  },
 
  '& .MuiTypography-h1': {
    // backgroundColor: "#000000",
    fontSize: "3.0rem",
    color: "#0c343d",
    fontFamily: "LeagueSpartan",
    // padding: '3px',
  },
  '& .MuiTypography-h2': {
    // backgroundColor: "#000000",
    fontFamily: "Nunito",
    fontSize: "1rem",
    color: "#0c343d",
    
  },
  '& .MuiTypography-h3': {
    // backgroundColor: "#000000",
    fontFamily: "GlacialIndifference",
    fontSize: "0.9rem",
    // color: "#fffefe",
    color: '#0c343d',
    '&:hover': {
      color: '#0c343d',
      // backgroundColor: '#5aff3d',
      }
  },
  '& .MuiTypography-h4': {
    // width: '145px',
    // height: '50px',
    fontSize: "0.9rem",
    color: '#0d3c47',
    backgroundColor: "#ffffff",
    border: "2px solid #1b798e",
    cursor: 'pointer',
    padding: '5px',
  },
  '& .MuiTypography-h5': {
    // backgroundColor: "#000000",
    fontSize: "2.0rem",
    color: "#0c343d",
    // color: "#fffefe",

    fontFamily: "LeagueSpartan",
    // padding: '3px',
  },
  '& .MuiTypography-h6': {
    // backgroundColor: "#000000",
    fontSize: "0.8rem",
    color: "#1b798e",
    fontFamily: "LeagueSpartan",
    // padding: '3px',
  },
},
summary : {
  // padding: 
  marginTop: theme.spacing(2),
  // color: "#29b5d5",
  padding: theme.spacing(1),
  borderRadius: 0,
},
  active : {
    // padding: 
    marginTop: theme.spacing(2),
    color: "#29b5d5",
    padding: theme.spacing(1),
    borderRadius: 0,
  },
  recovered : {
    // padding: 
    marginTop: theme.spacing(2),
    color: "#5aff3d",
    padding: theme.spacing(1),
    borderRadius: 0,
  },
  death : {
    // padding: 
    marginTop: theme.spacing(2),
    color: "#8C271E",
    padding: theme.spacing(1),
    borderRadius: 0,
  },
  total : {
    // padding: 
    marginTop: theme.spacing(2),
    color: "#1b798e",
    padding: theme.spacing(1),
    borderRadius: 0,
  },
}));

export default function CardPhilsys() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { commercialSelect }  = useContext(FeaturesContext);
  // console.log("commercialSelect in samplecard",commercialSelect)a

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);


  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [alignment, setAlignment] = React.useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <Grid container 
    // xs={11}
    direction="column"
    justify="flex-end"
    alignItems="center"
    className={classes.root} 
    > 
      {/* <Grid item 
      xs ={10}
      >                    
        <MultipleSelect />
      </Grid>   */}
      <Grid item style={{width:'80%', height:'10vh'}}>
        <MultipleSelect />
      </Grid>

      {/* <Grid item style={{width:'80%', height:'10vh'}}>
        <Paper className={classes.summary}>
          <Typography variant="h5">{commercialSelect ? commercialSelect.properties.institution_count: <div>N/A</div>}</Typography>
          <Typography >Institution Count</Typography>
        </Paper>
      </Grid>
      <Grid item style={{width:'80%', height:'10vh'}}>
        <Paper className={classes.summary}>
          <Typography variant="h5">{commercialSelect ? commercialSelect.properties.employees_total: <div>N/A</div>}</Typography>
          <Typography  >Employee Count</Typography>
        </Paper>
      </Grid>
      <Grid item style={{width:'80%', height:'10vh'}}>
      <Paper className={classes.summary}>
          <Typography variant="h5">{commercialSelect ? commercialSelect.properties.capitalization_total: <div>N/A</div>}</Typography>
          <Typography> <Box >Capitalization</Box> </Typography>
        </Paper>
      </Grid> */}
    </Grid>
  );
}