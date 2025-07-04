import * as React from "react";
import { useHistory, Link } from "react-router-dom";

import { createTheme, makeStyles, withStyles, Drawer, Grid, IconButton, List, ListItemText, useMediaQuery } from "@material-ui/core";
import MuiListItem from "@material-ui/core/ListItem";
import MenuIcon from "@material-ui/icons/Menu";

import { SEEDSContext } from "../../context/SEEDSContext";

import logo from "../../assets/logo.png";

const theme = createTheme({});

const useStyles = makeStyles(function (theme) {
  return ({
    rootHeader: {
      width: "100%",
      height: "72px",
      minHeight: "72px",

      display: "flex",
      flexFlow: "row nowrap",
      placeContent: "center space-between",
      placeItems: "center center",

      boxSizing: "border-box",
      padding: "12px 48px",

      background: "var(--color-white)",
      cursor: "default",

      font: "400 16px/1 'Outfit', sans-serif",
      color: "var(--color-gray-dark)",

      "& > :nth-of-type(1) > *": {  
        display: "flex",
        flexFlow: "row nowrap",
        placeContent: "center center",
        placeItems: "center center",

        boxSizing: "border-box",
        gap: "12px",

        cursor: "pointer",

        "& img": {
          height: "48px",
        },

        "& > *": {
          font: "800 36px/1 'Outfit', sans-serif",
          color: "var(--color-black)",

          "& > :nth-of-type(1)": {
            color: "var(--color-green-dark)",
          },
          
          "&:hover": {
            "& > :nth-of-type(1)": {
              color: "var(--color-black)",
            },
          },
        },
      },

      "& > :nth-of-type(2)": {  
        width: "auto",
        height: "auto",
      },

      "& #root-menu-tabs": {
        display: "flex",
        flexFlow: "row nowrap",
        placeContent: "center center",
        placeItems: "center center",

        boxSizing: "border-box",
        gap: "12px",

        "& > *": {
          width: "auto",

          whiteSpace: "nowrap",
          overflow: "hidden",

          placeItems: "center center",
          placeContent: "center center",

          boxSizing: "border-box",
          padding: "12px",
          borderBottom: "2px solid var(--color-transparent)",
      
          font: "800 16px 'Outfit', sans-serif",
          textAlign: "center",
          textDecoration: "none",
          color: "var(--color-gray-dark)",

          "&:hover": {
            color: "var(--color-black)", 
          },

          "&.active": {
            borderBottom: "2px solid var(--color-black)",

            color: "var(--color-red-dark)",
          },
          
          "&:last-child": {
            boxSizing: "border-box",
            margin: "0 0 0 12px",
            padding: "12px 24px",

            backgroundColor: "var(--color-black)",

            font: "600 16px 'Outfit', sans-serif",
            color: "var(--color-gray-light)",

            "&:hover": {
              backgroundColor: "var(--color-red-dark)",
              
              color: "var(--color-white)", 
            },

            "&.active": {
              borderBottom: "2px solid var(--color-black)",

              backgroundColor: "var(--color-red-dark)",
              
              color: "var(--color-white)", 
            },
          },
        },
      },
    },
  });
});

function RootMenuTabs ({ array, appBarValue, handleHistory }) {
  return (
    <div id = "root-menu-tabs">
      {
        array.map(function (item, index) {
          return (
            <Link to = { item.path } className = { appBarValue === item.path ? "active" : null } key = { index } onClick = { function () { handleHistory(item.path); } }>{ item.name }</Link>
          );
        })
      }
    </div>
  );
}

function RootMenuDrawer ({ array, appBarValue, handleHistory }) {
  const [control, setControl] = React.useState(false);

  const ListItem = withStyles({
    root: {
      boxSizing: "border-box",
      margin: "0 48px 0 0",
      padding: "12px",

      font: "600 16px 'Outfit', sans-serif",
      color: "var(--color-gray-dark)",

      "&.active": {
        backgroundColor: "var(--color-red-dark)",
        
        color: "var(--color-white)",
      },

      "&:hover": {
        backgroundColor: "var(--color-black)",
        
        color: "var(--color-white)",
      },
    },

  })(MuiListItem);

  return (
    <div id = "root-menu-drawer">
      <Drawer anchor = "right" open = { control } onClick = { function () { setControl(false); }}>
        <List>
          {
            array.map(function (item, index) {
              return (
                <ListItem className = { appBarValue === item.path ? "active" : null } key = { index } divider button onClick = { function () { handleHistory(item.path); } }>
                  <ListItemText primary = { item.name } disableTypography/>
                </ListItem>
              );
            })
          }
        </List>
      </Drawer>
      <IconButton onClick = { function () { setControl(!control); }} disableRipple><MenuIcon/></IconButton>
    </div>
  );
};

export default function RootHeader () {
  const styles = useStyles();
  const history = useHistory();

  const { appBarValue, setAppBarValue } = React.useContext(SEEDSContext);

  const [array] = React.useState([
    {
      name: "HOME",
      path: "/",
    },
    {
      name: "ABOUT",
      path: "/about",
    },
    {
      name: "CONTACT US",
      path: "/contact-us",
    },
    {
      name: "SIGN IN",
      path: "/sign-in",
    },
  ]);

  function handleHistory (path) {
    if (history.location.pathname !== path) {
      history.push(path);
    }

    setAppBarValue(path);
  };

  return (
    <Grid id = "root-header" className = { styles.rootHeader } container>
      <Grid item container>
        <div onClick = { function () { handleHistory("/"); }}>
          <img src = { logo }/>
          <span><span>{ "SEED" }</span><span>{ "s" }</span></span>
        </div> 
      </Grid>
      <Grid item container>
        {
          useMediaQuery(theme.breakpoints.down("sm")) ?
            <RootMenuDrawer array = { array } appBarValue = { appBarValue } handleHistory = { handleHistory }/>
            :
            <RootMenuTabs array = { array } appBarValue = { appBarValue } handleHistory = { handleHistory }/>
        }
      </Grid>
    </Grid>
  );
}