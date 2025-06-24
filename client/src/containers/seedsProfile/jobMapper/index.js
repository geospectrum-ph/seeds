import React, {useContext, useEffect, useState}  from 'react';
import axios from 'axios'

import { Paper, Card, CardHeader, Grid, Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { PieChart, Pie, Legend, Tooltip, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
        ResponsiveContainer } from 'recharts';

import StopIcon from '@material-ui/icons/Stop';

import CardJob from '../jobMapper/1-cardJob';
import SeedsMap from '../seedsProfileMap';

import { MapContext } from '../../../context/MapContext'
import { FeaturesContext } from '../../../context/FeaturesContext';
import { SEEDSContext } from '../../../context/SEEDSContext'

const COLORS = ['#0d3c47',
                '#254f59',
                '#3d626b',
                '#55767e',
                '#6d8a90',
                '#869da3',
                '#9eb1b5',
                '#b6c4c7',
                '#ced8da',
                '#e6ebec',
                '#cccccc',
                '#000000'];

const useStyles = makeStyles((theme) => ({
  root1: {
    justify:"center",
    formControlLabel: {
      fontSize: '0.5em',
      height: '0.5em',
      lineHeight: '0.5em'
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
  }, root2: {
    textAlign:'center',
    '& > *': {
      margin: theme.spacing(2)
    }
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
      backgroundColor: '#5aff3d'
    }
  }, fabButton3: {
    border: 0,
    borderRadius: 0 ,
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: '#29b5d5'
    }
  }
}));

const rows = []
const columns = [
  { headerName: 'Barangay', field: 'brgy_name', width: 150 },
];

export default function DemLabor() {
  const classes = useStyles();
  const [ dataPie_JOB, setDataPie_JOB ] = useState([]) //to get employed, unemployed, underemployed to piechart

  const { profileLoc }  = useContext(MapContext);
  const { laborForceAll, jobMapperGraph, setJobMapperGraph, setBrgySelect, jobSelect, setJobSelect, 
          employmentClassMap, setEmploymentClassMap, jobClassSelect } = useContext(FeaturesContext);
  const { startDate, endDate, currentDomain, currentSubdomain } = useContext(SEEDSContext);

  useEffect(() =>{
    const fetchData = async() => {
      const res = await axios('https://seeds.geospectrum.com.ph/analytics/getsubcategory/single', {
        params: {
          layerKey: 'Employment_Barangay', 
          specific_subcategory: 'job_class'
        }
      });
      setEmploymentClassMap(res.data) 
    };
    fetchData()
  }, [])

  useEffect(() =>{
    if (jobSelect){
      setDataPie_JOB(
        jobSelect["properties"].map(function (value) {
          var object = {
            class: value.job_class,
            name: value.job_class,
            value: value.total,
          }
          return object;
      }))
    }
  }, [jobSelect])

  useEffect(()=>{
    const fetchData = async() => {
      const res = await axios(`https://seeds.geospectrum.com.ph/jobmapper/brgy/single`, {
        params: {
          brgy_id: profileLoc,
          startdate: startDate,
          enddate: endDate,
          job_class: jobClassSelect
        }
      }); 
      setJobSelect(res.data)
      setBrgySelect(res.data)
      const res_graph = await axios(`https://seeds.geospectrum.com.ph/jobmapper/graph`, {
        params: {
          brgy_id: profileLoc,
          startdate: startDate,
          enddate: endDate,
          job_class: jobClassSelect
        }
      });
      setJobMapperGraph(res_graph.data.values)
    }
    fetchData();
  }, [profileLoc, startDate, endDate, jobClassSelect])

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
          <Paper elevation={3} style={{width:"100%", height:700 , overflowY:"scroll"}}>
            <Card style={{backgroundColor:"#FFFEFE", color:"#1b798e", borderRadius: 0, width:"100%"}}>
              <CardHeader title={currentSubdomain} subheader={currentDomain} titleTypographyProps={{
                style: {
                  textAlign: "left", 
                  fontSize:"1.5rem", 
                  wordWrap:"break-word"
                }}}/>
            </Card>
            <CardJob />
          </Paper>
        </Grid>
      </Grid>

      <Grid item container xs={12} spacing={2}>
        <Grid item xs={12} md={12} lg={8} container>
          <Paper elevation={3} style={{
              height: 420, 
              borderRadius:0, 
              width:"100%", 
              textAlign:"center", 
              overflowY:"hidden",
              borderRadius: 0
            }}>
            <br/>
            <ResponsiveContainer height="80%" width="95%">
              <BarChart width={750} height={320} data={jobMapperGraph}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="job_class" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="male" stackId="a" fill="#1b798e" />
                <Bar dataKey="female" stackId="a" fill="#b7e6f1" />
              </BarChart>
            </ResponsiveContainer>
          </Paper >
        </Grid>
        
        <Grid item xs={12} md={12} lg={4} >
          <Paper elevation={3} style={{
              height: 420, 
              borderRadius:0, 
              width:"100%", 
              overflowY:"scroll", 
              overflowX:"hidden"
            }}>
            <br/>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart width={275} height={275} fill="#000000">
                <Pie dataKey="value" data={dataPie_JOB} cx="50%" cy="50%" outerRadius={120} innerRadius={70} label>
                  <br/><br/>
                  {dataPie_JOB.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <Grid style={{padding:50}} container direction="row" xs={12} spacing={2}
              justifyContent="center" alignItems="center">
              {dataPie_JOB.map((entry, index) => (
                <Grid item container direction="row" justifyContent="flex-start" alignItems="center">
                  <StopIcon style={{color:COLORS[index % COLORS.length]}} /> 
                  <Typography>{entry.name}</Typography>
                </Grid>
              ))}
            </Grid>
          </Paper> 
        </Grid>
      </Grid>

      <Grid item container xs={12} spacing={2} >
        <Grid item container>
          <Paper elevation={3} style={{height: '100%', width:"100%"}}>
            <div style={{ height: '70vh', width: '100%' }}>
              { laborForceAll && employmentClassMap ? 
                <DataGrid borderRadius={0} rowHeight={30} pagination rowsPerPageOptions={[25, 50, 100]} 
                  className={classes.root} rows={laborForceAll} 
                  columns={employmentClassMap? columns.concat(employmentClassMap): columns} />
              : <DataGrid borderRadius={0} rowHeight={30} pagination rowsPerPageOptions={[25, 50, 100]} 
                rows={rows} columns={employmentClassMap? columns.concat(employmentClassMap): columns} loading="true"/>}  
            </div>
          </Paper>     
        </Grid>
      </Grid>
    </Grid>  
  );
}