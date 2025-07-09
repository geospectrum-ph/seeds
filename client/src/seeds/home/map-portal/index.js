import React, {useEffect, useContext, useState} from 'react';
import * as leaflet from 'leaflet';
import { GeoSearchControl, EsriProvider } from 'leaflet-geosearch';
import $ from 'jquery';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import _omit from "lodash/omit";

// import './index.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import '../../assets/Leaflet.SLD-master/leaflet.sld.js'

import 'leaflet.browser.print/dist/leaflet.browser.print.min'
import 'leaflet.browser.print/dist/leaflet.browser.print'
import 'leaflet.browser.print/src/leaflet.browser.print'
import 'leaflet.browser.print/src/leaflet.browser.print.sizes'
import 'leaflet.browser.print/src/leaflet.browser.print.utils'
import 'leaflet-draw/dist/leaflet.draw.js'
import 'leaflet-draw/dist/leaflet.draw.css'

import '../../assets/L.Control.Rose.js'
import '../../assets/L.Control.MousePosition.js'
import '../../assets/L.Control.MousePosition.css'


import 'leaflet-geoserver-request'
import 'leaflet.featuregroup.subgroup'

import { MapContext } from '../../context/MapContext.js';
import { FeaturesContext } from '../../context/FeaturesContext.js';
import { SEEDSContext } from '../../context/SEEDSContext.js';

import { Typography, Grid, Collapse, Button, Tooltip, CssBaseline, Divider,
        IconButton, Dialog, Paper, Checkbox, Slide, Slider, Drawer, useMediaQuery } from '@material-ui/core';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import ZoomInIcon from '@material-ui/icons/ZoomIn';

import _without from "lodash/without";

import DataCatalogueForEdit2 from '../catalogue/index.js'
import AddToMapIcon from '../../assets/icons/42 Add to Map.png'

var MyCustomMarker = leaflet.Icon.extend({
  options: {
      shadowUrl: null,
      iconAnchor: new leaflet.Point(12, 12),
      iconSize: new leaflet.Point(24, 36),
      // iconUrl: icon
  }
});

var selectedCounter = -1

const provider = new EsriProvider();

const searchControl = new GeoSearchControl({
  provider: provider,
  style: 'bar',
  marker: {
    icon: new MyCustomMarker(),
    draggable: false,
  },
  login1: {
    border: 0,
    borderRadius: 5,
    backgroundColor: '#1b798e',
    color: '#ffffff',
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922',
    }
  },
  divider: {
    backgroundColor:"#fffefe"
  }
});

// function extractSingleSLD(SLDText) { // function which extracts SLD styles from SLDText for single symbols
//   function keyextract(SLDText, prop, key){ // function inside extractSingleSLD which finds property in SLDText
//     try { // try finding the property style inside the SLDText
//       var keylen = key.length; // length of key
//       var keypos = SLDText.search(key) + keylen; // key starting position of property
//       var keyend = SLDText.indexOf("<", keypos) // key ending position of property
//       return SLDText.slice(keypos, keyend); // return value by slicing SLDText according to start and end positions of key
//     } catch (error) { // if it fails to find the property style inside the SLDText
//       return SLDJson[prop]; // return default property
//     };
//   };
//   var SLDJson = {color: "black", // default style
//     weight: 1,
//     opacity: 0.8,
//     fillColor: "red",
//     fillOpacity: 0.1,
//     dashArray: '8 5'
//   };

//   SLDJson.fillColor = keyextract(SLDText, 'fillColor', 'name="fill">'); // find fillColor
//   SLDJson.fillOpacity = keyextract(SLDText, 'fillOpacity', 'name="fill-opacity">'); // find fillOpacity
//   SLDJson.color = keyextract(SLDText, 'color', 'name="stroke">'); // find color of line
//   SLDJson.weight = keyextract(SLDText, 'weight', 'name="stroke-width">'); // find stroke width
//   return SLDJson; // return the sld style as json
// };


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SeedsMapPortalLayer({ styles }) {

  const {brgys, setBrgys, legendItems, setLegendItems, lg, setLG, setLoadedMtd} = React.useContext(FeaturesContext)
  const {map, lControl} = useContext(MapContext)
  const {loadingDataCat, setLoadingDataCat} = useContext(SEEDSContext);

  const handleDeleteLayer = (lgi, legenditem, barangay, i) => {
    if (lgi) {
      var retVal = window.confirm(`Do you want to delete this layer?\n\u2022  ${legenditem.name.replace(/_/g, ' ')}`);
      if( retVal == true ) {
        lControl.removeLayer(lgi.layerGroup);
        map.current.removeLayer(lgi.layerGroup);
    
        setLoadedMtd((current) => _without(current, lgi.mtdId));
        setBrgys((current) => _without(current, barangay))
        setLG((current) => _without(current, lgi));
        setLegendItems((current) => _without(current, legenditem));
      }
    }
  };

  const handleZoom = (lgi) => {
    map.current.flyToBounds(lgi.layerGroup.getBounds())
  }

 
  const handleOpacity = (val, lgi, i) => {
    val = val/100.0 // get percentage

    lgi.layerGroup.eachLayer(function(layer) {
      layer.setStyle({opacity: val, fillOpacity: val})
      lgi.layerGroup.addTo(map.current) 
    });
  }

  const LegendLayer = (layer) => {
    const i = layer.i
    const legendName = layer.layer.name || layer.layer.metadataID || "Untitled Layer"
    const legendStyle = layer.layer.style
    const barangay = layer.barangay
    const lgi = layer.layerGroup
    const [checked, setChecked] = useState(false)
    const [sliderVal, setSliderVal] = lgi.fillOpacity ? React.useState(lgi.fillOpacity*100) : React.useState(0);
    const sliderValRef = lgi.fillOpacity ? React.useState(lgi.fillOpacity*100) : React.useState(0);
    const deletionProcess = React.useRef(false)
    const [isLayerOn, setIsLayerOn] = React.useState(lgi.active)
    const isLayerOnRef = React.useRef(lgi.active)


    useEffect(() => {
      if(sliderVal!=lgi.fillOpacity*100){
        handleOpacity(sliderVal, lgi, i)
      }
    },[sliderVal])

    useEffect(() => {
      return () => { // cleanup function
        if(lg && legendItems && lg.length === legendItems.length 
          && legendItems.length > 0 && deletionProcess.current === false){
        
        }
    }}, [])
  
    return(
      <Paper style={{padding:5, backgroundColor:"#ced8da", marginBottom:10, marginBottom:10}} elevation={3}>
        <Grid container direction="row" justifyContent="center" alignItems="center" 
          style={{paddingTop:2, paddingBottom:2}}>
          <Grid item xs={2}>
            <Tooltip title="Visibility">
              <Checkbox style={{color: '#1b798e'}} checked={isLayerOn}
                onChange={(event) => {
                  isLayerOnRef.current = event.target.checked;
                  setIsLayerOn(event.target.checked)
                  if (event.target.checked) {
                    lgi.layerGroup.addTo(map.current) 
                  } else {
                    map.current.removeLayer(lgi.layerGroup);
                  }
                }}/>
            </Tooltip>
          </Grid>
          <Grid item xs={8}>
            <Typography style={{ 
                width:"100%", 
                wordWrap:"break-word", 
                fontWeight:700, 
                paddingLeft:5
              }}>
              {legendName.replace(/_/g, ' ')}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            {legendStyle.length>0?<Tooltip title="Legend">
              <IconButton style={{width: '50px'}} onClick={()=>setChecked(!checked)}>
                {checked? <ExpandLess style={{color: '#1b798e'}}/>: 
                <ExpandMore style={{color: '#1b798e'}}/>}
              </IconButton>
            </Tooltip>:null}
          </Grid>
        </Grid>
        <Divider/>
        <Grid container direction="row" justifyContent="space-between" 
          alignItems="center" style={{paddingLeft:10, paddingRight:10, paddingTop:2}} >
          <Grid item xs={3}>
            <Typography variant="caption"> Opacity: {sliderVal}%</Typography>
          </Grid>
          <Grid item xs ={5}>
            <Slider value={sliderVal} valueLabelDisplay="auto" onChange={(e, val) => {
                sliderValRef.current = val;
                setSliderVal(val)
              }} disabled={isLayerOn == false}/>
          </Grid>
          <Grid item xs={1}>
            <Tooltip title="Zoom to layer">
              <IconButton style={{color: '#1b798e'}} onClick={() => {handleZoom(lgi)}}>
                <ZoomInIcon/>
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={1}>
            <Tooltip title="Delete">
              <IconButton style={{color: '#1b798e'}}
                onClick={() => {
                  deletionProcess.current = true
                  handleDeleteLayer(lgi, layer.layer, barangay, i)
                }}>
                <DeleteOutlineOutlinedIcon/>
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Collapse in={checked} style={{marginBottom:2}}>
          {legendStyle.map((x, i) => {
            let fillColor = x.fillColor
            return(
              <Grid container direction="row" justifyContent="flex-start" alignItems="center" 
                spacing={2} key={i}>
                <Grid item xs={2} container direction="row" justifyContent="flex-end">
                  <div style={{backgroundColor: fillColor, width: '20px', height: '20px'}}/>
                </Grid>
                <Grid item xs={9} >
                  <Typography>{x.name}</Typography>
                </Grid>
              </Grid>
            )
          })}
        </Collapse>
      </Paper>      
    )
  }
  
  const handleClickOpen = () => {
    setLoadingDataCat(true);
  };

  const handleClose = () => {
    setLoadingDataCat(false);
  };

  return (
    <>
      <CssBaseline />
      <Grid container style={{overflowY: 'hidden'}}>
        <Grid item container direction='row' justifyContent='space-between' alignItems="center">
          <Grid item className={styles.toolbar}>
            <Typography style={{
                fontWeight:1000, 
                fontSize:"1.2rem", 
                fontFamily:"'Outfit', sans-serif"
              }}>
              Layer Groups
            </Typography>
          </Grid>
          <Grid item>
            <Tooltip title="Add Layer from SEEDs Catalogue">
              <Button className={styles.login1} onClick={handleClickOpen}>
                <img src={AddToMapIcon} style={{width:35}}/>
              </Button>
            </Tooltip>
          </Grid>
        </Grid>

        <Divider light={true} className={styles.divider}/>
        <Grid item xs={12} style={{
            overflowY: 'auto', 
            height: window.innerHeight-200,
            marginTop:20
          }}>
          {legendItems.length !== 0 && lg.length > 0 ? 
            legendItems.map((item, index) => (
              <LegendLayer key={index} layer={item} layerGroup={lg[index]} 
                barangay={brgys[index]} i={index}/>)) 
          : <Typography>
            No selected layers found. Please select from the SEED Catalogue.
          </Typography>}
        </Grid>
      </Grid>
      <Dialog fullWidth={true} maxWidth="lg" open={loadingDataCat}
        TransitionComponent={Transition} keepMounted onClose={handleClose}>
        <DataCatalogueForEdit2/>
      </Dialog>
    </>
  );
}



const useStyles = makeStyles(function () {
  return ({
    root: {
      "& .title": {
  gridRow: "1",
  justifySelf: "center",
  textAlign: "center",
  color: "grey",
  boxSizing: "border-box",
  marginTop: "0",
  backgroundColor: "white",
  fontSize: "2em",
  paddingLeft: "15px",
  paddingRight: "15px",  
},

"& .sub-content": {
  gridRow: "5",
  paddingLeft: "10px",
  textAlign: "center",
  color: "grey",
  boxSizing: "border-box",
},

"& .box": {
  background: "#fff",
  padding: "5px",
  zIndex: "2",
},

"& .elevated": {
  zIndex: "999",
},

"& .output-title": {
  padding: "6px 10px",
  font: "20px/22px Arial, Helvetica, sans-serif",
  background: "white",
  boxShadow: "0 0 15px rgba(0,0,0,0.2)",
  borderRadius: "5px",
},

"& .leaflet-container output-crs": {
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  boxShadow: "0 0 5px #bbb",
  padding: "0px 5px",
  color: "#333",
  font: "12px/1 .5 'Helvetica Neue', Arial, Helvetica, sans-serif",
  margin: "5px 5px",
},

"& .input-title": {
  padding: "6px 10px",
  font: "20px/22px Arial, Helvetica, sans-serif",
  background: "rgba(255,255,255,0.8)",
  boxShadow: "0 0 15px rgba(0,0,0,0.2)",
  borderRadius: "5px",
  border: "0",
  width: "150px",
},

"& table, th, td": {
  border: "1px solid black",
  padding: "5px",
},

"& th, td": {
  maxWidth: "150px",
  overflowWrap: "break-word",
},

"& tr:nth-child(odd)": {backgroundColor: "#f2f2f2",},

"& .header": { backgroundColor: "#ced8da" },

"& table": {
  display: "block",
  borderStyle: "dotted",
},
    },
    pageMapPortal: {
      width: "100%",
      height: "100%",

      display: "flex",
      flexFlow: "row nowrap",
      placeContent: "center center",
      placeItems: "center center",

      "& > :nth-child(1)": {
        width: "100%",
        height: "100%",
        
        display: "flex",
        flex: "1 1 auto",
      },

      "& > :nth-child(2)": {
        width: "auto",
        height: "100%",

        display: "flex",
        flex: "0 1 auto",
      },
    },
    mapPortalMap: {
      width: "100%",
      height: "100%",
    },
  });
});
//   (theme) => ({
//     button: {
//       backgroundColor:"#0c343d", 
//       color: "#fffefe", 
//       '&:hover': {
//         color: '#fffefe',
//         backgroundColor: '#1b798e',
//       }
//     }, appBar: {
//       transition: theme.transitions.create(['margin', 'width'], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen
//       })
//     }, appBarShift: {
//       width: `calc(100% - ${drawerWidth}px)`,
//       transition: theme.transitions.create(['margin', 'width'], {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen
//       }), marginRight: drawerWidth
//     }, title: {
//       flexGrow: 1
//     }, hide: {
//       display: 'none'
//     }, drawer: {
//       width: drawerWidth
//     }, drawerPaper: {
//       width: drawerWidth,
//       backgroundColor:"#0c343d",
//       color:"white"
//     }, drawerHeader: {
//       display: 'flex',
//       alignItems: 'center',
//       padding: theme.spacing(0, 1),
//       ...theme.mixins.toolbar,
//       justify: 'flex-start'
//     }, content: {
//       flexGrow: 1,
//       padding: theme.spacing(3),
//       transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//       }), marginRight: -drawerWidth
//     }, contentShift: {
//       transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }), marginRight: 0,
//       marginTop: 64.5 // same marginTop with Main Window
//     },
//     root: {
//       "& .title": {
//   gridRow: "1",
//   justifySelf: "center",
//   textAlign: "center",
//   color: "grey",
//   boxSizing: "border-box",
//   marginTop: "0",
//   backgroundColor: "white",
//   fontSize: "2em",
//   paddingLeft: "15px",
//   paddingRight: "15px",  
// },

// "& .sub-content": {
//   gridRow: "5",
//   paddingLeft: "10px",
//   textAlign: "center",
//   color: "grey",
//   boxSizing: "border-box",
// },

// "& .box": {
//   background: "#fff",
//   padding: "5px",
//   zIndex: "2",
// },

// "& .elevated": {
//   zIndex: "999",
// },

// "& .output-title": {
//   padding: "6px 10px",
//   font: "20px/22px Arial, Helvetica, sans-serif",
//   background: "white",
//   boxShadow: "0 0 15px rgba(0,0,0,0.2)",
//   borderRadius: "5px",
// },

// "& .leaflet-container output-crs": {
//   backgroundColor: "rgba(255, 255, 255, 0.7)",
//   boxShadow: "0 0 5px #bbb",
//   padding: "0px 5px",
//   color: "#333",
//   font: "12px/1 .5 'Helvetica Neue', Arial, Helvetica, sans-serif",
//   margin: "5px 5px",
// },

// "& .input-title": {
//   padding: "6px 10px",
//   font: "20px/22px Arial, Helvetica, sans-serif",
//   background: "rgba(255,255,255,0.8)",
//   boxShadow: "0 0 15px rgba(0,0,0,0.2)",
//   borderRadius: "5px",
//   border: "0",
//   width: "150px",
// },

// "& table, th, td": {
//   border: "1px solid black",
//   padding: "5px",
// },

// "& th, td": {
//   maxWidth: "150px",
//   overflowWrap: "break-word",
// },

// "& tr:nth-child(odd)": {backgroundColor: "#f2f2f2",},

// "& .header": { backgroundColor: "#ced8da" },

// "& table": {
//   display: "block",
//   borderStyle: "dotted",
// },
//     } 
// })

export default function SEEDsMapPortal() {
  const styles = useStyles();
  const theme = useTheme();

  const [drawerWidth, setDrawerWidth] = React.useState("13vw")
  const {viewport,  map, lControl, setLC} = useContext(MapContext)
  const { brgys, selected, lg, setLG, setLGCurrent, loadedMtd, setLoadedMtd, lControlId, 
          setLControlId } = useContext(FeaturesContext)
  const { openLayerGroups, setOpenLayerGroups, selectedIndex, setSelectedIndex } = useContext(SEEDSContext);

  const position = [viewport.lat, viewport.lng]

  const isMatch = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    if (isMatch) {
      setOpenLayerGroups(false);
    } else {
      setDrawerWidth(500)
    }
  }, [isMatch])

  const handleDrawerOpen = () => {
    setOpenLayerGroups(true);
  };

  const handleDrawerClose = () => {
    setOpenLayerGroups(false);
  }
  
  useEffect(()=> {
    setSelectedIndex(2)
  }, [selectedIndex])

  var esri = leaflet.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution:
      'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }
  )

  var value = ["Map Title"]

  function createUserInputMapTitle() {
    var userInputControl = leaflet.control({position:'topleft'}); //positions
    var btnControl = leaflet.control({position:'topleft'});
    
    userInputControl.onAdd = function () { // things to do under this control
      var input = leaflet.DomUtil.create("input", "input-title");
      $(input).val(value);
      
      $(input).on("click", function () {
        $(this).select();
      })
      $(input)
        .on("input change", function() {
            value = $(input).val();
          }
        );
      return input;
    }

    btnControl.onAdd = function () { // things to do under this control
      var btn = leaflet.DomUtil.create("button", "submit");
      $(btn).text("Update Map Title");
      
      $(btn).on({click: function() {
        $(".output-title").text(value) // pag walang .html na file <div> na involved. ganto yung notation
      }});                              // if meron <div id="output-title>", $("#output-title").text(value) 
      return btn;
    }
    userInputControl.addTo(map.current); //add controls to map
  }

  function printUpdatedMapTitle(title,e) {
    var userOutputControl = leaflet.control({position:'topleft'});
    userOutputControl.onAdd = function () {
      var output = leaflet.DomUtil.create("output", "output-title");
      $(output).text(title);
      return output;
    }
    userOutputControl.addTo(e.printMap);
  }
  
  function addCrsText(title, e) {
    var userOutputControl = leaflet.control({position:'bottomleft'});
    userOutputControl.onAdd = function () {
      var output = leaflet.DomUtil.create("output", "output-crs");
      $(output).text(title);
      return output;
    }
    userOutputControl.addTo(e.printMap);
  }

  var baseMaps = {
    "OSM": leaflet.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}),
    "CartoDB": leaflet.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'}),
    "ESRI": leaflet.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {attribution:
      'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'}),
    "Planet": leaflet.Geoserver.wms("https://seeds.geospectrum.com.ph/geoserver/wms", {
    // "Planet": leaflet.Geoserver.wms("http://localhost:5000/geoserver/wms", {
      layers: "SEEDsdata:20180525_015612_100e_3B_AnalyticMS_SR"
    })
  };

  React.useEffect(function () {
    map.current = leaflet.map("map-map-portal", {
      center: position,
      zoom: 13,      
      layers: [esri],
      zoomControl: false
    });

    setLC(leaflet.control.layers(baseMaps).addTo(map.current))
      
    createUserInputMapTitle()
    
    function addCrsText(title) {
      var userOutputControl = leaflet.control({position:'bottomleft'});
      userOutputControl.onAdd = function () {
        var output = leaflet.DomUtil.create("output", "output-crs");
        $(output).text(title);
        
        return output;
      }
      userOutputControl.addTo(map.current);
    }

    addCrsText('Coordinate System: GCS WGS 1984') // adds crs text

    leaflet.control.mousePosition({prefix:"Lat: ", separator: ", Lon: ", }).addTo(map.current);
    leaflet.control.scale({imperial: false,position:'bottomleft'}).addTo(map.current); //scale!
    map.current.addControl(searchControl); //search!
    const northArrow = leaflet.control.rose('leaflet-rose', {
      position:'bottomleft', 
      icon:'default', 
      iSize:'medium', 
      opacity:0.8
    });
    northArrow.addTo(map.current); //northarrow!
    leaflet.control.zoom({
        position: 'topright'
    }).addTo(map.current);
  }, []);

  React.useEffect(() => {

    if (map){

      // var customActionToPrint = function(context, mode) {
      //   return function() {
      //     var documentTitle = window.prompt("Map Title");
      //     context._printCustom(mode);
      //   }
      // }

      // leaflet.control.browserPrint({
      //   position: "topright",
      //   title: 'Just print me!',
      //   documentTitle: 'Map printed using leaflet.browser.print plugin',
      //   printModes: [
      //       "Landscape",
      //       "Portrait",
      //       // leaflet.control.browserPrint.mode.auto("Automatico", "B4"),
      //       // leaflet.BrowserPrint.Mode.Custom("Custom")
      //   ]
      // }).addTo(map.current);
   
      map.current.on("browser-print", function(e){
        /*on print start we already have a print map and we can create new control and 
        add it to the print map to be able to print custom information */
        addCrsText('Coordinate System: GCS WGS 1984',e)

        leaflet.control.scale({position:'bottomleft', imperial: false}).addTo(e.printMap);
        leaflet.control.rose('leaflet-rose', {position:'bottomleft', icon:'default', iSize:'medium', opacity:0.8}).addTo(e.printMap); 

        printUpdatedMapTitle(value,e)
      });
      
      var editableLayers = new leaflet.FeatureGroup();
      map.current.addLayer(editableLayers);
      
      var options = {
        position: 'topright',
        draw: {
          polyline: {
            shapeOptions: {
              color: '#f357a1',
              color: "#0d3c47",
              weight: 5
            }
          }, polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons
            drawError: {
              color: '#e1e100', // Color the shape will turn when intersects
              message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
            }, shapeOptions: {
              color: '#bada55',
              color: "#5aff3d",
              weight: 3
            }, showArea: true
          }, circlemarker: false, // Turns off this drawing tool
          rectangle: {
            shapeOptions: {
              clickable: false,
              color: "#A31621",
              weight: 3
            }
          }, circle: {
            shapeOptions: {
              clickable: false,
              color: "#1b798e ",
              weight: 3
            }
          }, marker: {
            icon: new MyCustomMarker()
          }
        }, edit: {
          featureGroup: editableLayers //REQUIRED!!
        }
      };
      
      // Truncate value based on number of decimals
      var _round = function(num, len) {
        return Math.round(num*(Math.pow(10, len)))/(Math.pow(10, len));
      };
      // Helper method to format LatLng object (x.xxxxxx, y.yyyyyy)
      var strLatLng = function(latlng) {
        return "("+_round(latlng.lat, 6)+", "+_round(latlng.lng, 6)+")";
      };

      // Generate popup content based on layer type
      // - Returns HTML string, or null if unknown object
      var getPopupContent = function(layer) {
        // Marker - add lat/long
        if (layer instanceof leaflet.Marker) {
          return strLatLng(layer.getLatLng());
        // Circle - lat/long, radius
        } else if (layer instanceof leaflet.CircleMarker) {
          var center = layer.getLatLng(),
              radius = layer.getRadius();
          return "Center: "+strLatLng(center)+"<br />"
                + "Radius: "+_round(radius, 2)+" m";
        // Rectangle/Polygon - area
        } else if (layer instanceof leaflet.Polygon) {
          var latlngs = layer._defaultShape ? layer._defaultShape() : layer.getLatLngs(),
              area = leaflet.GeometryUtil.geodesicArea(latlngs);
          return "Area: "+leaflet.GeometryUtil.readableArea(area, true);
        // Polyline - distance
        } else if (layer instanceof leaflet.Polyline) {
          var latlngs = layer._defaultShape ? layer._defaultShape() : layer.getLatLngs(),
              distance = 0;
          if (latlngs.length < 2) {
            return "Distance: N/A";
          } else {
            for (var i = 0; i < latlngs.length-1; i++) {
              distance += latlngs[i].distanceTo(latlngs[i+1]);
            }
            return "Distance: "+_round(distance, 2)+" m";
          }
        }
        return null;
      };

      // Object created - bind popup to layer, add to feature group
      map.current.on(leaflet.Draw.Event.CREATED, function(event) {
        var layer = event.layer;
        var content = getPopupContent(layer);
        if (content !== null) {
          layer.bindPopup(content);
        }
        editableLayers.addLayer(layer);
      });
      // Object(s) edited - update popups
      map.current.on(leaflet.Draw.Event.EDITED, function(event) {
        var layers = event.layers,
            content = null;
        layers.eachLayer(function(layer) {
          content = getPopupContent(layer);
          if (content !== null) {
            layer.setPopupContent(content);
          }
        });
      });

      var drawControl = new leaflet.Control.Draw(options);
      map.current.addControl(drawControl);
    
      map.current.on('draw:created', function (e) {
        var type = e.layerType,
            layer = e.layer;
    
        if (type === 'marker') {
            // Do marker specific actions
        }
    
        // Do whatever else you need to. (save to db, add to map etc)
        editableLayers.addLayer(layer); //changed map to feature group where u want to store your layers!
      });
    }
  }, [map])

  window.dispatchEvent(new Event('resize')); // for proper map resize 

  useEffect(() => {
    if (lControl){
      if (lControl._leaflet_id != lControlId){
        setLControlId(lControl._leaflet_id)
      }
    if (loadedMtd.length === brgys.length && lControl._leaflet_id != lControlId){
      for (var i = 0; i < loadedMtd.length; i ++){
        lg[i].layerGroup.eachLayer(function(layer) {
          layer.setStyle({opacity: lg[i].opacity, fillOpacity: lg[i].fillOpacity})
        });
        setLGCurrent(lg[i].layerGroup) // layer group
        // subsequent load
        lg[i].layerGroup.addTo(map.current) 
      }
    }}
  }, [lControl])
  
  useEffect(()=> {
    if (brgys.length > 0 && brgys[0].length > 0 && lControl){
              // console.log(brgys);

      if (loadedMtd.length === brgys.length){
        // do nothing
      } else {
        var layerGroup = new leaflet.FeatureGroup()

        var mtdId = brgys[brgys.length-1][0].properties.mtd_id

        brgys[brgys.length-1].map((data)=>{
          if ('properties' in data) { // check if there is 'properties
            var orig_json = data['properties'] // store here original value
            if ('sld_txt' in orig_json ) {
               var updated_json = _omit(orig_json, 'sld_txt') // store here updated value - removed SLD (super long text)
            } else {
              var updated_json = orig_json // store here updated value - retain original value if no SLD  
            }
            var myJSON = JSON.stringify(updated_json).replace(/,/g, '<br>\u2022   ')
                        .replace(/{/g,'').replace(/}/g,'').replace(/(['"])/g, '')
                        .replace(/:/g, ':   ')
            var popup = leaflet.popup().setContent("\u2022   " + myJSON)
            const updated_json_len = Object.keys(updated_json).length
            var counter = 0
            const table = []
            for (var i in updated_json) {
              if (counter === 0) {
                table.push(`<tr ><th class="header">ATTRIBUTE NAME</th><th class="header">VALUE</th></tr>`)
              }
              counter += 1
              table.push(`<tr><th>${i}</th><td>${updated_json[i]}</td></tr>`)
              if (counter === updated_json_len) {
                var popup = leaflet.popup({maxHeight:300}).setContent(`<table>${table}</table>`.replace(/,/g, ''))
              }
            }
          }

          // console.log(data);

          var poly = new leaflet.geoJSON(data, {
            style: {
    "color": "var(--color-black)",
    "stroke": true,
    "weight": 1,
    "opacity": 1.00,

    "fill": true,
    "fillColor": "var(--color-red-dark)",
    "fillOpacity": 0.50,
}
          }).bindPopup(popup)
          layerGroup.addLayer(poly)
        })
        
        setLGCurrent(layerGroup) // layer group
        setLoadedMtd(lm => [...lm, mtdId]) // add mtd id
        setLG(lg => [...lg, {
          layerGroup: layerGroup, 
          mtdId: mtdId, 
          opacity: 1, 
          fillOpacity: 1, 
          active:true
        }]) // store layergroups in this list
        // initial load
        layerGroup.addTo(map.current) 

        if (selectedCounter === -1){
          selectedCounter = selected.length - 1
        } else {
          selectedCounter = selectedCounter - 1
        }

        if(selected.length === 1 || selectedCounter === 0){
          map.current.flyToBounds(layerGroup.getBounds())
          selectedCounter = -1
        }
      }
    }
  },[brgys])

  return (
    <Grid id = "page-map-portal" className = { styles.pageMapPortal } container>
      <Grid item container>
        <div id = "map-map-portal" className = { styles.mapPortalMap }>
          {/* {openLayerGroups && !isMatch?
            <Button onClick={handleDrawerClose} className={styles.button} style={{
                borderRadius:0, 
                zIndex:1000, 
                position:"absolute", 
                bottom:25, 
                right:0
              }}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </Button>
            : <Button onClick={handleDrawerOpen} className={styles.button} style={{
                borderRadius:0,
                zIndex:1000, 
                position:"absolute", 
                bottom:25, 
                right:10
              }}>
              Layer Groups
            </Button>
          } */}
        </div>
      </Grid>
      <Grid item container>
        {/* <Drawer className={styles.drawer} variant="persistent" anchor="right"
          open={openLayerGroups && !isMatch} classes={{
            paper: styles.drawerPaper,
          }}> */}
          <main className={clsx(styles.content, {
              [styles.contentShift]: openLayerGroups && !isMatch,
            })}>
            <SeedsMapPortalLayer styles = {styles}/>
          </main>
        {/* </Drawer> */}
      </Grid>
    </Grid>
  )
}
