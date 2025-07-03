import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Typography} from '@material-ui/core';

export default function CircleButton (iconName, title) {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Typography alignSelf="center"> 
        {title}
      </Typography>
    </Grid>
  )
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    flexDirection:'column',
    alignItems: 'center',
    justify: 'center',
    alignContent: 'center'

  }, circleImage: {
    width: 100,
    height: 100,
  },
}))