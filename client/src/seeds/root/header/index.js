import * as React from "react";
import { useHistory, Link } from "react-router-dom";

import { createTheme, makeStyles, Drawer, Grid, IconButton, useMediaQuery } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import { SEEDSContext } from "../../context/SEEDSContext";

import logo from "../../assets/logo.png";

const useStyles = makeStyles(function () {
  return ({
    rootHeader: {
      width: "100%",
      height: "72px",
      
      minHeight: "72px",

      display: "flex",
      flexFlow: "row nowrap",

      boxSizing: "border-box",
      padding: "12px 48px",

      background: "var(--color-white)",
      cursor: "default",

      font: "400 16px/1.25 'Outfit', sans-serif",
      color: "var(--color-gray-dark)",

      "& > :nth-child(1) > *": {  
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
          font: "800 36px/1.00 'Outfit', sans-serif",
          color: "var(--color-black)",

          "& > :nth-child(1)": {
            color: "var(--color-green-dark)",
          },
          
          "&:hover": {
            "& > :nth-child(1)": {
              color: "var(--color-black)",
            },
          },
        },
      },

      "& > :nth-child(2)": {  
        width: "auto",
        height: "auto",
      },

      "& #root-menu-tabs": {
        display: "flex",
        flexFlow: "row nowrap",

        boxSizing: "border-box",
        gap: "12px",

        "& > *": {
          display: "flex",
          flex: "0 1 auto",
          flexFlow: "row nowrap",
          placeItems: "center center",
          placeContent: "center center",
          
          whiteSpace: "nowrap",
          overflow: "hidden",

          boxSizing: "border-box",
          padding: "12px",
          borderBottom: "2px solid var(--color-transparent)",
      
          font: "800 16px/1.25 'Outfit', sans-serif",
          textAlign: "center",
          textDecoration: "none",
          color: "var(--color-gray-dark)",

          "&:hover": {
            color: "var(--color-black)", 
          },

          "&.active": {
            boxSizing: "border-box",
            borderBottom: "2px solid var(--color-black)",

            color: "var(--color-red-dark)",
          },
          
          "&:last-child": {
            boxSizing: "border-box",
            margin: "0 0 0 12px",
            padding: "12px 24px",

            backgroundColor: "var(--color-black)",

            font: "600 16px/1.00 'Outfit', sans-serif",
            color: "var(--color-gray-light)",

            "&:hover": {
              boxSizing: "border-box",
              backgroundColor: "var(--color-red-dark)",
              
              color: "var(--color-white)", 
            },

            "&.active": {
              boxSizing: "border-box",
              borderBottom: "2px solid var(--color-black)",

              backgroundColor: "var(--color-red-dark)",
              
              color: "var(--color-white)", 
            },
          },
        },
      },

      "& #root-menu-drawer": {
        display: "flex",
        flexFlow: "column nowrap",
        
        boxSizing: "border-box",
        padding: "72px 0 0 0",

        font: "600 16px/1.25 'Outfit', sans-serif",
        color: "var(--color-gray-dark)",

        "& > *": {
          boxSizing: "border-box",
          padding: "12px 48px 12px 12px",

          "&.active": {
            backgroundColor: "var(--color-red-dark)",
            
            color: "var(--color-white)",
          },

          "&:hover": {
            backgroundColor: "var(--color-black)",
            
            color: "var(--color-white)",
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

  return (
    <div id = "root-menu-drawer-buffer">
      <Drawer anchor = "right" open = { control } onClick = { function () { setControl(false); }}>
        <Grid id = "root-menu-drawer" container>
          {
            array.map(function (item, index) {
              return (
                <Grid key = { index } className = { appBarValue === item.path ? "active" : null } item onClick = { function () { handleHistory(item.path); }}>
                  <span>{ item.name }</span>
                </Grid>
              );
            })
          }
        </Grid>
      </Drawer>
      <IconButton onClick = { function () { setControl(!control); }} disableRipple><MenuIcon/></IconButton>
    </div>
  );
};

export default function RootHeader () {
  const theme = createTheme({});
  const styles = useStyles();
  const history = useHistory();

  const { appBarValue } = React.useContext(SEEDSContext);

  const array = [
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
  ];

  function handleHistory (path) {
    if (history.location.pathname !== path) {
      history.push(path);
    }
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