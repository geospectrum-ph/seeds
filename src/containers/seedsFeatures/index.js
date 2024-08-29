import React, {useContext, useEffect}  from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ImageCard from '../../containers/mainLanding/imageCardMLP';
// import seedsImg from '../../../../../assets/static';

// import useWindowPosition from '../../../hook/useWindowPosition';
// import seedsImg from '../../assets/static';
// import useWindowPosition from '../../hook/useWindowPosition';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';

import { Toolbar, Paper} from '@material-ui/core';
import { Card, CardContent, CardActions, Button, CardActionArea, CardMedia, CardHeader, Fab, IconButton, Avatar} from '@material-ui/core';

import { DataGrid } from '@material-ui/data-grid';
import { Box, Divider, Tabs, Tab, ThemeProvider } from '@material-ui/core/';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import './index.css';
// import { GridOverlay, DataGrid } from '@material-ui/data-grid';
import {FeaturesContext} from '../../context/FeaturesContext';
import {MapContext} from '../../context/MapContext';
import './index.css';
// import BreadCrumb from './breadcrumb';
// import { ToggleButton, ToggleButtonGroup } from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import EcoIcon from '@material-ui/icons/Eco';
import PublicIcon from '@material-ui/icons/Public';
import StopIcon from '@material-ui/icons/Stop';

import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import NavigationIcon from '@material-ui/icons/Navigation';
// import { SendIcon, DraftsIcon, InboxIcon } from '@material-ui/icons';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import SampleCard from './diseaseIncidence/1-cardDisease';
import SeedsMap from './seedsFeaturesMap';
import Carousel from "./seedsOverview/carousel";
import SeedsOverview from "./seedsOverview";

//SendIcon, DraftsIcon, InboxIcon, 
import BottomNavigation from '@material-ui/core/BottomNavigation';
// import ExpandMore from '@material-ui/core/ExpandMoreIcon';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { createMuiTheme } from '@material-ui/core/styles';
import { TabContext, TabPanel } from '@material-ui/lab';

// import LeftNav from '../leftNav2'
import { HashRouter as Router, HashRouter, MemoryRouter, Switch, Route, Link, useHistory} from "react-router-dom";

import { SEEDSContext } from '../../context/SEEDSContext'


import SampleCardJob from './jobMapper/1-cardJob';
// import SampleCardHazard from './hazardMapper/1-sampleCardHazard';
// import SampleCardPop from './populationMapper/1-sampleCardPop';


import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Menu, MenuItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {  Label, LabelList, ComposedChart, Line, PieChart, Pie, Legend, Tooltip, Sector, Cell, BarChart, Bar, Brush,  XAxis, YAxis, CartesianGrid  } from 'recharts';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { closestIndexTo } from 'date-fns';
import Scroll from "./scroll";
import SocHealth from './diseaseIncidence';
import EcoCommercialEstablishments from './commercialMapper'; //changethistocommercial
import DemLaborProfile from './jobMapper'; //changethistocommercial
import SubdomainInConstruction from './seedsSubdomainInConstruction';
// import MenuItemSample from './seedsFeaturescopy';
import SocPhilsys from './philsysRegistry';
import ExistingLandUse from './existingLandUse';


import SocialIcon from '../../assets/icons/1 Social.png'
import EconomicIcon from '../../assets/icons/7 Economic.png'
import EnvironmentalIcon from '../../assets/icons/11 Environmental.png'
import DemographicIcon from '../../assets/icons/19 Demographic.png'


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1b798e',
      contrastText: '#fffefe',
    },
    secondary: {
      main: '#0d3c47',
      contrastText: '#fffefe',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root1: {
    justify:"center",
    formControlLabel: {
    fontSize: '0.5em',
    height: '0.5em',
    lineHeight: '0.5em',
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
  marginTop2: {
    marginTop: theme.spacing(5),
    // backgroundColor: "#000000",
    // height: "50vh",
  },
  borderRadius: 0,
    '& .MuiCardHeader-root': {
      // color:"#fffefe",
      // backgroundColor:"#1b798e",
      color:"#1b798e",
      backgroundColor:"#fffefe",
      textAlign: "left",
      justifyContent: "left",
      alignItems:"left",
      alignContent:"left",
      justify:"left",
    },
      '& .MuiCardHeader-title': {
        fontSize: '1.2rem',
        textAlign: "center",
      fontFamily: "GlacialIndifference",
      },
      '& .MuiTypography-h1': {
        // backgroundColor: "#000000",
        fontSize: "1.5rem",
        color: "#0c343d",
        fontFamily: "LeagueSpartan",
        // padding: '3px',
      },
      '& .MuiTypography-h2': {
        // backgroundColor: "#000000",
        fontFamily: "Nunito",
        fontSize: "1rem",
        color: "#0c343d",
        
      },
      '& .MuiTypography-h3': {
        // backgroundColor: "#000000",
        fontFamily: "GlacialIndifference",
        fontSize: "0.9rem",
        // color: "#fffefe",
        color: '#0c343d',
        '&:hover': {
          color: '#0c343d',
          // backgroundColor: '#5aff3d',
          }
      },
      '& .MuiTypography-h4': {
        // width: '145px',
        // height: '50px',
        fontSize: "0.9rem",
        color: '#0d3c47',
        backgroundColor: "#ffffff",
        border: "2px solid #1b798e",
        cursor: 'pointer',
        padding: '5px',
      },

  },
  root2: {
    textAlign:'center',
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  extendedIcon: {
    // marginRight: theme.spacing(1),
  },
  fabButton: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
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
  },
  fabButton3: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    // borderRadius: 25 ,
    borderRadius: 0 ,

    // color: '#fffefe',
    // backgroundColor: '#1b798e',
    // height: 30,
    fontSize: '1rem',
    // opacity: '2',
    '&:hover': {
      // color: '#fffefe',
      backgroundColor: '#29b5d5',
      }
  },
      buttonStyle1: {
      // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%',
      border: 0,
      borderRadius: 1,
      // boxShadow: '0 3px 5px 2px rgba(255,255,255,0.3)',
      // color: '#0c343d',
      color: '#fffefe',
      height: 48,
      fontSize: '1rem',
      padding: '0 30px',
      // fontFamily:'Nunito',
          fontFamily:'LeagueSpartan',
    // fontFamily:'GlacialIndifference',
          // fontFamily:'Montserrat',
    // fontFamily: 'Lora'
      '&:hover': {
        color: '#fffefe',
        backgroundColor: '#1b798e',
        // padding:'3px',
        }
    },

  paperseedsmaintitle: {
    // fontFamily:'LeagueSpartan',
    fontFamily:'GlacialIndifference',
    fontSize: '1.3rem',
    // height: '10vh'
  },

  body: {
    display:"flex",
    flexDirection: "row",
    // justify:"flex-end",
    // justifyContent:"center",
    // alignContent:"center",
    // alignItems:"center",
  },
  cardheader: {
    // maxWidth: 350,
    backgroundColor:"#1b798e",
    // backgroundColor:"#29b5d5",
    // fontSize: "10px",
    // display: "flex",
    // flexDirection:"row"
    color:"#fffefe",
    // fontFamily: "Nunito",
    fontFamily:'LeagueSpartan',

  },
  padding: {
    // padding: theme.spacing(3),
  },
  paperfeaturebutton: {
    textAlign: 'center',
    
  },
  papermap: {
    // width: "50vw",
    height: "90vh",
    justify: "center",
    backgroundColor: "#8c8c8c",
    textAlign: 'center',
  borderRadius: 0,

  },
  paperseedsmain: {
    borderRadius: 0,
    // backgroundColor: '#9eb1b5',
    // backgroundColor: '#b6c4c7',
    backgroundColor: '#e6ebec',
    // backgroundColor: '#e6ebec',
    display: 'flex',
    flexDirection: 'column',
    // justify: 'center',
    // justifyContent: 'center',
    // alignContent:'center',
    alignItems: 'center',
    textAlign: 'center',
    // width: '100vw',
    // height: '100vh'
    // elevation: '3',

  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

export default function SeedsFeatures() {
  
 

  const [open, setOpen] = React.useState(false);
  const {dataCat, setDataShow, dataShow, brgys, setBrgys, setSelect, selected, setSelected} = React.useContext(FeaturesContext)
  const {setSeedPage} = React.useContext(MapContext)
  const {currentSubdomain, setCurrentSubdomain} = useContext(SEEDSContext);
  const history = useHistory();

  const { selectedIndex, setSelectedIndex } = React.useContext(FeaturesContext);

  setSelectedIndex(3)
  const StyledTabs = withStyles({
    indicator: {
      display: 'flex',
      justifyContent: 'center',
      color: '#0c343d',
      backgroundColor: '#0c343d',
      '& > span': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: '#0c343d',
      },
    },
  })((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);


  const StyledTab = withStyles((theme) => ({
    
    root: {
      // height: "200vh",
      // width:'100%',
      textTransform: 'none',
      color: '#fffefe', //text color of SEED 
      backgroundColor: '#0c343d', //bgColor of social, economic, envi, demo
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(),
      // marginRight: theme.spacing(1),
      '&:focus': {
        // opacity: 2,
        color: "#fffefe",
      },
      '&:hover': {
        opacity: 2,
        color: "#fffefe",
        // backgroundColor: "#0c343d",
        backgroundColor: "#1b798e",

      },
    },

  }))((props) => <Tab disableRipple {...props} />);

  // const currentTab = () => {
  //   let path = window.location.pathname
  //   if (path === "/map/seedsprofile") return setValue("Overview")
  //   else if (path === "/map/seedsprofile/social") return setValue("Health")
  //   else if (path === "/map/seedsprofile/economic") return setValue("Economic")
  //   else if (path === "/map/seedsprofile/environmental") return setValue("Environmental")
  //   else if (path === "/map/seedsprofile/demographic") return setValue("Demographic")
  // }
 
  const { tabValue, setTabValue } = React.useContext(FeaturesContext);

  // const [value, setValue] = React.useState(**currentTab**);
  // const [tabValue, setTabValue] = React.useState('Overview');
  // useEffect(() => {
  //   let path = window.location.pathname;
  //   if (path === "/map/seedsprofile") return setValue("Overview")
  //   else if (path === "/map/seedsprofile/social") return setValue("Health")
  //   else if (path === "/map/seedsprofile/economic") return setValue("Economic")
  //   else if (path === "/map/seedsprofile/environmental") return setValue("Environmental")
  //   else if (path === "/map/seedsprofile/demographic") return setValue("Demographic")
  // }, [value,]);

  const handleChangeTabValue = (event, newValue) => {
    setTabValue(newValue);
  };
 
  // const currentTab = () => {
  //   let path = window.location.pathname
  //   if (path === '/map/seedsprofile') return "Overview"
  //   else if (path === '/map/seedsprofile/social') return "Soc"
  //   else if (path === '/map/seedsprofile/economic') return "Eco"
  //   else if (path === '/map/seedsprofile/environmental') return "Env"
  //   else if (path === '/map/seedsprofile/demographic') return "Dem"
  // }
  // useEffect((props) => {
  //   let path = props.location.pathname;
  //   if (path === '/map/seedsprofile' && tabValue !== "Overview") setTabValue("Overview");
  //   else if (path === '/map/seedsprofile/social' && tabValue !== "Soc") setTabValue("Soc");
  //   else if (path === '/map/seedsprofile/economic' && tabValue !== "Eco") setTabValue("Eco");
  //   else if (path === '/map/seedsprofile/environmental' && tabValue !== "Env") setTabValue("Env");
  //   else if (path === '/map/seedsprofile/demographic' && tabValue !== "Dem") setTabValue("Dem");
  // }, [tabValue,]);
  // console.log("tbavaluye",tabValue)
  // const [value, setValue] = React.useState(**currentTab**);

// console.log("healthmappergraph",healthMapperGraph)
// console.log("jobmappergraph",jobMapperGraph)
// console.log("healthAGAINmappergraph",healthMapperGraph)
const COLORS = ['#1b798e', '#b7e6f1', '#0d3c47', '#1b798e', '#0d3c47'];
const { healthSelect, healthMapperGraph, jobSelect, jobMapperGraph }  = useContext(FeaturesContext);

const classes = useStyles();
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

  const Domain = ({domainName, subdomains, iconName}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    // const [selectedSubdomain, setSelectedSubdomain] = React.useState(true);

    const handleClick = (event) => {
      // setSelectedSubdomain(!selectedSubdomain);

      setAnchorEl(event.currentTarget);
      // setSeedPage("Overview")
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const useStyles = makeStyles((theme) => ({
      extendedIcon: {
        // marginRight: theme.spacing(1),
      },
      fabButton2: {
        border: 1,
        borderRadius: 0 ,
        fontSize: '1rem',
        margin: theme.spacing(1),
        '&:hover': {
          backgroundColor: '#29b5d5',
          }
      },
    }));

    const classes = useStyles();

    return (
      <div>
          
        <Fab 
        // onMouseEnter={handleClick}  
        onClick={handleClick} variant="outlined" className={classes.fabButton2} variant="extended"  aria-label="add" 
        color={selected ? "primary" : "primary"}>
          {/* <AddIcon className={classes.extendedIcon} /> */}
          <img src={require(`../../assets/icons/${iconName}.png`)} height={50}/>
          {/* url(${headerBackground})` */}
          {domainName}
          {/* {iconName} */}
        </Fab>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
        {subdomains.map((subdomain, index) => (
          <div> 
            <StyledMenuItem value={subdomain} onClick={()=>setCurrentSubdomain(subdomain)}>
            <ListItemIcon >
              <SendIcon fontSize="small" />
            </ListItemIcon>
            {/* <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar> */}
            <ListItemText primary={subdomain} />
          </StyledMenuItem>
          </div>
        ))}
        </StyledMenu>
      </div>
    );
  }

  const [alignment, setAlignment] = React.useState('left');

  const handleTabClick = (value, path) => {
    setSeedPage(value)
    history.push(path)
    // console.log("PATH",path)
  };

  return (
    <Router>
              <Switch>

    <ThemeProvider theme={theme}>
       
      <div className="body" >
      <TabContext value={tabValue}>
        <Paper className={classes.paperseedsmain} >
          <StyledTabs value={tabValue} onChange={handleChangeTabValue} aria-label="styled tabs example">
            <StyledTab className={classes.paperseedsmaintitle} onClick={()=>handleTabClick('Overview','/map/seedsprofile')} 
            // icon={<Avatar alt="test avatar" src={SocialIcon} />}
             label="Overview"  value="Overview" to='/map/seedsprofile' component={Link}/>
            <StyledTab className={classes.paperseedsmaintitle} onClick={()=>handleTabClick('Health','/map/seedsprofile/social')}  icon={<Avatar alt="test avatar" src={SocialIcon} style={{height:80, width:80}} />} label="Social"  value="Soc" to='/map/seedsprofile/social' component={Link}/>
            <StyledTab className={classes.paperseedsmaintitle} onClick={()=>handleTabClick('Economic','/map/seedsprofile/economic')}  icon={<Avatar alt="test avatar" src={EconomicIcon} style={{height:80, width:80}}/>} label="Economic" value="Eco" to='/map/seedsprofile/economic' component={Link}/>
            <StyledTab className={classes.paperseedsmaintitle} onClick={()=>handleTabClick('Environmental','/map/seedsprofile/environmental')}  icon={<Avatar alt="test avatar" src={EnvironmentalIcon} style={{height:80, width:80}}/>} label="Environmental" value="Env" to='/map/seedsprofile/environmental' component={Link}/>
            <StyledTab className={classes.paperseedsmaintitle} onClick={()=>handleTabClick('Demographic','/map/seedsprofile/demographic')}  icon={<Avatar alt="test avatar" src={DemographicIcon} style={{height:80, width: 80}}/>} label="Demographic" value="Dem" to='/map/seedsprofile/demographic' component={Link}/>
          </StyledTabs>
          
          <Grid xs={12} container >
            <Grid item xs={12}>
              <Scroll showBelow={250}/>
                {/* <Route path="/map/seedsprofile"> */}
              <TabPanel value="Overview" style={{height:"470vh"}} > 
              {/* <Tab label='Most popular ideas'  to='/myPath' component={Link} /> */}
                <Grid container             
                  direction="row"  
                  justify="center"
                  alignItems="center"  xs ={12}
                  className={classes.root1}>  
                  <Carousel/>
                </Grid>
                <Grid container
                  direction="column"
                  justify="center"
                  alignItems="center" 
                  className={classes.root1}> 
                  <SeedsOverview/>
                </Grid>
              </TabPanel>
              {/* </Route> */}

              {/* <Route  path="/map/seedsprofile/social"> */}
              <TabPanel value="Soc" >
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  xs={12}>
                    <Domain domainName={"Education"} subdomains={["Schools"]} iconName={"2 Education"}/>
                    <Domain domainName={"Health"} subdomains={["Health Facilities", "Disease Incidence"]} iconName={"3 Health"} />
                    <Domain domainName={"Housing and Social Welfare"} subdomains={["Building Type", "Residential Maps", "Household Maps"]} iconName={"4 Housing"} />
                    <Domain domainName={"Sports and Recreation"} subdomains={["Sports Facilities", "Recreational Facilities"]}  iconName={"5 Sports&Rec"} />
                    <Domain domainName={"Protective and Safety Services"} subdomains={["Crime Incidence", "Fire Incidence"]} iconName={"6 Protective"} />
                  </Grid>
                  
                  {/* <SocHealth/> */}
                  {(currentSubdomain == "Disease Incidence")?<SocHealth/>:
                  <SubdomainInConstruction/>}

              </TabPanel> 
              {/* </Route> */}

              {/* <Route  path="/map/seedsprofile/economic"> */}


              <TabPanel value="Eco" >
                <Grid 
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  xs={12}>
                    <Domain domainName={"Agriculture and Forestry"} subdomains={["Agricultural Crops", "Livestock", "Agricultural Facilities", "Forestry"]} 
                            iconName={"8 Agriculture"}
                            />
                    <Domain domainName={"Commerce, Trade and Industry"} subdomains={["Commercial Establishments", "Industrial Establishments"]} 
                            iconName={"10 Tourism"}
                            />
                    <Domain domainName={"Tourism"} subdomains={["Tourism Spots", "Tourist Activities and Events"]} 
                            iconName={"10 Tourism"}
                            />
                </Grid>
                {currentSubdomain == "Commercial Establishments"?<EcoCommercialEstablishments/>:<SubdomainInConstruction/>}
              </TabPanel>
              {/* </Route> */}
              {/* <Route  path="/map/seedsprofile/environmental"> */}
              <TabPanel value="Env"> 
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  xs={12}>

                    <Domain domainName={"Land Resource"} subdomains={["Territorial Boundary", "Land and Vegetation Cover", "Land Classification"]} iconName={"12 Land Resources"}/>
                    <Domain domainName={"Land Use and Land Use Trends"} subdomains={["Existing Land Use", "Proposed Land Use", "Development Projects"]} iconName={"13 Land Use"} />
                    <Domain domainName={"Topography"} subdomains={["Slope", "Elevation", "Drainage Map", "Water Resources"]} iconName={"14 Topography"} />
                    <Domain domainName={"Soil"} subdomains={["Soil Classification", "Hydrogeologic Features"]} iconName={"15 Soil"}/>
                    <Domain domainName={"Climate"} subdomains={["Climate types","Hydro-meteorologic Features"]} iconName={"16 Climate"}/>
                    <Domain domainName={"Hazards and Disaster Risk"} subdomains={["Climate-related Hazards", "Geologic-related Hazards", "Disaster Risk"]} iconName={"17 Hazards"}/>
                    <Domain domainName={"Sanitation"} subdomains={["Garbage and Waste Disposal"]} iconName={"18 Sanitation"} />
                </Grid>
                {currentSubdomain == "Existing Land Use"?<ExistingLandUse/>:<SubdomainInConstruction/>}
              </TabPanel>
              {/* </Route> */}

              {/* <Route  path="/map/seedsprofile/demographic"> */}

              <TabPanel value="Dem"> 
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  xs={12}>

                    <Domain domainName={"Human Resources"} subdomains={["Population Size", "Population Distribution", "Civil Registry"]} iconName={"20 Human Resources"}/>
                    <Domain domainName={"Labor Force Profile"} subdomains={["Age", "Jobs"]} iconName={"21 Labor Force"}/>
                    <Domain domainName={"Census Level Profile"} subdomains={["Household Surveys", "PhilSys Registry", "\"Oplan\" Surveys"]} iconName={"20 Human Resources"} />
              </Grid>
              {(currentSubdomain == "Jobs")?<DemLaborProfile/>:
                  currentSubdomain == "PhilSys Registry"?<SocPhilsys/>:
                  <SubdomainInConstruction/>}
            </TabPanel>
            {/* </Route> */}
            </Grid>          
          </Grid>
          
        </Paper>
      </TabContext>
      
    </div>

   </ThemeProvider>
   </Switch>
    
   </Router>
      
  );
}