import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Divider, Toolbar } from '@material-ui/core/';
import { Card, CardHeader } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiCardHeader-root': {
      color:"#fffefe",
      backgroundColor:"#1b798e",
    }, '& .MuiCardHeader-title': {
      fontSize: '1.2rem',
      fontFamily: "GlacialIndifference",
    }, '& .MuiTypography-h1': {
      fontSize: "1rem",
      color: "#1b798e",
      fontFamily: "GlacialIndifference",
    }, '& .MuiTypography-h2': {
      fontFamily: "GlacialIndifference",
      fontSize: "1rem",
      color: "#0c343d",
    }, '& .MuiTypography-h3': {
      fontFamily: "GlacialIndifference",
      fontSize: "0.9rem",
      color: '#0c343d',
      '&:hover': {
        color: '#0c343d',
      }
    }, '& .MuiTypography-h4': {
      fontSize: "0.9rem",
      color: '#0d3c47',
      backgroundColor: "#ffffff",
      border: "2px solid #1b798e",
      cursor: 'pointer',
      padding: '5px',
    },
  }, paper: {
    padding: theme.spacing(4),
    margin: 'auto',
    maxWidth: 800,
  }, image: {
    width: 128,
    height: 128,
  }, img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  }, root1: {
    '& .MuiCardHeader-root': {
      color:"#fffefe",
      backgroundColor:"#1b798e",
    }, '& .MuiCardHeader-title': {
      fontSize: '1.2rem',
      textAlign: "center",
      fontFamily: "GlacialIndifference",
    },
  }, root2: {
    textAlign:'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  }, extendedIcon: {
    marginRight: theme.spacing(1),
  }, fabButton: {
    border: 0,
    borderRadius: 0,
    color: '#fffefe',
    backgroundColor: '#0c343d',
    height: 30,
    fontSize: '1rem',
    opacity: '2',
    '&:hover': {
      color: '#0c343d',
      backgroundColor: '#5aff3d',
    }
  }, buttonStyle1: {
    border: 0,
    borderRadius: 1,
    color: '#fffefe',
    height: 48,
    fontSize: '1rem',
    padding: '0 30px',
    fontFamily: "'Outfit', sans-serif",
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#1b798e',
    }
  }, paperseedsmaintitle: {
    fontFamily:'GlacialIndifference',
    fontSize: '1.3rem',
  }, appbar: {
    backgroundColor: '#0d3c47',
    fontFamily: "'Outfit', sans-serif",
    textAlign: "center",
  }, appbarTitle:{
    flexGrow: '1',
    color: '#fffefe',
  }, colorText: {
    color: "#5aff3d"
  }, body: {
    display:"flex",
    flexDirection: "row",
  }, cardheader: {
    backgroundColor:"#1b798e",
    color:"#fffefe",
    fontFamily: "'Outfit', sans-serif",
  }, padding: {
    padding: theme.spacing(3),
  }, paperfeaturebutton: {
    margin: theme.spacing(3),
    textAlign: 'center',  
  }, papermap: {
    height: "90vh",
    justify: "center",
    textAlign: 'center',
  }, paperseedsmain: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlig: 'center',
    width: '75vw',
  }, summary: {
    margin: theme.spacing(3),
    height: '75px',
  },
}));

export default function SeedsTableData() {
  const classes = useStyles();

  return (
    <div>
      <Toolbar className={classes.appbar}>
        <h3 className={classes.appbarTitle}><span className={classes.colorText}>SEED</span>s Functions</h3>
      </Toolbar>

      <Divider/>
      
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <Card className={classes.root1}>
                <CardHeader title="Data Name"/>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="Data thumbnail" src="/static/images/grid/complex.jpg" />
              </ButtonBase>
            </Grid>

            <Divider orientation="vertical" flexItem />

            <Grid item xs container direction="column" align="right">
              <Grid item xs = {12}>
                <Typography variant="h2" gutterBottom>
                  Location:
                </Typography>
                <Typography variant="h2" gutterBottom>
                  Land Area:
                </Typography>
                <Typography variant="h2" gutterBottom>
                  Date Created:
                </Typography>
                <Typography variant="h2" gutterBottom>
                  Tag:
                </Typography>
                <Typography variant="h2" gutterBottom>
                  File Name:
                </Typography>
                <Typography variant="h2" gutterBottom>
                  Description:
                </Typography>
                <Typography variant="h2" gutterBottom>
                  Keywords:
                </Typography>
                <Typography variant="h2" gutterBottom>
                  Data Type
                </Typography>
                <Typography variant="h2" gutterBottom>
                  Remarks:
                </Typography>
              </Grid>
            </Grid>
            
            <Grid item xs container direction="column" >
              <Grid item xs = {12}>
                <Typography variant="h2" gutterBottom>
                  Aniban
                </Typography>
                <Typography variant="h2" gutterBottom>
                  1000 sq.m.
                </Typography>
                <Typography variant="h2" gutterBottom>
                  01-25-2021
                </Typography>
                <Typography variant="h2" gutterBottom>
                Social
                </Typography>
                <Typography variant="h2" gutterBottom>
                Aniban Covid Tracker
                </Typography>
                <Typography variant="h2" gutterBottom>
                Displays covid-19 data
                </Typography>
                <Typography variant="h2" gutterBottom>
                Covid, active, death
                </Typography>
                <Typography variant="h2" gutterBottom>
                Table
                </Typography>
                <Typography variant="h2" gutterBottom>
                  None
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
}