import React, {useContext, useEffect, useState}  from 'react';
import axios from 'axios'
import { Paper, Card, CardHeader, Grid, Radio, RadioGroup, FormControlLabel, FormControl, 
        FormLabel } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, } from '@material-ui/core/styles';
import { PieChart, Pie, Tooltip, Cell, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, 
        BarChart } from 'recharts';

import StopIcon from '@material-ui/icons/Stop';

import SeedsMap from '../seedsProfileMap';
import CardCommercial from './1-cardCommercial';

import { MapContext } from '../../../context/MapContext';
import { FeaturesContext } from '../../../context/FeaturesContext';
import { SEEDSContext } from '../../../context/SEEDSContext'

const COLORS = ['#1b798e', '#b7e6f1', '#0d3c47', '#1b798e', '#0d3c47'];

const rows = []
const columns = [{ field: 'brgy_name', headerName: 'Barangay', width: 150 }]
const useStyles = makeStyles((theme) => ({
  root1: {
    justify:"center",
    formControlLabel: {
    fontSize: '0.5em',
    height: '0.5em',
    lineHeight: '0.5em',
  }, marginTop: {
    marginTop: theme.spacing(2),
  }, marginTop2: {
    marginTop: theme.spacing(5),
  }, borderRadius: 0,
    '& .MuiCardHeader-root': {
      color:"#1b798e",
      backgroundColor:"#fffefe",
      textAlign: "left",
      justify: "left",
      alignItems:"left",
      alignContent:"left",
      justify:"left",
    }, '& .MuiCardHeader-title': {
      fontSize: '1.2rem',
      textAlign: "center",
      fontFamily: "GlacialIndifference",
    }, '& .MuiTypography-h1': {
      fontSize: "1.5rem",
      color: "#0c343d",
    }, '& .MuiTypography-h2': {
      fontFamily: "Nunito",
      fontSize: "1rem",
      color: "#0c343d", 
    }, '& .MuiTypography-h3': {
      fontFamily: "GlacialIndifference",
      fontSize: "0.9rem",
      color: '#0c343d',
      '&:hover': {
        color: '#0c343d',
      }
    }, '& .MuiTypography-h4': {
      fontSize: "0.9rem",
      color: '#0d3c47',
      backgroundColor: "#ffffff",
      border: "2px solid #1b798e",
      cursor: 'pointer',
      padding: '5px',
    },
  }, root2: {
    textAlign:'center',
    '& > *': {
      margin: theme.spacing(2),
    },
  }, extendedIcon: {

  }, fabButton: {
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
  }, fabButton3: {
    border: 0,
    borderRadius: 0 ,
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: '#29b5d5',
    }
  },
}));

export default function CommercialMapper() {
  const classes = useStyles();
  const [ dataPieCommercial, setDataPieCommercial ] = useState([]) 
  const [ valueradio, setValueRadio ] = useState(["capitalization_total","#1b798e"]);

  const { profileLoc } = useContext(MapContext);
  const { commercialAll, commercialMapperGraph, setCommercialMapperGraph, setBrgySelect, 
          commercialSelect, setCommercialSelect, commercialClassMap, setCommercialClassMap }  = useContext(FeaturesContext);
  const { startDate, endDate, currentDomain, currentSubdomain } = useContext(SEEDSContext);

  useEffect(() => {
    const fetchData = async() => {
      const res = await axios(`http://ec2-52-90-134-187.compute-1.amazonaws.com/commercialmapper/brgy/single`, {
        params: {
          brgy_id: profileLoc,
          startdate: startDate,
          enddate: endDate,    
        }
      });
      setCommercialSelect(res.data) 
      setBrgySelect(res.data) 

      const res_graph = await axios('http://ec2-52-90-134-187.compute-1.amazonaws.com/commercialmapper/graph', {
        params: {
          brgy_id: profileLoc
        }
      });
      setCommercialMapperGraph(res_graph.data.values)
    }
    fetchData();
  }, [profileLoc, startDate, endDate])

  useEffect(() =>{
    const fetchData = async() => {
      const res = await axios('http://ec2-52-90-134-187.compute-1.amazonaws.com/analytics/getsubcategory/single', {
        params: {
          layerKey: 'Commercial_Barangay', 
          specific_subcategory: 'class'
        }
      }); //ito yung gagamitin pag sa web yung server
      setCommercialClassMap(res.data) 
    };
    fetchData()
  }, [])

  useEffect(() =>{
    if (commercialSelect){
      setDataPieCommercial(
        commercialSelect["properties"].map(function (value) {
          var object = {
            class: value.class,
            name: value.class,
            value: value.institution_count,
          }
          return object;
      }))
    }
  }, [commercialSelect])

  const handleChange = (event) => {
    var value = event.target.value.split(",")
    setValueRadio([value[0], value[1]]);
  };

  return (
    <Grid container direction="column" spacing={2} className={classes.root1}>
      <br/>
      <Grid item container xs={12} spacing={2}>
        <Grid item xs={12} md={8} lg={8}>
          <Paper elevation={3} style={{backgroundColor:"#ededed", borderRadius:0, height: 700, width:"100%", borderRadius:0}}>
            <SeedsMap/>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper elevation={3} style={{width:"100%", borderRadius:0, height: 700,}}>
            <Card style={{backgroundColor:"#FFFEFE", color:"#1b798e",borderRadius:0, width:"100%"}}>
              <CardHeader titleTypographyProps={{style: {textAlign: "left", fontSize:"1.5rem", wordWrap:"break-word"}}}
                title={currentSubdomain} subheader={currentDomain}/>
            </Card>
            <CardCommercial />
          </Paper>
        </Grid>
      </Grid>

      <Grid item container xs={12} spacing={2}>
        <Grid item xs={12} md={12} lg={8}>
          <Paper elevation={3} style={{height: 450, borderRadius:0, width:"100%", textAlign:"center", overflowY:"hidden"}}>
            <br/>
            <Grid item xs ={12}>
              <FormControl className="radioButton" component="fieldset" > 
                <FormLabel focused component="legend" >View By: </FormLabel>
                <RadioGroup aria-label="select" name="select1" onChange={handleChange} row>
                  <FormControlLabel value="capitalization_total,#b7e6f1" checked={valueradio[0] === "capitalization_total"}
                    control={<Radio size="small" color="primary" style={{size:'50px'}}/>} label="Capitalization" />  
                  <FormControlLabel value="employees_total,#0d3c47" checked={valueradio[0] === "employees_total"} 
                    control={<Radio size="small" color="primary"/>} label="Employee Count" />
                  <FormControlLabel value="institution_count,#1b798e" checked={valueradio[0] === "institution_count"} 
                    control={<Radio size="small" color="primary"/>} label="Institution Count"/>
                </RadioGroup>
              </FormControl>
            </Grid>
            <ResponsiveContainer height="80%" width="95%">
              <BarChart width={750} height={300} data={commercialMapperGraph}
                margin={{ top: 20, right: 20, bottom: 20, left: 20,}}>
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="class" />
                <YAxis />
                <Tooltip />
                <Bar dataKey={valueradio[0]} fill={valueradio[1]}  barSize={30}/>
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={4} >
          <Paper elevation={3} style={{height: 450, borderRadius:0, width:"100%", overflow:"hidden"}}>
            <br></br>
            <Grid container direction="row" xs={12} spacing={2} justify="center" alignItems="center">
              {dataPieCommercial.map((entry, index) => (
                <Grid item container xs={4} direction="row" justifyContent="center" alignItems="center">
                  <StopIcon style={{color:COLORS[index % COLORS.length]}}/>
                  {entry.name}
                </Grid>
              ))}
            </Grid>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart width={300} height={300} fill="#000000">
                <Pie dataKey="value" data={dataPieCommercial} cx="50%" cy="50%" outerRadius={120}
                  innerRadius={70} label>
                  <br/><br/>
                  {dataPieCommercial.map((entry, index) => (
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
          <Paper elevation={3} style={{height: '100%',  width:"100%"}}>
            <div style={{ height: '70vh', width: '100%' }}>
              {commercialAll ? 
                <DataGrid rowHeight={30} pagination rowsPerPageOptions={[25, 50, 100]} rows={commercialAll} 
                  columns={commercialClassMap? columns.concat(commercialClassMap): columns} />
                : <DataGrid stickyHeader rowHeight={30} rows={rows} pagination rowsPerPageOptions={[25, 50, 100]}
                  columns={commercialClassMap?columns.concat(commercialClassMap):columns} loading="true"/>
              }  
            </div>
          </Paper>   
        </Grid>
      </Grid>
    </Grid>
  );
}