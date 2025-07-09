import * as React from "react";
import { useHistory, Route, Redirect, Switch } from "react-router-dom";

import { makeStyles, Grid } from "@material-ui/core";

import RootHeader from "./header";
import RootFooter from "./footer";
import RootMap from "./map";

import SignIn from "./header/sign-in";
import PasswordReset from "./header/password-reset";
import About from "./header/about";
import ContactUs from "./header/contact-us";

import TermsOfUse from "./footer/terms-of-use";
import PrivacyPolicy from "./footer/privacy-policy";

import { SEEDSContext } from "../context/SEEDSContext";

const useStyles = makeStyles(function () {
  return ({
    containerRoot: {
      width: "100vw",
      height: "100vh",

      overflow: "hidden auto",

      display: "flex",
      flexFlow: "column nowrap",

      "& > :nth-child(1)": {
        display: "flex",
        flex: "0 1 auto",
      },
      
      "& > :nth-child(2)": {        
        display: "flex",
        flex: "1 1 auto",
        flexFlow: "column nowrap",

        overflow: "hidden auto",

        "& > :nth-child(1)": {
          flex: "1 1 auto",
        },
        
        "& > :nth-child(2)": {
          flex: "0 1 auto",
        },
      },
    },
    pageRoot: {
      width: "100%",
      height: "100%",

      display: "flex",
      flexFlow: "column nowrap",
      placeContent: "center center",
      placeItems: "center center",

      boxSizing: "border-box",
      margin: "0",

      "& > :nth-child(1)": {
        width: "100%",
        height: "auto",

        display: "flex",
        flexFlow: "row nowrap",
        placeContent: "center center",
        placeItems: "center center",

        background: "var(--color-red-dark)",

        font: "800 120px/1 'Outfit', sans-serif",
        color: "var(--color-white)",
      },
      
      "& > :nth-child(2)": {
        width: "100%",
        height: "auto",

        display: "flex",
        flexFlow: "row nowrap",
        placeContent: "center center",
        placeItems: "center center",

        background: "var(--color-black)",

        font: "800 120px/1 'Outfit', sans-serif",
        color: "var(--color-white)",

        "& > :nth-child(1)": {
          color: "var(--color-green-dark)",
        },
      },
    },
  });
});

export default function Root(){
  const styles = useStyles();
  const history = useHistory();

  const { setAppBarValue } = React.useContext(SEEDSContext);

  const modules = [
    {
      path: "/",
      module:
        <Grid id = "page-root" className = { styles.pageRoot }>
          <span>{ "Welcome to" }</span>
          <span><span>{ "SEED" }</span><span>{ "s!" }</span></span>
        </Grid>,
      level: 0,
    },
    {
      path: "/sign-in",
      module:<SignIn/>,
      level: 0,
    },
    {
      path: "/password-reset",
      module: <PasswordReset/>,
      level: 0,
    },
    {
      path: "/about",
      module: <About/>,
      level: 0,
    },
    {
      path: "/contact-us",
      module: <ContactUs/>,
      level: 0,
    },
    {
      path: "/privacy-policy",
      module: <PrivacyPolicy/>,
      level: 0,
    },
    {
      path: "/terms-of-use",
      module: <TermsOfUse/>,
      level: 0,
    },
    {
      path: null,
      module: <Redirect from = "*" to = "/"/>,
      level: 0,
    },
  ];

  React.useEffect(function () {
    if (history.location.pathname !== "/") {
      history.push("/");
    }

    setAppBarValue("/");
  }, []);
  
  return (
    <Grid id = "container-root" className = { styles.containerRoot } container>
      <Grid id = "container-root-header" item>
        <RootHeader/>
      </Grid>
      <Grid id = "container-root-body" item container>
        <Grid item>
          <Switch>
            {
              modules.map(function (item, index) {
                if (item.path) {
                  return (
                    <Route key = { index } exact path = { item.path }>
                      { item.module }
                    </Route>
                  );
                }
                else {
                  return (
                    <Route key = { index }>
                      { item.module }
                    </Route>
                  );
                }
              })
            }
          </Switch>
          <RootMap/>
        </Grid>
        <Grid id = "container-root-footer" item>
          <RootFooter/>
        </Grid>
      </Grid>
    </Grid>
  )
}
