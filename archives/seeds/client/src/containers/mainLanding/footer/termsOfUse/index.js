import React from 'react';
import { Typography, Paper, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
}));


export default function TermsOfUse() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.heroContent} >
        <Container maxWidth="lg">
          <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
            Terms of Use
          </Typography>
          <br/>
          <Paper style={{height:900}} elevation={3} >
            <br/>
            <Typography align="center" color="textSecondary" paragraph >
              Insert description
            </Typography>
          </Paper>
        </Container>
      </div>
    </div>
  );
}