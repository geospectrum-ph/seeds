import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Fab, Button, Toolbar, Typography, MobileStepper } from '@material-ui/core';

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const tutorialSteps = [
  {
    label: 's',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    desc: "SEEDs"
  }, {
    label: 's Populate',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    desc: "SEEDs Populate"

  }, {
    label: 's Data Catalogue',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
    desc: "SEEDs Data Catalogue"

  }, {
    label: 's Map Portal',
    imgPath:
      'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
    desc: "SEEDs Map Portal"

  }, {
    label: 's Features',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    desc: "SEEDs Features"

  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    flexGrow: 1,
  }, header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  }, img: {
    height: 400,
    display: 'block',
    maxWidth: '100%',
    overflow: 'hidden',
    width: '100%',
  }, appbar: {
    backgroundColor: '#0d3c47',
    fontFamily:'LeagueSpartan',
    textAlign: "center",
    fontSize: "1.25rem",
  }, appbarTitle:{
    flexGrow: '1',
    color: '#fffefe',
    fontFamily:'LeagueSpartan',
  }, colorText: {
    color: "#5aff3d"
  }, addtomap: {
    border: 0,
    borderRadius: 0,
    backgroundColor: '#1b798e',
    color: '#ffffff',
    textAlign: "center",
    justify:"center",
    padding: '14px 30px',
    fontFamily:'LeagueSpartan',
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922',
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

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <Toolbar className={classes.appbar}>
        <Typography className={classes.appbarTitle}>
          <span className={classes.colorText}> SEED</span>{tutorialSteps[activeStep].label}
        </Typography>
      </Toolbar>
      <Grid container>
        <Grid item xs ={8}>
          <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={activeStep}
            onChangeIndex={handleStepChange} enableMouseEvents>
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

      <MobileStepper steps={maxSteps} position="static" variant="progress" activeStep={activeStep}
        nextButton={<Fab variant="outlined" className={classes.fabButton3}  color="primary" aria-label="add" 
          size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Fab>
        }backButton={<Fab variant="outlined" className={classes.fabButton3}  color="primary" aria-label="add"
          size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </Fab>
        }/>
    </div>
  );
}

export default SwipeableTextMobileStepper;
