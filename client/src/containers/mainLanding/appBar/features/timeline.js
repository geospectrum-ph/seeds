import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery, Paper, Typography } from '@material-ui/core';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Carousel from 'react-material-ui-carousel'

import SeedsCarouselCard from './carousel'

import upload from '../../../../assets/icons/24 SEEDs Populate.png'
import cat from '../../../../assets/icons/25 SEEDs Catalogue.png'
import portal from '../../../../assets/icons/26 SEEDs Portal.png'

import theme from '../../../../theme'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
    textAlign:"justify"  
  }, secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  }, timelineDot:{
    height:100, 
    width:100, 
    justify:"center",
    alignItems:"center"
  }
}));

export default function CustomizedTimeline() {
  const classes = useStyles();
  const isMatch = useMediaQuery(theme.breakpoints.down('sm'));
  const Content = () => {
    return (
      <>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot className={classes.timelineDot}>
              <img src={upload} style={{width: '4vw'}}/>
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                SEEDs Populate
              </Typography><br/>
              <Typography>
                This feature allows uploading and tagging of various spatial and textual information to the 
                SEED database management system. 
              </Typography><br/>
              <Typography>
                Metadata and contextual information are also included to catalogue, sort and filter various 
                information stored in its database.
              </Typography>
              <Carousel >
                <SeedsCarouselCard seedsCore="Populate" seedsImg="ver3_sP1"
                  seedsDesc={["Upload data by clicking Browse File Button"]}/>
                <SeedsCarouselCard seedsCore="Populate" seedsImg="ver3_sP2"
                  seedsDesc={["A prompt will show. Select your desired file."]}/>
                <SeedsCarouselCard seedsCore="Populate" seedsImg="ver3_sP3"
                seedsDesc={["Click Insert Template Button below Browse File"]}/>
                <SeedsCarouselCard seedsCore="Populate" seedsImg="ver3_sP4"
                  seedsDesc={["The Insert Template button lets you choose the module, domain, information and granularity level of your selected data."]}/>
                <SeedsCarouselCard seedsCore="Populate" seedsImg="ver3_sP5"
                  seedsDesc={["Choose the correct information and click Insert Template. Click Next Button."]}/>
                <SeedsCarouselCard seedsCore="Populate" seedsImg="ver3_sP6"
                  seedsDesc={["Fill in details for step two"]}/>
                <SeedsCarouselCard seedsCore="Populate" seedsImg="ver3_sP7"
                  seedsDesc={["Fill in details for step three and click Upload Button"]}/>
              </Carousel>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary" className={classes.timelineDot}>
              <img src={cat} style={{width: '4vw'}}/>
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                SEEDs Catalogue
              </Typography><br/>
              <Typography>
                This feature allows access to the SEED database. Depending on the user level and privileges, 
                various information can be accessed and utilized using the SEED Catalogue. 
              </Typography><br/>
              <Typography>
                Discovery to sorting and filtering to downloading this information is done in the Catalogue.
              </Typography>
              <Carousel >
                <SeedsCarouselCard seedsCore="Catalogue" seedsImg="ver3_sD1"
                  seedsDesc={["SEEDs Catalogue is composed of two portions: Left panel for table display of available data; Right panel for additional filtering"]}/>
                <SeedsCarouselCard seedsCore="Catalogue" seedsImg="ver3_sD2"
                  seedsDesc={["Use search bar to look for specific data."]}/>
                <SeedsCarouselCard seedsCore="Catalogue" seedsImg="ver3_sD3"
                  seedsDesc={["Click the menu button near every header text to sort, filter, show, and hide columns."]}/>
                <SeedsCarouselCard seedsCore="Catalogue" seedsImg="ver3_sD4"
                  seedsDesc={["Select a Vector data and try adding it to the map. This should be successfully added to the Map Portal"]}/>
                <SeedsCarouselCard seedsCore="Catalogue" seedsImg="ver3_sD5"
                  seedsDesc={["Select a Table data and try adding it to the map. This will prompt a dialog."]}/>
                <SeedsCarouselCard seedsCore="Catalogue" seedsImg="ver3_sD6"
                  seedsDesc={["Select a data to delete. A dialog box will ask the user to confirm."]}/>
                <SeedsCarouselCard seedsCore="Catalogue" seedsImg="ver3_sD7"
                  seedsDesc={["When confirmed, an alert saying it is successfully deleted will show."]}/>
                <SeedsCarouselCard seedsCore="Catalogue" seedsImg="ver3_sD8"
                  seedsDesc={["Deleting two or more data is prohibited."]}/>
              </Carousel>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="secondary" className={classes.timelineDot}>
              <img src={portal} style={{width: '4vw'}}/>
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                SEEDs Map Portal
              </Typography><br/>
              <Typography>
                This is the geographic map feature of SEEDs where any spatial data stored in the catalogue 
                are accessed and mapped in GIS-based display. 
              </Typography><br/>
              <Typography>
                Map styles and features are integrated to the SEEDs map portal to allow users to interactively 
                display and assess any spatial information of interest. 
              </Typography><br/>
              <Typography>
                Products from this feature include visualization, map generation and map production.
              </Typography>
              <Carousel >
                <SeedsCarouselCard seedsCore="MapPortal" seedsImg="ver3_sMP1"
                  seedsDesc={["In the SEEDs Catalogue, add a layer in the SEEDs Map Portal by selecting a vector data and clicking the Add to Map Button."]}/>
                <SeedsCarouselCard seedsCore="MapPortal" seedsImg="ver3_sMP2"
                  seedsDesc={["Upon clicking Add to Map, the screen will be redirected to SEEDs Map Portal. It includes a Map and a right panel for displaying the list of layers."]}/>
                <SeedsCarouselCard seedsCore="MapPortal" seedsImg="ver3_sMP3"
                  seedsDesc={["In the SEEDs Map Portal right panel, click the plus icon on the upper right corner to add data from SEEDs Catalogue."]}/>
                <SeedsCarouselCard seedsCore="MapPortal" seedsImg="ver3_sMP4"
                  seedsDesc={["Select data from SEEDs Catalogue dialog box."]}/>
                <SeedsCarouselCard seedsCore="MapPortal" seedsImg="ver3_sMP5"
                  seedsDesc={["In the SEEDs Map Portal upper corner is a layer button used to toggle different layers."]}/>
                <SeedsCarouselCard seedsCore="MapPortal" seedsImg="ver3_sMP6"
                  seedsDesc={["Located on the left part of SEEDs Map Portal is a toolbar for drawing some shapes and displaying markers."]}/>
                <SeedsCarouselCard seedsCore="MapPortal" seedsImg="ver3_sMP7"
                  seedsDesc={["A print button is located on the upper left part also."]}/>
                <SeedsCarouselCard seedsCore="MapPortal" seedsImg="ver3_sMP8"
                  seedsDesc={["You can search a location using the search bar in the upper middle part of the SEEDs Map Portal."]}/>
              </Carousel>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      </>
    );
  }

  const ContentSmall = () => {
    return (
      <>
        <br/>
        <TimelineSeparator>
          <TimelineDot style={{alignSelf:"center"}}>
            <img src={upload} style={{width: '10vw'}}/>
          </TimelineDot>
        </TimelineSeparator>
          <Paper className={classes.paper}>
            <Typography variant="h6" component="h1">
              SEEDs Populate
            </Typography>
            <Typography>
              This feature allows uploading and tagging of various spatial and textual information to the 
              SEED database management system. 
            </Typography>
            <br/>
            <Typography>
              Metadata and contextual information are also included to catalogue, sort and filter various 
              information stored in its database.
            </Typography>
            <br/>
            <Carousel >
              <SeedsCarouselCard seedsCore="Populate" seedsImg="ver3_sP1"
                seedsDesc={["Upload data by clicking Browse File Button"]}/>
              <SeedsCarouselCard seedsCore="Populate" seedsImg="ver3_sP2"
                seedsDesc={["A prompt will show. Select your desired file."]}/>
              <SeedsCarouselCard seedsCore="Populate" seedsImg="ver3_sP3"
                seedsDesc={["Click Insert Template Button below Browse File"]}/>
              <SeedsCarouselCard seedsCore="Populate" seedsImg="ver3_sP4"
                seedsDesc={["The Insert Template button lets you choose the module, domain, information and granularity level of your selected data."]}/>
              <SeedsCarouselCard seedsCore="Populate" seedsImg="ver3_sP5"
                seedsDesc={["Choose the correct information and click Insert Template. Click Next Button."]}/>
              <SeedsCarouselCard seedsCore="Populate" seedsImg="ver3_sP6"
                seedsDesc={["Fill in details for step two"]}/>
              <SeedsCarouselCard seedsCore="Populate" seedsImg="ver3_sP7"
                seedsDesc={["Fill in details for step three and click Upload Button"]}/>
            </Carousel>
          </Paper>
        <br/>
        <TimelineSeparator>
          <TimelineDot color="primary" style={{alignSelf:"center"}}>
            <img src={cat} style={{width: '10vw'}}/>
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h6" component="h1">
            SEEDs Catalogue
          </Typography><br/>
          <Typography>
            This feature allows access to the SEED database. Depending on the user level and privileges, 
            various information can be accessed and utilized using the SEED Catalogue. 
          </Typography><br/>
          <Typography>
            Discovery to sorting and filtering to downloading this information is done in the Catalogue.
          </Typography><br/>
          <Carousel>
            <SeedsCarouselCard seedsCore="Catalogue" seedsImg="ver3_sD1"
              seedsDesc={["SEEDs Catalogue is composed of two portions: Left panel for table display of available data; Right panel for additional filtering"]}/>
            <SeedsCarouselCard seedsCore="Catalogue" seedsImg="ver3_sD2"
              seedsDesc={["Use search bar to look for specific data."]}/>
            <SeedsCarouselCard seedsCore="Catalogue" seedsImg="ver3_sD3"
              seedsDesc={["Click the menu button near every header text to sort, filter, show, and hide columns."]}/>
            <SeedsCarouselCard seedsCore="Catalogue" seedsImg="ver3_sD4"
              seedsDesc={["Select a Vector data and try adding it to the map. This should be successfully added to the Map Portal"]}/>
            <SeedsCarouselCard seedsCore="Catalogue" seedsImg="ver3_sD5"
              seedsDesc={["Select a Table data and try adding it to the map. This will prompt a dialog."]}/>
            <SeedsCarouselCard seedsCore="Catalogue" seedsImg="ver3_sD6"
              seedsDesc={["Select a data to delete. A dialog box will ask the user to confirm."]}/>
            <SeedsCarouselCard seedsCore="Catalogue" seedsImg="ver3_sD7"
              seedsDesc={["When confirmed, an alert saying it is successfully deleted will show."]}/>
            <SeedsCarouselCard seedsCore="Catalogue" seedsImg="ver3_sD8"
              seedsDesc={["Deleting two or more data is prohibited."]}/>
          </Carousel>
        </Paper>
        <br/>
        <TimelineSeparator>
          <TimelineDot color="secondary" style={{alignSelf:"center"}}>
            <img src={portal} style={{width: '10vw'}}/>
          </TimelineDot>
        </TimelineSeparator>      
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h6" component="h1">
              SEEDs Map Portal
          </Typography><br/>
          <Typography>
              This is the geographic map feature of SEEDs where any spatial data stored in the catalogue 
              are accessed and mapped in GIS-based display. 
          </Typography><br/>
          <Typography>
              Map styles and features are integrated to the SEEDs map portal to allow users to interactively 
              display and assess any spatial information of interest. 
          </Typography><br/>
          <Typography>
              Products from this feature include visualization, map generation and map production.
          </Typography>
          <br/>
          <Carousel>
            <SeedsCarouselCard seedsCore="MapPortal" seedsImg="ver3_sMP1"
              seedsDesc={["In the SEEDs Catalogue, add a layer in the SEEDs Map Portal by selecting a vector data and clicking the Add to Map Button."]}/>
            <SeedsCarouselCard seedsCore="MapPortal" seedsImg="ver3_sMP2"
              seedsDesc={["Upon clicking Add to Map, the screen will be redirected to SEEDs Map Portal. It includes a Map and a right panel for displaying the list of layers."]}/>
            <SeedsCarouselCard seedsCore="MapPortal" seedsImg="ver3_sMP3"
              seedsDesc={["In the SEEDs Map Portal right panel, click the plus icon on the upper right corner to add data from SEEDs Catalogue."]}/>
            <SeedsCarouselCard seedsCore="MapPortal" seedsImg="ver3_sMP4"
              seedsDesc={["Select data from SEEDs Catalogue dialog box."]}/>
            <SeedsCarouselCard seedsCore="MapPortal" seedsImg="ver3_sMP5"
              seedsDesc={["In the SEEDs Map Portal upper corner is a layer button used to toggle different layers."]}/>
            <SeedsCarouselCard seedsCore="MapPortal" seedsImg="ver3_sMP6"
              seedsDesc={["Located on the left part of SEEDs Map Portal is a toolbar for drawing some shapes and displaying markers."]}/>
            <SeedsCarouselCard seedsCore="MapPortal" seedsImg="ver3_sMP7"
              seedsDesc={["A print button is located on the upper left part also."]}/>
            <SeedsCarouselCard seedsCore="MapPortal" seedsImg="ver3_sMP8"
              seedsDesc={["You can search a location using the search bar in the upper middle part of the SEEDs Map Portal."]}/>
          </Carousel>
        </Paper>
      </>
    );
  }

  return (
    isMatch ? (
      <>
        <ContentSmall/>
      </>
    ) : (
      <Timeline align="alternate">
        <Content/>
      </Timeline>
    )
  )
}