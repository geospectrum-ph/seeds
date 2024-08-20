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
import CardDiseaseIncidence from './1-cardDisease';
import SeedsMap from '../seedsFeaturesMap';
import { createMuiTheme } from '@material-ui/core/styles';
import { SEEDSContext } from '../../../context/SEEDSContext'
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Menu, MenuItem, ListItemIcon, ListItemText} from '@material-ui/core';
import { ResponsiveContainer, Label, LabelList, ComposedChart, Line, PieChart, Pie, Legend, Tooltip, Sector, Cell, BarChart, Bar, Brush,  XAxis, YAxis, CartesianGrid  } from 'recharts';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import generaldatepicker from '../components/datepicker
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
    // console.log(date)
    // console.log(graphList[0])

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
const rows = []
const columns = [
  { field: 'barangay', headerName: 'Barangay', width: 150 },
  { field: 'active', headerName: 'Active', width: 130, type: 'number',},
  { field: 'recovered', headerName: 'Recovered', width: 130, type: 'number', },
  { field: 'death', headerName: 'Deaths', type: 'number', width: 130, },
];
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

export default function SocialHealth() {
  const classes = useStyles();
  const {healthAll, setHealthAll, healthOne, setHealthOne, dd, setDd, startDate, endDate} = React.useContext(SEEDSContext);
  // const [dataPie, setDataPie] = React.useState([]) //to get active, recovered, death to piechart
  var dataPie = [];
  const [dataPieDisease, setDataPieDisease] = React.useState([]) //to get employed, unemployed, underemployed to piechart

  const { healthSelect, healthMapperGraph, jobSelect, jobMapperGraph }  = useContext(FeaturesContext);
  // console.log("healthALl",healthAll)
  // console.log('healthselect', healthSelect)
  // console.log('healthMappergraph', healthMapperGraph)

  if (healthSelect) {
    dataPie = [
    {name: 'Active', value: healthSelect.properties.active},
    {name: 'Recovered', value: healthSelect.properties.recovered},
    {name: 'Death', value: healthSelect.properties.death}
  ]};
  // console.log("dataPie_Health", dataPie)


  // React.useEffect(() =>{

  //   if (healthSelect){
  //     setDataPieDisease(
  //       healthSelect["properties"].map(function (value) {
  //         var object = {
  //           name: value.job_class,
  //           name: data[parseInt(value.job_class)-1].name,
  //           code: data[parseInt(value.job_class)-1].code,
  //           value: value.total,
  //         }
  //         return object;
  //     }))
  //   }
  
  // }, [healthSelect])

  const data = [
    { name: 'Group A', value: 40 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 },
  ];
  const [valueradio, setValueRadio] = React.useState(["active","#1b798e"]);
  // const checked = useWindowPosition('header');

  const handleChange = (event) => {
    var value = event.target.value.split(",")
    setValueRadio([value[0], value[1]]);
  };


  return (
    <div>
      <br></br>
      <Grid container xs ={12}>
        {/* left side */}
        <Grid container xs={8} className={classes.root1}
          direction="column"
          justify="flex-start"
          alignItems="flex-end">
          <Paper style={{backgroundColor:"#ededed", height: '70vh', width:"90%", borderRadius:0}}>
            <SeedsMap/>
          </Paper>
          <br></br>
          <Grid container direction="column" justify="flex-start" alignItems="center"><Typography variant="h1">Graphs</Typography></Grid>
          <br></br>
          <Paper style={{height: '40vh', borderRadius:0, width:"90%", textAlign:"center"}}>
            <br></br>
            <Grid item xs ={12}>
              <FormControl className="radioButton" component="fieldset" >
                <FormLabel focused component="legend" >View By: </FormLabel>
                <RadioGroup   alignContent ="center" aria-label="select" name="select1" 
                // value="active,#1b798e"
                onChange={handleChange} row>
                  <FormControlLabel value="active,#1b798e" checked={valueradio[0] === "active"} control={<Radio size="small" color="primary"/>} label="Active"/>
                  <FormControlLabel  value="recovered,#b7e6f1" checked={valueradio[0] === "recovered"} control={<Radio size="small" color="primary" style={{size:'50px'}}/>} label="Recovered" />
                  <FormControlLabel  value="death,#0d3c47" checked={valueradio[0] === "death"} control={<Radio size="small" color="primary"/>} label="Deaths" />
                </RadioGroup>
              </FormControl>
            </Grid>
          
            <Grid item xs ={12} 
            // style={{backgroundColor:"#cccccc"}}
            >
              <ComposedChart
              width={750}
              height={300}
              data={healthMapperGraph} //DITO GALING YUNG VALUES
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="date" />
                <Brush dataKey="date" height={30} stroke="#1b798e"
                startIndex={getIndex(healthMapperGraph, startDate)}
                endIndex={getIndex(healthMapperGraph, endDate)}
                />
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
                <Bar dataKey={valueradio[0]} fill={valueradio[1]}  barSize={30}/>
                {/* <Line type="monotone" dataKey={valueradio[0]} stroke={valueradio[1]} /> */}
              </ComposedChart>
            </Grid>
          </Paper >
          <br></br>
          <Grid container direction="column" justify="flex-start" alignItems="center"><Typography variant="h1">Table Summary</Typography></Grid>
          <br></br>

          <Paper  elevation={3} style={{height: '70vh', borderRadius:0,  width:"90%", textAlign:"center"}}>
              <ThemeProvider theme={theme}>
                <div style={{ height: '70vh', width: '100%' }}>
                  { healthAll ? 
                  <DataGrid borderRadius={0} rowHeight={25} pagination pageSize={20} rowsPerPageOptions={[5, 10, 20, 30, 40]} className={classes.root} rows={healthAll} columns={columns} 
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
          <Paper style={{backgroundColor:"#fffefe", height: '70vh', borderRadius:0, width:"90%", textAlign:"center"}}>
            <Card >
            <CardHeader
              // backgroundColor="#0d3c47"
              title="Filter:"/>              
            </Card>
            <CardDiseaseIncidence />
            {/* <BottomNavigation
              value={value}
              onChange={(event, newValue) => {
                setValueBottom(newValue);
              }}
              showLabels
              className={classes.root}
            >
              <BottomNavigationAction label="Disease" value="Disease" icon={<RestoreIcon />} />
              <BottomNavigationAction label="Vaccine" value="Vaccine" icon={<FavoriteIcon />} />
              <BottomNavigationAction label="Health Facility" value="Health Facility" icon={<LocationOnIcon />} />
            </BottomNavigation> */}
          </Paper>

          <br></br>
          <Typography variant="h1">Pie Chart</Typography>
          <br></br>
          <Paper elevation={3} style={{height: '40vh', borderRadius:0, width:"90%"}}>
                      <Grid direction="row" justify="center"
                        alignItems="center" container className="container" style={{backgroundColor:"#fffefe", height: '40vh', width:"90%", borderRadius:0}}>
                      <br></br>
                      <Grid item >
                        <Grid container direction="column" 
                        justify="center"
                        alignItems="center">
                          
                        {dataPie.map((entry, index) => (
                                      <Grid container direction="row" 
                                      justify="flex-start"
                                      alignItems="center">
                                        <StopIcon style={{color:COLORS[index % COLORS.length]}} /> <Typography>{entry.name}</Typography>
                                      </Grid>
                                    ))}
                        </Grid>
                      </Grid>
                      <Grid item ><br></br>
			                {healthSelect?
                      <PieChart width={350} height={350} fill="#000000">
                        <Pie
                          dataKey="value"
                          // isAnimationActive={false}
                          data={dataPie}
                          cx="50%"
                          cy="42%"
                          outerRadius={120}
                          innerRadius={70}
                          // paddingAngle={2}
                          // fill="#8884d8"
                          label
                        >
                      <br></br>
                      <br></br>

                        {dataPie.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>: null}
                      </Grid>
                    </Grid>
                    </Paper> 
          {/* <div className="container" style={{backgroundColor:"#fffefe", height: '40vh', width:"90%", borderRadius:0, textAlign:"center"}}>
            <br></br>
            <Grid container direction="column">
              <Grid container direction="row" 
              justify="center"
              alignItems="center">
            <StopIcon color="primary" /> <Typography>Active</Typography>
            <StopIcon style={{color:"b7e6f1"}}/><Typography>Recovered</Typography>
            <StopIcon style={{color:"#0d3c47"}} /><Typography>Death</Typography>
            </Grid>
            </Grid>
            

        
            {healthSelect?
            <PieChart width={350} height={350} fill="#000000">
              <Pie
                dataKey="value"
                // isAnimationActive={false}
                data={dataPie}
                cx="50%"
                cy="42%"
                outerRadius={120}
                innerRadius={70}
                // paddingAngle={2}
                // fill="#8884d8"
                label
              >
            <br></br>
            <br></br>

              {dataPie.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
              </Pie>
              <Tooltip />
            </PieChart>: null}

            
          </div>  */}

        </Grid>
      </Grid>
    </div>
    );
}

