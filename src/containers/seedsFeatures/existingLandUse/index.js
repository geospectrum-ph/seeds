import React, {useContext}  from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Toolbar, Paper} from '@material-ui/core';
import { Card, CardContent, CardActions, Button, CardActionArea, CardMedia, CardHeader, Fab, IconButton } from '@material-ui/core';

import { DataGrid } from '@material-ui/data-grid';
import { Box, Divider, Tabs, Tab, ThemeProvider } from '@material-ui/core/';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {FeaturesContext} from '../../../context/FeaturesContext';
import StopIcon from '@material-ui/icons/Stop';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
// import CardPhilsys from '../philsysRegistry/1-cardPhilsys';
import CardLandUse from './1-cardLandUse';
// import CardCommercial from '../commercialMapper/1-CardCommercial';
// import
import SeedsMap from '../seedsFeaturesMap';
import { createMuiTheme } from '@material-ui/core/styles';
import { SEEDSContext } from '../../../context/SEEDSContext'
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Menu, MenuItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {  Area, Label, LabelList, ComposedChart, Line, PieChart, Pie, Legend, Tooltip, Sector, Cell, BarChart, Bar, Brush,  XAxis, YAxis, CartesianGrid, ResponsiveContainer  } from 'recharts';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { MapContext } from '../../../context/MapContext'


const COLORS = ['#0d3c47','#1b798e', '#b7e6f1', '#869da3'];
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
  {name: 'Unemployed', f: 500, m: 4300, code: "UNEMP"},
];
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
  root2: {
    textAlign:'center',
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  extendedIcon: {
    // marginRight: theme.spacing(1),
  },
  fabButton: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 0,
    color: '#fffefe',
    backgroundColor: '#0c343d',
    height: 30,
    fontSize: '1rem',
    opacity: '2',
    '&:hover': {
      color: '#0c343d',
      backgroundColor: '#5aff3d',
      }
  },
  fabButton3: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    // borderRadius: 25 ,
    borderRadius: 0 ,

    // color: '#fffefe',
    // backgroundColor: '#1b798e',
    // height: 30,
    fontSize: '1rem',
    // opacity: '2',
    '&:hover': {
      // color: '#fffefe',
      backgroundColor: '#29b5d5',
      }
  },
}));
const rows = []
const columns = [
  { headerName: 'Barangay', field: 'brgy_name', width: 150 },
  { headerName: 'Commercial Development Zone', field: 'Commercial Development Zone', width: 150,  },
  { headerName: 'Urban Core Zone', field: 'Urban Core Zone',  width: 150, },
  { headerName: 'Coastal Development Zone', field: 'Coastal Development Zone',  width: 150, },
  { headerName: 'Light Industrial Development Zone', field: 'Light Industrial Development Zone',  width: 150, },
  { headerName: 'Agricultural Development Zone', field: 'Agricultural Development Zone',  width: 150, },
  { headerName: 'Building Restricted Development Zone', field: 'Building Restricted Development Zone',  width: 150, },
  { headerName: 'Ecological Development Zone', field: 'Ecological Development Zone',  width: 150, },
  { headerName: 'Urban Expansion Zone', field: 'Urban Expansion Zone',  width: 150, },
];

// job_class: x.properties.job_class,
// male: x.properties.male,
// female: x.properties.female,
// total: x.properties.total,
export default function ExistingLandUse() {
  const classes = useStyles();
  const [dataPie_JOB, setDataPie_JOB] = React.useState([]) //to get landuse to piechart
  const { jobSelect, jobMapperGraph, landUseGraph}  = useContext(FeaturesContext);
  const { laborForceAll, landUseAll, healthAll } = React.useContext(SEEDSContext);
  const { setSeedPage }  = useContext(MapContext);

  //from backend, kukunin yung values ng active, recovered, death
  // console.log("LaborForceAll", laborForceAll)
  // console.log("LandUseAll", landUseAll)
  // console.log("Health", healthAll)
  setSeedPage("Land Use")

React.useEffect(() =>{

  if (jobSelect){
    setDataPie_JOB(
      jobSelect["properties"].map(function (value) {
        var object = {
          name: data[parseInt(value.job_class)-1].name,
          code: data[parseInt(value.job_class)-1].code,
          value: value.total
        }
        return object;
    }))
  }

}, [jobSelect])
// console.log("jobmappergraph",jobMapperGraph)

var dataPie = [
  {
    "area": 2320847.38,
    "percent": 81,
    "name": "Urban Core Zone"
  },
  {
    "area": 15393.29,
    "percent": 1,
    "name": "Commercial Development Zone"
  },
  {
    "area": 109598.55,
    "percent": 4,
    "name": "Light Industrial Development Zone"
  },
  {
    "area": 419525.2,
    "percent": 15,
    "name": "Building Restricted Development Zone"
  }
]

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
                      
                      <Grid container direction="row">
                        <Grid xs ={8} style={{ height: '40vh'}}>
                        <ResponsiveContainer width="100%" height="90%">
                          <BarChart width={750} height={320}
                            data={landUseGraph}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 30,
                              bottom: 5,
                            }}
                            layout="vertical"
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" dataKey="area">
                              {/* <Label value="Land Use Category" offset={0} position="insideBottom" /> */}
                            </XAxis>
                            <YAxis type="category" dataKey="name"/>
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="area" stackId="a" fill="#1b798e" />
                          </BarChart>
                        </ResponsiveContainer>
                          {/* <ComposedChart width={750} height={320} data={jobMapperGraph} isAnimationActive
                            margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis 
                            dataKey="job_class" 
                            position="top" 
                            tick={{fontSize: 15}} 
                            >
                            <Label value="Selected Job Class" offset={-5} position="insideBottom" />
                            </XAxis>
                            <YAxis label={{ value: 'Number', angle: -90, position: 'insideLeft', verticalAnchor: 'start' }}/>
                            <Tooltip/>
                            <Legend verticalAlign="top" height={36}/>
                            <Bar dataKey="total" barSize={20} fill="#413ea0" />
                            {/* <Bar dataKey="male" barSize={20} stackId="a" fill="#1b798e" />
                            <Bar dataKey="female" barSize={20} stackId="a" fill="#b7e6f1"/> */}
                            {/* <Line type="monotone" dataKey="total" stroke="#1b798e" /> */}
                            {/* <Bar dataKey="total" barSize={20} fill="#413ea0" ></Bar> */}

                          {/* </ComposedChart> */} 
                       </Grid>
                       {/* <Grid xs ={4} style={{backgroundColor:"#ffffff", height: '35vh'}}>
                          <br></br>
                          {data.map((name,index)=>{
                            return(
                              <Typography align="left" variant="subtitle2"  >{index+1} : {name.name}</Typography>)
                          })}
                        </Grid> */}
                      </Grid>
        

                    </Paper >               
                    <br></br>
                    <Grid container direction="column" justify="flex-start" alignItems="center"><Typography variant="h1">Table Summary</Typography></Grid>
                    <br></br>

                    <Paper  elevation={3} style={{height: '70vh', borderRadius:0,  width:"90%"}}>
                        <ThemeProvider theme={theme}>
                          <div style={{ height: '70vh', width: '100%' }}>
                            { landUseAll ?
                            <DataGrid borderRadius={0} rowHeight={25} pagination pageSize={20} rowsPerPageOptions={[5, 10, 20, 30, 40]} className={classes.root} rows={landUseAll} columns={columns}
                            // onRowSelected={()=>{history.push('/seedsTableData')}}
                            />:<DataGrid borderRadius={0} rowHeight={25} pagination pageSize={20} rowsPerPageOptions={[5, 10, 20, 30, 40]} rows={rows} columns={columns} loading="true"/>}  
                          </div>
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
                    <CardLandUse />
                    </Paper>
        
                    <br></br>
                    <Typography variant="h1">Pie Chart</Typography>
                    <br></br>

                    <Paper elevation={3} style={{height: '40vh', borderRadius:0, width:"90%"}}>
                    <Grid direction="row" justify="center"
                      alignItems="center" container className="container" style={{backgroundColor:"#fffefe", height: '40vh', width:"90%", borderRadius:0}}>
                        
                      <Grid item >
                        <Grid container direction="column" 
                          justify="center"
                          alignItems="center"><br></br>
                          {landUseGraph?landUseGraph.map((entry, index) => (
                          <Grid container direction="row" 
                          justify="flex-start"
                          alignItems="center">
                            <StopIcon style={{color:COLORS[index % COLORS.length]}} /> <Typography>{entry.name}</Typography>
                            </Grid>
                          )):null}
                        </Grid>
                      </Grid>
                      {/* <Grid item > */}
			                {landUseGraph?
                      <PieChart width={350} height={350} fill="#000000">
                        <Pie
                          dataKey="percent"
                          // isAnimationActive={false}
                          data={landUseGraph}
                          cx="50%"
                          cy="38%"
                          outerRadius={120}
                          innerRadius={70}
                          // paddingAngle={2}
                          // fill="#8884d8"
                          label
                        >
                        {landUseGraph.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>: null}
                    {/* </Grid> */}
                  </Grid>

                    </Paper> 
                  </Grid>
                </Grid>
    </div>
    );
                    }
