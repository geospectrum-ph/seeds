import React from 'react';
import { Button, Grid, Typography, Container, CssBaseline }from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Timeline from './timeline'
import seedsImg from '../../../../assets/static/seedsImg'
import ImageCard from './imageCard';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  }, heroButtons: {
    marginTop: theme.spacing(4),
  }, cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  }, login1: {
    border: 0,
    borderRadius: 5,
    backgroundColor: '#1b798e',
    color: '#fffefe',
    fontSize: '1.2rem',
    padding: '20px 40px',
    fontFamily:'LeagueSpartan',
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922',
    }
  }, login2: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#1b798e",
    color: '#1b798e',
    padding: '20px 40px',
    fontFamily:'LeagueSpartan',
    fontSize: '1.2rem',
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#1b798e',
    }
  }
}));

export default function Features() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <div className={classes.heroContent} >
          <Container maxWidth="md">
            <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
              What is SEEDs for LGU?
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              SEEDs for LGU, or simply SEEDs is a web portal and GIS application that provides Local 
              Government Units (LGUs) with a tool to effectively  utilize the spatial and textual information 
              about and within their locality.
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth='md'>
          <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
            SEEDs Module
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Modules are a group of features that are designed to have a target outcome in the entirety of SEEDs.
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button variant="outlined" className={classes.login2} href="#seedsCore">
                  SEEDs Core
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" className={classes.login2} href="#seedsProfile">
                  SEEDs Profile
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined"  className={classes.login2} href="#seedsAnalytics">
                  SEEDs Analytics
                </Button>
              </Grid>
            </Grid>
          </div>
          <br/>
        </Container>
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
              SEEDs Core
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Comprises of a management system and its geographic databases which makes use of geographic maps 
              and other textual information to provide personalized user-centric functionalities.
            </Typography>
          </Container>
          <Container maxWidth="md">
            <Timeline/>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom >
            SEEDs Profile
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            SEEDs Profile provides LGUs with GIS-based mapping and data analysis systems that will enhance, 
            among other things, the capability for:
          </Typography>
          <Grid container spacing={4} >
            <Grid item xs={12} sm={6} md={3}>
              <ImageCard seedimg={seedsImg[0]}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ImageCard seedimg={seedsImg[1]}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ImageCard seedimg={seedsImg[2]}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ImageCard seedimg={seedsImg[3]}/>
            </Grid>
          </Grid>
        </Container>

        <div className={classes.heroContent}>
          <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
            SEEDs Analytics
          </Typography>
        </div>
      </div>
    </>
  );
}