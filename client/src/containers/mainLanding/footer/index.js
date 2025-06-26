import * as React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Toolbar, Typography } from '@material-ui/core'

import { SEEDSContext } from '../../../context/SEEDSContext';

const useStyles = makeStyles(() => ({
  footer: {
    boxSizing: "border-box",
    padding: "12px 48px",

    background: "var(--color-black)",

    font: "500 16px/1 'Outfit', sans-serif",
    color: "var(--color-gray-dark)",

  },
  container: {
    width: "auto",

    boxSizing: "border-box",
    gap: "12px",
  },
}));

export default function Footer(){
  const classes = useStyles();
  const history = useHistory();

  const { setAppBarValue } = React.useContext(SEEDSContext);

  const handleHistory = (path) => {
    if (history.location.pathname !== path) {
      history.push(path);
    }
  };

  return (
    <Grid className = { classes.footer } container direction = "row" justifyContent = "space-between" alignItems = "center">
      <Grid className = { classes.container } container direction = "row" justifyContent = "center" alignItems = "center">         
        <Grid item>{ "GEOSPECTRUM © " + new Date().getFullYear() }</Grid>
        <Grid item>{ "|" }</Grid>
        <Grid item>{ "All Rights Reserved" }</Grid>
      </Grid>
      <Grid className = { classes.container } container direction = "row" justifyContent = "center" alignItems = "center">         
        <Grid item onClick = { () => { handleHistory("/termsOfUse"); setAppBarValue(""); }}>{ "Terms of Use" }</Grid>
        <Grid item>{ "|" }</Grid>
        <Grid item onClick = { () => { handleHistory("/privacyPolicy"); setAppBarValue(""); }}>{ "Privacy Policy" }</Grid>
      </Grid>
    </Grid>
  );
}
