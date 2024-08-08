
import React from 'react';
import axios from 'axios';
import _without from "lodash/without";
import { Box, Button, Grid, Container, FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { makeStyles } from '@material-ui/core/styles';

import { describe } from "./handleConversion.js";


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

  React.useEffect(() => {
    console.log(layers);
  }, [layers]);

  const [layerSelected, setLayerSelected] = React.useState([]);

  const handleChange = (event) => {
    const { target: { value } } = event;

    setLayerSelected(typeof value === 'string' ? value.split(',') : value);
  }

  const handleClearLayers = (event) => {
    setLayerSelected([]);
  }

  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  const [dataset, setDataset] = React.useState([]);
  const [statistics, setStatistics] = React.useState(null);

  const handleAnalyzeLayers = (id_array) => {
    const shapefiles = [];
    
    id_array.map(function (id) {
      const object = layers.find(function (item) {
        return (item.properties.mtd_id === id);
      });

      object ? shapefiles.push(object) : null;
    });

    setColumns(
      Object
        .keys(shapefiles[0].features[0].properties)
        .map((key) => ({
          field: key,
          headerName: key,
          type: typeof(shapefiles[0].features[0].properties[key]),
          width: 200,
          editable: true
        })));

    setRows(
      shapefiles[0].features.map((feature, index) => ({
        id: index,
        ...feature.properties 
      })));

    setDataset(shapefiles[0].features.map((feature) => (feature.properties.AREA_SQKM * 1000)));
  }

  React.useEffect(() => {
    if (dataset && dataset.length > 0) {
      describe(dataset)
        .then((response) => {
          setStatistics(Object.keys(response).map((key) => [key, response[key]]));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dataset]);

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
            <Button fullWidth className = { classes.analyzeButton } variant = "contained" onClick = { () => { handleAnalyzeLayers(layerSelected) } } style = { { height: "56px", marginTop: "-8px" } }>
              Analyze
            </Button>
          </Grid>
          <Grid item xs = { 12 } md = { 6 } container direction = "row" justifyContent = "flex-start" alignItems = "center">
            <Box sx = {{ height: 600, width: "100%" }}>
              <DataGrid
                rows = { rows }
                columns = { columns }
                initialState = {{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions = { [5] }
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>
          </Grid>
          <Grid item xs = { 12 } md = { 6 } container direction = "column" justifyContent = "center" alignItems = "center">
            <Grid item container direction = "row" justifyContent = "flex-start" alignItems = "center">
              <Box sx = {{ flexGrow: 1 }}>
                { dataset && dataset.length > 0 ? <SparkLineChart data = { dataset } height = { 300 } showHighlight/> : null }
              </Box>
            </Grid>
            <Grid item container direction = "column" justifyContent = "center" alignItems = "center">
              <Box width = { "100%" } height = { 300 }>
                {
                  statistics ?
                    <Grid width = "100%" container direction = "column" justifyContent = "center" alignItems = "center">
                      {
                        statistics.map((item) => (
                          <Grid item width = "100%" container direction = "row" justifyContent = "flex-start" alignContent = "center">
                            <Grid item xs = { 6 }>{ item[0] }</Grid>
                            <Grid item xs = { 6 }>{ item[1] }</Grid>
                          </Grid>
                        ))
                      }
                    </Grid>
                    :
                    <span>No data available.</span>
                }
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}