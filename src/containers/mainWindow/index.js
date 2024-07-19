import React, {useEffect, useContext, useState} from 'react';
import axios from 'axios';
import {Grid, TextField, InputAdornment, Button, IconButton, Drawer, Toolbar, Typography} from '@material-ui/core';
import {FeaturesContext} from '../../context/FeaturesContext';

import "./index.css"
import 'leaflet/dist/leaflet.css';
import LeftNav from '../leftNav/index.js'
import LeftNavSwipeable from '../leftNavSwipeable'

import { MapContext } from '../../context/MapContext';
import { SEEDSContext } from '../../context/SEEDSContext';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import SeedsPopulate from '../leftNav/seedsPopulate';
import SeedsCatalogue from '../leftNav/seedsCatalogue';
import SeedsMapPortal from '../leftNav/seedsMapPortal';
import SeedsFeatures from '../seedsFeatures';
// import MapLayer from '../rightNavDraw/mapLayer'
import SeedsMapPortalLayer from '../rightNavDraw/mapLayer';
import SeedsAnalytics from '../seedsAnalytics';
// import Dashboard from '../sampleDash/Dashboard';

// import LeftHehe from '../lefthehe/leftHehe.js'

import Scroll from "../seedsFeatures/scroll";
import Tutorial from "../tutorial"
import { HashRouter as Router, Switch, Route, Link, useHistory} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  backgroundall : {
    backgroundColor: '#bbbbbb',
  },
  appbar: {
    // width: '100vw',
    // background: 'none',
    // background: '#122820',
    backgroundColor: '#0d3c47',
    // fontFamily:'Nunito',
    fontFamily:'LeagueSpartan',
    // fontFamily:'GlacialIndifference',
    // fontFamily:'Montserrat',
    // fontFamily: 'Lora'
    textAlign: "center",
    fontSize: "1.25rem",
    // height: '10%',
  },  
  appbarTitle:{
    flexGrow: '1',
    color: '#fffefe',
  },
  colorText: {
    color: "#5aff3d"
  },

  // body: {
  //   display:"flex",
  //   flexDirection: "row",
  //   height: '80vh',
  //   width: '95vw',
  // },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
function MainWindow(match) {
  const classes = useStyles();
  const { setDataCat, setDataShow, select} = useContext(FeaturesContext)
  const { setLayerside, setLegend} = useContext(MapContext)
  const [selected, setSelected] = useState();
  const { setHealthAll, setCommercialAll, setLaborForceAll, setDd, setPoints, setLandUseAll } = React.useContext(SEEDSContext);
  const { selectedIndex, setSelectedIndex } = React.useContext(FeaturesContext);

  useEffect (() => {
    const fetchData = async () => {
      const res = await axios('http://ec2-52-55-74-109.compute-1.amazonaws.com/barangay/', ); //ito yung gagamitin pag sa web yung server
      const res3 = await axios('http://ec2-52-55-74-109.compute-1.amazonaws.com/healthmapper/brgy/all', ); //ito yung gagamitin pag sa web yung server
      const res2 = await axios('http://ec2-52-55-74-109.compute-1.amazonaws.com/getdata/barangays', ); //ito yung gagamitin pag sa web yung server
      const res4 = await axios('http://ec2-52-55-74-109.compute-1.amazonaws.com/metadata/',); //ito yung gagamitin pag sa web yung server
      // const res = await axios('http://localhost:5000/metadata/', ); //ito yung gagamitin pag sa local machine yung server
      const res5 = await axios('http://ec2-52-55-74-109.compute-1.amazonaws.com/healthmapper/allpoints',);
      const res6 = await axios('http://ec2-52-55-74-109.compute-1.amazonaws.com/commercialmapper//brgy/all',);
      const res7 = await axios('http://ec2-52-55-74-109.compute-1.amazonaws.com/jobmapper//brgy/all',);
      const res8 = await axios('http://ec2-52-55-74-109.compute-1.amazonaws.com/landuse/brgy/all',);
  
      // setHealthAll(res3.data)
      setDd(res2.data)
      setPoints(res5.data)
    
// SOCIAL - healthmapper
      setHealthAll(res3.data.values.map((x)=>{return { 
        barangay: x.properties.brgy_name,
        id: x.properties.brgy_id,
        active: x.properties.active,
        recovered: x.properties.recovered,
        death: x.properties.death,
      }}));
// ECONOMIC - commercialmapper
      setCommercialAll(res6.data.values.map((x)=>{return { 
        barangay: x.properties.brgy_name,
        id: x.properties.brgy_id,
        energy: x.properties.Energy,
        food: x.properties.Food,
        transport: x.properties.Transport,
        // properties: x.properties,

      }}));
      // barangay: "Niog III"
      // capitalization: undefined
      // employee_count: undefined
      // id: "42103052"
      // institution_count: undefined
      // __proto__: Object
      // console.log("RES6",res6.data)
      // console.log("RES7",res7.data)

      
      setLaborForceAll(res7.data.values.map((x)=>{return { 
        id: x.properties.brgy_id,
        MGR: x.properties["1"],
        PRF: x.properties["2"],
        TAP: x.properties["3"],
        CSW: x.properties["4"],
        SSW: x.properties["5"],
        SAFFW: x.properties["6"],
        CRTW: x.properties["7"],
        PMO: x.properties["8"],
        EO: x.properties["9"],
        AFS: x.properties["10"],
        UND: x.properties["11"],
        UNEMP: x.properties["12"],

        // PRF: x.properties.[1],
        // TAP: x.properties.[2],
        barangay: x.properties.brgy_name,
        // capitalization: x.properties.capitalization_total,
      }}));

      // LAND USE MAPPER
      setLandUseAll(res8.data.values);

      setSelected(res.data[0]);
      // setDataCat(res4.data.map((x)=>{return { 
      //   name: x.name,
      //   id: x.id,
      //   type: x.type === "shp" ? "Vector" : x.type === "tif" ? "Raster" : "Table",
      //   tag: [ x.social ? "Social": null, x.economic ? "Economic" : null, 
      //         x.environmental ? "Environmental" : null, x.demographic? "Demographic" : null ].filter(x=>x),
      //   downloaded: false,
      //   keywords: x.properties.keywords

      // }}));
      // setDataShow(res4.data.map((x)=>{return { 
      //   name: x.name,
      //   id: x.id,
      //   type: x.type === "shp" ? "Vector" : x.type === "tif" ? "Raster" : "Table",
      //   tag: [ x.social ? "Social": null, x.economic ? "Economic" : null, 
      //         x.environmental ? "Environmental" : null, x.demographic? "Demographic" : null ].filter(x=>x),
      //   downloaded: false,
      //   keywords: x.properties.keywords
      // }}));
      setDataCat(res4.data);
      setDataShow(res4.data);

    }

    fetchData();
  }, [])

  // const getBrgy = (name) =>{
  //   const fetchData = async () => {
  //     const x = await axios.get('http://localhost:5000/barangay/', { params: {properties: {brgy_name: name}}} );

  //     console.log(name)
  //     console.log(x)
  //     setSelected(x.data)
  //   }

  //   fetchData();
  // }

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setLayerside(open);
  };

  // const [selectedIndex, setSelectedIndex] = React.useState(false);
  const { checked, setChecked } = useContext(FeaturesContext);
  const { open, setOpen } = useContext(FeaturesContext);
  // console.log("checked",checked)
  // console.log("open",open)

  return (
    <Router>
        <Switch>  
          <Grid container className="backgroundall" style={{ backgroundColor: '#fffefe', zIndex: '1', scroll: 'hidden'  }} >
            <Grid item className="seeds">
              {/* <LeftNav /> */}
              <LeftNavSwipeable/>
              {/* <LeftHehe /> */}
              {/* <Dashboard/> */}
            </Grid>
            {/* {checked==true && open!=true?null: <Tutorial/>} */}
            {/* checked!= && open!=true ? null : null} */}
            {/* <Tutorial/> */}
                
      <Grid item container justify="flex-end"  >
        
        <Route path="/map/seedspopulate" >
          <Grid item style={{position:"absolute",top:"7vh"}}>  
            <SeedsPopulate />
            {/* kyeme */}
          </Grid>
        </Route>

        <Route path="/map/seedscatalogue" >
          <Grid item xs={12} style={{position:"absolute",top:"7vh"}}>  
            <SeedsCatalogue/>
          </Grid>
        </Route> 

        <Route path="/map/seedsmapportal" >
          <Grid container style={{position:"absolute",top:"6.8vh",left:"3.8vw", direction: 'row', backgroundColor:'#0d3c47', width: window.innerWidth-73, height: window.innerHeight-64, scroll: 'hidden'}}>  
            
            <Grid item xs>
          {/* <Toolbar className={classes.appbar}><h3 className={classes.appbarTitle}><span className={classes.colorText}>  SEED</span>s Map Portal</h3></Toolbar> */}

            <SeedsMapPortal/>
            </Grid>
            <Grid item >
            <SeedsMapPortalLayer/>
            </Grid>
          </Grid>
        </Route>
        
        

        <Route path="/map/seedsprofile" >
          <Grid xs={12} style={{position:"absolute",top:"7vh"}}>  
            <SeedsFeatures />
          </Grid>
        </Route>

        <Route path="/map/seedsanalytics" >
          <Grid item  style={{position:"absolute",top:"45vh", left:"45vw"}}>  
            <SeedsAnalytics/>
            {/* <Typography>This feature is in construction</Typography> */}
          </Grid>
        </Route> 
        
        
      </Grid>
      <Scroll showBelow={250} />
    
      
    </Grid>
    </Switch>
  </Router>
  );
}

export default MainWindow;
