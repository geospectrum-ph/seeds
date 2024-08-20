import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop, CircularProgress } from '@material-ui/core';
import _without from "lodash/without";

import { SEEDSContext } from '../../context/SEEDSContext';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#ffffff',
  },
}));

export default function LoadingPage() {
  const classes = useStyles();
  const { disUp } = React.useContext(SEEDSContext);

  return (
    <Backdrop className={classes.backdrop} open={disUp} >
      <CircularProgress />
    </Backdrop>
  );
}