import * as React from "react";
import { useHistory, Route, Redirect } from "react-router-dom";

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

      "& > :nth-of-type(1)": {
        flex: "0 1 auto",
      },
      
      "& > :nth-of-type(2)": {        
        display: "flex",
        flex: "1 1 auto",
        flexFlow: "column nowrap",

        "& > :nth-of-type(1)": {
          flex: "1 1 auto",
        },
        
        "& > :nth-of-type(2)": {
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

      "& > :nth-of-type(1)": {
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
      
      "& > :nth-of-type(2)": {
        width: "100%",
        height: "auto",

        display: "flex",
        flexFlow: "row nowrap",
        placeContent: "center center",
        placeItems: "center center",

        background: "var(--color-black)",

        font: "800 120px/1 'Outfit', sans-serif",
        color: "var(--color-white)",

        "& > :nth-of-type(1)": {
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
          <Route exact path = "/">
            <Grid id = "page-root" className = { styles.pageRoot }>
              <span>{ "Welcome to" }</span>
              <span><span>{ "SEED" }</span><span>{ "s!" }</span></span>
            </Grid>
          </Route>
          <Route exact path = "/sign-in">
            <SignIn/>
          </Route>
          <Route exact path = "/password-reset">
            <PasswordReset/>
          </Route>
          <Route exact path = "/about">
            <About/>
          </Route>
          <Route exact path = "/contact-us">
            <ContactUs/>
          </Route>
          <Route exact path = "/privacy-policy">
            <PrivacyPolicy/>
          </Route>
          <Route exact path = "/terms-of-use">
            <TermsOfUse/>
          </Route>
          <Route>
            <Redirect to = "/"/>
          </Route>
          <RootMap/>
        </Grid>
        <Grid id = "container-root-footer" item>
          <RootFooter/>
        </Grid>
      </Grid>
    </Grid>
  )
}
