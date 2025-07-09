import React, {useContext, useEffect, useState}  from 'react';
import axios from 'axios';
import { Card, CardHeader, Paper, Grid, Radio, RadioGroup, FormControlLabel, FormControl, 
        FormLabel } from '@material-ui/core';
// import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { ResponsiveContainer, ComposedChart, PieChart, Pie, Tooltip, Cell, Bar, Brush,  XAxis, YAxis, 
        CartesianGrid } from 'recharts';

import StopIcon from '@material-ui/icons/Stop';

import CardDiseaseIncidence from './1-cardDisease';
import SeedsMap from '../seedsProfileMap';

import { FeaturesContext } from '../../../context/FeaturesContext';
import { MapContext } from '../../../context/MapContext.js';
import { SEEDSContext } from '../../../context/SEEDSContext'

const COLORS = ['#1b798e', '#b7e6f1', '#0d3c47', '#1b798e', '#0d3c47'];

const rows = []
const columns = [
  { field: 'barangay', headerName: 'Barangay', width: 250 },
  { field: 'active', headerName: 'Active', width: 150, type: 'number',},
  { field: 'recovered', headerName: 'Recovered', width: 150, type: 'number', },
  { field: 'death', headerName: 'Deaths', type: 'number', width: 150, }
];

const useStyles = makeStyles((theme) => ({
  root1: {
    justify:"center",
    formControlLabel: {
      fontSize: '0.5em',
      height: '0.5em',
      lineHeight: '0.5em'
    }, dataGrid: {
      borderRadius:0,
      overflowX: "hidden"
    }, marginTop: {
      marginTop: theme.spacing(2)
    }, marginTop2: {
      marginTop: theme.spacing(5)
    }, borderRadius: 0,
    '& .MuiCardHeader-root': {
      color:"#1b798e",
      backgroundColor:"#fffefe",
      textAlign: "left",
      justify: "left",
      alignItems:"left",
      alignContent:"left",
      justify:"left"
    }, '& .MuiCardHeader-title': {
      fontSize: '1.2rem',
      textAlign: "center",
      fontFamily: "GlacialIndifference"
    }, '& .MuiTypography-h1': {
      fontSize: "1.5rem",
      color: "#0c343d",
      fontFamily: "'Outfit', sans-serif"
    }, '& .MuiTypography-h2': {
      fontFamily: "Nunito",
      fontSize: "1rem",
      color: "#0c343d"
    }, '& .MuiTypography-h3': {
      fontFamily: "GlacialIndifference",
      fontSize: "0.9rem",
      color: '#0c343d',
      '&:hover': {
        color: '#0c343d'
      }
    }, '& .MuiTypography-h4': {
      fontSize: "0.9rem",
      color: '#0d3c47',
      backgroundColor: "#ffffff",
      border: "2px solid #1b798e",
      cursor: 'pointer',
      padding: '5px'
    }
  },
}));

export default function SocialHealth() {
  const classes = useStyles();

  const { profileLoc }  = useContext(MapContext);
  const { diseaseIncidenceAll, diseaseMapperGraph, setDiseaseMapperGraph, setBrgySelect, 
          diseaseSelect, setDiseaseSelect, diseaseClassMap, setDiseaseClassMap, 
          diseaseClassSelect } = useContext(FeaturesContext);
  const { startDate, endDate, currentDomain, currentSubdomain } = useContext(SEEDSContext);

  var dataPie = [];

  useEffect(() =>{
    const fetchData = async() => {
      const res = await axios('https://seeds.geospectrum.com.ph/analytics/getsubcategory/single', {
      // const res = await axios('http://localhost:5000/analytics/getsubcategory/single', {
        params: {
          layerKey: 'Disease_Barangay', 
          specific_subcategory: 'disease'
        }
      }); 

      if (res.data){ 
        setDiseaseClassMap(res.data) 
      } else {
        const res2 = await axios('https://seeds.geospectrum.com.ph/analytics/getsubcategory/single', {
        // const res2 = await axios('http://localhost:5000/analytics/getsubcategory/single', {
          params: {
            layerKey: 'Disease', 
            specific_subcategory: 'properties.disease'
          }
        }); 
        setDiseaseClassMap(res2.data) 
      }
    };
    fetchData()
  }, [])

  if (diseaseSelect) {
    dataPie = [
      {name: 'Active', value: diseaseSelect.properties.active},
      {name: 'Recovered', value: diseaseSelect.properties.recovered},
      {name: 'Death', value: diseaseSelect.properties.death}
    ]
  };

  const [valueradio, setValueRadio] = useState(["active","#1b798e"]);

  const handleChange = (event) => {
    var value = event.target.value.split(",")
    setValueRadio([value[0], value[1]]);
  };

  useEffect(()=> {
    if (profileLoc) {
      const fetchData = async() => {
        const res = await axios('https://seeds.geospectrum.com.ph/healthmapper/brgy/single', {
        // const res = await axios('http://localhost:5000/healthmapper/brgy/single', {
          params: {
            brgy_id: profileLoc,
            disease: diseaseClassSelect,
            startdate: startDate,
            enddate: endDate
          }
        })
        setDiseaseSelect(res.data) 
        setBrgySelect(res.data) 
        const res_graph = await axios('https://seeds.geospectrum.com.ph/healthmapper/graph',  {
        // const res_graph = await axios('http://localhost:5000/healthmapper/graph',  {
          params: {
            brgy_id: profileLoc,
            disease: diseaseClassSelect,
          }
        });
        setDiseaseMapperGraph(res_graph.data.values)
      } 
      fetchData();
    }
  }, [profileLoc, diseaseClassSelect, startDate, endDate])

  function getIndex(graph, date, mode) {
    try {
      if (!date) {
        if (mode === "start") {return 0}
        else if (mode === "end") {return graph.length-1}
      }
  
      if (date < graph[0].date && mode){ // for selected start dates that fall before the uploaded dates
        return 0;
      } 
      if (date > graph[graph.length-1].date){ // for selected end dates that fall after the uploaded dates
        return graph.length-1;
      } 
      
      var index = graph.findIndex(x => x.date === date); 
      // for selected dates that fall between the uploaded dates
      // may instances na wala yung sinelect na date sa list of uploaded dates
      if (index != -1) {
        return index;
      } else {
        if (mode === "start") {
          index = graph.length-1
        }
        graph.forEach((item, i) => {
          if (item.date > date && mode === "start" && i < index) {
            index = i
          } else if (graph[graph.length-i-1].date < date && mode === "end" && graph.length-i-1 > index) {
            index = graph.length-i-1
          }
        })
        return index
      }
    }
    catch (err) {
      // console.log("returning err")
      return 0;
    }
  }

  return (
    <Grid container direction="column" spacing={2} className={classes.root1}>
      <br/>
      <Grid item container xs={12} spacing={2}>
        <Grid item xs={12} md={8} lg={8}>
          <Paper elevation={3} style={{backgroundColor:"#ededed", height: 700, width:"100%", borderRadius:0}}>
            <SeedsMap/>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper elevation={3} style={{width:"100%", borderRadius:0, height:700}}>
            <Card style={{backgroundColor:"#FFFEFE", color:"#1b798e", borderRadius:0, width:"100%" }}>
              <CardHeader titleTypographyProps={{style: {textAlign: "left", fontSize:"1.5rem", wordWrap:"break-word"}}}
                title={currentSubdomain} subheader={currentDomain}>
              </CardHeader>
            </Card>
            <CardDiseaseIncidence />
          </Paper>
        </Grid>
      </Grid>
      <Grid item container xs={12} spacing={2}>
        <Grid item xs={12} md={12} lg={8}>
          <Paper elevation={3} style={{height: 450, borderRadius:0, width:"100%", textAlign:"center", overflow:"hidden"}}>
            <br/>
            <Grid item xs ={12}>
              <FormControl className="radioButton" component="fieldset" >
                <FormLabel focused component="legend" >View By: </FormLabel>
                <RadioGroup aria-label="select" name="select1" onChange={handleChange} row>
                  <FormControlLabel value="active,#1b798e" checked={valueradio[0] === "active"} 
                    control={<Radio size="small" color="primary"/>} label="Active"/>
                  <FormControlLabel value="recovered,#b7e6f1" checked={valueradio[0] === "recovered"} 
                    control={<Radio size="small" color="primary" style={{size:'50px'}}/>} label="Recovered" />
                  <FormControlLabel value="death,#0d3c47" checked={valueradio[0] === "death"} 
                    control={<Radio size="small" color="primary"/>} label="Deaths" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <ResponsiveContainer height="80%" width="95%">
              <ComposedChart width={750} data={diseaseMapperGraph}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}>
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="date_label" />
                <Brush dataKey="date" height={30} stroke="#1b798e"
                  startIndex={getIndex(diseaseMapperGraph, startDate, "start")}
                  endIndex={getIndex(diseaseMapperGraph, endDate, "end")}/>
                <YAxis />
                <Tooltip />
                <Bar dataKey={valueradio[0]} fill={valueradio[1]} barSize={30}/>
              </ComposedChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <Paper elevation={3} style={{height: 450, borderRadius:0, width:"100%", overflow:"hidden"}}>
            <br/>
            <Grid container direction="row" spacing={2} justifyContent="center" alignItems="center">
              {dataPie.map((entry, index) => (
                <Grid item container xs={4} direction="row" key={index} justifyContent="center" alignItems="center">
                  <StopIcon style={{color:COLORS[index % COLORS.length]}} /> 
                  {entry.name}
                </Grid>
              ))}
            </Grid>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart width={300} height={300} fill="#000000">
                <Pie dataKey="value" data={dataPie} cx="50%" cy="50%" outerRadius={120} innerRadius={70} label>
                  <br/><br/>
                  {dataPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip/>
              </PieChart>
            </ResponsiveContainer>
          </Paper> 
        </Grid>
      </Grid>
      <Grid item container xs={12} spacing={2}>
        <Grid item container>
          <Paper elevation={3} style={{height: '100%', width:"100%"}}>
            <div style={{ height: '70vh', width:"100%"}}>
              {/* { diseaseIncidenceAll && diseaseClassMap ? 
                <DataGrid rowHeight={30} pagination rowsPerPageOptions={[25, 50, 100]} 
                  rows={diseaseIncidenceAll.filter((x) => x.barangay !== null && x.id > 1000)} columns={columns} />
                : <DataGrid rowHeight={30} pagination rowsPerPageOptions={[25, 50, 100]} rows={rows} columns={columns} 
                  loading="true"/>}   */}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}