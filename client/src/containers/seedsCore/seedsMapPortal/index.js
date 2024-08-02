import React, {useEffect, useContext, useState} from 'react';
import L from 'leaflet';
import { GeoSearchControl, EsriProvider } from 'leaflet-geosearch';
import $ from 'jquery';
import { Button, Drawer, useMediaQuery} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';

import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import _omit from "lodash/omit";

import './index.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import '../../../assets/Leaflet.SLD-master/leaflet.sld.js'

import 'leaflet.browser.print/dist/leaflet.browser.print.min'
import 'leaflet.browser.print/dist/leaflet.browser.print'
import 'leaflet.browser.print/src/leaflet.browser.print'
import 'leaflet.browser.print/src/leaflet.browser.print.sizes'
import 'leaflet.browser.print/src/leaflet.browser.print.utils'
import 'leaflet-draw/dist/leaflet.draw.js'
import 'leaflet-draw/dist/leaflet.draw.css'

import '../../../assets/L.Control.Rose'
import '../../../assets/L.Control.MousePosition.js'
import '../../../assets/L.Control.MousePosition.css'

import icon from '../../../../node_modules/leaflet-draw/dist/images/marker-icon.png'
import SeedsMapPortalLayer from '../seedsMapPortalLayer'

import 'leaflet-geoserver-request'
import 'leaflet.featuregroup.subgroup'

import { MapContext } from '../../../context/MapContext';
import { FeaturesContext } from '../../../context/FeaturesContext';
import { SEEDSContext } from '../../../context/SEEDSContext';

var MyCustomMarker = L.Icon.extend({
  options: {
      shadowUrl: null,
      iconAnchor: new L.Point(12, 12),
      iconSize: new L.Point(24, 36),
      iconUrl: icon
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

function ReactMap() {
  const [drawerWidth, setDrawerWidth] = React.useState("13vw")

  const useStyles = makeStyles((theme) => ({
    button: {
      backgroundColor:"#0c343d", 
      color: "#fffefe", 
      '&:hover': {
        color: '#fffefe',
        backgroundColor: '#1b798e',
      }
    }, appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    }, appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }), marginRight: drawerWidth
    }, title: {
      flexGrow: 1
    }, hide: {
      display: 'none'
    }, drawer: {
      width: drawerWidth
    }, drawerPaper: {
      width: drawerWidth,
      backgroundColor:"#0c343d",
      color:"white"
    }, drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justify: 'flex-start'
    }, content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }), marginRight: -drawerWidth
    }, contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }), marginRight: 0,
      marginTop: 64.5 // same marginTop with Main Window
    }
  }))

  const classes = useStyles();
  const theme = useTheme();
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

  var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution:
      'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }
  )

  var value = ["Map Title"]

  function createUserInputMapTitle() {
    var userInputControl = L.control({position:'topleft'}); //positions
    var btnControl = L.control({position:'topleft'});
    
    userInputControl.onAdd = function () { // things to do under this control
      var input = L.DomUtil.create("input", "input-title");
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
      var btn = L.DomUtil.create("button", "submit");
      $(btn).text("Update Map Title");
      
      $(btn).on({click: function() {
        $(".output-title").text(value) // pag walang .html na file <div> na involved. ganto yung notation
      }});                              // if meron <div id="output-title>", $("#output-title").text(value) 
      return btn;
    }
    userInputControl.addTo(map.current); //add controls to map
  }

  function printUpdatedMapTitle(title,e) {
    var userOutputControl = L.control({position:'topleft'});
    userOutputControl.onAdd = function () {
      var output = L.DomUtil.create("output", "output-title");
      $(output).text(title);
      return output;
    }
    userOutputControl.addTo(e.printMap);
  }
  
  function addCrsText(title, e) {
    var userOutputControl = L.control({position:'bottomleft'});
    userOutputControl.onAdd = function () {
      var output = L.DomUtil.create("output", "output-crs");
      $(output).text(title);
      return output;
    }
    userOutputControl.addTo(e.printMap);
  }

  var baseMaps = {
    "OSM": L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}),
    "CartoDB": L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'}),
    "ESRI": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {attribution:
      'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'}),
    "Planet": L.Geoserver.wms("http://localhost:5000/geoserver/wms", {
    // "Planet": L.Geoserver.wms("https://seeds.geospectrum.com.ph/geoserver/wms", {
      layers: "SEEDsdata:20180525_015612_100e_3B_AnalyticMS_SR"
    })
  };

  useEffect(() => {
    // if (map.current === undefined || map.current === null){
    //   map.current = L.map('map', {
    //     center: position,
    //     zoom: 13,
    //     layers: [esri],
    //     zoomControl: false
    //   });
    //   setLC(L.control.layers(baseMaps).addTo(map.current))
    // } else {
    //   map.current = L.map('map', {
    //     center: position,
    //     zoom: 13,      
    //     layers: [esri],
    //     zoomControl: false

    //   });
    //   setLC(L.control.layers(baseMaps).addTo(map.current))
    // }

    map.current = L.map('map', {
      center: position,
      zoom: 13,      
      layers: [esri],
      zoomControl: false
    });
    setLC(L.control.layers(baseMaps).addTo(map.current))
      
    createUserInputMapTitle()
    
    function addCrsText(title) {
      var userOutputControl = L.control({position:'bottomleft'});
      userOutputControl.onAdd = function () {
        var output = L.DomUtil.create("output", "output-crs");
        $(output).text(title);
        
        return output;
      }
      userOutputControl.addTo(map.current);
    }

    addCrsText('Coordinate System: GCS WGS 1984') // adds crs text

    L.control.mousePosition({prefix:"Lat: ", separator: ", Lon: ", }).addTo(map.current);
    L.control.scale({imperial: false,position:'bottomleft'}).addTo(map.current); //scale!
    map.current.addControl(searchControl); //search!
    const northArrow = L.control.rose('leaflet-rose', {
      position:'bottomleft', 
      icon:'default', 
      iSize:'medium', 
      opacity:0.8
    });
    northArrow.addTo(map.current); //northarrow!
    L.control.zoom({
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

      // L.control.browserPrint({
      //   position: "topright",
      //   title: 'Just print me!',
      //   documentTitle: 'Map printed using leaflet.browser.print plugin',
      //   printModes: [
      //       "Landscape",
      //       "Portrait",
      //       // L.control.browserPrint.mode.auto("Automatico", "B4"),
      //       // L.BrowserPrint.Mode.Custom("Custom")
      //   ]
      // }).addTo(map.current);
   
      map.current.on("browser-print", function(e){
        /*on print start we already have a print map and we can create new control and 
        add it to the print map to be able to print custom information */
        addCrsText('Coordinate System: GCS WGS 1984',e)

        L.control.scale({position:'bottomleft', imperial: false}).addTo(e.printMap);
        L.control.rose('leaflet-rose', {position:'bottomleft', icon:'default', iSize:'medium', opacity:0.8}).addTo(e.printMap); 

        printUpdatedMapTitle(value,e)
      });
      
      var editableLayers = new L.FeatureGroup();
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
        if (layer instanceof L.Marker) {
          return strLatLng(layer.getLatLng());
        // Circle - lat/long, radius
        } else if (layer instanceof L.CircleMarker) {
          var center = layer.getLatLng(),
              radius = layer.getRadius();
          return "Center: "+strLatLng(center)+"<br />"
                + "Radius: "+_round(radius, 2)+" m";
        // Rectangle/Polygon - area
        } else if (layer instanceof L.Polygon) {
          var latlngs = layer._defaultShape ? layer._defaultShape() : layer.getLatLngs(),
              area = L.GeometryUtil.geodesicArea(latlngs);
          return "Area: "+L.GeometryUtil.readableArea(area, true);
        // Polyline - distance
        } else if (layer instanceof L.Polyline) {
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
      map.current.on(L.Draw.Event.CREATED, function(event) {
        var layer = event.layer;
        var content = getPopupContent(layer);
        if (content !== null) {
          layer.bindPopup(content);
        }
        editableLayers.addLayer(layer);
      });
      // Object(s) edited - update popups
      map.current.on(L.Draw.Event.EDITED, function(event) {
        var layers = event.layers,
            content = null;
        layers.eachLayer(function(layer) {
          content = getPopupContent(layer);
          if (content !== null) {
            layer.setPopupContent(content);
          }
        });
      });

      var drawControl = new L.Control.Draw(options);
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
    if (brgys.length > 0 && lControl){
      if (loadedMtd.length === brgys.length){
        // do nothing
      } else {
        var layerGroup = new L.FeatureGroup()

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
            var popup = L.popup().setContent("\u2022   " + myJSON)
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
                var popup = L.popup({maxHeight:300}).setContent(`<table>${table}</table>`.replace(/,/g, ''))
              }
            }
          }
          var poly = new L.geoJSON(data, {
            style: data.style,
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
    <>
      <div className={clsx({
          [classes.appBarShift]: openLayerGroups && !isMatch,
        })}>
        <div id="map" style={{height:"93.4vh", overflow: 'hidden'}}>
          {openLayerGroups && !isMatch?
            <Button onClick={handleDrawerClose} className={classes.button} style={{
                borderRadius:0, 
                zIndex:1000, 
                position:"absolute", 
                bottom:25, 
                right:0
              }}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </Button>
            : <Button onClick={handleDrawerOpen} className={classes.button} style={{
                borderRadius:0,
                zIndex:1000, 
                position:"absolute", 
                bottom:25, 
                right:10
              }}>
              Layer Groups
            </Button>
          }
        </div>
      </div>
      <Drawer className={classes.drawer} variant="persistent" anchor="right"
        open={openLayerGroups && !isMatch} classes={{
          paper: classes.drawerPaper,
        }}>
        <main className={clsx(classes.content, {
            [classes.contentShift]: openLayerGroups && !isMatch,
          })}>
          <SeedsMapPortalLayer />
        </main>
      </Drawer>
    </>
  )
}

export default ReactMap;