import React, {useContext}  from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Toolbar, Paper} from '@material-ui/core';
import { Card, CardContent, CardActions, Button, CardActionArea, CardMedia, CardHeader, Fab, IconButton } from '@material-ui/core';

import { DataGrid } from '@material-ui/data-grid';
import { Box, Divider, Tabs, Tab, ThemeProvider } from '@material-ui/core/';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { FeaturesContext } from '../../../context/FeaturesContext'
import StopIcon from '@material-ui/icons/Stop';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import CardConstruction from './1-CardConstruction';
// import SampleCardCommercial from '../commercialMapper/1-sampleCardCommercial';
// import
import SeedsMap from '../seedsFeaturesMap';
import { createMuiTheme } from '@material-ui/core/styles';
import { SEEDSContext } from '../../../context/SEEDSContext'
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Menu, MenuItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {  Label, LabelList, ComposedChart, Line, PieChart, Pie, Legend, Tooltip, Sector, Cell, BarChart, Bar, Brush,  XAxis, YAxis, CartesianGrid  } from 'recharts';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import SEEDSPieChart from './seedsPieChart'

const COLORS = ['#1b798e', '#b7e6f1', '#0d3c47', '#1b798e', '#0d3c47'];

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1b798e',
      contrastText: '#fffefe',
    },
    secondary: {
      main: '#0d3c47',
      contrastText: '#fffefe',
    },
  },
});
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const parseDate = (date) => {
  var splitdate = date.toLocaleString().split(",")[0].split("/")
  return (pad(splitdate[2],4).concat(pad(splitdate[0],2)).concat(pad(splitdate[1],2)))
};

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function getIndex(graph, date) {
  try {
    var graphList = graph.values
    // console.log(date, parseDate(date))
    if (date < graphList[0].date){
      return 0;
    }

    if (date > graphList[graphList.length-1].date){
      return graphList.length-1;
    }

    var index = graphList.findIndex(x => x.date === date);
    // console.log(index)
    return index;
  }
  catch (err) {
    // console.log(err)
    return 0;
  }
}

const useStyles = makeStyles((theme) => ({
  root1: {
    justify:"center",
    formControlLabel: {
    fontSize: '0.5em',
    height: '0.5em',
    lineHeight: '0.5em',
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
  marginTop2: {
    marginTop: theme.spacing(5),
    // backgroundColor: "#000000",
    // height: "50vh",
  },
  borderRadius: 0,
  },
  root1: {
    justify:"center",
    formControlLabel: {
    fontSize: '0.5em',
    height: '0.5em',
    lineHeight: '0.5em',
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
  marginTop2: {
    marginTop: theme.spacing(5),
    // backgroundColor: "#000000",
    // height: "50vh",
  },
  borderRadius: 0,
    '& .MuiCardHeader-root': {
      // color:"#fffefe",
      // backgroundColor:"#1b798e",
      color:"#1b798e",
      backgroundColor:"#fffefe",
      textAlign: "left",
      justifyContent: "left",
      alignItems:"left",
      alignContent:"left",
      justify:"left",
    },
      '& .MuiCardHeader-title': {
        fontSize: '1.2rem',
        textAlign: "center",
      fontFamily: "GlacialIndifference",
      },
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

  },
}));


export default function SubdomainInConstruction() {
  const classes = useStyles();
  const [dataPie, setDataPie] = React.useState([]) //to get active, recovered, death to piechart
  const [dataPie_JOB, setDataPie_JOB] = React.useState([]) //to get employed, unemployed, underemployed to piechart
  const { healthSelect, healthMapperGraph, jobSelect, jobMapperGraph }  = useContext(FeaturesContext);
  
  return (
    <div>
        <br></br>

                <Grid container xs ={12}>
                  {/* left side */}
                  <Grid container xs={8} className={classes.root1} 
                  // style={{backgroundColor:"#000000"}} 
                  direction="column"
                  justify="flex-start"
                  alignItems="flex-end"
                  >
                    <Paper style={{backgroundColor:"#ededed", height: '70vh',  width:"90%", borderRadius:0}}>
                      <SeedsMap/> 
                    </Paper>
                    <br></br>
                    <Grid container direction="column" justify="flex-start" alignItems="center"><Typography variant="h1">Graphs</Typography></Grid>
                    <br></br>

                    <Paper elevation={3} style={{height: '40vh', borderRadius:0, width:"90%"}}>
                      <br></br>
                      
                    {/* <FormControl className="radioButton" component="fieldset" >
                        <RadioGroup   alignContent ="center" row="true" aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                          <FormControlLabel size="small" valueradio="active" control={<Radio size="small" />} label="Active" />
                          <FormControlLabel  valueradio="recovered" control={<Radio style={{size:'50px'}}/>} label="Recovered" />
                          <FormControlLabel  valueradio="deaths" control={<Radio size="small"/>} label="Deaths" />
                          <FormControlLabel  valueradio="total" control={<Radio size="small"/>} label="Total" />
                        </RadioGroup>
                      </FormControl> 
                      
                    <ComposedChart
                      width={625}
                      height={300}
                      data={data01}
                      margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                      }}
                    >
                      <CartesianGrid stroke="#f5f5f5" />
                        <Brush dataKey="date" height={30} stroke="#1b798e" />
                      <Bar dataKey="active" fill="#70cee3" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="active" stroke="#1b798e" />
                    </ComposedChart> */}
                    {/* <FormControl className="radioButton" component="fieldset" >
                      <FormLabel focused component="legend" >View By: </FormLabel>
                      <RadioGroup   alignContent ="center" aria-label="select" name="select1" value={value} onChange={handleChange} row>
                        <FormControlLabel value="Gender,#70cee3" checked={value[0] === "active"} control={<Radio size="small" color="primary"/>} label="Gender"/>
                        <FormControlLabel  value="Employment Status,#5aff3d" checked={value[0] === "recovered"} control={<Radio size="small" color="primary" style={{size:'50px'}}/>} label="Employment Status" />
                      </RadioGroup>
                    </FormControl>  */}
                    {/* <BarChart width={800} height={300} data={data}
                          margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                      <CartesianGrid strokeDasharray="3 3"/>
                      <XAxis dataKey="name"/>
                      <YAxis/>
                      <Tooltip/>
                      <Legend />
                      <Bar dataKey="m" stackId="a" fill="#78a2cc" />
                      <Bar dataKey="f" stackId="a" fill="#ff964f"/>
                    </BarChart> */}
                    </Paper >               
                    <br></br>
                    <Grid container direction="column" justify="flex-start" alignItems="center"><Typography variant="h1">Table Summary</Typography></Grid>
                    <br></br>

                    <Paper  elevation={3} style={{height: '70vh', borderRadius:0,  width:"90%"}}>
                        <ThemeProvider theme={theme}>
                          {/* <div style={{ height: '70vh', width: '100%' }}>
                            { healthAll ? 
                            <DataGrid borderRadius={0} rowHeight={25} className={classes.root} rows={healthAll} columns={columns}  pageSize={15}
                            onRowSelected={()=>{history.push('/seedsTableData')}}
                            />:<DataGrid borderRadius={0} rowHeight={25} rows={rows} columns={columns} pageSize={15} loading="true"/>}  
                          </div> */}
                        </ThemeProvider>
                    </Paper>              
                  </Grid>
                  

                  {/* right side */}
                  <Grid container xs={4} className={classes.root1}                              
                  // style={{backgroundColor:"#000000"}}
                  direction="column"
                  justify="flex-start"
                  alignItems="center"   
                  >
                    
                    <Paper style={{backgroundColor:"#fffefe", height: '70vh', width: '90%',borderRadius:0}}>
                      <Card >
                        <CardHeader
                          title="Filter:">
                        </CardHeader>
                      </Card>
                    <CardConstruction />
                    </Paper>
        
                    <br></br>
                    <Typography variant="h1">Pie Chart</Typography>
                    <br></br>

                    <SEEDSPieChart />
                  </Grid>
                </Grid>
                </div>
  );
                    }