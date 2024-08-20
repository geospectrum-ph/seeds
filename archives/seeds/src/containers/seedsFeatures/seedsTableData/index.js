import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Divider, TextField, InputAdornment, Tabs, Tab, ThemeProvider, Tooltip, Toolbar } from '@material-ui/core/';
import { createMuiTheme } from '@material-ui/core/styles';
import { Card, CardHeader, ButtonGroup } from '@material-ui/core';
import { SEEDSContext } from '../../../context/SEEDSContext'


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

const useStyles = makeStyles((theme) => ({
  root: {
    // color:"#fffefe",
    // backgroundColor:"#1b798e",
  
    '& .MuiCardHeader-root': {
      color:"#fffefe",
      backgroundColor:"#1b798e",
    },
    '& .MuiCardHeader-title': {
      fontSize: '1.2rem',
      // color:"#fffefe",
      fontFamily: "GlacialIndifference",
  
    },
    // '& .MuiTypography-root': {
    //   color: "#000000"
    // },
    '& .MuiTypography-h1': {
      fontSize: "1rem",
      color: "#1b798e",
      fontFamily: "GlacialIndifference",
    },
    '& .MuiTypography-h2': {
      fontFamily: "GlacialIndifference",
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
  paper: {
    padding: theme.spacing(4),
    margin: 'auto',
    maxWidth: 800,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  root1: {
    '& .MuiCardHeader-root': {
      color:"#fffefe",
      backgroundColor:"#1b798e",
    },
      '& .MuiCardHeader-title': {
        fontSize: '1.2rem',
        textAlign: "center",
      fontFamily: "GlacialIndifference",
      },
  },
  root2: {
    textAlign:'center',
    '& > *': {
      margin: theme.spacing(1),
    },
    // width: '100%',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
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
  //   height: '10%',
  },  
  appbarTitle:{
    flexGrow: '1',
    color: '#fffefe',
    // '&:hover': {
    //   color: '#fffefe',
    //   backgroundColor: '#1b798e',
      // padding:'3px',
      // border:"round",
    // }
  },
  colorText: {
    color: "#5aff3d"
    // color: "#0c343d"
    // color: "#229922"
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
    padding: theme.spacing(3),
  },
  paperfeaturebutton: {
    // justify: "center",
    margin: theme.spacing(3),

    
    // backgroundColor: "#8c8c8c",
    textAlign: 'center',
    
  },
  papermap: {
    // width: "50vw",
    height: "90vh",
    justify: "center",
    // backgroundColor: "#8c8c8c",
    textAlign: 'center',
  },
  paperseedsmain: {
    display: 'flex',
    flexDirection: 'column',
    // justify: 'center',
    // justifyContent: 'center',
    // alignContent:'center',
    alignItems: 'center',
    textAlig: 'center',
    width: '75vw',
    // height: '100vh'
    // elevation: '3',

  },
  summary : {
    // padding: 
    margin: theme.spacing(3),
    height: '75px',
    // elevation: "2", 
  },
}));
// }));

export default function SeedsTableData() {
  const classes = useStyles();
  const {healthAll, setHealthAll, healthOne, setHealthOne} = React.useContext(SEEDSContext);

  return (
    <ThemeProvider theme={theme}>

    <div>
     <Toolbar className={classes.appbar}>
   {/* <Typography>Populate SEEDS</Typography> */}
   <h3 className={classes.appbarTitle}><span className={classes.colorText}>  SEED</span>s Functions</h3>
   </Toolbar>
   <Divider/>
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <Card className={classes.root1}>
                  <CardHeader
                    title="Data Name"
                  />
            </Card>
          </Grid>


          <Grid item xs={4}>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="Data thumbnail" src="/static/images/grid/complex.jpg" />
            </ButtonBase>

          </Grid>
          {/* <Divider/> */}
          <Divider orientation="vertical" flexItem />

          {/* <Grid item xs={12} sm container direction="row"> */}

            <Grid item xs container direction="column"  align="right">
                <Grid item xs = {12}>
                    {/* <Paper> */}
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
                    {/* </Paper> */}
                </Grid>
            </Grid>
            <Grid item xs container direction="column" >
                <Grid item xs = {12}>
                    {/* <Paper> */}
{/*  */}
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
                    {/* </Paper> */}
                
                </Grid>
            </Grid>
            

            
          {/* </Grid> */}
        </Grid>
      </Paper>
    </div>
    </div>

</ThemeProvider>
  );
}