import { Route } from "react-router-dom";

import { makeStyles, Grid } from "@material-ui/core";

import RootHeader from "./header";
import RootFooter from "./footer";
import RootMap from "./map";

import About from "./header/about";

import TermsOfUse from "./footer/terms-of-use";
import PrivacyPolicy from "./footer/privacy-policy";

const useStyles = makeStyles(function () {
  return ({
    containerRoot: {
      width: "100vw",
      height: "100vh",

      overflow: "hidden auto",

      display: "flex",
      flexFlow: "column nowrap",

      "& >:nth-of-type(1)": {
        flex: "0 1 auto",
      },
      
      "& >:nth-of-type(2)": {        
        display: "flex",
        flex: "1 1 auto",
        flexFlow: "column nowrap",

        "& >:nth-of-type(1)": {
          flex: "1 1 auto",
        },
        
        "& >:nth-of-type(2)": {
          flex: "0 1 auto",
        },
      },
    },
    pageRoot: {
      width: "100%",
      height: "100%",

      display: "flex",
      flexFlow: "column nowrap",
      placeContent: "center flex-end",
      placeItems: "center center",

      boxSizing: "border-box",
      margin: "0",
      padding: "48px",

      "& >:nth-of-type(1)": {
        width: "100%",
        height: "auto",

        display: "flex",
        flexFlow: "row nowrap",
        placeContent: "center flex-start",
        placeItems: "center center",

        font: "800 120px/1 'Outfit', sans-serif",
        color: "var(--color-black)",
      },
      
      "& >:nth-of-type(2)": {
        width: "100%",
        height: "auto",

        display: "flex",
        flexFlow: "row nowrap",
        placeContent: "center flex-start",
        placeItems: "center center",

        font: "800 120px/1 'Outfit', sans-serif",
        color: "var(--color-black)",

        "& >:nth-of-type(1)": {
          color: "var(--color-green-dark)",
        },
      },
    },
  });
});

export default function Root(){
  const styles = useStyles();
  
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
          <Route path = "/sign-in">
            {/* <SignIn/> */}
          </Route>
          <Route path = "/about">
            <About/>
          </Route>
          <Route path = "/contact-us">
            {/* <Help/> */}
          </Route>
          <Route path = "/privacy-policy">
            <PrivacyPolicy/>
          </Route>
          <Route path = "/terms-of-use">
            <TermsOfUse/>
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

// <Route path="/forgotPassword">
//   <ForgotPassword/>
// </Route>

// <Route path="/resetPassword/:id/:token" component={ResetPassword}/> 