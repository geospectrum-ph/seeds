import * as React from "react";
import { useHistory } from "react-router-dom";

import PropTypes from "prop-types";

import { createTheme, makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Tab, Tabs, useMediaQuery, Box } from "@material-ui/core";
import { TabContext } from "@material-ui/lab";

import { SEEDSContext } from "../../../context/SEEDSContext";

import DrawerComponent from "../drawerComponent";
import logo from '../../../assets/icons/0 Logo (3D Colored).png'

const theme = createTheme({
  typography: {
    fontFamily: "'Outfit', sans-serif"
  },
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: "auto",

    boxSizing: "border-box",
    padding: "0 12px",

    background: "var(--color-background-01)",
  },
  appbarTitle: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "flex-end",
    justify: "center",

    boxSizing: "border-box",
    gap: "12px",

    cursor: "pointer",
  },
  logo: {
    height: "48px",
  },
  appbarColorText: {
    font: "bold 32px 'Outfit', sans-serif",
    
    "& :nth-of-type(1)": {
      color: "var(--color-green-02)",
    },
  },
  tabsContainer: {
    marginLeft: "auto",
  },
  indicatorColor: {
    backgroundColor: "var(--color-white)",
  },
  tabRoot: {
    minWidth: "120px",
    height: "auto",

    boxSizing: "border-box",
    margin: "0 12px 0 0",

    opacity: 1.00,

    font: "600 16px 'Outfit', sans-serif",
    color: "var(--color-background-02)",

    "&:hover": {
      color: "var(--color-white)",
    },
  },
  tabSelected: {
    color: "var(--color-white)",
  },
  loginRoot: {
    minWidth: "120px",
    height: "auto",

    boxSizing: "border-box",
    margin: "0 0 0 24px",

    background: "var(--color-background-02)",
    opacity: 1.00,

    font: "600 16px 'Outfit', sans-serif",
    color: "var(--color-background-01)",

    "&:hover": {
      background: "var(--color-green-01)",

      color: "var(--color-white)",
    },
  },
  loginSelected: {
    background: "var(--color-green-01)",

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
  
export default function AppsBar(){
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
        <Toolbar>
          <h1 className = { classes.appbarTitle } onClick = { handleClickLogo }>
            <img src = { logo } className = { classes.logo }/>
            <span className = { classes.appbarColorText }>
              <span>SEED</span>
              <span>s</span>
            </span>
          </h1> 
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