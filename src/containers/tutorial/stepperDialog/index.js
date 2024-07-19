import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import {Grid, Fab, TextField, InputAdornment, Button, IconButton, Drawer, Toolbar} from '@material-ui/core';


// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: 's',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    desc: "SEEDs"
  },
  {
    label: 's Populate',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    desc: "SEEDs Populate"

  },
  {
    label: 's Data Catalogue',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
    desc: "SEEDs Data Catalogue"

  },
  {
    label: 's Map Portal',
    imgPath:
      'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
    desc: "SEEDs Map Portal"

  },
  {
    label: 's Features',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    desc: "SEEDs Features"

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
    // width: '100vw',
    // background: 'none',
    // background: '#122820',
    backgroundColor: '#0d3c47',
    // fontFamily:'Nunito',
    fontFamily:'LeagueSpartan',
    // fontFamily:'GlacialIndifference',
    // fontFamily:'Montserrat',
    // fontFamily: 'Lora'
    textAlign: "center",
    fontSize: "1.25rem",
    // height: '10%',
  },  
  appbarTitle:{
    flexGrow: '1',
    color: '#fffefe',
    fontFamily:'LeagueSpartan',

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

function SwipeableTextMobileStepper() {
  const classes = useStyles();
  const theme = useTheme();
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
  const [open, setOpen] = React.useState(true);
  // const

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
            <Toolbar className={classes.appbar}>
      {/* <Paper square elevation={0} className={classes.header}> */}
        <Typography className={classes.appbarTitle}><span className={classes.colorText}> SEED</span>{tutorialSteps[activeStep].label}</Typography>
      {/* </Paper> */}
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

          {(index == 4 && activeStep == 4 )? (
              <Typography style={{position:"absolute", bottom: "8vh", right:"4vw"}}> 
                <Button className={classes.addtomap} onClick={handleClose} color="primary">
                  You're all set!
                </Button>
              </Typography> 
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
  );
}

export default SwipeableTextMobileStepper;
