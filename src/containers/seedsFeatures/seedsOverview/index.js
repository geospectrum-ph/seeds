import React, {useContext}  from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';

import { Toolbar, Paper} from '@material-ui/core';
import { Card, CardContent, CardActions, Button, CardActionArea, CardMedia, CardHeader, Fab, IconButton, Avatar } from '@material-ui/core';


import { Box, Divider, Tabs, Tab, ThemeProvider, ListItemText, ListItemIcon} from '@material-ui/core/';
import { withStyles, makeStyles } from '@material-ui/core/styles';
// import './index.css';
// import { GridOverlay, DataGrid } from '@material-ui/data-grid';
// import {FeaturesContext} from '../../../FeaturesContext';
// import {MapContext} from '../../../MapContext'
import './index.css';

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
// import SampleCard from './healthMapper/1-sampleCard';
// import SeedsMap from './seedsFeaturesMap';
// import Carousel from "./carousel";
//SendIcon, DraftsIcon, InboxIcon, 
import BottomNavigation from '@material-ui/core/BottomNavigation';
// import ExpandMore from '@material-ui/core/ExpandMoreIcon';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { createMuiTheme } from '@material-ui/core/styles';
import { TabContext, TabPanel } from '@material-ui/lab';


import { HashRouter as Router, Switch, Route, Link, useHistory} from "react-router-dom";
import SocialIcon from '../../../assets/icons/1 Social.png'
import EducationIcon from '../../../assets/icons/2 Education.png'
import HealthIcon from '../../../assets/icons/3 Health.png'
import HousingIcon from '../../../assets/icons/4 Housing.png'
import SportsRecIcon from '../../../assets/icons/5 Sports&Rec.png'
import ProtectiveIcon from '../../../assets/icons/6 Protective.png'

import EconomicIcon from '../../../assets/icons/7 Economic.png'
import AgricultureIcon from '../../../assets/icons/8 Agriculture.png'
import TourismIcon from '../../../assets/icons/10 Tourism.png'

import EnvironmentalIcon from '../../../assets/icons/11 Environmental.png'
import LandResourcesIcon from '../../../assets/icons/12 Land Resources.png'
import LandUseIcon from '../../../assets/icons/13 Land Use.png'
import TopographryIcon from '../../../assets/icons/14 Topography.png'
import SoilIcon from '../../../assets/icons/15 Soil.png'
import ClimateIcon from '../../../assets/icons/16 Climate.png'
import HazardsIcon from '../../../assets/icons/17 Hazards.png'
import SanitationIcon from '../../../assets/icons/18 Sanitation.png'

import DemographicIcon from '../../../assets/icons/19 Demographic.png'
import HumanResourcesIcon from '../../../assets/icons/20 Human Resources.png'
import LaborForceIcon from '../../../assets/icons/21 Labor Force.png'



// import { SEEDSContext } from '../../context/SEEDSContext'


const seedsFeaturesIcon = [ "PersonPinIcon", "FavoriteIcon","EcoIcon", "PublicIcon"]
const SocialFeaturesIcon = [ "EducationIcon", "HealthIcon","HousingIcon", "SportsRecIcon", "ProtectiveIcon"]



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
      // marginLeft: theme.spacing(25),

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
        // margin: theme.spacing(2),
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
    root: {
      maxWidth: 345,
      // minWidth: 200,
     
    },
    content: {
      height: 300,
      width: 300,
      // padding: 10

    },
    img: {
      height: '75%',
      width: '95%',

    },
  }));
 function SeedsOverviewCard ({seedsFeatures,domainName, iconName}) {
  const classes = useStyles();

  return (
    <div id={seedsFeatures} style={{backgroundColor: '#ced8da', width: '90vw', height: '100vh', display:'flex', flexDirection: 'row', alignItems:'center'}} >
      
      <Grid
        container
        direction="row"
        justify='space-around'
        align='center'
        spacing={5}
        
        >
          <br/>
          <Typography style={{alignSelf:'center'}} variant="h1">{seedsFeatures}</Typography>
          <br/>
          {domainName.map((domain, index)=>(
            <Grid item className={classes.root}  >
              <Card class="zoomcard" >
                <CardContent className={classes.content} > 
                <CardMedia 
                  className={classes.img}
                    // image={iconName[index]}
                    image={require(`../../../assets/icons/${iconName[index]}.png`)}
                  />
                   {/* <img className={classes.img} src={require(`../../../assets/icons/${iconName[index]}.png`)} /> */}

                  
                  <br></br>  
                  <Fab variant="outlined" className={classes.fabButton3} variant="extended" color="primary" aria-label="add">
                    <Typography style={{fontSize:"0.8rem"}}>{domain}</Typography>
                  </Fab>
                </CardContent>
              </Card>
            </Grid>
          ))}   
        </Grid><br></br>
    </div>
    );
}

export default function SeedsOverview () {
  const classes = useStyles();

  return (
    <div>
      <br></br>
      <Typography  variant="h1" >
        {/* {seedsFeatureName} */}
      </Typography> 
      <br></br>
       <Grid container direction ="column" justify="space-between"
          style={{backgroundColor: "#e6ebec"
          // , width: "80vw"
        }} 
          >
         
            <SeedsOverviewCard seedsFeatures="Social" domainName={["Education", "Health", "Housing and Social Welfare", "Sports and Recreation", "Protective and Safety Services"]}
            iconName={["2 Education", "3 Health", "4 Housing", "5 Sports&Rec", "6 Protective"]}
            // iconName={["EducationIcon", "HealthIcon", "HousingIcon", "SportsRecIcon", "ProtectiveIcon"]}
            ></SeedsOverviewCard><br></br>
            <SeedsOverviewCard seedsFeatures="Economic" domainName={["Agriculture and Forestry", "Commerce, Trade and Industry", "Tourism"]}
            iconName={["8 Agriculture", "10 Tourism", "10 Tourism"]}
            // iconName={["AgricultureIcon", "EconomicIcon", "TourismIcon"]}

            ></SeedsOverviewCard><br></br>
            <SeedsOverviewCard seedsFeatures="Environmental" domainName={["Land Resources", "Land Use / Land Use Trends", "Topography", "Soils","Climate", "Hazard and Disaster Risk","Sanitation"]}
            iconName={["12 Land Resources", "13 Land Use", "14 Topography", "15 Soil", "16 Climate", "17 Hazards", "18 Sanitation"]}
            // iconName={["LandResourcesIcon", "LandUseIcon", "TopographryIcon", "SoilIcon", "ClimateIcon", "HazardsIcon", "SanitationIcon"]}
            ></SeedsOverviewCard><br></br>
            <SeedsOverviewCard seedsFeatures="Demographic" domainName={["Human Resources", "Labor Force Profile", "Municipality/City Census Profile"]}
            iconName={["20 Human Resources", "21 Labor Force", "20 Human Resources"]}
            // iconName={["HumanResourcesIcon", "HumanResourcesIcon", "HumanResourcesIcon"]}
            ></SeedsOverviewCard><br></br>
          

              </Grid>
    </div>
    );
}
                  
// import SocialIcon from '../../../assets/icons/1 Social.png'
// import EducationIcon from '../../../assets/icons/2 Education.png'
// import HealthIcon from '../../../assets/icons/3 Health.png'
// import HousingIcon from '../../../assets/icons/4 Housing.png'
// import SportsRecIcon from '../../../assets/icons/5 Sports&Rec.png'
// import ProtectiveIcon from '../../../assets/icons/6 Protective.png'

// import EconomicIcon from '../../../assets/icons/7 Economic.png'
// import AgricultureIcon from '../../../assets/icons/8 Agriculture.png'
// import TourismIcon from '../../../assets/icons/10 Tourism.png'

// import EnvironmentalIcon from '../../../assets/icons/11 Environmental.png'
// import LandResourcesIcon from '../../../assets/icons/12 Land Resources.png'
// import LandUseIcon from '../../../assets/icons/13 Land Use.png'
// import TopographryIcon from '../../../assets/icons/14 Topography.png'
// import SoilIcon from '../../../assets/icons/15 Soil.png'
// import ClimateIcon from '../../../assets/icons/16 Climate.png'
// import HazardsIcon from '../../../assets/icons/17 Hazards.png'
// import SanitationIcon from '../../../assets/icons/17 Sanitation.png'

// import DemographicIcon from '../../../assets/icons/18 Demographic.png'
// import HumanResourcesIcon from '../../../assets/icons/19 Human Resources.png'

