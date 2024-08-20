import React from 'react';
import './index.css';
import { CssBaseline, Grid, Card, Button, ButtonGroup, makeStyles, Paper, Container, TextField, Typography } from '@material-ui/core';
import './index.css';
import AppsBar from '../../mainLanding/AppBar';
import Footer from '../../mainLanding/Footer';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../../../theme/index'
import Map from '../../../containers/seedsFeatures/seedsFeaturesMap'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        // direction: "column",
        // justifyContent: "center",
        // alignItems: "center"
    },
    gridContainer: {
        direction: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100
    },
    textInput: {
        marginTop: 15,
    },
    submit: {
        border: 0,
        borderRadius: 0,
        backgroundColor: '#1b798e',
        color: '#ffffff',
        fontSize: '1rem',
        height: '5vh',
        top: '2vh',
        padding: '0 30px',
        fontFamily:'LeagueSpartan',
        // marginTop: 15,
        marginBottom: 40,

        '&:hover': {
          color: '#fffefe',
          backgroundColor: '#229922',
        }
      },
      typo1: {
        fontSize: '2rem',
        fontFamily:'LeagueSpartan',
      },
      typo2: {
        fontSize: '1rem',
        fontWeight: 'regular',
        fontFamily:'LeagueSpartan',
        // marginTop: 0,
      },
}));


export default function ContactUs(props){

    const classes = useStyles();
    const [page, setPage] = React.useState(null);
   
    return(
        <ThemeProvider theme={theme}>
        <div className={classes.root}>
            <AppsBar/>
            <Grid container spacing={3} className={classes.gridContainer}>
                <Grid item xs={8}>
                    <Paper style={{textAlign:"center"}}>
                        <Typography className={classes.typo1}>Got a question? </Typography>
                        <Typography className={classes.typo2}>Send us a message!</Typography>

                        <Grid 
                        container 
                        direction = "row" 
                        spacing={3} 
                        justify="center"
                        alignItems="center" >
                            <Grid item container direction = "column" xs={4} >
                                <TextField className={classes.textInput} label="Last Name" variant="outlined" size="small"  required />
                                <TextField className={classes.textInput} label="Email" variant="outlined" size="small"  required />
                                <TextField className={classes.textInput} label="Company Name" variant="outlined" size="small"   />
                            </Grid>
                            <Grid item container direction = "column" xs={4}>
                                <TextField className={classes.textInput} label="First Name" variant="outlined" size="small"  required />
                                <TextField className={classes.textInput} label="Contact Number" variant="outlined" size="small"  required />
                                <TextField className={classes.textInput} label="Industry" variant="outlined" size="small"   />
                            </Grid>
                            <Grid item container direction = "column" xs={8}>
                            <TextField className={classes.textInput} label="Heading" variant="outlined" size="small"  />
                            <TextField className={classes.textInput} label="Message" variant="outlined" size="small"  multiline rows={4} />
                            <Button className = {classes.submit} >Send your message!</Button>
                        </Grid>
                        </Grid>
                        
                    </Paper>
                </Grid>
                <Grid 
                    item xs={8} 
                    container 
                    direction = "row" >
                    <Grid  xs={6} style={{height:"28vh"}} >
                        <Paper style={{textAlign:"center", padding: 119}}>
                            <Typography className = {classes.typo2}>Insert Map Here!</Typography>
                        </Paper>
                    </Grid>
                    <Grid xs={6}>
                        <Paper style={{textAlign:"flex-start", padding: 30}} >
                            <Typography className={classes.typo2}>Address</Typography>
                        <Typography>
                        Main Office - GEOSPECTRUM Marketing Services
                        Unit 1604, OMM-CITRA Bldg., 39 San Miguel Avenue, Ortigas Center, Pasig City, Philippines
                        </Typography>
                        <br></br>
                        <Typography className={classes.typo2}>Contact Numbers:</Typography>
                        +63917-7915536 / +63920-9113418
                        +(632)-637-8026
                        <br></br>
                        <br></br>

                        <Typography className={classes.typo2}>Email:</Typography>

                        seeds@geospectrum.com.ph
                
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            <Grid style={{width:"100%"}}>
            <br></br>
              <Footer />
            </Grid>
        

        </div>
        </ThemeProvider>

    )
}