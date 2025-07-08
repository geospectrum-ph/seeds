import * as React from "react";
import { useHistory, Link, Switch, Route, Redirect } from "react-router-dom";

import axios from "axios";

import { makeStyles, Grid } from "@material-ui/core";
import MenuIcon from "@mui/icons-material/Menu";
import UploadIcon from "@mui/icons-material/Upload";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import DatasetIcon from "@mui/icons-material/Dataset";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";

import "leaflet/dist/leaflet.css";

import SEEDsPopulate from '../containers/seedsCore/seedsPopulate';
import SEEDsCatalogue from './catalogue';
import SEEDsMapPortal from './map-portal';
import SEEDsProfile from '../containers/seedsProfile';
import SEEDsAnalytics from '../containers/seedsAnalytics';
import SEEDsAdmin from '../containers/seedsAdmin'

import RootFooter from "../root/footer";

import { AdminContext } from "../context/AdminContext";
import { SEEDSContext } from "../context/SEEDSContext";

import logo from "../assets/logo.png";

const useStyles = makeStyles(function () {
  return ({
    containerHome: {
      width: "100vw",
      height: "100vh",

      display: "flex",
      flexFlow: "row nowrap",

      boxSizing: "border-box",
      margin: "0",

      "& > :nth-of-type(1)": {
        width: "auto",
        height: "100%",

        display: "flex",
        flex: "0 1 auto",
        flexFlow: "column nowrap",

        boxSizing: "border-box",
        padding: "0",

        background: "var(--color-red-dark)",

        "& > *": {
          width: "auto",

          whiteSpace: "nowrap",
          overflow: "hidden",

          display: "flex",
          flexFlow: "row nowrap",
          placeContent: "center flex-start",
          placeItems: "center center",

          boxSizing: "border-box",
          padding: "12px",
          gap: "12px",

          font: "400 16px 'Outfit', sans-serif",
          textDecoration: "none",
          color: "var(--color-gray-light)",

          "& > :nth-child(1)": {
            display: "flex",
            flexFlow: "row nowrap",
            placeContent: "center center",
            placeItems: "center center",
          },

          "&:first-child": {
            minHeight: "72px",

            cursor: "pointer",
          },

          "&:last-child": {
            boxSizing: "border-box",
            margin: "auto 0 0 0",
          },

          "&:hover, &.active": {
            backgroundColor: "var(--color-black)",
            
            color: "var(--color-white)",
          },
        },
      },

      "& > :nth-of-type(2)": {
        display: "flex",
        flex: "1 1 auto",
        flexFlow: "column nowrap",

        "& > :nth-of-type(1)": {
          width: "100%",
          height: "auto",

          minHeight: "72px",

          display: "flex",
          flex: "0 1 auto",
          flexFlow: "row nowrap",
          placeContent: "center center",
          placeItems: "center center",

          boxSizing: "border-box",
          padding: "12px 48px",
          gap: "12px",

          background: "var(--color-white)",
          cursor: "default",

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
          display: "flex",
          flex: "1 1 auto",
          flexFlow: "column nowrap",

          overflow: "hidden auto",

          background: "var(--color-gray-light)",
        },
      },
    },
  });
});

export default function Home() {
  const styles = useStyles();
  const history = useHistory();

  const { loginDetails, setLoginDetails, setGroupPrivilege } = React.useContext(AdminContext);
  const { selectedIndex, appBarValue, setAppBarValue } = React.useContext(SEEDSContext);

  React.useEffect (function () {
    setLoginDetails(localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")) : loginDetails);
    
    async function fetchData () {
      const userGroupPrivileges = await axios.get("https://seeds.geospectrum.com.ph/groupprivilege"); 
      // const userGroupPrivileges = await axios.get("http://localhost:5000/groupprivilege");

      setGroupPrivilege(userGroupPrivileges.data);
    }

    fetchData();
  }, []);

  const modules = [
    {
      name: "Populate",
      path: "/home/populate",
      module: <SEEDsPopulate/>,
      icon: <UploadIcon/>,
      level: 1,
    },
    {
      name: "Catalogue",
      path: "/home/catalogue",
      module: <SEEDsCatalogue/>,
      icon: <LibraryBooksIcon/>,
      level: 0,
    },
    {
      name: "Map Portal",
      path: "/home/map-portal",
      module: <SEEDsMapPortal/>,
      icon: <TravelExploreIcon/>,
      level: 0,
    },
    {
      name: "Profile",
      path: "/home/profile",
      module: <SEEDsProfile/>,
      icon: <DatasetIcon/>,
      level: 1,
    },
    {
      name: "Analytics",
      path: "/home/analytics",
      module: <SEEDsAnalytics/>,
      icon: <AnalyticsIcon/>,
      level: 1,
    },
    {
      name: "Admin",
      path: "/home/admin",
      module: <SEEDsAdmin/>,
      icon: <AdminPanelSettingsIcon/>,
      level: 2,
    },
    {
      name: null,
      path: null,
      module: <Redirect from = "*" to = "/sign-in"/>,
      icon: <LogoutIcon/>,
      level: 0,
    },
  ];
  
  function handleHistory (path) {
    if (history.location.pathname !== path) {
      history.push(path);
    }
    
    setControl(false);

    setAppBarValue(path);
  };

  const [control, setControl] = React.useState(false);

  return (
    <Grid id = "container-home" className = { styles.containerHome } container>
      <Grid item container>
        <Grid item onClick = { function () { setControl(!control); }}>
          <MenuIcon/>
        </Grid>
        {
          modules.map(function (item, index) {
            if (
              (item.level < 1 && JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).user_type === "guest") ||
              (item.level < 2 && JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).user_type.user_group_type) ||
              (item.level < 3 && JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).user_type.user_group_type === "admin")
            ) {
              if (item.name) {
                return (
                  <Link to = { item.path } className = { appBarValue === item.path ? "active" : null } key = { index } onClick = { function () { handleHistory(item.path); } }>
                    <span>{ item.icon }</span>
                    { control ? <span>{ `SEEDs ${ item.name}` }</span> : null }
                  </Link>
                );
              }
              else {
                return (
                  <Link to = { "/sign-in" } key = { index } onClick = { function () { handleHistory("/sign-in"); } }>
                    <span>{ item.icon }</span>
                    { control ? <span>{ `Sign Out` }</span> : null }
                  </Link>
                );
              }
            }
            else {
              return (null);
            }
          })
        }
      </Grid>
      <Grid item container>
        <Grid item container>
          <img src = { logo } style = {{ height: 45, marginTop: 0 }}/>
          <span><span>{ "SEED" }</span><span>{ `s ${ selectedIndex ? modules[selectedIndex].name : "" }` }</span></span>
        </Grid>
        <Grid item container>
          <Switch>
            {
              modules.map(function (item, index) {
                if (
                  (item.level < 1 && JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).user_type === "guest") ||
                  (item.level < 2 && JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).user_type.user_group_type) ||
                  (item.level < 3 && JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).user_type.user_group_type === "admin")
                ) {
                  if (item.path) {
                    return (
                      <Route key = { index } exact path = { item.path }>
                        { item.module }
                      </Route>
                    );
                  }
                  else {
                    return (null);
                  }
                }
                else {
                  return (null);
                }
              })
            }
          </Switch>
        </Grid>
        <Grid item container>
          <RootFooter/>
        </Grid>
      </Grid>
    </Grid>
  );
}