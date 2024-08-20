import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssessmentIcon from '@material-ui/icons/Assessment';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { CssBaseline, Grid, Card, Button, ButtonGroup, withStyles, Container, TextField, Tooltip } from '@material-ui/core';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import { HashRouter as Router, Switch, Route, Link, useHistory} from "react-router-dom";
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import NearMeIcon from '@material-ui/icons/NearMe';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FilterListIcon from '@material-ui/icons/FilterList';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import BarChartIcon from '@material-ui/icons/BarChart';
import SeedsPopulate from '../leftNav/seedsPopulate'
import SeedsCatalogue from '../leftNav/seedsCatalogue'
import SeedsMapPortal from '../leftNav/seedsMapPortal'
import SeedsMapPortalLayer from '../rightNavDraw/mapLayer'
import SeedsProfile from '../seedsFeatures'
import Landing from '../login/index'
import {FeaturesContext} from '../../context/FeaturesContext';
import MuiListItem from "@material-ui/core/ListItem";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
    backgroundColor: "#0c343d",

  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#0c343d",

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
    // flexGrow: 1,
    padding: theme.spacing(3),
  },
  drawerPaper: { width: 'inherit' },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  },
  icon: {
    // backgroundColor: '#0c343d',
    color: '#fffefe',
    // '&:hover': {
    //   color: '#fffefe',
      // backgroundColor: '#1b798e'
    // }
  },
  leftbutton: {
    color: '#ffffff',
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#1b798e',
    }
  },
  textfont1: {
        // fontFamily:'Nunito',
        fontFamily:'LeagueSpartan',
        // fontFamily:'GlacialIndifference',
        // fontFamily:'Montserrat',
        // fontFamily: 'Lora'
        fontSize: '3rem',
  },
  appbarTitle:{
    flexGrow: '1',
    color: '#fffefe',
  },
  colorText: {
    color: "#5aff3d"
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
    fontSize: "1.05rem",
    // height: '10%',
  },  
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const { select, setSelect } = React.useContext(FeaturesContext)

  const { selectedIndex, setSelectedIndex } = React.useContext(FeaturesContext);
  // const [ selectedIndex, setSelectedIndex ] = React.useState(false);
  const leftNav = ["SEEDs Populate", "SEEDs Catalogue", "SEEDs Map Portal","SEEDs Profile", "SEEDs Analytics"]
  const history = useHistory();
  
  const handleListItemClick = (event, index, path, theme) => {
    setSelectedIndex(index);
    history.push(path)
    // console.log("PATH",path)
  };
  const ListItem = withStyles({
    root: {
      "&$selected": {
        backgroundColor: "#1b798e",
        color: "white"
      },
      "&$selected:hover": {
        backgroundColor: "#1b798e",
        color: "white"
      },
      "&:hover": {
        backgroundColor: "#1b798e",
        color: "white"
      }
    },
    selected: {}
  })(MuiListItem);
  return (
    <Router>
      <Switch>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.appbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          
          {selectedIndex === 0 ?<h3 className={classes.appbarTitle}><span className={classes.colorText}>  SEED</span>s Populate</h3> :
          selectedIndex === 1 ?<h3 className={classes.appbarTitle}><span className={classes.colorText}>  SEED</span>s Catalogue</h3> :       
          selectedIndex === 2 ?<h3 className={classes.appbarTitle}><span className={classes.colorText}>  SEED</span>s Map Portal</h3> :
          selectedIndex === 3 ?<h3 className={classes.appbarTitle}><span className={classes.colorText}>  SEED</span>s Profile</h3> :
          selectedIndex === 4 ?<h3 className={classes.appbarTitle}><span className={classes.colorText}>  SEED</span>s Analytics</h3>:
          <h3 className={classes.appbarTitle}><span className={classes.colorText}>  SEED</span>s Map Portal</h3> }
        </Toolbar>
      </AppBar>
      
      
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton className={classes.icon} onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key={'SEEDs Populate'} 
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0, "/map/seedspopulate")}
            className={classes.leftbutton}>
            <Tooltip title="SEEDs Populate">
              <ListItemIcon className={classes.icon}> <CloudUploadIcon  /> </ListItemIcon>
            </Tooltip>
            <ListItemText className={classes.textfont1} primary={'SEEDs Populate'}/>
          </ListItem>

          <ListItem button key={'SEEDs Catalogue'} 
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1, "/map/seedscatalogue")} 
            className={classes.leftbutton}>
            <Tooltip title="SEEDs Catalogue">
              <ListItemIcon className={classes.icon}> <FolderOpenIcon /> </ListItemIcon>
            </Tooltip>
            <ListItemText primaryTypographyProps='textfont1' primary={'SEEDs Catalogue'} />  
          </ListItem>

          <ListItem button key={'SEED Map Portal'} 
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2, "/map/seedsmapportal")}
            className={classes.leftbutton}> 
            <Tooltip title="SEEDs Map Portal">
              <ListItemIcon className={classes.icon}> <NearMeIcon /> </ListItemIcon>
            </Tooltip>
            <ListItemText className={classes.textfont1} >SEEDs Map Portal</ListItemText>
          </ListItem>

          <ListItem button key={'SEEDs Profile'} 
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3, "/map/seedsprofile")}
            className={classes.leftbutton}> 
            <Tooltip title="SEEDs Profile">
              <ListItemIcon className={classes.icon}> <FilterListIcon /> </ListItemIcon>
            </Tooltip>
            <ListItemText className={classes.textfont1} >SEEDs Profile</ListItemText>
          </ListItem>

          <ListItem button key={'SEEDs Analytics'} 
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event, 4, "/map/seedsanalytics")}
            className={classes.leftbutton}> 
            <Tooltip title="SEEDs Analytics">
              <ListItemIcon className={classes.icon}> <BarChartIcon /> </ListItemIcon>
            </Tooltip>
            <ListItemText className={classes.textfont1} >SEEDs Analytics</ListItemText>
          </ListItem>
        </List>
        
        <Divider />

        <List>
          <ListItem button key={'Logout'} 
            onClick={(event) => handleListItemClick(event, 5, "/landing")}
            className={classes.leftbutton}>
            <Tooltip title="Logout">          
              <ListItemIcon className={classes.icon}> <ExitToAppOutlinedIcon /> </ListItemIcon>
            </Tooltip>
            <ListItemText className={classes.textfont1} primary={'Logout'} /> 
          </ListItem>
                    
          <ListItem 
            button key={'Help'} 
            // // selected={selectedIndex === 5}
            onClick={(event) => handleListItemClick(event, 5)}
            className={classes.leftbutton}>
            <Tooltip title="Help ">
              <ListItemIcon className={classes.icon}> <HelpOutlineOutlinedIcon /> </ListItemIcon>
            </Tooltip>
            <ListItemText className={classes.textfont1} primary={'Help'} /> 
          </ListItem>
          </List>
        </Drawer>
        </div>
      </Switch>
    </Router>

  );
}
