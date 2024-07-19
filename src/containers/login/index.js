import React from 'react';
import { CssBaseline, Grid, Card, Button, ButtonGroup, makeStyles, Container, TextField, Typography, Paper } from '@material-ui/core';
import { IconButton, Toolbar } from '@material-ui/core'
import { HashRouter as Router, Switch, Route, Link, useHistory} from "react-router-dom";
import AppsBar from "../mainLanding/AppBar"

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../../theme'
const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundImage: `url(${BG})`,
    backgroundColor: '#0c343d',
    // backgroundRepeat: "no-repeat",
    backgroundSize: 'cover',
    height: '100vh',
  }, 
  typo1: {
    fontSize: '1.5rem',
    fontFamily:'LeagueSpartan',
    // alignSelf: 'center',
  },
  buttonStyle2: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%',
    border: 0,
    borderRadius: 0,
    // boxShadow: '0 3px 5px 2px rgba(255,255,255,0.1)',
    color: '#06170e',
    height: 30,
    padding: '0 10px',
    fontSize:'0.75rem',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  filled1: {
    color: '#ffffff',
    backgroundColor: '#ffffff',
  },
  login1: {
    border: 0,
    borderRadius: 0,
    backgroundColor: '#1b798e',
    color: '#ffffff',
    fontSize: '1rem',
    height: 48,
    padding: '0 30px',
    // fontFamily:'Nunito',
    fontFamily:'LeagueSpartan',
    // fontFamily:'GlacialIndifference',
    // fontFamily:'Montserrat',
    // fontFamily: 'Lora'
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922',
      padding:'30 px',
      // border:"round",
  },
  center1: {
    // fontFamily: "Nunito",
    fontFamily:'LeagueSpartan',
    // fontFamily:'GlacialIndifference',
    // fontFamily:'Montserrat',
    // fontFamily: 'Lora'
    fontSize: '4rem',
    display: 'flex',
    align: 'center',
  },
  
},
}));

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       // Purple and green play nicely together.
//       main: '#1b798e',
//     },
//     secondary: {
//       // This is green.A700 as hex.
//       main: '#0d3c47',
//     },
//   },
// });

export default function Main(props){
  const classes = useStyles();
  const [page, setPage] = React.useState(null);
  
  const history = useHistory();
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline/>
    <AppsBar/>
    <Grid container className = {classes.root} alignItems='center' justify='center'>
      <Grid item>
        <Paper elevation={3} style={{padding: '15px 12px 15px', backgroundColor: '#ffffff', height: 320, width: 350, textAlign:'center'}}>
          <Typography className={classes.typo1}> LOG-IN</Typography> <br></br>
            <Grid>
              <TextField className={classes.filled1}
                fullWidth
                variant="outlined"
                size="small"
                label="Username">
              </TextField>
            </Grid>
            <br></br>

            <Grid>
              <TextField className={classes.filled1} fullWidth variant="outlined" size="small" label="Password"> </TextField>
            </Grid>

            <br></br>

            <Grid >
              <Button fullWidth onClick={()=>{history.push('/map/seedsmapportal')}} color="Grey" className = {classes.login1} raised>
                Log-in
              </Button>
            </Grid>

            <Grid container justifyContent="center" alignItems="center">
              <br/>
              {/* <Button size="small">Forgot your password?</Button>
              <Grid container direction ="row" justifyContent="center" alignItems="center">
              <Typography>No account yet?</Typography>
              <Button size="small">Sign-up here!</Button>
              </Grid> */}

<br></br>
<br></br>
              <ButtonGroup fullWidth
                variant="text" 
                aria-label="text primary button group">
                <Button className = {classes.buttonStyle2} >Register</Button>
                <Button className = {classes.buttonStyle2}>Forgot Password</Button>
              </ButtonGroup>
            </Grid>    
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
    );
  }