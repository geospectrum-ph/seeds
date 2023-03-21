import React from 'react';
import { Typography, Paper, Container, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTypography-h4': {
      fontFamily: 'LeagueSpartan'
    }, '& .MuiTypography-h6': {
      fontFamily: 'LeagueSpartan'
    }
  }, heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  }  
}));

export default function TermsOfUse() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <div className={classes.heroContent} >
          <Container maxWidth="lg">
            <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
              Privacy Policy
            </Typography>
            <br/>
            <Paper style={{height:900}} elevation={3}>
              <br/>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Insert description
              </Typography>
            </Paper>
          </Container>
        </div>
      </div>
    </>
  );
}