import React, {useContext, useEffect}  from 'react';
import axios from 'axios';
import { Card, CardHeader, Paper, Grid, Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { PieChart, Pie, Legend, Tooltip, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
        ResponsiveContainer } from 'recharts';

import CardLandUse from './1-cardLandUse';
import SeedsMap from '../seedsProfileMap';

import {FeaturesContext} from '../../../context/FeaturesContext';
import { SEEDSContext } from '../../../context/SEEDSContext'
import { MapContext } from '../../../context/MapContext'

const useStyles = makeStyles((theme) => ({
  root1: {
    justify:"center",
    formControlLabel: {
    fontSize: '0.5em',
    height: '0.5em',
    lineHeight: '0.5em'
  }, customTooltip: {
    backgroundColor:"white",
    padding: 20,
    borderRadius: 0
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
      color: "#0c343d"
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
  { headerName: 'Commercial Development Zone', field: 'Commercial Development Zone', width: 150,  },
  { headerName: 'Urban Core Zone', field: 'Urban Core Zone',  width: 150, },
  { headerName: 'Coastal Development Zone', field: 'Coastal Development Zone',  width: 150, },
  { headerName: 'Light Industrial Development Zone', field: 'Light Industrial Development Zone',  width: 150, },
  { headerName: 'Agricultural Development Zone', field: 'Agricultural Development Zone',  width: 150, },
  { headerName: 'Building Restricted Development Zone', field: 'Building Restricted Development Zone',  width: 150, },
  { headerName: 'Ecological Development Zone', field: 'Ecological Development Zone',  width: 150, },
  { headerName: 'Urban Expansion Zone', field: 'Urban Expansion Zone',  width: 150, },
];

const CustomTooltip = ({ active, payload }) => {
  const classes = useStyles();
  if (active && payload && payload.length) {
    return (
      <Paper className={classes.customTooltip}>
        <Typography style={{padding:10}}>{`${payload[0].name}: ${payload[0].value} %`}</Typography>
      </Paper>
    );
  }

  return null;
};

export default function ExistingLandUse() { 
  const classes = useStyles();

  const { profileLoc }  = useContext(MapContext);
  const { landUseAll, landUseGraph, setLandUseGraph, setBrgySelect, setLandUseSelect, 
          landUseColor } = useContext(FeaturesContext);
  const { currentDomain, currentSubdomain } = useContext(SEEDSContext);

  useEffect(()=>{
    const fetchData = async() => {
      const res = await axios(`https://seeds.geospectrum.com.ph/landuse/brgy`, {
        params: {brgy_id: profileLoc}
      }); //ito yung gagamitin pag sa web yung server
      
      setBrgySelect(res.data) 
      setLandUseSelect(res.data)

      const res_graph = await axios('https://seeds.geospectrum.com.ph/landuse/graph', {
        params: {brgy_id: profileLoc}
      });

      setLandUseGraph(res_graph.data)
    }
    // fetchData()
  }, [profileLoc])

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
          <Paper elevation={3} style={{width:"100%",height: 700,borderRadius: 0,}}>
            <Card style={{backgroundColor:"#FFFEFE", color:"#1b798e",borderRadius: 0, width:"100%"}}>
              <CardHeader titleTypographyProps={{style: {textAlign: "left", fontSize:"1.5rem", wordWrap:"break-word"}}}
                title={currentSubdomain} subheader={currentDomain}>
              </CardHeader>
            </Card>
            <CardLandUse/>
          </Paper>
        </Grid>
      </Grid>
      <Grid item container xs={12} spacing={2}>
        <Grid item xs={12} md={12} lg={8} container>
          <Paper elevation={3} style={{height: 420, borderRadius:0, width:"100%", textAlign:"center", overflow:"hidden"}}>
            <br/>
            <ResponsiveContainer height="80%" width="95%">
              <BarChart width={750} height={320} data={landUseGraph} layout="vertical"
                margin={{
                  top: 20,
                  right: 30,
                  left: 250,
                  bottom: 5,
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="area"/>
                <YAxis type="category" dataKey="name" tick={{ fontSize: 14, width: 250 }}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="area" stackId="a" fill="#1b798e">
                  {landUseGraph ?
                    landUseGraph.map((entry, index) =>
                      (<Cell key={`cell-${index}`} fill={landUseColor.filter((x)=>{return x.name === entry.name })[0]
                        .fillColor} />)
                    )
                  :null}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <br/>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={4} >
          <Paper elevation={3} style={{height: 420, borderRadius:0, width:"100%", overflowY:"scroll"}}>
            <br/>
            {landUseGraph?
              <ResponsiveContainer width="100%" height="80%">
                <PieChart width={275} height={275} fill="#000000">
                  <Pie dataKey="percent" data={landUseGraph} cx="50%" cy="50%" outerRadius={120} innerRadius={70} label>
                    {landUseGraph ?
                      landUseGraph.map((entry, index) =>
                        (<Cell key={`cell-${index}`} fill={landUseColor.filter((x)=>{return x.name === entry.name })[0]
                          .fillColor} />)
                      )
                    : null}
                  </Pie>
                  <Tooltip content={<CustomTooltip />}/>
                </PieChart>
              </ResponsiveContainer>
            : null}
            <Grid style={{paddingLeft:50}} container direction="row" xs={12} spacing={2}
              justifyContent="center" alignItems="center">
              {landUseGraph ? 
                landUseGraph.map((entry, index) =>
                  (<Cell key={`cell-${index}`} fill={landUseColor.filter((x)=>{return x.name === entry.name })[0]
                    .fillColor} />)
                )
              : null}
            </Grid>
          </Paper> 
        </Grid>
      </Grid>
      <Grid item container xs={12} spacing={2}>
        <Grid item container>
          <Paper elevation={3} style={{height: '100%', width:"100%"}}>
            <div style={{ height: '70vh', width: '100%' }}>
              { landUseAll ?
                <DataGrid borderRadius={0} rowHeight={30} pagination rowsPerPageOptions={[25, 50, 100]} 
                  className={classes.root} rows={landUseAll.filter((x)=>{return x.id !== null})} columns={columns}/>
                :<DataGrid borderRadius={0} rowHeight={30} pagination rowsPerPageOptions={[25, 50, 100]} 
                  rows={rows} columns={columns} loading="true"/>
              }  
            </div>
          </Paper>     
        </Grid>
      </Grid>
    </Grid>
  );
}