import React, { useEffect, useContext, useState } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import clsx from 'clsx';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles'

import { Grid } from '@material-ui/core';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

import 'leaflet/dist/leaflet.css';

import SeedsPopulate from '../seedsCore/seedsPopulate';
import SeedsCatalogue from '../seedsCore/seedsCatalogue';
import SeedsMapPortal from '../seedsCore/seedsMapPortal';
import SeedsFeatures from '../seedsProfile';
import SeedsAnalytics from '../seedsAnalytics';
import SeedsAdmin from '../seedsAdmin'
import LeftNav from '../seedsCore';
import MiniDrawer from '../leftNavDraw'

import { AdminContext } from '../../context/AdminContext';
import { SEEDSContext } from '../../context/SEEDSContext';
import { FeaturesContext } from '../../context/FeaturesContext';

import Scroll from '../scroll';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: '#0d3c47',
    fontFamily: "'Outfit', sans-serif",
    textAlign: "center",
    fontSize: "1.25rem"
  }, appbarTitle:{
    flexGrow: '1',
    color: '#fffefe'
  }, colorText: {
    color: "#5aff3d"
  }, appBar: {
    marginLeft: 73,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })
  }, appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    })
  }
}))

export default function MainWindow() {
  const { setDiseaseIncidenceAll, setCommercialAll, setLaborForceAll, setPoints, 
          setLandUseAll, setBrgys, legendItems, setLegendItems } = React.useContext(FeaturesContext);
  const {openLeftDrawer} = useContext(SEEDSContext)
  const {loginDetails, setLoginDetails, setGroupPrivilege, sessionData, 
          setSessionData, sessionFile, setSessionFile} = useContext(AdminContext)
          
  const [selected, setSelected] = useState();
  const [sessionOpen, setSessionOpen] = useState(false)

  const history = useHistory();
  const classes = useStyles();

  useEffect (() => {
    if(localStorage.getItem('user')){
      const interval = setInterval(() => {
        setLoginDetails(localStorage.removeItem('user'))
        setSessionData()
        history.push('/')
      }, 43200000)
    // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    return () => clearInterval(interval); 
    }
  }, [])

  useEffect (() => {
    setLoginDetails(localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : loginDetails)
    if(localStorage.getItem('user')){
       setSessionOpen(true)
      const fetchFiles = async() => {
        const file = await axios.get("https://seeds.geospectrum.com.ph/session/file/"
          +JSON.parse(localStorage.getItem('user'))._id)
        setSessionFile(file.data)
      }
      fetchFiles()
    }
    
    const fetchData = async () => {
      const res = await axios('https://seeds.geospectrum.com.ph/barangay/', ); 
      const res3 = await axios('https://seeds.geospectrum.com.ph/healthmapper/brgy/all', );
      const res5 = await axios('https://seeds.geospectrum.com.ph/healthmapper/allpoints',);
      const res6 = await axios('https://seeds.geospectrum.com.ph/commercialmapper/brgy/all',);
      const res7 = await axios('https://seeds.geospectrum.com.ph/jobmapper//brgy/all',);
      const res8 = await axios('https://seeds.geospectrum.com.ph/landuse/brgy/all',);
      const userGroupPrivileges = await axios.get("https://seeds.geospectrum.com.ph/groupprivilege"); 
      setGroupPrivilege(userGroupPrivileges.data);
      setPoints(res5.data)
     
      // SOCIAL - healthmapper
      setDiseaseIncidenceAll(res3.data.values.map((x)=>{return { 
        barangay: x.properties.brgy_name,
        id: x.properties.brgy_id,
        active: x.properties.active,
        recovered: x.properties.recovered,
        death: x.properties.death
      }}));

      // ECONOMIC - commercialmapper
      setCommercialAll(res6.data.values.map((x)=>{ 
        x.properties['id'] = x.properties.brgy_id
        return x.properties 
      }));
      
      setLaborForceAll(res7.data.values.map((x)=>{ 
        x.properties['id'] = x.properties.brgy_id
        return x.properties 
      }));
      setLandUseAll(res8.data.values);
      setSelected(res.data[0]);
    }
    fetchData();
  }, [])

  const handleSessionClose = () => {
    setSessionData({
      userId: JSON.parse(localStorage.getItem('user'))._id,
      populate: {
        mapName: '',
        file: '',
        social: false,
        economic: false,
        environmental: false,
        demographic: false,
        type: '',
        keywords: [],
        description: '',
        language: '',
        license: '',
        doi: '',
        attribution: '',
        regions: '',
        dqs: '',
        restrictions: '',
        constraints: '',
        details: ''
      },
      catalogue: {
        Social: true,
        Economic: true,
        Environmental: true,
        Demographic: true,
        Vector: true,
        Raster: true,
        Table: true,
        keywords: [],
      },
      map: '',
      profile: '',
      analytics: ''
    })
    setSessionOpen(false)
  }
  const handleSessionRestore = () => {
    const fetchSession = async() =>{
      const sessionData = await axios.get("https://seeds.geospectrum.com.ph/session/get?userId=" 
        + JSON.parse(localStorage.getItem('user'))._id); 

      if (sessionData !== null) {
        setSessionData(sessionData.data)
        if (sessionData.data.map.layers){
          const fetchBrgys = async(i) => {
            const res = await axios.get(`https://seeds.geospectrum.com.ph/getdata/`,
              {params:{id: sessionData.data.map.layers[i]}})
            const res2 = await axios.get(`https://seeds.geospectrum.com.ph/getdata/sld`,
              {params:{metadataID: sessionData.data.map.layers[i]}})
  
            setBrgys(brgys => [...brgys, res.data])
            var legendStyles = legendItems // weird na pag cinomment out ko to, nawawala yung ibang legend,
            await legendStyles.push(res2.data) // eh di ko naman ginamit. dahil sa await?
            setLegendItems([...legendItems])
          }
  
          if (sessionData.data.map.layers.length > 1){
            for (var i = 0; i < selected.length; i++){
              fetchBrgys(i)
            }
          } else {
            fetchBrgys(0)
          }
        }
      } else {
        const create = async() => {
          const createSession = await axios.post("https://seeds.geospectrum.com.ph/session/create", {
            userId: JSON.parse(localStorage.getItem('user'))._id,
            populate: '',
            catalogue: '',
            map: '',
            profile: '',
            analytics: ''
          }).then(()=>{
            // console.log("success")
        })
        }
        create()
        setSessionData({
          userId: JSON.parse(localStorage.getItem('user'))._id,
          populate: '',
          catalogue: '',
          map: '',
          profile: '',
          analytics: ''
    
        })
      }
    }
    fetchSession();
    setSessionOpen(false)
  }

  return (
    <Grid container direction="row" style={{overflowX:"clip"}}  justifyContent="center" alignItems="flex-end">
      <Scroll showBelow={250}/> 

      {loginDetails? loginDetails.user_type !== 'guest' ? <LeftNav/>: <MiniDrawer/>: null}
      <Grid item xs={11} md={12} lg={12} style={{marginTop:64.5,backgroundColor:"#e6ebec"}}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openLeftDrawer,
        })} >
        {loginDetails? loginDetails.user_type !== 'guest' ? sessionData ? 
          <Dialog open={sessionOpen} onClose={handleSessionClose}>
            <DialogTitle>
              {"Session restore"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Do you want to restore previous session?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSessionClose}>No</Button>
              <Button onClick={handleSessionRestore} autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        : null : null : null}
        <Switch>
          {JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).user_type.user_group_type ? (
          <>
            <Route path="/seeds/populate">
              <SeedsPopulate/>
            </Route>

            <Route path="/seeds/catalogue">
              <SeedsCatalogue/>
            </Route>

            <Route path="/seeds/mapportal">
              <SeedsMapPortal/>
            </Route>

            <Route path="/seeds/profile">
              <SeedsFeatures/>
            </Route>

            <Route path="/seeds/analytics">
              <SeedsAnalytics/>
            </Route>

            <Route path="/seeds/admin">
              <SeedsAdmin/>
            </Route>
          </>
          ): JSON.parse(localStorage.getItem('user')).user_type === 'guest' ? (
          <>
            <Route path="/seeds/catalogue">
              <SeedsCatalogue/>
            </Route>

            <Route path="/seeds/mapportal">
              <SeedsMapPortal/>
            </Route>

            <Route path="/seeds/profile">
              <SeedsFeatures/>
            </Route>

            <Route path="/seeds/analytics">
              <SeedsAnalytics/>
            </Route>
          </>
          ): null
          : 
          // null
          (<>
            <Route path="/seeds">
              <Redirect to='/login' />
            </Route>
          </>)}
          <Redirect from="*" to='/' />
        </Switch>
      </Grid>
    </Grid>
  );
}