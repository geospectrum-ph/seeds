import React, { useEffect, useContext, useState } from 'react';
import {useHistory} from "react-router-dom";
import axios from 'axios';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { CssBaseline, withStyles, Tooltip, useMediaQuery, Drawer, AppBar, Toolbar, List,
        Divider, IconButton, ListItemIcon, ListItemText } from '@material-ui/core';
import MuiListItem from "@material-ui/core/ListItem";

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import upload from '../../assets/icons/24 SEEDs Populate.ico'
import cat from '../../assets/icons/25 SEEDs Catalogue.ico'
import portal from '../../assets/icons/26 SEEDs Portal.ico'
import profile from '../../assets/icons/27 SEEDs Profile.ico'
import anal from '../../assets/icons/28 SEEDs Analytics.ico'
import admin from '../../assets/icons/36 Legend.png'
import logout from '../../assets/icons/39 Logout.ico'
import help from '../../assets/icons/37 Help.ico'
import logo2 from '../../assets/icons/0 Logo (3D Colored).ico'

import {FeaturesContext} from '../../context/FeaturesContext';
import { SEEDSContext } from '../../context/SEEDSContext';
import { AdminContext } from '../../context/AdminContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY:"scroll"
  }, appBar: {
    zIndex: theme.zIndex.drawer + 1,
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
  }, menuButton: {

  }, hide: {
    display: 'none'
  }, drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  }, drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }), backgroundColor: "#0c343d"
  }, drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }), backgroundColor: "#0c343d",
    overflowX: 'hidden',
    [theme.breakpoints.up('xs')]: {
      width: theme.spacing(9) + 1
    }
  }, toolbar: {
    display: 'flex',
    alignItems: 'center',
    justify: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  }, content: {
    padding: theme.spacing(3)
  }, drawerPaper: { width: 'inherit' },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  }, icon: {
    color: '#fffefe'
  }, leftbutton: {
    color: '#ffffff',
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#1b798e',
    }
  }, textfont1: {
    fontFamily:'LeagueSpartan',
    fontSize: '3rem'
  }, appbarTitle:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: '1',
    color: '#fffefe',
    textAlign: 'center'
  }, colorText: {
    color: "#5aff3d",
    display: 'flex',
    alignItems: 'center'
  }, appbar: {
    backgroundColor: '#0d3c47',
    fontFamily:'LeagueSpartan',
    textAlign: "center",
    height:  '6.7vh',
    zIndex: theme.zIndex.drawer + 1
  }
}));

export default function SeedsCore() {

  const _id = JSON.parse(localStorage.getItem('user'))._id;
  
  const [isUserPrivilegeUploadData, setIsUserPrivilegeUploadData] = useState([])
  const [isUserPrivilegeBrowseData, setIsUserPrivilegeBrowseData] = useState([])
  const [isUserPrivilegeAccessToMap, setIsUserPrivilegeAccessToMap] = useState([])
  const [isUserPrivilegeAccessToProfile, setIsUserPrivilegeAccessToProfile] = useState([])
  const [isUserPrivilegeAccessToAnalysis, setIsUserPrivilegeAccessToAnalysis] = useState([])
  const [isUserPrivilegeManageUsers, setIsUserPrivilegeManageUsers] = useState([])

  const checkUserPrivilege = () => {
    try{
      axios.all([
         axios.get(`https://seeds.geospectrum.com.ph/usermaster/checkUserPrivilege/${_id}/616cec44456bbb1c3c4e5daf`),
         axios.get(`https://seeds.geospectrum.com.ph/usermaster/checkUserPrivilege/${_id}/616cf421e48a071bb478ec56`),
         axios.get(`https://seeds.geospectrum.com.ph/usermaster/checkUserPrivilege/${_id}/617fc3d213d435bdbb7914be`),
         axios.get(`https://seeds.geospectrum.com.ph/usermaster/checkUserPrivilege/${_id}/617fc8d513d435bdbb7914bf`),
         axios.get(`https://seeds.geospectrum.com.ph/usermaster/checkUserPrivilege/${_id}/617fc8f513d435bdbb7914c0`),
         axios.get(`https://seeds.geospectrum.com.ph/usermaster/checkUserPrivilege/${_id}/61892c33219fea59d81938b3`),
      ]).then(responseArr => {
        //this will be executed only when all requests are complete
        setIsUserPrivilegeUploadData(responseArr[0].data); 
        setIsUserPrivilegeBrowseData(responseArr[1].data); 
        setIsUserPrivilegeAccessToMap(responseArr[2].data); 
        setIsUserPrivilegeAccessToProfile(responseArr[3].data);
        setIsUserPrivilegeAccessToAnalysis(responseArr[4].data); 
        setIsUserPrivilegeManageUsers(responseArr[5].data); 
      });
    } catch(e){
      /* console.log(e) */
    }
  }

  useEffect (() => {
    checkUserPrivilege();
  }, []);
  
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const {openLeftDrawer, setOpenLeftDrawer, selectedIndex, setSelectedIndex} = useContext(SEEDSContext)
  const {setLoginDetails} = useContext(AdminContext)
  const {setBrgys, setLegendItems} = useContext(FeaturesContext)

  const handleDrawerOpen = () => {
    setOpenLeftDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenLeftDrawer(false);
  };
  
  const handleListItemClick = (event, index, path) => {
    setSelectedIndex(index);
    history.push(path)
    setOpenLeftDrawer(false);
  };

  const ListItem = withStyles({
    root: {
      "&$selected": {
        backgroundColor: "#1b798e",
        color: "white"
      }, "&$selected:hover": {
        backgroundColor: "#1b798e",
        color: "white"
      }, "&:hover": {
        backgroundColor: "#1b798e",
        color: "white"
      }
    }, selected: {}
  })(MuiListItem);

  const isMatch = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    if (isMatch) {
      setOpenLeftDrawer(false);
    }
  }, [isMatch, openLeftDrawer])

  
  return (
    <div className={classes.root} >
      <CssBaseline />
      <AppBar position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openLeftDrawer,
        })}>
        <Toolbar className={classes.appbar} >
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start"
            className={clsx(classes.menuButton, {
              [classes.toolbar]: openLeftDrawer,
            })}>
            <MenuIcon />
          </IconButton>
          {selectedIndex === 0 ? <h3 style={{cursor: 'default'}} className={classes.appbarTitle}>
            <span className={classes.colorText}> 
              <img src={logo2} style={{height:45, marginTop: 0}} /> &nbsp;SEED</span>s Populate</h3> :
          selectedIndex === 1 ? <h3 style={{cursor: 'default'}} className={classes.appbarTitle}>
            <span className={classes.colorText}>
              <img src={logo2} style={{height:45, marginTop: 0}} /> &nbsp;SEED</span>s Catalogue</h3> :       
          selectedIndex === 2 ?<h3 style={{cursor: 'default'}} className={classes.appbarTitle}>
            <span className={classes.colorText}>
              <img src={logo2} style={{height:45, marginTop: 0}} /> &nbsp;SEED</span>s Map Portal</h3> :
          selectedIndex === 3 ?<h3 style={{cursor: 'default'}} className={classes.appbarTitle}>
            <span className={classes.colorText}>
              <img src={logo2} style={{height:45, marginTop: 0}} /> &nbsp;SEED</span>s Profile</h3> :
          selectedIndex === 4 ?<h3 style={{cursor: 'default'}} className={classes.appbarTitle}>
            <span className={classes.colorText}>
              <img src={logo2} style={{height:45, marginTop: 0}} /> &nbsp;SEED</span>s Analytics</h3>:
          selectedIndex === 5 ?<h3 style={{cursor: 'default'}} className={classes.appbarTitle}>
            <span className={classes.colorText}>
              <img src={logo2} style={{height:45, marginTop: 0}} /> &nbsp;SEED</span>s Admin</h3>:
          <h3 style={{cursor: 'default'}} className={classes.appbarTitle}>
            <span className={classes.colorText}>
              <img src={logo2} style={{height:45, marginTop: 0}} /> &nbsp;SEED</span>s Map Portal</h3> 
          }
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: openLeftDrawer,
          [classes.drawerClose]: !openLeftDrawer
        })} classes={{
          paper: clsx({
            [classes.drawerOpen]: openLeftDrawer,
            [classes.drawerClose]: !openLeftDrawer,
          })
        }}>
        <div className={classes.toolbar}>
          <IconButton className={classes.icon} onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {JSON.stringify(isUserPrivilegeUploadData["is_Privilege"]) === "true" ?
            (<ListItem button key={'SEEDs Populate'} selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0, "/seeds/populate")}
              className={classes.leftbutton}>
              <Tooltip title="SEEDs Populate">
                <ListItemIcon className={classes.icon}>
                  <img src={upload} style={{width: 35}}/> 
                </ListItemIcon>
              </Tooltip>
              <ListItemText className={classes.textfont1} primary={'SEEDs Populate'}/>
            </ListItem>) 
          : null}

          {JSON.stringify(isUserPrivilegeBrowseData["is_Privilege"]) === "true" ?
            (<ListItem button key={'SEEDs Catalogue'} selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1, "/seeds/catalogue")} 
              className={classes.leftbutton}>
              <Tooltip title="SEEDs Catalogue">
                <ListItemIcon className={classes.icon}> <img src={cat} style={{width: 35,}}/> </ListItemIcon>
              </Tooltip>
              <ListItemText className={classes.textfont1} primary={'SEEDs Catalogue'} />  
            </ListItem>) 
          : null}

          {JSON.stringify(isUserPrivilegeAccessToMap["is_Privilege"]) === "true" ?
            (<ListItem button key={'SEED Map Portal'} selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2, "/seeds/mapportal")}
              className={classes.leftbutton}> 
              <Tooltip title="SEEDs Map Portal">
                <ListItemIcon className={classes.icon}><img src={portal} style={{width: 35}}/></ListItemIcon>
              </Tooltip>
              <ListItemText className={classes.textfont1}>SEEDs Map Portal</ListItemText>
            </ListItem>) 
          : null}

          {JSON.stringify(isUserPrivilegeAccessToProfile["is_Privilege"]) === "true" ?
            (<ListItem button key={'SEEDs Profile'} selected={selectedIndex === 3}
              onClick={(event) => handleListItemClick(event, 3, "/seeds/profile")}
              className={classes.leftbutton}> 
              <Tooltip title="SEEDs Profile">
                <ListItemIcon className={classes.icon}><img src={profile} style={{width: 35}}/></ListItemIcon>
              </Tooltip>
              <ListItemText className={classes.textfont1}>SEEDs Profile</ListItemText>
            </ListItem>) 
          : null}

          {JSON.stringify(isUserPrivilegeAccessToAnalysis["is_Privilege"]) === "true" ?
            (<ListItem button key={'SEEDs Analytics'} selected={selectedIndex === 4}
              onClick={(event) => handleListItemClick(event, 4, "/seeds/analytics")}
              className={classes.leftbutton}> 
              <Tooltip title="SEEDs Analytics">
                <ListItemIcon className={classes.icon}><img src={anal} style={{width: 35}}/></ListItemIcon>
              </Tooltip>
              <ListItemText className={classes.textfont1}>SEEDs Analytics</ListItemText>
            </ListItem>) : null
            }

          {JSON.stringify(isUserPrivilegeManageUsers["is_Privilege"]) === "true" ?
            <ListItem button key={'SEEDs Admin'} selected={selectedIndex === 5}
              onClick={(event) => handleListItemClick(event, 5, "/seeds/admin/users")}
              className={classes.leftbutton}> 
              <Tooltip title="SEEDs Admin">
                <ListItemIcon className={classes.icon}><img src={admin} style={{width: 35}}/></ListItemIcon>
              </Tooltip>
              <ListItemText className={classes.textfont1}>SEEDs Admin</ListItemText>
            </ListItem>
          : null}
        </List>
        <Divider />
        <List>
          <ListItem button key={'Logout'} onClick={(event) => {
            handleListItemClick(event, 6, "/login"); 
            localStorage.clear();
            setLoginDetails();
            setBrgys([]);
            setLegendItems([]);
          }} className={classes.leftbutton}>
            <Tooltip title="Logout">          
              <ListItemIcon className={classes.icon}><img src={logout} style={{width: 35}}/></ListItemIcon>
            </Tooltip>
            <ListItemText className={classes.textfont1} primary={'Logout'}/> 
          </ListItem>
                    
          <ListItem button key={'Help'} onClick={(event) => handleListItemClick(event, 7, "/features")}
            className={classes.leftbutton}>
            <Tooltip title="Help">
              <ListItemIcon className={classes.icon}> <img src={help} style={{width: 35}}/> </ListItemIcon>
            </Tooltip>
            <ListItemText className={classes.textfont1} primary={'Help'} /> 
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}