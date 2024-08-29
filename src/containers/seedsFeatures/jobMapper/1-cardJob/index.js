import React, {useContext} from 'react';
import { red } from '@material-ui/core/colors';
import { AppBar, Button, ButtonGroup, Toolbar, Paper } from '@material-ui/core';
import { Grid, Typography, makeStyles, Fab, withStyles, Menu, MenuItem} from '@material-ui/core/'
import {FeaturesContext} from '../../../../context/FeaturesContext';
import MultipleSelectJob from '../2-dropDown';
import CalendarsDateRangePickerJob from '../3-datePicker';
// import GeneralDatePicker from '../../components/datepicker'


const useStyles = makeStyles((theme) => ({
root: {
  borderRadius: 0,
  maxWidth:"100%",
  justify: "center",
  textAlign: 'center',
  '& .MuiCardHeader-root': {
    color:"#1b798e",
  },
  '& .MuiCardHeader-title': {
    fontSize: '1.2rem',
    // color:"#fffefe",
    fontFamily: "GlacialIndifference",

  },
  // '& .MuiTypography-root': {
  //   color: "#000000"
  // },
  '& .MuiTypography-h1': {
    // backgroundColor: "#000000",
    fontSize: "1.5rem",
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

// backButton: 
backButton: {
  // width: '145px',
  // height: '50px',
  color: '#0d3c47',
  backgroundColor: "#ffffff",
  border: "2px solid #1b798e",
  cursor: 'pointer'
  
},
fabButton: {
  // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 4,
  borderRadius: 0,
  borderColor: '#0c343d',
  color: '#0c343d',
  // backgroundColor: '#0c343d',
  height: 30,
  fontSize: '1rem',
  opacity: '2',
  '&:hover': {
    color: '#0c343d',
    backgroundColor: '#5aff3d',
    }
},


  cardheader: {
    maxWidth: '80%',
    backgroundColor:"#1b798e",
    // backgroundColor:"#29b5d5",
    // fontSize: "10px",

    // display: "flex",
    // flexDirection:"row"
    color:"#fffefe",
    // textColor: "#fffefe",
  },
  media: {
    height: 0,
    // paddingTop: '56.25%', 
    // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  expandedWindow: {
    height: '65.5vh',
  },
  avatar: {
    backgroundColor: red[500],
  },
  summary : {
    // padding: 
    marginTop: theme.spacing(2),
    padding: theme.spacing(1), 
    borderRadius: 0,
  },
  papermap: {
    justify: "center",
    textAlign: 'center',
  },


}));


export default function CardJob() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { jobSelect }  = useContext(FeaturesContext);

  // console.log("jobSelect sa card",jobSelect)
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

  const [value, setValueRadio] = React.useState(["active","  #1b798e"]);

  const handleChange = (event) => {
    var value = event.target.value.split(",")
    setValueRadio([value[0], value[1]]);
  };
// console.log("jobSelect",jobSelect)


if (jobSelect){var underemployed = jobSelect? (jobSelect['properties'].filter(obj => {return obj.job_class === "11"})[0] ? jobSelect['properties'].filter(obj => {return obj.job_class === "11"})[0]['total'] : 0):0};
if (jobSelect){var unemployed = jobSelect? (jobSelect['properties'].filter(obj => {return obj.job_class === "12"})[0] ? jobSelect['properties'].filter(obj => {return obj.job_class === "12"})[0]['total'] : 0):0};
if (jobSelect){var employed = jobSelect? (jobSelect['properties'].reduce( function(a, b){return a + b['total'];}, 0))-(underemployed+unemployed):0};

  
  


  return (
    <Grid container 
    direction="column"
    justify="flex-end"
    alignItems="center"
    className={classes.root} 
    >
      <Grid item xs={10}>
        <MultipleSelectJob />
        <CalendarsDateRangePickerJob/>
        {/* <GeneralDatePicker/> */}

        {/* <br></br> */}

      </Grid>
      <Grid item style={{width:'80%', height:'10vh'}}>
        <Paper className={classes.summary}>
          <Typography variant="h5">{jobSelect ? employed: <div>N/A</div>}</Typography>
          <Typography >Employed</Typography>
        </Paper>
      </Grid>
      <Grid item style={{width:'80%', height:'10vh'}}>
        <Paper className={classes.summary}>
          <Typography variant="h5">{jobSelect ? underemployed: <div>N/A</div>}</Typography>
          <Typography >Underemployed</Typography>
        </Paper>
      </Grid>
      <Grid item style={{width:'80%', height:'10vh'}}>
        <Paper className={classes.summary}>
          <Typography variant="h5">{jobSelect ? unemployed: <div>N/A</div>}</Typography>
          <Typography >Unemployed</Typography>
        </Paper>
      </Grid>
      {/* <Grid item style={{width:'80%', height:'10vh'}}>
        <Paper className={classes.summary}>
          <Typography variant="h1"></Typography>
          <Typography variant="h2"></Typography>
        </Paper>
      </Grid>   */}
    </Grid>
    
  );
}