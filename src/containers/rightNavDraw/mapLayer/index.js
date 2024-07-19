import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Typography, Grid, Collapse, Button, Paper, Card, CardHeader, Tooltip} from '@material-ui/core';
import { HashRouter as Router, Switch, Route, Link, useHistory} from "react-router-dom";
import { MapContext } from '../../../context/MapContext'
import { FeaturesContext } from '../../../context/FeaturesContext'
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import DataCatalogueForEdit2 from '../../leftNav/seedsCatalogue'
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

const drawerWidth = 300;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: drawerWidth,
    padding: '1vw',
    height: window.innerHeight-67,
    backgroundColor: '#0c343d',
    color: '#fffefe',
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
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  login1: {
    border: 0,
    borderRadius: 0,
    backgroundColor: '#1b798e',
    color: '#ffffff',
    // fontSize: '1rem',
    // height: '5vh',
    // top: '2vh',
    // width: '100vw',
    padding: ' 5px',
    // fontFamily:'Nunito',
    fontFamily:'LeagueSpartan',
    // fontFamily:'GlacialIndifference',
    // fontFamily:'Montserrat',
    // fontFamily: 'Lora'
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922',
      // padding:'30 px',
      // border:"round",
    }
  },
  divider: {
    // color: "#fffefe",
    backgroundColor:"#fffefe"
  }
})); 

const LegendLayer = (layer) => {
  // console.log("LEGENDLAYER", layer)
  const legendName = layer.layer.name || layer.layer.metadataID || "Untitled Layer"
  const legendStyle = layer.layer.style
  const [checked, setChecked] = useState(false)
  const history = useHistory();

  return(
    // <div style={{ display: 'flex',  flexDirection: 'column', justify: 'center', alignItems: 'flex-start', overflowY: 'scroll', height: '78vh', overflowX: 'hidden'}}>
      <div>
        <div style={{ display: 'flex',  flexDirection: 'row', justify: 'flex-start', alignItems: 'center',}}>
          {/* <IconButton style={{width: '50px'}} key={index} onClick={()=>setChecked(false)}><VisibilityIcon style={{color: '#0c343d'}}/></IconButton>  */}
          <Typography>{legendName}</Typography>
          <IconButton style={{width: '50px'}} onClick={()=>setChecked(!checked)}>{checked? <ExpandLess style={{color: '#ffffff'}}/>: <ExpandMore style={{color: '#ffffff'}}/>}</IconButton>
        </div>
        <Collapse in={checked}>
        {legendStyle.map((x, i) => {
          let fillColor = x.fillColor
          return(
            <div key={i} style={{ display: 'flex',  flexDirection: 'row', alignItems: 'center', justify: 'flexStart'}}>
              <div style={{ backgroundColor: fillColor, width: '10px', height: '10px'}}/>
              <Typography>&nbsp;{x.name}</Typography>
            </div>
          )
        })}
        </Collapse>
    </div>
  )
}

export default function MapLayer(props) {
  const classes = useStyles();
  const theme = useTheme();
  // const [open, setOpen] = React.useState(props.open);
  const {selected, brgys, layerList, legendItems} = React.useContext(FeaturesContext)
  const {layerside, setLayerside, checked, setChecked, legend} = React.useContext(MapContext)
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  // const handleDrawerOpen = () => {
  //   setOpen(!open);
  // };

  // const handleDrawerClose = () => {
  //   setLayerside(false);
  // };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container direction='column'>
        <Grid item container direction='row' justify='space-between' align="center">
          <Grid item className={classes.toolbar}>
            {/* <Grid item> */}
            <Typography>Layer Groups</Typography>
          </Grid>
            {/* <IconButton onClick={handleDrawerClose}>
              <ChevronRightIcon />
            </IconButton> */}
            
          <Grid item>
            <Tooltip title="Add Layer from SEEDs Catalogue">
            <Button 
            // class="buttonAdd" 
            className={classes.login1}
            onClick={handleClickOpen} ><AddIcon/></Button>
            </Tooltip>
          </Grid>
          <Dialog
            maxWidth="xl"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DataCatalogueForEdit2/>
          </Dialog>
        </Grid>
        <Divider light={true} light="true" className={classes.divider}/>
        <Grid item style={{overflowY: 'auto', height: window.innerHeight-250}}>
        
          {legendItems.length !== 0 ? legendItems.map((item) => (<LegendLayer layer={item} />)) : <Typography>No selected layers found. Please select from the SEED Catalogue.</Typography>}
        </Grid>
      </Grid>
    </div>
  );
}