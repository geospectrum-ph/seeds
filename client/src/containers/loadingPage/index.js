import * as React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Backdrop, CircularProgress } from "@material-ui/core";

import { SEEDSContext } from "../../context/SEEDSContext";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "var(--color-white)",
  },
}));

export default function LoadingPage() {
  const classes = useStyles();

  const { disUp } = React.useContext(SEEDSContext);

  return (
    <Backdrop className = { classes.backdrop } open = { disUp } >
      <CircularProgress/>
    </Backdrop>
  );
}