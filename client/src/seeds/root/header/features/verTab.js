import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Box} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel'

import SeedsCarouselCard from './carousel'

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100vh',
  }, tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  }
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs orientation="vertical" value={value} onChange={handleChange} className={classes.tabs} variant="scrollable">
        <Tab label="SEEDs Populate" {...a11yProps(0)} />
        <Tab label="SEEDs Catalogue" {...a11yProps(1)} />
        <Tab label="SEEDs Map Portal" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0} style={{width:'100vw'}}>
        <Carousel>
          <SeedsCarouselCard seedsCore="Populate" seedsImg="sP1"
            seedsDesc={["Upload data by clicking Browse File Button"]}/>
          <SeedsCarouselCard seedsCore="Populate" seedsImg="sP2"
            seedsDesc={["A prompt will show. Select your desired file."]}/>
          <SeedsCarouselCard seedsCore="Populate" seedsImg="sP3"
            seedsDesc={["Click Insert Template Button below Browse File"]}/>
          <SeedsCarouselCard seedsCore="Populate" seedsImg="sP4"
            seedsDesc={["The Insert Template button lets you choose the module, domain, information and granularity level of your selected data."]}/>
          <SeedsCarouselCard seedsCore="Populate" seedsImg="sP5"
            seedsDesc={["Choose the correct information and click Insert Template. Click Next Button."]}/>
          <SeedsCarouselCard seedsCore="Populate" seedsImg="sP6"
            seedsDesc={["Fill in details for step two"]}/>
          <SeedsCarouselCard seedsCore="Populate" seedsImg="sP7"
            seedsDesc={["Fill in details for step three and click Upload Button"]}/>
        </Carousel>
      </TabPanel>
      <TabPanel value={value} index={1} style={{width:'100vw'}}>
        <Carousel>
          <SeedsCarouselCard seedsCore="Catalogue" seedsImg="sD1"
            seedsDesc={["SEEDs Catalogue is composed of two portions: Left panel for table display of available data; Right panel for additional filtering"]}/>
          <SeedsCarouselCard seedsCore="Catalogue" seedsImg="sD2"
            seedsDesc={["Use search bar to look for specific data."]}/>
          <SeedsCarouselCard seedsCore="Catalogue" seedsImg="sD3"
            seedsDesc={["Click the menu button near every header text to sort, filter, show, and hide columns."]}/>
          <SeedsCarouselCard seedsCore="Catalogue" seedsImg="sD4"
            seedsDesc={["Select a Vector data and try adding it to the map. This should be successfully added to the Map Portal"]}/>
          <SeedsCarouselCard seedsCore="Catalogue" seedsImg="sD5"
            seedsDesc={["Select a Table data and try adding it to the map. This will prompt a dialog."]}/>
          <SeedsCarouselCard seedsCore="Catalogue" seedsImg="sD6"
            seedsDesc={["Select a data to delete. A dialog box will ask the user to confirm."]}/>
          <SeedsCarouselCard seedsCore="Catalogue" seedsImg="sD7"
            seedsDesc={["When confirmed, an alert saying it is successfully deleted will show."]}/>
          <SeedsCarouselCard seedsCore="Catalogue" seedsImg="sD8"
            seedsDesc={["Deleting two or more data is prohibited."]}/>
        </Carousel>
      </TabPanel>
      <TabPanel value={value} index={2} style={{width:'100vw'}}>
        <Carousel >
          <SeedsCarouselCard seedsCore="MapPortal" seedsImg="sMP1"
            seedsDesc={["In the SEEDs Catalogue, add a layer in the SEEDs Map Portal by selecting a vector data and clicking the Add to Map Button."]}/>
          <SeedsCarouselCard seedsCore="MapPortal" seedsImg="sMP2"
            seedsDesc={["Upon clicking Add to Map, the screen will be redirected to SEEDs Map Portal. It includes a Map and a right panel for displaying the list of layers."]}/>
          <SeedsCarouselCard seedsCore="MapPortal" seedsImg="sMP3"
            seedsDesc={["In the SEEDs Map Portal right panel, click the plus icon on the upper right corner to add data from SEEDs Catalogue."]}/>
          <SeedsCarouselCard seedsCore="MapPortal" seedsImg="sMP4"
            seedsDesc={["Select data from SEEDs Catalogue dialog box."]}/>
          <SeedsCarouselCard seedsCore="MapPortal" seedsImg="sMP5"
            seedsDesc={["In the SEEDs Map Portal upper corner is a layer button used to toggle different layers."]}/>
          <SeedsCarouselCard seedsCore="MapPortal"  seedsImg="sMP6"
            seedsDesc={["Located on the left part of SEEDs Map Portal is a toolbar for drawing some shapes and displaying markers."]}/>
          <SeedsCarouselCard seedsCore="MapPortal" seedsImg="sMP7"
            seedsDesc={["A print button is located on the upper left part also."]}/>
          <SeedsCarouselCard seedsCore="MapPortal" seedsImg="sMP8"
            seedsDesc={["You can search a location using the search bar in the upper middle part of the SEEDs Map Portal."]}/>
        </Carousel>
      </TabPanel>
    </div>
  );
}