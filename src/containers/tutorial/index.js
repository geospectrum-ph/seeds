// import React from 'react';
import React, {useEffect, useContext, useState} from 'react';

// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import StepperDialog from "./stepperDialog";
import { createMuiTheme } from '@material-ui/core/styles';
import { Box, Divider, Tabs, Tab, ThemeProvider, Grid, Checkbox, FormControl, FormControlLabel } from '@material-ui/core/';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Fab, TextField, InputAdornment, Button, IconButton, Drawer, Toolbar} from '@material-ui/core';
import { FeaturesContext } from '../../context/FeaturesContext';

const theme = createMuiTheme({

    palette: {
      primary: {
        main: '#1b798e',
        contrastText: '#fffefe',
      },
  
      secondary: {
        main: '#5aff3d',
        contrastText: '#1b798e',
  
      },
  
    },
  
  });


  const tutorialSteps = [
    {
      label: 's',
      imgPath:
        'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
      desc: "Some description for SEEDs"
    },
    {
      label: 's Populate',
      imgPath:
        'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
      desc: "This feature allows uploading and tagging of various spatial and textual information to the SEEDs database management system. Metadata and contextual information are also included to catalogue, sort and filter various information stored in its database."
  
    },
    {
      label: 's Data Catalogue',
      imgPath:
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
      desc: "This feature allows access to the SEEDs database. Depending on the user level and privileges, various information can be accessed and utilized using the SEEDs Catalogue. Discovery, sorting and filtering to downloading of this information is done in the catalogue."
  
    },
    {
      label: 's Map Portal',
      imgPath:
        'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
      desc: "This is the geographic map feature of SEEDs where any spatial data stored in the catalogue are accessed and mapped in GIS-based display. Map styles and features are integrated to the SEEDs map portal to allow users to interactively display and assess any spatial information of interest. Products from this feature include visualization, map generation and map production"
  
    },
    {
      label: 's Features',
      imgPath:
        'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
      desc: "Some description for SEEDs Features"
  
    },
    {
      label: 's',
      imgPath:'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
      desc: "Yay! Done!"
  
    },
  ];
  
  const useStyles = makeStyles((theme) => ({
    root: {
      // maxWidth: 400,
      width: '100%',
      flexGrow: 1,
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      height: 50,
      paddingLeft: theme.spacing(4),
      backgroundColor: theme.palette.background.default,
    },
    img: {
      height: 400,
      display: 'block',
      maxWidth: '100%',
      overflow: 'hidden',
      width: '100%',
    },
    appbar: {
      backgroundColor: '#0d3c47',
      fontFamily:'LeagueSpartan',
      textAlign: "center",
      // fontSize: "1.25rem",
    },  
    appbarTitle:{
      flexGrow: '1',
      color: '#fffefe',
      fontFamily:'LeagueSpartan',
      fontSize:20
    },
    colorText: {
      color: "#5aff3d"
    },
    addtomap: {
      border: 0,
      borderRadius: 0,
      backgroundColor: '#1b798e',
      color: '#ffffff',
      // fontSize: '1.2rem',
      textAlign: "center",
      justify:"center",
      padding: '14px 30px',
  
      // height: '48px',
      // width: '275px',
      // top: '2vh',
      // width: '100vw',
      // padding: '0 30px',
      // paddingTop: '20px',
      // paddingBottom: '20px',
      // fontFamily:'Nunito',
      fontFamily:'LeagueSpartan',
      // fontFamily:'GlacialIndifference',
      // fontFamily:'Montserrat',
      // fontFamily: 'Lora'
      '&:hover': {
        color: '#fffefe',
        backgroundColor: '#229922',
        // padding:'30 px',
        // border:"round",
      }
    },
  }));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const classes = useStyles();
  // const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  const handleClose = () => {
    setOpen(false);
    
  };
  // const [checked, setChecked] = React.useState(true);
  const { checked, setChecked } = useContext(FeaturesContext);
  const { open, setOpen } = useContext(FeaturesContext);

  const handleShowTutorial = (event) => {
    setChecked(event.target.checked);
    // console.log(event.target.checked,"value?")
  };
  return (
    <ThemeProvider theme={theme}>

    <div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div className={classes.root}>
          <Toolbar className={classes.appbar}>
            <Typography className={classes.appbarTitle}><span className={classes.colorText}> SEED</span>{tutorialSteps[activeStep].label}</Typography>
          </Toolbar>
      <Grid container>

        <Grid item xs ={8}>
        <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={step.imgPath} alt={step.label} />
            ) : null}
          </div>
        ))}
      </SwipeableViews>
        </Grid>
        <Grid item xs ={4}>
        {tutorialSteps.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) == 0 ? (
              <Typography>
              {/* className={classes.img}  */}
              {step.desc} 
              {/* alt={step.label}  */}
              </Typography> 
            ) : null}

          {(index == 5 && activeStep == 5 )? (
            <div >
            <Typography style={{position:"absolute", bottom: "11vh", right:"4vw"}}> 
                <Button className={classes.addtomap} onClick={handleClose} color="primary">
                  You're all set!
                </Button>
              </Typography> 
                    {/* <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    // inputProps={{ 'aria-label': 'primary checkbox' }}
                    
                    label="End"
                    labelPlacement="end"
                    color="primary"
                  /> Do not show this again */}
                  <FormControlLabel style={{position:"absolute", bottom: "6vh", right:"3vw"}}
                    value="end"
                    control={<Checkbox color="primary" checked={checked} onChange={(event)=>handleShowTutorial(event)}/>}
                    label="Do not show this again"
                    labelPlacement="end"
                    // checked={DontShow} onChange={(event)=>handleChange(event)}
                  />
                            </div>
            ) : null}
            
          </div>
        ))}
        </Grid>
      </Grid>


     
      <MobileStepper
        steps={maxSteps}
        position="static"
        // variant="text"
        variant="progress"
        activeStep={activeStep}
        nextButton={
          <Fab variant="outlined" className={classes.fabButton3}  color="primary" aria-label="add" size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            {/* Next */}
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Fab>
        }
        backButton={
          <Fab variant="outlined" className={classes.fabButton3}  color="primary" aria-label="add" size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            {/* Back */}
          </Fab>
        }
      />
    </div>


        
      </Dialog>
    </div>
    </ThemeProvider>
  );
}