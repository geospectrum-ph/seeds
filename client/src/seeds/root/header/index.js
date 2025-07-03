import * as React from "react";
import { useHistory } from "react-router-dom";

import PropTypes from "prop-types";

import { createTheme, makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Tab, Tabs, useMediaQuery, Box } from "@material-ui/core";
import { TabContext } from "@material-ui/lab";

import { SEEDSContext } from "../../context/SEEDSContext";

import DrawerComponent from "../../containers/mainLanding/drawerComponent";

import logo from "../../assets/logo.png";

import background from "../../assets/map.png";

const theme = createTheme({
  typography: {
    fontFamily: "'Outfit', sans-serif"
  },
});

const useStyles = makeStyles((theme) => ({
  toolbar: {
    minHeight: "auto", 

    boxSizing: "border-box",
    boxShadow: "none",
    padding: "12px 48px",
  },
  appBar: {
    width: "auto",

    boxSizing: "border-box",
    boxShadow: "none",
    padding: "0",

    background: "var(--color-white)",
  },
  appbarTitle: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    justify: "center",

    boxSizing: "border-box",
    gap: "12px",

    cursor: "pointer",
  },
  logo: {
    height: "36px",
  },
  appbarColorText: {
    font: "800 32px/1 'Outfit', sans-serif",

    "& :nth-of-type(1)": {
      color: "var(--color-green-dark)",
    },

    "& :nth-of-type(2)": {
      color: "var(--color-black)",
    },
  },
  tabsContainer: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    justify: "center",

    marginLeft: "auto",
  },
  indicatorColor: {
    backgroundColor: "var(--color-black)",
  },
  tabRoot: {
    minWidth: "auto",
    width: "auto",
    minHeight: "auto",
    height: "auto",

    boxSizing: "border-box",
    margin: "0 12px 0 0",
    padding: "12px",

    opacity: 1.00,

    font: "800 16px/1 'Outfit', sans-serif",
    color: "var(--color-gray-dark)",

    "&:hover": {
      color: "var(--color-green-dark)",
    },
  },
  tabSelected: {
    color: "var(--color-white)",
  },
  loginRoot: {
    minWidth: "auto",
    width: "auto",
    minHeight: "auto",
    height: "auto",

    boxSizing: "border-box",
    margin: "0 0 0 24px",
    padding: "12px",

    background: "var(--color-black)",
    opacity: 1.00,

    font: "bold 16px/1 'Outfit', sans-serif",
    color: "var(--color-gray-dark)",

    "&:hover": {
      background: "var(--color-green-dark)",

      color: "var(--color-white)",
    },
  },
  loginSelected: {
    background: "var(--color-green-dark)",

    color: "var(--color-white)",
  },
}));
 
function TabPanel (props) {
  const { children, value, index, ...other } = props;

  return (
    <div id = { `simple-tabpanel-${index}` } role = "tabpanel" hidden = { value !== index } aria-labelledby = { `simple-tab-${index}` } { ...other }>
      {
        value === index
        && 
        <Box>
          <Typography>{ children }</Typography>
        </Box>
      }
    </div>
  );
}
  
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
  
export default function RootHeader(){
  const {appBarValue, setAppBarValue} = React.useContext(SEEDSContext);

  const handleClickTab = (e, newValue) => {
    setAppBarValue(newValue);
  };

  const history = useHistory();

  const handleClickLogo = () => {
    setAppBarValue("home");
    
    if (history.location.pathname !== "/") {
      history.push("/");
    }
  };

  const handleLogin = () => {
    setAppBarValue("Login");

    if (history.location.pathname !== "/login") {
      history.push("/login");
    }
  };

  const handleHistory = (path) => {
    if (history.location.pathname !== path) {
      history.push(path);
    }
  };
  
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

  const classes = useStyles();

  return (
    <TabContext value = { appBarValue }>
      <AppBar position = "static" className = { classes.appBar }>
        <Toolbar className = { classes.toolbar }>
          <div className = { classes.appbarTitle } onClick = { handleClickLogo }>
            <img src = { logo } className = { classes.logo }/>
            <span className = { classes.appbarColorText }>
              <span>{ "SEED" }</span>
              <span>{ "s" }</span>
            </span>
          </div> 
          {
            isMatch ?
              <DrawerComponent/>
              :
              <Tabs className = { classes.tabsContainer } classes = {{ indicator: classes.indicatorColor }} value = { appBarValue } onChange = { handleClickTab }>
                <Tab classes = {{ root: classes.tabRoot, selected: classes.tabSelected }} label = "Home" value = "home" to = "/" disableRipple onClick = { () => { handleHistory("/") }}/>
                <Tab classes = {{ root: classes.tabRoot, selected: classes.tabSelected }} label = "About Us" value = "aboutUs" to = "/aboutUs" disableRipple onClick = { () => { handleHistory("/aboutUs") }}/>
                <Tab classes = {{ root: classes.tabRoot, selected: classes.tabSelected }} label = "Features" value = "features" to = "/features" disableRipple onClick = { () => { handleHistory("/features") }}/>
                <Tab classes = {{ root: classes.tabRoot, selected: classes.tabSelected }} label = "Contact Us" value = "contacUs" to = "/contactUs" disableRipple onClick = { () => { handleHistory("/contactUs") }}/>
                <Tab classes = {{ root: classes.loginRoot, selected: classes.loginSelected }} label = "Login" value = "Login" textColor	= "inherit" disableRipple onClick = { handleLogin }/>
              </Tabs>
          }
        </Toolbar>
      </AppBar>
    </TabContext>
  );
}