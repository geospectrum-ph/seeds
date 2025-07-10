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

      overflow: "hidden",

      display: "flex",
      flexFlow: "column nowrap",

      // #container-root-header
      "& > :nth-child(1)": {
        flex: "0 1 auto",
      },
      
      // #container-root-body
      "& > :nth-child(2)": {   
        flex: "1 1 auto",

        overflow: "hidden auto",
      },
        
      // #container-root-footer
      "& > :nth-child(3)": {
        flex: "0 1 auto",
      },
    },
    pageRoot: {
      width: "100%",
      height: "100%",

      display: "flex",
      flexFlow: "column nowrap",
      placeContent: "center flex-end",
      placeItems: "center center",

      "& > *": {
        width: "100%",
        height: "auto",
        
        display: "flex",
        flexFlow: "column nowrap",

        boxSizing: "border-box",
        padding: "48px",

        background: "var(--color-white)",

        textAlign: "left",
        color: "var(--color-black)",

        "& > :nth-child(1)": {
          flex: "0 1 auto",

          font: "800 72px/1.00 'Outfit', sans-serif",
        },
        
        "& > :nth-child(2)": {
          flex: "0 1 auto",

          font: "800 180px/0.85 'Outfit', sans-serif",

          "& > :nth-child(1)": {
            color: "var(--color-green-dark)",
          },
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
      name: "Root",
      module:
        <Grid id = "page-root" className = { styles.pageRoot }>
          <div>
            <span>{ "Welcome to" }</span>
            <span><span>{ "SEED" }</span><span>{ "s!" }</span></span>
          </div>
        </Grid>,
      icon: null,
      level: 0,
    },
    {
      path: "/sign-in",
      name: "Sign In",
      module:<SignIn/>,
      icon: null,
      level: 0,
    },
    {
      path: "/password-reset",
      name: "Password Reset",
      module: <PasswordReset/>,
      icon: null,
      level: 0,
    },
    {
      path: "/about",
      name: "About",
      module: <About/>,
      icon: null,
      level: 0,
    },
    {
      path: "/contact-us",
      name: "Contact Us",
      module: <ContactUs/>,
      icon: null,
      level: 0,
    },
    {
      path: "/privacy-policy",
      name: "Privacy Policy",
      module: <PrivacyPolicy/>,
      icon: null,
      level: 0,
    },
    {
      path: "/terms-of-use",
      name: "Terms of Use",
      module: <TermsOfUse/>,
      icon: null,
      level: 0,
    },
    {
      path: null,
      name: null,
      module: <Redirect from = "*" to = "/"/>,
      icon: null,
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
      <Grid id = "container-root-header" item container>
        <RootHeader/>
      </Grid>
      <Grid id = "container-root-body" item container>
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
      <Grid id = "container-root-footer" item container>
        <RootFooter/>
      </Grid>
    </Grid>
  )
}
