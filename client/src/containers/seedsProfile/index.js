import React, {useContext, useEffect, useState}  from 'react';
import { Fab, Avatar, Tabs, Tab, Grid, Menu, MenuItem, ListItemIcon, ListItemText, Container, 
        Typography } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { TabContext, TabPanel } from '@material-ui/lab';
import { Link, useHistory } from "react-router-dom";
import './index.css';

import SendIcon from '@material-ui/icons/Send';

import {FeaturesContext} from '../../context/FeaturesContext';
import { SEEDSContext } from '../../context/SEEDSContext'

import SeedsOverview from "./seedsOverview";
import SocHealth from './diseaseIncidence';
import EcoCommercialEstablishments from './commercialMapper'; //changethistocommercial
import DemLaborProfile from './jobMapper'; //changethistocommercial
import SubdomainInConstruction from './seedsSubdomainInConstruction';
import ExistingLandUse from './existingLandUse';
import HouseholdSurveys from './householdSurvey';

import SocialIcon from '../../assets/icons/1 Social.png'
import EconomicIcon from '../../assets/icons/7 Economic.png'
import EnvironmentalIcon from '../../assets/icons/11 Environmental.png'
import DemographicIcon from '../../assets/icons/19 Demographic.png'

const useStyles = makeStyles(() => ({
  appBar: {
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  }, paperseedsmaintitle: {
    fontFamily:'GlacialIndifference',
    fontSize: '1.3rem',
  }, root1: {
    justify:"center",
    formControlLabel: {
      fontSize: '0.5em',
      height: '0.5em',
      lineHeight: '0.5em',
    },
  }
}))

export default function SeedsFeatures() {

  const classes = useStyles();
  const history = useHistory();

  const { selected } = React.useContext(FeaturesContext)
  const {setCurrentModule, setCurrentDomain, currentSubdomain, setCurrentSubdomain} = useContext(SEEDSContext);
  const { setSelectedIndex } = React.useContext(SEEDSContext);

  useEffect(() => {
    setSelectedIndex(3)
  }, [])

  const StyledTabs = withStyles({
    indicator: {
      display: 'flex',
      justify: 'center',
      color: '#0c343d',
      backgroundColor: '#0c343d',
      '& > span': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: '#0c343d',
      }
    }
  })((props) => <Tabs variant="scrollable" scrollButtons="on" {...props} TabIndicatorProps={{ children: <span /> }} />);

  const StyledTab = withStyles((theme) => ({
    root: {
      textTransform: 'none',
      color: '#fffefe', //text color of SEED 
      backgroundColor: '#0c343d', //bgColor of social, economic, envi, demo
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(),
      '&:focus': {
        color: "#fffefe"
      }, '&:hover': {
        opacity: 2,
        color: "#fffefe"
      }
    }
  }))((props) => <Tab disableRipple {...props} />);

  const { tabValue, setTabValue } = useContext(SEEDSContext);

  const handleChangeTabValue = (event, newValue) => {
    setTabValue(newValue);
  };
 
  useEffect(() => {
    let path = window.location.href;
    if (path === 'http://localhost:5000/seeds/profile/social' && tabValue !== "Soc") {
      setTabValue("Soc")
      setCurrentDomain("Health")
      setCurrentSubdomain("Disease Incidence")
    }
    else if (path === 'http://localhost:5000/seeds/profile/economic' && tabValue !== "Eco") {
      setTabValue("Eco")
      setCurrentDomain("Commerce, Trade and Industry")
      setCurrentSubdomain("Commercial Establishments")
    }
    else if (path === 'http://localhost:5000/seeds/profile/environmental' && tabValue !== "Env") {
      setTabValue("Env")
      setCurrentDomain("Land Use and Land Use Trends")
      setCurrentSubdomain("Existing Land Use")
    }
    else if (path === 'http://localhost:5000/seeds/profile/demographic' && tabValue !== "Dem") {
      setTabValue("Dem")
      setCurrentDomain("Labor Force Profile")
      setCurrentSubdomain("Jobs")
    }
  }, [tabValue]);

  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    }
  })((props) => (
    <Menu elevation={0} getContentAnchorEl={null} {...props}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }} transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}/>
  ));

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white
        }
      }
    }
  }))(MenuItem);

  const Domain = ({domainName, subdomains, iconName}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClickMenuItem = (subdomain) => {
      setCurrentDomain(domainName)
      setCurrentSubdomain(subdomain)
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div> 
        <Fab onClick={handleClick} variant="extended" className={classes.fabButton2}
          color={selected ? "primary" : "primary"}>
          <img src={require(`../../assets/icons/${iconName}.png`)} height={35}/>
          <Typography style={{fontSize:"0.9rem"}} >{domainName}</Typography>
        </Fab>
        <StyledMenu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          {subdomains.map((subdomain, i) => (
            <div key={i}> 
              <StyledMenuItem key={subdomain} value={subdomain} onClick={()=>handleClickMenuItem(subdomain)}>
                <ListItemIcon >
                  <SendIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={subdomain} />
              </StyledMenuItem>
            </div>
          ))}
        </StyledMenu>
      </div>
    );
  }

  const handleTabClick = (mod, path, dom, subdom) => {
    setCurrentModule(mod)
    history.push(path)
    setCurrentDomain(dom)
    setCurrentSubdomain(subdom)
  };

  return (
    <TabContext value={tabValue}>
      <div className={classes.root}>
        <div className={classes.appBar}>
          <Container maxWidth="md">
            <StyledTabs value={tabValue} onChange={handleChangeTabValue}>
              <StyledTab className={classes.paperseedsmaintitle} onClick={()=>handleTabClick('Overview','/seeds/profile')} 
                label="Overview" value="Overview" to='/seeds/profile' component={Link}/>
              <StyledTab className={classes.paperseedsmaintitle} label="Social" value="Soc"
                onClick={()=>handleTabClick('Social','/seeds/profile/social', 'Health', 'Disease Incidence')} 
                icon={<Avatar alt="Social" src={SocialIcon} style={{height:80, width:80}} />}/>
              <StyledTab className={classes.paperseedsmaintitle} label="Economic" value="Eco"
                onClick={()=>handleTabClick('Economic','/seeds/profile/economic', 'Commerce, Trade and Industry', 'Commercial Establishments')} 
                icon={<Avatar alt="Economic" src={EconomicIcon} style={{height:80, width:80}}/>}/>
              <StyledTab className={classes.paperseedsmaintitle} label="Environmental" value="Env"
                onClick={()=>handleTabClick('Environmental','/seeds/profile/environmental', 'Land Use and Land Use Trends', "Existing Land Use")} 
                icon={<Avatar alt="Environmental" src={EnvironmentalIcon} style={{height:80, width:80}}/>}/>
              <StyledTab className={classes.paperseedsmaintitle} label="Demographic" value="Dem"
                onClick={()=>handleTabClick('Demographic','/seeds/profile/demographic', "Census Level Profile", 'Household Surveys')} 
                icon={<Avatar alt="Demographic" src={DemographicIcon} style={{height:80, width: 80}}/>}/>
            </StyledTabs>
          </Container>
        </div>

        <div className={classes.heroContent} >
          <TabPanel value="Overview">
            <Container maxWidth="md">
              <SeedsOverview/>
            </Container>      
          </TabPanel>
          <TabPanel value="Soc">
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
              <Grid item>
                <Domain key={"Education"} domainName={"Education"} subdomains={["Schools"]} iconName={"2 Education"}/>
              </Grid>
              <Grid item>
                <Domain key={"Health"} domainName={"Health"} subdomains={["Health Facilities", "Disease Incidence"]} 
                  iconName={"3 Health"} />
              </Grid>
              <Grid item>
                <Domain key={"Housing and Social Welfare"} domainName={"Housing and Social Welfare"} 
                  subdomains={["Building Type", "Residential Maps", "Household Maps"]} iconName={"4 Housing"} />
              </Grid>
              <Grid item>
                <Domain key={"Sports and Recreation"} domainName={"Sports and Recreation"} 
                  subdomains={["Sports Facilities", "Recreational Facilities"]} iconName={"5 Sports&Rec"}/>
              </Grid>
              <Grid item>
                <Domain key={"Protective and Safety Services"} domainName={"Protective and Safety Services"} 
                  subdomains={["Crime Incidence", "Fire Incidence"]} iconName={"6 Protective"}/>
              </Grid>
            </Grid>
            {(currentSubdomain == "Disease Incidence")?<SocHealth/>:<SubdomainInConstruction/>}
          </TabPanel>
          <TabPanel value="Eco">
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
              <Grid item>
                <Domain key={"Agriculture and Forestry"} domainName={"Agriculture and Forestry"} 
                  subdomains={["Agricultural Crops", "Livestock", "Agricultural Facilities", "Forestry"]} 
                  iconName={"8 Agriculture"}/>
              </Grid>
              <Grid item>
                <Domain key={"Commerce, Trade and Industry"} domainName={"Commerce, Trade and Industry"} 
                  subdomains={["Commercial Establishments", "Industrial Establishments"]} 
                  iconName={"10 Tourism"}/>
              </Grid>
              <Grid item>
                <Domain key={"Tourism"} domainName={"Tourism"} 
                  subdomains={["Tourism Spots", "Tourist Activities and Events"]} 
                  iconName={"10 Tourism"}/>
              </Grid>
            </Grid>
            {(currentSubdomain == "Commercial Establishments")?<EcoCommercialEstablishments/>:<SubdomainInConstruction/>}
          </TabPanel>
          <TabPanel value="Env">
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
              <Grid item>
                <Domain key={"Land Resource"} domainName={"Land Resource"} iconName={"12 Land Resources"}
                  subdomains={["Territorial Boundary", "Land and Vegetation Cover", "Land Classification"]} />
              </Grid>
              <Grid item>
                <Domain key={"Land Use and Land Use Trends"} domainName={"Land Use and Land Use Trends"} 
                  subdomains={["Existing Land Use", "Proposed Land Use", "Development Projects"]} iconName={"13 Land Use"}/>
              </Grid>
              <Grid item>
                <Domain key={"Topography"} domainName={"Topography"} iconName={"14 Topography"}
                  subdomains={["Slope", "Elevation", "Drainage Map", "Water Resources"]}/>
              </Grid>
              <Grid item>
                <Domain key={"Soil"} domainName={"Soil"} iconName={"15 Soil"}
                  subdomains={["Soil Classification", "Hydrogeologic Features"]} />
              </Grid>
              <Grid item>
                <Domain key={"Climate"} domainName={"Climate"} iconName={"16 Climate"}
                  subdomains={["Climate Types","Hydro-meteorologic Features"]}/>
              </Grid>
              <Grid item>
                <Domain key={"Hazards and Disaster Risk"} domainName={"Hazards and Disaster Risk"} iconName={"17 Hazards"}
                  subdomains={["Climate-related Hazards", "Geologic-related Hazards", "Disaster Risk"]}/>
              </Grid>
              <Grid item>
                <Domain key={"Sanitation"} domainName={"Sanitation"} subdomains={["Garbage and Waste Disposal"]} 
                  iconName={"18 Sanitation"}/>
              </Grid>
            </Grid>
            {(currentSubdomain == "Existing Land Use")?<ExistingLandUse/>:<SubdomainInConstruction/>}
          </TabPanel>
          <TabPanel value="Dem">
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
              <Grid item>
                <Domain key={"Human Resources"} domainName={"Human Resources"} iconName={"20 Human Resources"}
                  subdomains={["Population Size", "Population Distribution", "Civil Registry"]} />
              </Grid>
              <Grid item>
                <Domain key={"Labor Force Profile"} domainName={"Labor Force Profile"} subdomains={["Age", "Jobs"]} 
                  iconName={"21 Labor Force"}/>
              </Grid>
              <Grid item>
                <Domain key={"Census Level Profile"} domainName={"Census Level Profile"} iconName={"20 Human Resources"}
                  subdomains={["Household Surveys", "Philsys Registry", "\"Oplan\" Surveys"]} />
              </Grid> 
            </Grid>
            {(currentSubdomain == "Jobs")?<DemLaborProfile/>:
              currentSubdomain == "Household Surveys"?<HouseholdSurveys/>:
            <SubdomainInConstruction/>}
          </TabPanel>
        </div>
      </div>
    </TabContext>      
  );
}