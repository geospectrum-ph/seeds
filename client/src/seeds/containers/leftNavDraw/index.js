import React, { useEffect } from 'react';
import {useHistory} from "react-router-dom";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { CssBaseline, withStyles, Tooltip, useMediaQuery, Drawer, AppBar, Toolbar, List, Divider,
        IconButton, ListItemIcon, ListItemText } from '@material-ui/core';
import MuiListItem from "@material-ui/core/ListItem";

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import cat from '../../assets/icons/25 SEEDs Catalogue.ico'
import portal from '../../assets/icons/26 SEEDs Portal.ico'
import logout from '../../assets/icons/39 Logout.ico'
import help from '../../assets/icons/37 Help.ico'
import logo2 from '../../assets/icons/0 Logo (3D Colored).ico'

import { SEEDSContext } from '../../context/SEEDSContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY:"scroll",
  }, appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }, appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }, menuButton: {

  }, drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  }, drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "#0c343d",
  }, drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#0c343d",
    overflowX: 'hidden',
    [theme.breakpoints.up('xs')]: {
      width: theme.spacing(9) + 1,
    },
  }, toolbar: {
    display: 'flex',
    alignItems: 'center',
    justify: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }, content: {
    padding: theme.spacing(3),
  }, drawerPaper: { width: 'inherit' },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  }, icon: {
    color: '#fffefe',   
  }, leftbutton: {
    color: '#ffffff',
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#1b798e',
    },
  }, textfont1: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '3rem',
  }, appbarTitle:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: '1',
    color: '#fffefe',
    textAlign: 'center',
  }, colorText: {
    color: "#5aff3d",
    display: 'flex',
    alignItems: 'center',
  }, appbar: {
    backgroundColor: '#0d3c47',
    fontFamily: "'Outfit', sans-serif",
    textAlign: "center",
    height:  '6.7vh',
    zIndex: theme.zIndex.drawer + 1,
  }
}));

export default function LeftNavDraw() {
  const classes = useStyles();
  const theme = useTheme();
  const {openLeftDrawer, setOpenLeftDrawer, selectedIndex, setSelectedIndex} = React.useContext(SEEDSContext)
  const history = useHistory();

  const handleDrawerOpen = () => {
    setOpenLeftDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenLeftDrawer(false);
  };
  
  const handleListItemClick = (event, index, path, theme) => {
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
        <Toolbar className={classes.appbar}>
          <IconButton color="inherit" onClick={handleDrawerOpen} edge="start"
            className={clsx(classes.menuButton, {
              [classes.toolbar]: openLeftDrawer,
            })}>
            <MenuIcon />
          </IconButton>
          {selectedIndex === 0 ? 
            <h3 style={{cursor: 'default'}} className={classes.appbarTitle}>
              <span className={classes.colorText}> 
                <img src={logo2} style={{height:45, marginTop: 0}} /> 
                &nbsp;SEED</span>s Catalogue
            </h3> :       
          selectedIndex === 1 ? 
            <h3 style={{cursor: 'default'}} className={classes.appbarTitle}>
              <span className={classes.colorText}> 
                <img src={logo2} style={{height:45, marginTop: 0}} /> 
                  &nbsp;SEED</span>s Map Portal
            </h3>
          : <h3 style={{cursor: 'default'}} className={classes.appbarTitle}>
            <span className={classes.colorText}> 
              SEED</span>s Map Portal
          </h3> }
        </Toolbar>
      </AppBar>
      
      <Drawer variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: openLeftDrawer,
          [classes.drawerClose]: !openLeftDrawer,
        })}
        classes={{
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
        <Divider/>
        <List>
          <ListItem button key={'SEEDs Catalogue'} selected={selectedIndex === 1} className={classes.leftbutton}
            onClick={(event) => handleListItemClick(event, 1, "/seeds/catalogue")}>
            <Tooltip title="SEEDs Catalogue"> 
              <ListItemIcon className={classes.icon}> 
                <img src={cat} style={{width: 35,}}/> 
              </ListItemIcon>
            </Tooltip>
            <ListItemText primaryTypographyProps={classes.textfont1} primary={'SEEDs Catalogue'} />  
          </ListItem>

          <ListItem button key={'SEED Map Portal'}  selected={selectedIndex === 2} className={classes.leftbutton}
            onClick={(event) => handleListItemClick(event, 2, "/seeds/mapportal")}> 
            <Tooltip title="SEEDs Map Portal">
              <ListItemIcon className={classes.icon}> 
                <img src={portal} style={{width: 35}}/> 
              </ListItemIcon>
            </Tooltip>
            <ListItemText className={classes.textfont1} >
              SEEDs Map Portal
            </ListItemText>
          </ListItem>
        </List>

        <Divider/>

        <List>
          <ListItem button key={'Logout'} className={classes.leftbutton}
            onClick={(event) => {handleListItemClick(event, 6, "/login"); 
              localStorage.removeItem("user");
            }}>
            <Tooltip title="Logout">          
              <ListItemIcon className={classes.icon}><img src={logout} style={{width: 35}}/></ListItemIcon>
            </Tooltip>
            <ListItemText className={classes.textfont1} primary={'Logout'} /> 
          </ListItem>
                    
          <ListItem button key={'Help'} className={classes.leftbutton}
            onClick={(event) => handleListItemClick(event, 7, "/features")}>
            <Tooltip title="Help">
              <ListItemIcon className={classes.icon}> 
                <img src={help} style={{width: 35}}/> 
              </ListItemIcon>
            </Tooltip>
            <ListItemText className={classes.textfont1} primary={'Help'}/> 
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}