import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Tab, Tabs, useMediaQuery, Box } from '@material-ui/core';
import { TabContext } from '@material-ui/lab';
import { useHistory } from "react-router-dom";

import logo2 from '../../../assets/icons/0 Logo (3D Colored).png'
import DrawerComponent from '../drawerComponent';

import { SEEDSContext } from '../../../context/SEEDSContext';

import { createTheme, makeStyles } from '@material-ui/core/styles';

const theme = createTheme({
  typography: {
    h3: {
      fontFamily: "Outfit"
    },
    h6: {
      fontFamily: "Outfit"
    }
  },
  palette: {
    primary: {
      main: "#1b798e"
    },
    secondary: {
      main: "#0d3c47"
    }
  },
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: theme.palette.secondary.main
  }, appbarTitle:{
    fontFamily: 'LeagueSpartan',
    color: '#fffefe',
    '&:hover': {
      padding:'0.5px',
    }, display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justify: 'center'
  }, colorText: {
    color: "#5aff3d"
  }, buttonStyle1: {
    border: 0,
    borderRadius: 0,
    color: '#fffefe',
    height: 55,
    fontSize: '1rem',
    // padding: '0 10px',
    // margin: '0 5px',
    fontFamily:'LeagueSpartan'
  }, login1: {
    border: 0,
    borderRadius: 5,
    backgroundColor: '#1b798e',
    color: '#ffffff',
    fontSize: '1rem',
    height: 55,
    // padding: '0 30px',
    // margin: '0 5px',
    fontFamily:'LeagueSpartan',
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922'
    }
  }, tabsContainer: {
    marginLeft: 'auto'
  }
}));
 
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
  
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
  
  
export default function AppsBar(){
  const classes = useStyles();
  const history = useHistory();
  const {appBarValue, setAppBarValue} = useContext(SEEDSContext);

  const handleClickTab = (e, newValue) => {
    setAppBarValue(newValue);
  };
  const handleClickLogo = () => {
    setAppBarValue('home');
    history.push('/')
  };
  const handleLogin= () => {
    setAppBarValue('Login');
    history.push('/login')
  };
  
  const isMatch = useMediaQuery(theme.breakpoints.down('sm'));

  return(
    <TabContext value={appBarValue}>
      <AppBar position="static" className={classes.appBar} >
        <Toolbar >
          <h1 className={classes.appbarTitle} style={{cursor: 'pointer'}} onClick={handleClickLogo}>
            <img src={logo2} style={{height:40, display:'block', marginTop: 0}} onClick={handleClickLogo} />
            <span className={classes.colorText} >SEED</span>s
          </h1> 
          {isMatch ? (
          <>
            <DrawerComponent />
          </>
          ) : (<>
            <Tabs onChange={handleClickTab} className={classes.tabsContainer}
              indicatorColor='primary' value={appBarValue}>
              <Tab disableRipple label='Home' className={classes.buttonStyle1}
                value="home" to='/' onClick={()=>{history.push('/')}}/>
              <Tab disableRipple label='About Us' className={classes.buttonStyle1}
                value="aboutUs" to='/aboutUs' onClick={()=>{history.push('/aboutUs')}}/>
              <Tab disableRipple label='Features' value='features'
                className={classes.buttonStyle1} onClick={()=>{history.push('/features')}}/>
              <Tab disableRipple label='Contact Us' value='contactUs'
                className={classes.buttonStyle1} onClick={()=>{history.push('/contactUs')}}/>
              <Tab disableRipple label='Login' value='Login'
                onClick={handleLogin} className={classes.login1}/>
            </Tabs>
          </>)}
        </Toolbar>
      </AppBar>
    </TabContext>
  )
}