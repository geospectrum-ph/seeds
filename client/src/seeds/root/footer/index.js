import * as React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles, Grid } from "@material-ui/core";

import { SEEDSContext } from "../../context/SEEDSContext";

const useStyles = makeStyles(function () {
  return ({
    rootFooter: {
      display: "flex",
      flexFlow: "row nowrap",
      placeContent: "center space-between",
      placeItems: "center center",

      boxSizing: "border-box",
      padding: "12px 48px",

      background: "var(--color-black)",
      cursor: "default",

      font: "500 16px/1 'Outfit', sans-serif",
      color: "var(--color-gray-dark)",

      "& > *": {
        width: "auto",
        height: "auto",
        
        display: "flex",
        flexFlow: "row nowrap",
        placeContent: "center center",
        placeItems: "center center",

        boxSizing: "border-box",
        gap: "12px",
      },
    },
    rootFooterLink: {
      "& > a": {
        font: "500 16px/1 'Outfit', sans-serif",
        textDecoration: "none",
        color: "var(--color-gray-dark)",
      },

      "&:hover, & > a:hover": {
        cursor: "pointer",

        color: "var(--color-white)",
      },
    },
  });
});

export default function RootFooter(){
  const styles = useStyles();
  const history = useHistory();

  const { setAppBarValue } = React.useContext(SEEDSContext);

  const handleHistory = (path) => {
    if (history.location.pathname !== path) {
      history.push(path);
    }

    setAppBarValue(""); 
  };

  return (
    <Grid id = "root-footer" className = { styles.rootFooter } container>
      <Grid container>         
        <Grid item className = { styles.rootFooterLink }><a href = "https://www.geospectrum.com.ph/" target = "_blank">{ "GEOSPECTRUM" }</a></Grid>
        <Grid item>{ "© " }</Grid>
        <Grid item>{ new Date().getFullYear() }</Grid>
        <Grid item>{ "All Rights Reserved" }</Grid>
      </Grid>
      <Grid container>         
        <Grid item className = { styles.rootFooterLink } onClick = { function () { handleHistory("/terms-of-use"); }}>{ "Terms of Use" }</Grid>
        <Grid item>{ "|" }</Grid>
        <Grid item className = { styles.rootFooterLink } onClick = { function () { handleHistory("/privacy-policy"); }}>{ "Privacy Policy" }</Grid>
      </Grid>
    </Grid>
  );
}
