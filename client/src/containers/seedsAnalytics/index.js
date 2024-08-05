
import React from 'react';
import axios from 'axios';
import _without from "lodash/without";
import { Button, Grid, Container, FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';

import theme from '../../theme'
import SeedsAnalyticsMap from './seedsAnalyticsMap/index'
import AnalyticsDatePicker from './datePicker'
import LoadingPage from '../loadingPage'

import { SEEDSContext } from '../../context/SEEDSContext';
import { AnalyticsContext } from '../../context/AnalyticsContext';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTypography-h3': {
      fontFamily: 'LeagueSpartan'
    },
    '& .MuiTypography-h5': {
      fontFamily: 'LeagueSpartan'
    },
    '& .MuiTypography-h6': {
      fontFamily: 'LeagueSpartan'
    }
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: '100%',
    maxWidth: 300
  },
  login2: {
    borderWidth: 1,
    borderRadius: 0,
    borderColor: "#1b798e",
    color: '#1b798e',
    padding: '10px 20px',
    fontFamily:'LeagueSpartan',
    fontSize: '1rem',
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#1b798e',
      borderColor: "#1b798e"
    },
    '&:active': {
      color: '#fffefe',
      borderColor: "#1b798e",
      backgroundColor: '#229922'
    },
    '&:focus': {
      color: '#fffefe',
      borderColor: "#229922",
      backgroundColor: '#229922'
    }
  },
  cardGrid: {
    paddingBottom: theme.spacing(8)
  },
  login1: {
    border: 0,
    borderRadius: 5,
    backgroundColor: '#1b798e',
    color: '#ffffff',
    fontSize: '1rem',
    fontFamily:'LeagueSpartan',
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922',
    }
  },
  deleteButton: {
    border: 0,
    borderRadius: 5,
    backgroundColor: '#ced8da',
    color: '#33202A',
    fontSize: '1rem',
    fontFamily:'LeagueSpartan',
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#A31621',
    }
  },
  analyzeButton: {
    border: 0,
    borderRadius: 5,
    backgroundColor: '#1b798e',
    color: '#ffffff',
    fontSize: '1rem',
    textAlign: "center",
    justify:"center",
    fontFamily:'LeagueSpartan',
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922',
    }
  },
  menuPaper: {
    maxHeight: 300
  }
}));

export default function Analytics() {
  const classes = useStyles();

  const [list, setList] = React.useState([]);
  const [layers, setLayers] = React.useState([]);
  
  React.useEffect(() => {
    const fetchList = async() => {
      await axios("http://localhost:5000/metadata/")
        .then((response) => {
          setList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    fetchList();
  }, []);

  React.useEffect(() => {
    layers && layers.length > 0 ? setLayers([]) : null;

    const fetchFeatures = async(id) => {      
      await axios("http://localhost:5000/getdata/?id=" + id)
        .then((response) => {
          setLayers(...layers, response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    list.map((item) => ("id" in item ? fetchFeatures(item.id) : null));
  }, [list]);

  const [layerSelected, setLayerSelected] = React.useState([]);

  const handleChange = (event) => {
    const { target: { value } } = event;

    setLayerSelected(typeof value === 'string' ? value.split(',') : value);
  }

  const handleClearLayers = (event) => {
    setLayerSelected([]);
  }

  const handleAnalyzeLayers = (event) => {
    /* */
  }

  return (
    <div className = { classes.root }>
      <LoadingPage/>
      <br/><br/>
      <Container maxWidth = "xl">
        <Grid container spacing = { 3 } justifyContent = "flex-start">
          <Grid item xs = { 12 } md = { 8 }>
            <FormControl focused required variant = "outlined" className = { classes.formControl }>
              <InputLabel>Data Layers</InputLabel>
              <Select
                label = "Data Layers"
                displayEmpty
                value = { layerSelected  && layers.length > 0 ? layerSelected : [] }
                onChange = { (event) => { handleChange(event) }}
                MenuProps = {{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left"
                  },
                  getContentAnchorEl: null
                }}
              >
                <MenuItem disabled autoFocus value = "">
                  Please select a dataset
                </MenuItem>
                {
                  layers && layers.length > 0 ?
                    layers.map((layer) => (
                      <MenuItem key = { layer.properties.mtd_id } value = { layer.properties.mtd_id }>
                        { layer.properties.mtd_id } : { layer.name } ({ layer.geometry.type })
                      </MenuItem>
                    ))
                    :
                      <MenuItem disabled>
                        No data available
                      </MenuItem>
                }
              </Select>
              <FormHelperText>Please select one or two.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs = { 12 } md = { 2 } container direction = "row" justifyContent = "flex-start" alignItems = "center">
            <Button fullWidth className = { classes.deleteButton } variant = "contained" onClick = { (event) => { handleClearLayers(event) } } style = { { height: "56px", marginTop: "-8px" } }>
              Clear
            </Button>
          </Grid>
          <Grid item xs = { 12 } md = { 2 } container direction = "row" justifyContent = "flex-start" alignItems = "center">
            <Button fullWidth className = { classes.analyzeButton } variant = "contained" onClick = { (event) => { handleAnalyzeLayers(event) } } style = { { height: "56px", marginTop: "-8px" } }>
              Analyze
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}