
import React from 'react';
import axios from 'axios';
import _without from "lodash/without";
import { Box, Button, Grid, Container, FormControl, InputLabel, MenuItem, Select, FormHelperText, Card, CardHeader, Divider, LinearProgress } from '@material-ui/core';
import { DataGrid, GridNoRowsOverlay } from '@material-ui/data-grid';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { makeStyles } from '@material-ui/core/styles';

import * as turf from "@turf/turf";
import { describe } from "./handleConversion.js";

import AnalyticsDatePicker from './datePicker'
import LoadingPage from '../loadingPage'
import { textAlign } from '@mui/system';
import { AnalyticsContext } from '../../context/AnalyticsContext.js';

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
  innerFormControl: {
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

  const {
    list, setList,
    layers, setLayers,

    layerSelected, setLayerSelected,

    columns, setColumns,
    rows, setRows,

    aspectFormDisabled, setAspectFormDisabled,

    aspects, setAspects,

    aspectSelected, setAspectSelected,

    dataset, setDataset,

    statistics, setStatistics
  } = React.useContext(AnalyticsContext);
  
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
    console.log(list);

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
    // console.log(layers);
  }, [layers]);

  const handleLayerChange = (event) => {
    const { target: { value } } = event;

    setLayerSelected(typeof value === 'string' ? value.split(',') : value);
  }

  const handleClearLayers = (event) => {
    setLayerSelected([]);
  }

  const handleAnalyzeLayers = (id_array) => {
    if (layers && layers.length > 0) {
      const shapefiles = [];
      
      id_array.map(function (id) {
        const object = layers.find(function (item) {
          return (item.properties.mtd_id === id);
        });

        object ? shapefiles.push(object) : null;
      });

      if (shapefiles && shapefiles.length > 0) {
        setColumns(
          Object
            .keys(shapefiles[0].features[0].properties)
            .map(function (key) {
              let type = typeof(shapefiles[0].features[0].properties[key]);

              return ({
                field: key,
                headerName: key,
                type: type,
                width: 200,
                editable: true
              });
            }));

        setRows(
          shapefiles[0].features.map((feature, index) => ({
            id: index,
            ...feature.properties 
          })));

        setAspectFormDisabled(false);
      }
    }
  }

  React.useEffect(() => {
    if (columns && columns.length > 0) {
      const shapefiles = layers.find(function (item) {
        return (item.properties.mtd_id === layerSelected[0]);
      });

      const type = turf.getType(shapefiles.features[0]);

      const aspectsBuffer = ["Geometry (" + type + ")"];

      columns.map(function (column) {
        if (column.type === "number" || column.type === "bigint") { aspectsBuffer.push(column.field) };
      });

      setAspects(aspectsBuffer);
    }
  }, [columns]);
  
  const handleAspectChange = (event) => {
    setAspectSelected(event.target.value);
  };

  React.useEffect(() => { 
    if (aspectSelected && aspectSelected !== "") {
      const shapefiles = layers.find(function (item) {
        return (item.properties.mtd_id === layerSelected[0]);
      });
      
      if (aspectSelected.startsWith("Geometry")) {
        function to_area(feature) {
          const geodesic = require("geographiclib-geodesic");
          const geo = geodesic.Geodesic.WGS84;
      
          const polygon = geo.Polygon(false);
      
          const coordinates = turf.flatten(feature.geometry).features[0].geometry.coordinates[0];
          
          coordinates.forEach((point) => {
            polygon.AddPoint(point[1], point[0]);
          });
      
          const measure = polygon.Compute(true, true);
      
          const area = Math.abs(measure.area) / 1000000;
      
          return (area);
        }

        function to_length(feature) {  
          const length = turf.length(feature, { units: "kilometers" });
      
          return (length);
        }

        const type = turf.getType(shapefiles.features[0]);

        switch (type) {
          case "Polygon":
            setDataset(shapefiles.features.map((feature) => (to_area(feature))));
            break;
          case "Line":
            setDataset(shapefiles.features.map((feature) => (to_length(feature))));
            break;
          default:
            return (null);
        }
      }
      else {
        setDataset(shapefiles.features.map((feature) => (feature.properties[aspectSelected])));
      }
    }
  }, [aspectSelected]);

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

  function humanize(str) {
    var i, frags = str.split('_');
    for (i=0; i<frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
  }

  function trimExtension(string) {
    let string_array = string.split(".");
    string_array.pop();
    let filename = string_array.join("."); 

    return (filename);
  }

  return (
    <div className = { classes.root }>
      <Grid item xs={12} style={{padding:15}} >
        <Card style={{color:"#FFFEFE", backgroundColor:"#1b798e"}} >
          <CardHeader
            titleTypographyProps = {{ style: { fontFamily: "LeagueSpartan", fontWeight: 100 }}}
            subheaderTypographyProps = {{ style: { color: "#fffefe" }}} title = "SEEDs Analytics"
            subheader = "This module performs basic statistical analysis to available datasets."
          />
        </Card>
      </Grid>
      <LoadingPage/>
      <Container maxWidth = "xl">
        <Grid container spacing = { 3 } justifyContent = "flex-start">
          <Grid item xs = { 12 } md = { 8 }>
            <FormControl focused required variant = "outlined" className = { classes.formControl }>
              <InputLabel>Data Layers</InputLabel>
              <Select
                label = "Data Layers"
                displayEmpty
                value = { layerSelected  && layers.length > 0 ? layerSelected : [] }
                onChange = { (event) => { handleLayerChange(event) }}
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
                  list && list.length > 0 ?
                    list.map((item) => (
                      <MenuItem key = { item.id } value = { item.id }>
                        { item.id }: { trimExtension(item.name) }
                        {/* { item.id }: { layer.name } ({ layer.geometry.type }) */}
                      </MenuItem>
                    ))
                    :
                      <MenuItem disabled>
                        No data available
                      </MenuItem>
                }
              </Select>
              <FormHelperText>Please select a dataset.</FormHelperText>
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
            <Box sx = {{ height: 650, width: "100%" }}>
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
                localeText = {{ noRowsLabel: "" }}
              />
            </Box>
          </Grid>
          <Grid item xs = { 12 } md = { 6 } container direction = "column" justifyContent = "flex-start" alignItems = "center">
            <Grid item container direction = "row" justifyContent = "flex-start" alignItems = "center">
              <Grid item xs = { 12 } style = {{ width: "100%" }}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl disabled = {aspectFormDisabled} focused = {!aspectFormDisabled} required variant = "outlined" className = { classes.innerFormControl }>
                    {/* <InputLabel id="demo-simple-select-label" shrink>Aspect</InputLabel> */}
                    <Select
                      displayEmpty
                      value={aspectSelected}
                      onChange={handleAspectChange}
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
                        Please select an aspect
                      </MenuItem>
                      {
                        aspects && aspects.length ? 
                        aspects.map((aspect, index) => (<MenuItem key = { index } value = {aspect}>{aspect}</MenuItem>))
                        :
                        <MenuItem disabled value = "no_data">No data available.</MenuItem>
                      }
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
            <Grid item container direction = "row" justifyContent = "flex-start" alignItems = "center">
              <Box sx = {{ flexGrow: 1, padding: "5px 0 40px 0" }}>
                {
                  dataset && dataset.length > 0 ?
                    <SparkLineChart
                      data = { dataset }
                      height = { 200 }
                      showHighlight
                      colors = { ["#1b798e"] }
                    />
                    :
                    null
                }
              </Box>
            </Grid>
            <Grid item container direction = "column" justifyContent = "center" alignItems = "center">
              <Box width = { "100%" } height = { 200 }>
                {
                  statistics ?
                    <Grid width = "100%" container direction = "column" justifyContent = "center" alignItems = "center" spacing={2}>
                      {
                        statistics.map((item, index) => (
                          <Grid key = { index } item width = "100%" container direction = "column" justifyContent = "center" alignContent = "center" style = {{ padding: "0 8px" }}>
                            <Grid item width = "100%" container direction = "row" justifyContent = "space-between" alignContent = "center" style = {{ padding: "8px 0" }}>
                              <Grid item xs = { 8 }><span>{ humanize(item[0]) }</span></Grid>
                              <Grid item xs = { 4 } container direction = "row" justifyContent = "flex-end" alignItems = "center"><span>{ item[1] }</span></Grid>
                            </Grid>
                            { index !== statistics.length ? <Divider/> : null }
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