import React from 'react';
import { Grid, Button, makeStyles, Paper, Container, TextField, Typography } from '@material-ui/core';

import ContactUsMap from './contactUsMap'
const useStyles = makeStyles((theme) => ({
  textInput: {
    marginTop: 15,
  }, submit: {
    border: 0,
    borderRadius: 5,
    backgroundColor: '#1b798e',
    color: '#ffffff',
    fontSize: '1rem',
    height: '5vh',
    top: '2vh',
    padding: '0 30px',
    fontFamily: "'Outfit', sans-serif",
    marginBottom: 40,
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922',
    }
  }, heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  }
}));

export default function ContactUs(props){
  const classes = useStyles();
  
  return(
    <div className={classes.root}>
      <div className={classes.heroContent} >
        <Container maxWidth="md" component="main" style={{height:'50%'}}>
          <Paper style={{padding:20}} elevation={3} >
            <Typography  component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
              Got a question?
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Send us a Message!
            </Typography>
            <Grid container direction = "row" spacing={3} justifyContent="center" alignItems="center">
              <Grid item container direction = "column" xs={6} >
                <TextField className={classes.textInput} label="Last Name" variant="outlined" size="small" required/>
                <TextField className={classes.textInput} label="Email" variant="outlined" size="small" required/>
                <TextField className={classes.textInput} label="Company Name" variant="outlined" size="small"/>
              </Grid>
              <Grid item container direction = "column" xs={6}>
                <TextField className={classes.textInput} label="First Name" variant="outlined" size="small" required/>
                <TextField className={classes.textInput} label="Contact Number" variant="outlined" size="small" required/>
                <TextField className={classes.textInput} label="Industry" variant="outlined" size="small"/>
              </Grid>
              <Grid item container direction = "column" xs={12}>
                <TextField className={classes.textInput} label="Heading" variant="outlined" size="small"/>
                <TextField className={classes.textInput} label="Message" variant="outlined" size="small" multiline minRows={12} />
                <Button className={classes.submit}>Send your message!</Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </div>
      <div className={classes.heroContent}>
        <Container maxWidth="lg">
          <Grid container direction="row" spacing={4} >
            <Grid item xs={12} sm={12} md={7} style={{height:"100%"}} >
              <Paper elevation={3}>
                <ContactUsMap/>
              </Paper>  
            </Grid>
            <Grid item xs={12} sm={12} md={5} container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6">Address</Typography>
                <Typography color="textSecondary">
                  Main Office - GEOSPECTRUM Marketing Services
                  Unit 1604, OMM-CITRA Bldg., 39 San Miguel Avenue, Ortigas Center, Pasig City, Philippines
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Contact Numbers:</Typography>
                <Typography color="textSecondary">
                  +63917-7915536 / +63920-9113418 <br/>
                  +(632)-637-8026
                </Typography>
              </Grid>
              <Grid item xs={12} >
                <Typography variant="h6">Email:</Typography>
                <Typography  color="textSecondary">
                  seeds@geospectrum.com.ph
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  )
}