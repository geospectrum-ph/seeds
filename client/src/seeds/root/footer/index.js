import * as React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles, Grid } from "@material-ui/core";

import { SEEDSContext } from "../../context/SEEDSContext";

const useStyles = makeStyles(function () {
  return ({
    rootFooter: {
      minHeight: "48px",
      
      display: "flex",
      flexFlow: "row nowrap",
      placeContent: "center space-between",
      placeItems: "center center",

      boxSizing: "border-box",
      padding: "12px 48px",

      background: "var(--color-black)",
      cursor: "default",

      font: "400 16px/1.25 'Outfit', sans-serif",
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

        "&.active-terms-of-use": {
          "& > :nth-child(1)": {
            color: "var(--color-white)",
          },
        },
        
        "&.active-privacy-policy": {
          "& > :nth-child(3)": {
            color: "var(--color-white)",
          },
        },
      },
    },
    rootFooterLink: {
      "& > a": {
        font: "400 16px/1.25 'Outfit', sans-serif",
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

  const { appBarValue } = React.useContext(SEEDSContext);

  const handleHistory = (path) => {
    if (history.location.pathname !== path) {
      history.push(path);
    }
  };

  return (
    <Grid id = "root-footer" className = { styles.rootFooter } container>
      <Grid item container>         
        <Grid item className = { styles.rootFooterLink }><a href = "https://www.geospectrum.com.ph/" target = "_blank">{ "GEOSPECTRUM" }</a></Grid>
        <Grid item>{ "© " }</Grid>
        <Grid item>{ new Date().getFullYear() }</Grid>
        <Grid item>{ "All Rights Reserved" }</Grid>
      </Grid>
      <Grid className = { appBarValue === "/terms-of-use" ? "active-terms-of-use" : appBarValue === "/privacy-policy" ? "active-privacy-policy" : null } item container>         
        <Grid item className = { styles.rootFooterLink } onClick = { function () { handleHistory("/terms-of-use"); }}>{ "Terms of Use" }</Grid>
        <Grid item>{ "|" }</Grid>
        <Grid item className = { styles.rootFooterLink } onClick = { function () { handleHistory("/privacy-policy"); }}>{ "Privacy Policy" }</Grid>
      </Grid>
    </Grid>
  );
}
