import React, {useState} from 'react';
import { Grid } from '@material-ui/core/'
import { Tabs, Tab, Box } from '@mui/material'

import MultipleSelect from "../2-dropDown";
import Details from "../4-details"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <div>{children}</div>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function CardPhilsys() {
  
  const [tabValue, setTabValue] = useState(0)

  const handleChange = (event, value) => {
    setTabValue(value);
  };

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" style={{padding:10}}> 
      <Grid container item xs={12} justifyContent="center" alignItems="center" >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleChange}>
            <Tab label="Filter" {...a11yProps(0)} />
            <Tab label="Details" {...a11yProps(1)} />
          </Tabs>
        </Box>
      </Grid>
      <TabPanel value={tabValue} index={0}>
        <Grid item xs={12}>
          <br/>
          <MultipleSelect />
        </Grid>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Grid item xs={12}>
          <br/>
          <Details/>
        </Grid>
      </TabPanel>
    </Grid>
  );
}