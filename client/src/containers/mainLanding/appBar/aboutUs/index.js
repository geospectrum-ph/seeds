import React from 'react';
import { CssBaseline, Typography, Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export default function AboutUs() {
  const classes = useStyles();
  return (
    <>
      {/* <CssBaseline /> */}
      <div className={classes.root}>
        <main id="header"> 
          <div className={classes.heroContent}>
            <Container maxWidth="lg">
              <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                Overview of the Project
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Insert description
              </Typography>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth='xl'>
            <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
              Project Team
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Insert description
            </Typography>
            <br/>
          </Container>
          <div className={classes.heroContent} >
            <Container maxWidth="lg">
              <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                Project Team
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Insert description
              </Typography>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth='xl'>
            <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
              Other details
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Insert description
            </Typography>
            <br/>
          </Container>
        </main>
      </div>
    </>
  );
}