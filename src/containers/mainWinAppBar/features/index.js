// import React from 'react';
// import './index.css';
// import { CssBaseline, Grid, Card, Paper, Button, ButtonBase, ButtonGroup, makeStyles, Container, TextField, Divider } from '@material-ui/core';
// import './index.css';
// // import ContactUs from "../contactUs/indexOriginal";
// import AboutUs from "../aboutUs";
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Typography from '@material-ui/core/Typography';
// import grey from "@material-ui/core/colors/grey";
// import Main from "../../login";
// import MainLanding from "../../mainLanding";
// import AppsBar from '../../mainLanding/AppBar';
// import Footer from '../../mainLanding/Footer';
// import Tutorial from '../../tutorial/index'
// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: "flex",
//         flexDirection: "column",
//       },

//     buttonStyle1: {
//         color: '#2b5329',
//         height: 48,
//         padding: '0 30px',
//       },
    
//     subtitle2: {
//         color: '#ffffff',
//         display: "flex",
//         flexDirection: "right",
//     },
//     body2: {
//         color: '#ffffff',
//         // height: 48,
//         // padding: '0 30px',
//       },

    
//     paper1: {
//         padding: theme.spacing(2),
//         margin: 'auto',
//         width:'80%',
//         // maxWidth: 1000,
//         // padding: theme.spacing(2),
//         // textAlign: 'center',
//         // color: theme.palette.text.secondary,
//         background: 'linear-gradient(90deg, #9db03f 50%, #0c343d )',
//         // background: 'white',
//       },
//       paper2: {
//         padding: theme.spacing(2),
//         margin: 'auto',
//         width:'80%',
//         // maxWidth: 1000,
//         // padding: theme.spacing(2),
//         // textAlign: 'center',
//         // color: theme.palette.text.secondary,
//         // background: 'linear-gradient(45deg, #9db03f 10%, #0c343d 90%)',
//         background: 'white',
//       },
//       head1: {
//         //   fontFamily: "Nunito",
//           fontFamily:'LeagueSpartan',
//           // fontFamily:'GlacialIndifference',
//           // fontFamily:'Montserrat',
//           // fontFamily: 'Lora'
//           fontSize: '1.25rem',
//       }

      
//     }));

  
// export default function Products(){
//     const classes = useStyles();
//     const [page, setPage] = React.useState(null);
//     return(
//         <div className={classes.root}>
//             <header> 
//             <div>
//             <AppsBar/>
//             <br></br>
//         <br></br>
//         <br></br>
//         <br></br>
//         <br></br>
        
//         <Typography style={{textAlign: 'center'}} gutterBottom variant="h1" className={classes.head1}>SEEDs Core</Typography><Divider/><br></br>
//         {/* <Tutorial/> */}
            
//         <Typography style={{textAlign: 'center'}} gutterBottom variant="subtitle1" className={classes.head1}>SEEDs Populate</Typography><Divider/><br></br>
//         <Typography style={{textAlign: 'center'}}  gutterBottom variant="subtitle1" className={classes.head1}>SEEDs Catalogue</Typography><Divider/><br></br>
//         <Typography style={{textAlign: 'center'}}  gutterBottom variant="subtitle1" className={classes.head1}>SEEDs Map Portal</Typography><Divider/><br></br>
//         <Typography style={{textAlign: 'center'}}  gutterBottom variant="subtitle1" className={classes.head1}>SEEDs Profile</Typography><Divider/><br></br>
//         <Typography style={{textAlign: 'center'}}  gutterBottom variant="subtitle1" className={classes.head1}>SEEDs Analytics</Typography><Divider/><br></br>



//         <Typography style={{textAlign: 'center'}}  gutterBottom variant="subtitle1" className={classes.head1}>Social</Typography><Divider/><br></br>
//         <Typography style={{textAlign: 'center'}}  gutterBottom variant="subtitle1" className={classes.head1}>Economic</Typography><Divider/><br></br>
//         <Typography style={{textAlign: 'center'}}  gutterBottom variant="subtitle1" className={classes.head1}>Environmental</Typography><Divider/><br></br>
//         <Typography style={{textAlign: 'center'}}  gutterBottom variant="subtitle1" className={classes.head1}>Demographic</Typography><Divider/><br></br>

//         {/* <br></br>Products */}
//                 {/* <Paper className={classes.paper2}>
                
//                     <Grid container spacing={2}>
//                     <Grid item xs = {6}>
//                         <br></br>
//                         <ButtonBase className={classes.image}>
//                         <img className={classes.img} alt="SEED Populate Sample Image" src="/static/images/grid/complex.jpg" />
//                         </ButtonBase>
//                     </Grid>
//                     <Grid item xs = {6} sm >
//                         <Grid item xs container direction="column" spacing={2}>
//                         <Grid item xs>
//                             <br></br>
//                             <Typography gutterBottom variant="subtitle1" className={classes.head1}>
//                              SEED Populate
//                             </Typography>
//                             <br></br>
//                             <Typography gutterBottom>
//                             This feature allows uploading and tagging of various spatial and textual information to the SEED database management system. Metadata and contextual information are also included to catalogue, sort and filter various information stored in its database.
//                             </Typography>
//                         </Grid>
//                         </Grid>
//                     </Grid>
//                     </Grid>
//                 </Paper>
//                 <br></br>
//                 <Paper className={classes.paper1}>
//                     <Grid container spacing={2}>
//                     <Grid item xs = {6} sm >
//                         <Grid item xs container direction="column" spacing={2}>
//                         <Grid item xs>
//                             <br></br>
//                             <Typography gutterBottom className={classes.subtitle2} className={classes.head1}>
//                             SEED Catalogue
//                             </Typography>
//                             <br></br>
//                             <Typography className={classes.body2} gutterBottom>
//                             This feature allows access to the SEED database. Depending on the user level and privileges, various information can be accessed and utilized using the SEED Catalogue. Discovery, sorting and filtering to downloading of this information is done in the catalogue. 
//                             </Typography>
//                         </Grid>
//                         </Grid>
//                     </Grid>
//                     <Grid item xs = {6}>
//                         <br></br>
//                         <ButtonBase className={classes.image}>
//                         <img className={classes.img} alt="SEED Catalogue Sample Image" src="/static/images/grid/complex.jpg" />
//                         </ButtonBase>
//                     </Grid>
//                     </Grid>
//                 </Paper>
//                 <br></br>
               
//                 <Paper className={classes.paper2}>
//                     <Grid container spacing={2}>
//                     <Grid item xs = {6}>
//                         <br></br>
//                         <ButtonBase className={classes.image}>
//                         <img className={classes.img} alt="Map Portal Sample Image" src="/static/images/grid/complex.jpg" />
//                         </ButtonBase>
//                     </Grid>
//                     <Grid item xs = {6} sm >
//                         <Grid item xs container direction="column" spacing={2}>
//                         <Grid item xs>
//                             <br></br>
//                             <Typography gutterBottom variant="subtitle1" className={classes.head1}>
//                             SEED Map Portal
//                             </Typography>
//                             <br></br>
//                             <Typography  gutterBottom>
//                             This is the geographic map feature of SEEDs where any spatial data stored in the catalogue are accessed and mapped in GIS-based display. Map styles and features are integrated to the SEEDs map portal to allow users to interactively display and assess any spatial information of interest. Products from this feature include visualization, map generation and map production
//                             </Typography>
//                         </Grid>
//                         </Grid>
//                     </Grid>
//                     </Grid>
//                 </Paper> */}
//             </div>
//             </header>
//             <br></br>
//             <Grid container xs={12} 
//             style={{backgroundColor:"#000000"}} 
//             // display="flex"
//             alignItems="flex-end">
//                 <Grid item xs={12} style={{position:"absolute", bottom:"0vh", width:"100%"}}>
//                     <Footer/>
//                 </Grid>
//             </Grid>
//         </div>
//     )
// }


import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import AppsBar from '../../mainLanding/AppBar';
import Footer from '../../mainLanding/Footer';
import SeedsMLP from '../../mainLanding/seedsMLP'
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4];

export default function Album() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppsBar/>

      {/* <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
        </Toolbar>
      </AppBar> */}
      <main id="header">
        {/* Hero unit */}
        <div className={classes.heroContent} >
            <br/><br/>
          <Container maxWidth="md">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              What is SEEDs for LGU?
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            SEEDs for LGU, or simply SEEDs is a web portal and GIS application that provides Local Government Units (LGUs) with a tool to effectively utilize the spatial and textual information about and within their locality.
            </Typography>
            {/* <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div> */}
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Typography>SEEDs provides LGUs with GIS-based mapping and data analysis systems that will enhance, among other things, the capability for:</Typography>
          <SeedsMLP/>
          
          {/* <Typography>Planning, monitoring and implementation of local government projects (Social)</Typography>
          <Typography>Formulation of economic development plans and land use policies (Economic)</Typography>
          <Typography>Development of master plans for health and safety, risk and disaster mitigation and other environmental policies (Environmental)</Typography>
          <Typography>Efficient delivery of social services to its constituents with the aid of its demographic and socio-economic databases (Demographic)</Typography> */}

          {/* <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid> */}
        </Container>
      </main>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
            {/* <br/><br/> */}
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              SEEDs Module
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Modules are a group of features that are designed to have a target outcome in the entirety of SEEDs.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Typography>SEEDs Populate</Typography>
                  <Typography>SEEDs Catalogue</Typography>
                  <Typography>SEEDs Map Portal</Typography>
                  <Button variant="contained" color="primary">
                    SEEDs Core Module
                  </Button>
                </Grid>
                <Grid item>
                  <Typography>SEEDs Profile</Typography>
                  <Typography>SEEDs Analytics</Typography>
                  <Button variant="outlined" color="primary">
                    SEEDs Extensions 1 or 2
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid> */}
        </Container>
      </main>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
            {/* <br/><br/> */}
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              SEEDs Core
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            comprises of a management system and its geographic databases which makes use of geographic maps and other textual information to provide personalized user-centric functionalities.

            </Typography>
            {/* <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div> */}
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={12}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {/* <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button> */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      {/* <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer> */}
      {/* End footer */}
    </React.Fragment>
  );
}