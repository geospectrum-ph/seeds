import React from 'react';
import axios from 'axios';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Toolbar, Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Select, InputLabel, TextField} from '@material-ui/core';
import { Checkbox, FormGroup, Paper,  Input, MenuItem, Chip } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
// import './index.css'
import { Card, CardHeader, CardContent, CardActions, CardActionArea, CardMedia, Fab, IconButton } from '@material-ui/core';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';

import clsx from 'clsx';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import { OutlinedInput } from '@material-ui/core';
import Check from '@material-ui/icons/Check';

import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
// import React from 'react';
import Carousel from 'react-material-ui-carousel'

// import { soc1, eco1, env1, demo1 } from "../../../assets";
import soc1 from "../../../../assets/soc1.jpg"
import env1 from "../../../../assets/env1.jpg"

// import {Paper} from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    // height: "320px",
    // paddingTop: '56.25%'
  },
    root1: {
      justify:"center",
      formControlLabel: {
      fontSize: '0.5em',
      height: '0.5em',
      lineHeight: '0.5em',
    },
    marginTop: {
      marginTop: theme.spacing(2),
    },
    marginTop2: {
      marginTop: theme.spacing(5),
      // backgroundColor: "#000000",
      // height: "50vh",
    },
    borderRadius: 0,
      '& .MuiCardHeader-root': {
        // color:"#fffefe",
        // backgroundColor:"#1b798e",
        color:"#1b798e",
        backgroundColor:"#fffefe",
        textAlign: "left",
        justifyContent: "left",
        alignItems:"left",
        alignContent:"left",
        justify:"left",
      },
        '& .MuiCardHeader-title': {
          fontSize: '1.2rem',
          textAlign: "center",
        fontFamily: "GlacialIndifference",
        },
        '& .MuiTypography-h1': {
          // backgroundColor: "#000000",
          fontSize: "1.5rem",
          color: "#0c343d",
          fontFamily: "LeagueSpartan",
          // padding: '3px',
        },
        '& .MuiTypography-h2': {
          // backgroundColor: "#000000",
          fontFamily: "Nunito",
          fontSize: "1rem",
          color: "#0c343d",
          
        },
        '& .MuiTypography-h3': {
          // backgroundColor: "#000000",
          fontFamily: "GlacialIndifference",
          fontSize: "0.9rem",
          // color: "#fffefe",
          color: '#0c343d',
          '&:hover': {
            color: '#0c343d',
            // backgroundColor: '#5aff3d',
            }
        },
        '& .MuiTypography-h4': {
          // width: '145px',
          // height: '50px',
          fontSize: "0.9rem",
          color: '#0d3c47',
          backgroundColor: "#ffffff",
          border: "2px solid #1b798e",
          cursor: 'pointer',
          padding: '5px',
        },
  
    },
    root2: {
      textAlign:'center',
      '& > *': {
        margin: theme.spacing(2),
      },
    },
    extendedIcon: {
      // marginRight: theme.spacing(1),
    },
    fabButton: {
      // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
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
    },
    fabButton3: {
      // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      // borderRadius: 25 ,
      borderRadius: 0 ,
  
      // color: '#fffefe',
      // backgroundColor: '#1b798e',
      // height: 30,
      fontSize: '1rem',
      // opacity: '2',
      '&:hover': {
        // color: '#fffefe',
        backgroundColor: '#29b5d5',
        }
    },
        buttonStyle1: {
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%',
        border: 0,
        borderRadius: 1,
        // boxShadow: '0 3px 5px 2px rgba(255,255,255,0.3)',
        // color: '#0c343d',
        color: '#fffefe',
        height: 48,
        fontSize: '1rem',
        padding: '0 30px',
        // fontFamily:'Nunito',
            fontFamily:'LeagueSpartan',
      // fontFamily:'GlacialIndifference',
            // fontFamily:'Montserrat',
      // fontFamily: 'Lora'
        '&:hover': {
          color: '#fffefe',
          backgroundColor: '#1b798e',
          // padding:'3px',
          }
      },
  
    paperseedsmaintitle: {
      // fontFamily:'LeagueSpartan',
      fontFamily:'GlacialIndifference',
      fontSize: '1.3rem',
      // height: '10vh'
    },
  
    body: {
      display:"flex",
      flexDirection: "row",
      // justify:"flex-end",
      // justifyContent:"center",
      // alignContent:"center",
      // alignItems:"center",
    },
    cardheader: {
      // maxWidth: 350,
      backgroundColor:"#1b798e",
      // backgroundColor:"#29b5d5",
      // fontSize: "10px",
      // display: "flex",
      // flexDirection:"row"
      color:"#fffefe",
      // fontFamily: "Nunito",
      fontFamily:'LeagueSpartan',
  
    },
    padding: {
      // padding: theme.spacing(3),
    },
    paperfeaturebutton: {
      textAlign: 'center',
      
    },
    papermap: {
      // width: "50vw",
      height: "90vh",
      justify: "center",
      backgroundColor: "#8c8c8c",
      textAlign: 'center',
    borderRadius: 0,
  
    },
    paperseedsmain: {
      borderRadius: 0,
      // backgroundColor: '#9eb1b5',
      // backgroundColor: '#b6c4c7',
      backgroundColor: '#e6ebec',
      // backgroundColor: '#e6ebec',
      display: 'flex',
      flexDirection: 'column',
      // justify: 'center',
      // justifyContent: 'center',
      // alignContent:'center',
      alignItems: 'center',
      textAlign: 'center',
      width: '100vw',
      // height: '100vh'
      // elevation: '3',
  
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    
  }));

  function SeedsCarouselCard ({seedsFeatures,seedsDesc}) {
    const classes = useStyles();
    var str1 = "#"
    var seedsFeaturesNotJson = {seedsFeatures};
    var str2 = JSON.stringify(seedsFeatures); //convert object to string
    // var str3 = str1.concat(str2)
    var str3 = str2.replace(/"/g,"") //tanggalin ""
    var str4 = str1.concat(str3)  //lagyan ng # sa unahan

    return (
      <div 
        style={{backgroundColor: "#ced8da", width:"90vw"}} 
        >
       
        <Grid item >
          <Card class="zoom" 
          style={{width:"90vw"}}
            className={classes.marginTop2}
            >
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="assets/soc1.jpg"
                title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography  variant="h1" >
                    {seedsFeatures}
                  </Typography>
                  <Divider/>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {seedsDesc}
                  </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
              
              <Fab variant="outlined" color="primary" aria-label="show more" href={str4} >
                Learn more
                <ArrowForwardRoundedIcon className={classes.extendedIcon} />
              </Fab>
              
            </CardActions>
          </Card>
        </Grid> 

      </div>
      );
  }
export default function Example(props)
{
    
    const classes = useStyles();

    return (
      <div>
      <Carousel >
        
      <SeedsCarouselCard seedsFeatures="Social" seedsDesc={["Planning, monitoring and implementation of local government projects"]}></SeedsCarouselCard>
        <SeedsCarouselCard seedsFeatures="Economic" seedsDesc={["Formulation of economic development plans and land use policies"]}></SeedsCarouselCard>
        <SeedsCarouselCard seedsFeatures="Environmental" seedsDesc={["Development of master plans for health and safety, risk and disaster mitigation and other environmental policies"]}></SeedsCarouselCard>
        <SeedsCarouselCard seedsFeatures="Demographic" seedsDesc={["Efficient delivery of social services to its constituents with the aid of its demographic and socio-economic databases"]}></SeedsCarouselCard>      
      </Carousel>
              
            

            </div>
    )
}

function Item(props)
{
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}