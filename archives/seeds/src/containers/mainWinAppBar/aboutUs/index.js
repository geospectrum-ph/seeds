import React from 'react';
import './index.css';
import { AppBar, CssBaseline, Grid, Card, Button, ButtonGroup, Divider, makeStyles, Container, Paper, TextField, Toolbar } from '@material-ui/core';
import buttonStyle1 from "../../login/index"
import './index.css';

import Typography from '@material-ui/core/Typography';
import grey from "@material-ui/core/colors/grey";


import MainWindow from "../../mainWindow";
import MainLanding from "../../mainLanding";
import Main from "../../login";
import BG from '../../../assets/satellite-bg.jpg';
import AppsBar from '../../mainLanding/AppBar';
import Footer from '../../mainLanding/Footer';

const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        backgroundImage: `url(${BG})`,
      },
    card: {
        maxWidth: 200,
        display: "flex",
        // flexDirection: "row",
        // alignItems: "column",
        // background: "green",
      },

    buttonStyle1: {
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #0c343d 100%)',
        // border: 3,
        // borderRadius: 5,
        // boxShadow: '0 3px 5px 2px rgba(255,255,255,0.3)',
        color: '#2b5329',
        height: 48,
        padding: '0 30px',
        // borderBottomColor: "green",
        // borderBottom: ""
      },
      
    

    buttonStyle4: {
        color: '#2b5329',
        height: 20,
        padding: '0 30px',       
      },
  
    paper: {
        padding: theme.spacing(10),
        textAlign: 'center',
        // color: theme.palette.text.secondary,
        // background: 'linear-gradient(45deg, #9db03f 10%, #0c343d 90%)',
        background: '#0c343d',
        // backgroundImage: `url(${BG})`,
      },

    row: {
        display: "flex",
        flexDirection: "row",
    },
    head1: {
        // fontFamily: "Nunito",
        fontFamily:'LeagueSpartan',
        // fontFamily:'GlacialIndifference',
        // fontFamily:'Montserrat',
        // fontFamily: 'Lora'
        fontSize: '2rem',
    },

    head2: {
        // fontFamily: "Nunito",
        fontFamily:'LeagueSpartan',
        // fontFamily:'GlacialIndifference',
        // fontFamily:'Montserrat',
        // fontFamily: 'Lora'
        fontSize: '1.25rem',
    },
    }));

export default function AboutUs(props){
    const classes = useStyles();
    const [page, setPage] = React.useState(null);    
  
    return(
        <div>
            <CssBaseline/>
            <AppsBar/>
            <br/><br/><br></br>
            <div style={{margin: '5px', padding: '50px'}}>
            <Typography variant="h4" style={{textAlign: 'center'}} className={classes.head1}>Overview of the Project</Typography><br/>
            {/* <Typography variante="h6" style={{textAlign: 'justify'}}>
                The Web-based Socio-Economic Environmetal and Demographic Systems (SEEDS) is a web portal and GIS application that provides Local Government Units (LGUs) with a tool to effectively utilize the spatial and textual information about and within their locality. It provides LGUs with GIS-based functional mapping and data analysis systems that will enhance, among other things, the capability for:
            </Typography> */}
            </div>
           
        
        {/* <br/> */}
            {/* <div className = "Social">
                <Card>
                    <Paper className={classes.paper} elevation={1} > 
                    <div className = {classes.row}>
                    <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Social"
                        height="140"
                        image="../../../assets/social.jpg"

                        title="Social"
                    />
                    <CardContent>
                        <Typography className={classes.head2} gutterBottom variant="h5" component="h2" style={{color: '#fffefe'}}>
                        Social
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" style={{color: '#fffefe', textAlign: 'justify'}}>
                        For planning, monitoring and implementation of local government projects
                        </Typography>
                    </CardContent>
                    </CardActionArea>

                    <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Economic"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography className={classes.head2} gutterBottom variant="h5" component="h2" style={{color: '#fffefe'}}>
                        Economic
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" style={{color: '#fffefe'}}>
                        For the formulation of economic development plans and land use policies
                        </Typography>
                    </CardContent>
                    </CardActionArea>

                    <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Environmental"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography className={classes.head2} gutterBottom variant="h5" component="h2" style={{color: '#fffefe'}}>
                        Environmental
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" style={{color: '#fffefe'}}>
                        For the development of master plans for health and safety, risk and disaster 
                        mitigation and other environmental policies 
                        </Typography>
                    </CardContent>
                    </CardActionArea>

                    <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Demographic"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography className={classes.head2} gutterBottom variant="h5" component="h2" style={{color: '#fffefe'}}>
                        Demographic
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" style={{color: '#fffefe'}}>
                        For the efficient delivery of social services to its constituents with the aid of its 
                        demographic and socio-economic databases 
                        </Typography>
                    </CardContent>
                    </CardActionArea>

                    </div>
                    </Paper>
                </Card>
            </div> */}
            <Divider/>

            <div Align="center" style={{margin: '5px', padding: '50px'}}>
                <Typography className={classes.head1} gutterBottom variant="h5" component="h2" style={{color: '#000000'}}>
                Project Team
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{color: '#000000'}}>
                Geospectrum and LGU Team Profile (to be determined with LGU client)
                </Typography>
            </div>
            <Divider/>

            <div Align="center" style={{margin: '5px', padding: '50px'}} >
                <Typography className={classes.head1} gutterBottom variant="h5" component="h2" style={{color: '#000000'}}>
                Partners
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{color: '#000000'}}>
                Geospectrum and LGU Team Profile (to be determined with LGU client)
                </Typography>
            </div>

            <Grid container xs={12} 
            style={{backgroundColor:"#000000"}} 
            // display="flex"
            alignItems="flex-end">
                <Grid item xs={12} style={{position:"absolute", bottom:"0vh", width:"100%"}}>
                    <Footer />
                </Grid>
            </Grid>
        </div>
    )
}