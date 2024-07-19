import React, {useContext} from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

import { Paper } from '@material-ui/core';
import { Grid, Typography, makeStyles, Fab, withStyles, Menu, MenuItem, Box} from '@material-ui/core/';
import {  Label, LabelList, ComposedChart, Line, PieChart, Pie, Legend, Tooltip, Sector, Cell } from 'recharts';

import StopIcon from '@material-ui/icons/Stop';

import {FeaturesContext} from '../../../../context/FeaturesContext';
import {SEEDSContext} from '../../../../context/SEEDSContext';

const COLORS = ['#1b798e', '#b7e6f1', '#0d3c47', '#1b798e', '#0d3c47'];
// const entries = ["ITEM1", "ITEM2", "ITEM3"];
const data = [
    {name: 'Managers', f: 4000,  m: 2400, code: "MGR"},
    {name: 'Professionals', f: 3000, m: 1398, code: "PRF"},
    {name: 'Technicians and associate professionals', f: 2000,m: 1000, code: "TAP"},
    {name: 'Clerical support workers', f: 2390, m: 1000, code: "CSW"},
    {name: 'Service and sales workers', f: 2780, m: 1000, code: "SSW"},
    {name: 'Skilled agricultural, forestry, and fishing workers', f: 1000, m: 1000, code: "SAFFW"},
    {name: 'Craft and related trades workers', f: 2000, m: 1000, code: "CRTW"},
    {name: 'Plant and machine operators', f: 5000, m: 1000, code: "PMO"},
    {name: 'Elementary occupations', f: 1890, m: 1000, code: "EO"},
    {name: 'Armed forces occupations and special occupations', f: 3490, m: 1000, code: "AFS"},
    {name: 'Underemployed', f: 1000, m: 2100, code: "UND"},
    {name: 'Employed', f: 500, m: 4300, code: "UNEMP"},
  ];


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

export default function SEEDSPieChart() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { healthSelect }  = useContext(FeaturesContext);
  const { currentSubdomain }  = useContext(SEEDSContext);

  // console.log(healthSelect)
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
 
  return (
    <Paper elevation={3} style={{height: '40vh', borderRadius:0, width:"90%"}}>
    <div className="container" style={{backgroundColor:"#fffefe", height: '40vh', width:"90%", borderRadius:0, textAlign:"center"}}>
    <br></br>
    <Grid>
        <Grid container direction="row" 
        justify="center"
        alignItems="center">
        {/* {entries.map((entry, index) => (
                        <div>
                        <StopIcon style={{color:COLORS[index % COLORS.length]}} /> <Typography>{entry}</Typography>
                        </div>
                    ))} */}
        </Grid>
    </Grid>

    {COLORS?
    <PieChart width={350} height={350} fill="#000000">
    {/* <Pie
        dataKey="f"
        // isAnimationActive={false}
        data={data}
        cx="50%"
        cy="42%"
        outerRadius={120}
        innerRadius={70}
        // paddingAngle={2}
        // fill="#8884d8"
        label
    >
    {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
    </Pie> */}
    <Tooltip />
    </PieChart>: null}
    </div>
    </Paper>
  );
}