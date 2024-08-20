import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LayersIcon from '@material-ui/icons/Layers';
import MapIcon from '@material-ui/icons/Map';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import MapLayer from './mapLayer'

import {Accordion, AccordionSummary, AccordionDetails,
  Typography, RadioGroup, Radio, FormGroup, FormControlLabel, Switch, Tooltip} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FeaturesContext } from '../../context/FeaturesContext'
import { MapContext } from '../../context/MapContext'

const drawerWidth = '240';

const basemapChoices = [
  {
    label: 'OSM Light',
    value: 'osm_light'
  },

  {
    label: 'Stadia Dark',
    value: 'stadia'
  },

  {
    label: 'ESRI World Imagery',
    value: 'esri'
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  list: {
    width: 250,
    height: '100vh',
    backgroundColor: '#0c343d',
    color: '#fffefe',
    padding: 10
  },
  fullList: {
    width: 'auto',
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: '#0c343d',
    color: "#0c343d",
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    backgroundColor: '#0c343d',
  },
  // toolbar: {
  //   display: 'flex',
  //   backgroundColor: '#1b798e',
  //   alignItems: 'center',
  //   justifyContent: 'flex-end',
  //   padding: theme.spacing(0, 1),
  //   necessary for content to be below app bar
  //   ...theme.mixins.toolbar,
  // },
  //   color: "#0c343d",
  // },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  icon: {
    // backgroundColor: '#0c343d',
    color: '#fffefe',
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#1b798e'
    }
  },
  rightbutton: {
    color: '#ffffff',
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#1b798e',
    }
  },
  accordion1: {
    backgroundColor: '#0d3c47',
    color: '#ffffff',
    '&:hover': {
      // color: '#fffefe',
      backgroundColor: '#1b798e',}
  },
  accordiondetails1: {
    backgroundColor: '#1b798e',
    // backgroundColor: '#29b5d5',
    
    color: '#ffffff',
    '&:hover': {
    //   // color: '#fffefe',
    //   backgroundColor: '#0d3c47',}
  },

  accordiondetailshover1: {
    // backgroundColor: '#29b5d5',
    // backgroundColor: '#29b5d5',
    color: '#ffffff',
      backgroundColor: '#0d3c47',}
  }
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const {selected} = React.useContext(FeaturesContext)
  const {basemap, setBasemap, checked, setChecked} = React.useContext(MapContext)
  const [open, setOpen] = React.useState(false);
  const [optwo, setOptwo] = React.useState(false);
  const [opthree, setOpthree] = React.useState(false);
  

  const basemaps = {
    osm_light: {
      attribution: '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      id: 'mapbox.light'
    },

    stadia: {
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
      id: 'mapbox.light'
    },

    esri: {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      id: 'mapbox.light'
    },
};

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChecked = (event) => {
    // setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer anchor="right" variant="permanent" className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })} 
        classes={{ paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
          }),}}>
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerOpen} className = {classes.icon}>
            {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
        
        <Tooltip title="Search">
          <ListItem className={classes.rightbutton} button onClick={()=>setOpthree(!opthree)}>
            <ListItemIcon className={classes.icon}><SearchIcon/></ListItemIcon>
            <ListItemText primary={'Search'} />
          </ListItem>
        </Tooltip>

        
        <Tooltip title="Layer Groups">
          <ListItem className={classes.rightbutton} button onClick={()=>setOptwo(!optwo)}>
            <ListItemIcon className={classes.icon}><LayersIcon/></ListItemIcon>
            <ListItemText primary={'Layer Groups'} />
          </ListItem>
        </Tooltip>

        {/* <ListItem className={classes.rightbutton} button>
          <Accordion style={{backgroundColor: '#0c343d', color:'#fffefe'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" 
              id="panel1a-header">
              <ListItemIcon className={classes.icon}><LayersIcon/></ListItemIcon>
              <Typography>Layer Groups</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                {selected ? selected.map((layer)=>{
                  return(
                    <FormControlLabel
                      control={<Switch onChange={handleChecked} name={layer} />}
                      label={layer}
                    />
                  )}) : <Typography>No selected layers found. Please select from the SEED Catalogue.</Typography>
                }
              </FormGroup>
            </AccordionDetails>
          </Accordion>
        </ListItem> */}
      <Tooltip title="SEEDs">
      <ListItem className={classes.rightbutton} button>
        <ListItemIcon className={classes.icon}><FilterListIcon/></ListItemIcon>
        <ListItemText primary={'SEEDS'} /> 
      </ListItem>
      </Tooltip>
      </List>
      </Drawer>

      <Drawer anchor='right' open={optwo} 
        onClose={()=>setOptwo(false)}>
        <div className={clsx(classes.list)}
          role="presentation" onKeyDown={()=>setOptwo(!optwo)}>
          <Typography variant='h5'>Layers Group</Typography>
          <Divider/>
          <br/>
          
          <FormGroup>
            {selected ? selected.map((layer)=>{
              return(
                <FormControlLabel control={<Switch onChange={()=>setChecked(!checked)} name={layer} />}
                  label={layer}/>
              )}) : <Typography variant='body2'>No selected layers found. Please select from the SEED Catalogue.</Typography>
            }
          </FormGroup>
        </div>
      </Drawer>
      <Drawer anchor='right' open={opthree} 
        onClose={()=>setOpthree(false)}>
        <div className={clsx(classes.list)}
          role="presentation" onKeyDown={()=>setOpthree(!opthree)}>
          <Typography variant='h5'>Search</Typography>
          <Divider/>
          <br/>
          
          <TextField variant="filled" fullWidth style={{color: '#fffefe'}} label="Search places" />
          
        </div>
      </Drawer>
    </div>
  );
}