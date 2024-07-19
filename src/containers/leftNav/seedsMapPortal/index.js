import React from 'react';
import L from 'leaflet';
import { MapContext } from '../../../context/MapContext';
import { FeaturesContext } from '../../../context/FeaturesContext';
import './index.css';
import { HashRouter as Router, Switch, Route, Link, useHistory} from "react-router-dom";
import { Toolbar, makeStyles, Grid, Box} from '@material-ui/core/'
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import '../../../assets/Leaflet.SLD-master/leaflet.sld.js'
import { GeoSearchControl, EsriProvider } from 'leaflet-geosearch';
import 'leaflet.browser.print/dist/leaflet.browser.print.min'
import 'leaflet-draw/dist/leaflet.draw.js'
import 'leaflet-draw/dist/leaflet.draw.css'
import icon from '../../../../node_modules/leaflet-draw/dist/images/marker-icon.png'
import '../../../assets/L.Control.Rose'
// import MarkerIcon from '../../../assets/MarkerIcon.png'


const provider = new EsriProvider();






const searchControl = new GeoSearchControl({
  provider: provider,
  style: 'bar'
});


  function extractSingleSLD(SLDText) { // function which extracts SLD styles from SLDText for single symbols
    function keyextract(SLDText, prop, key){ // function inside extractSingleSLD which finds property in SLDText
      try { // try finding the property style inside the SLDText
        var keylen = key.length; // length of key
        var keypos = SLDText.search(key) + keylen; // key starting position of property
        var keyend = SLDText.indexOf("<", keypos) // key ending position of property
        return SLDText.slice(keypos, keyend); // return value by slicing SLDText according to start and end positions of key
      } catch (error) { // if it fails to find the property style inside the SLDText
        return SLDJson[prop]; // return default property
      };
    };
    var SLDJson = {color: "black", // default style
    weight: 1,
    opacity: 0.8,
    fillColor: "red",
    fillOpacity: 0.1,
    dashArray: '8 5',};
    SLDJson.fillColor = keyextract(SLDText, 'fillColor', 'name="fill">'); // find fillColor
    SLDJson.fillOpacity = keyextract(SLDText, 'fillOpacity', 'name="fill-opacity">'); // find fillOpacity
    SLDJson.color = keyextract(SLDText, 'color', 'name="stroke">'); // find color of line
    SLDJson.weight = keyextract(SLDText, 'weight', 'name="stroke-width">'); // find stroke width
    return SLDJson; // return the sld style as json
  };




function ReactMap(props) {
  // const classes = useStyles();
  const { viewport, checked, layerGroup, map, lControl, setLC } = React.useContext(MapContext)
  const { brgys, setBrgys, bldgs, setBldgs, cities, setCities, layerList, legendItems } = React.useContext(FeaturesContext)
  const position = [viewport.lat, viewport.lng]
  const [height, setHeight] = React.useState()
  const [width, setWidth] = React.useState()
  var overlayMap;
  var lGroup;
  var seedsMap;
  // const [lControl, setLC] = React.useState()

  
  const mcg = L.markerClusterGroup();
  
  const history = useHistory();
  

  const { selectedIndex, setSelectedIndex } = React.useContext(FeaturesContext);

    setSelectedIndex(2)
    // console.log(selectedIndex)

  var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'})
  var stadia =  L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {attribution:
        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'})
  var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {attribution:
        'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'})



  var baseMaps = {
    "OSM": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}),
    // "Stadia": L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {attribution:
    //         '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'}),
    "CartoDB": L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'}),
    "ESRI": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {attribution:
            'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'})
  };

  React.useEffect(() => {
    // create map
    const h = window.innerWidth >= 992 ? window.innerHeight-64  : 400
    setHeight(h)
    setWidth(window.innerWidth-373)
  

    if (map.current === undefined || map.current === null){
      // console.log("undefined map current", map.current)
      map.current = L.map('map', {
        center: position,
        zoom: 13,
        layers: [
          osm
        ],
      
      });
      setLC(L.control.layers(baseMaps).addTo(map.current))

    } else {
      map.current = L.map('map', {
        center: position,
        zoom: 13,      
        layers: [
          osm,
          layerGroup
        ],
      });
      setLC(L.control.layers(baseMaps).addTo(map.current))

      if (brgys.length > 0){
        addLayerG(brgys, SLDStyle)
      }
    }
    
    L.control.scale().addTo(map.current); //scale!
    map.current.addControl(searchControl); //search!
    const northArrow = L.control.rose('leaflet-rose', {position:'bottomleft', icon:'default', iSize:'medium', opacity:0.8});
    northArrow.addTo(map.current); //northarrow!
    // L.control.layers(baseMaps).addTo(map.current)


    // console.log('INITIALIZE: ', map.current)
    // for printing with scale and north arrow
    

  }, []);

  React.useEffect(()=>{
    const h = window.innerWidth >= 992 ? window.innerHeight-64  : 400
    setHeight(h)
    setWidth(window.innerWidth-373)
  }, [window.innerWidth])
  // console.log("storage: ", window.sessionStorage)
  // React.useEffect(()=>{
  //   if (brgys.length > 0 && legendItems.length > 0){
  //     console.log (brgys.length, legendItems.length)
  //     addLayerG(brgys, SLDStyle)
  //   }
  // }, [history])

  React.useEffect(()=>{
    const h = window.innerWidth >= 992 ? window.innerHeight-64  : 400
    setHeight(h)
  }, [window.innerHeight])

  // console.log(map.current)

  function printFormPopup() {
    let popupContent = 
        '<form>' + 
        'Title:<br><input type="text" id="input_name"><br>' +
        'Description:<br><input type="text" id="input_desc"><br>' +
        '<input type="button" value="Submit" id="submit">' + 
        '</form>';
    map.bindPopup(popupContent).openPopup();
}
  React.useEffect(() => {

    if (map){
      
      // setLC(L.control.layers(baseMaps).addTo(map.current))

      var customActionToPrint = function(context, mode) {
        return function() {
          // var documentTitle = window.prompt("Map Title");
          // printFormPopup();
          
          
          context._printCustom(mode);
        }
      }

      L.control.browserPrint({
        title: 'Just print me!',
        documentTitle: 'Map printed using leaflet.browser.print plugin',
        // printLayer: L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
        //                 attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        //                 subdomains: 'abcd',
        //                 minZoom: 1,
        //                 maxZoom: 16,
        //                 ext: 'png'
        //             }),
                    // printLayer: map,
        // closePopupsOnPrint: false,
        printModes: [
            // L.control.browserPrint.mode.landscape("Tabloid", "tabloid"),
            // L.control.browserPrint.mode("Alert", "User specified print action", "a4", customActionToPrint, true),
            // L.control.browserPrint.mode.landscape(),
            // "Tabloid",
            "Landscape",
            "Portrait",
            // L.control.browserPrint.mode.auto("Automatico", "B4"),
            L.control.browserPrint.mode.custom("Custom")
        ],
        // manualMode: true
    }).addTo(map.current);
    map.current.on("browser-print", function(e){
      /*on print start we already have a print map and we can create new control and add it to the print map to be able to print custom information */
      L.control.scale().addTo(e.printMap);
      L.control.rose('leaflet-rose', {position:'bottomleft', icon:'default', iSize:'medium', opacity:0.8}).addTo(e.printMap); 
    });
  

  
    
  
    
    var editableLayers = new L.FeatureGroup();
    map.current.addLayer(editableLayers);
    function createFormPopup() {
      let popupContent = 
          '<form>' + 
          'Name:<br><input type="text" id="input_name"><br>' +
          'Description:<br><input type="text" id="input_desc"><br>' +
          '<input type="button" value="Submit" id="submit">' + 
          '</form>';
      editableLayers.bindPopup(popupContent).openPopup();
    }
    var MyCustomMarker = L.Icon.extend({
        options: {
            shadowUrl: null,
            iconAnchor: new L.Point(12, 12),
            iconSize: new L.Point(24, 36),
            iconUrl: icon
        }
    });
    
    var options = {
        position: 'topleft',
        draw: {
            polyline: {
                shapeOptions: {
                    color: '#f357a1',
                    weight: 5
                }
            },
            polygon: {
                allowIntersection: false, // Restricts shapes to simple polygons
                drawError: {
                    color: '#e1e100', // Color the shape will turn when intersects
                    message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
                },
                shapeOptions: {
                    color: '#bada55'
                },
                showArea: true
            },
            circlemarker: false, // Turns off this drawing tool
            rectangle: {
                shapeOptions: {
                    clickable: false
                }
            },
            marker: {
                icon: new MyCustomMarker()
            }
        },
        edit: {
            featureGroup: editableLayers, //REQUIRED!!
            // remove: false
        }
    };
    
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
      // createFormPopup();

    });
    
    function setData(e) {

      if(e.target && e.target.id == "submit") {
  
          // Get user name and description
          let enteredUsername = document.getElementById("input_name").value;
          let enteredDescription = document.getElementById("input_desc").value;
  
          // Print user name and description
          // console.log(enteredUsername);
          // console.log(enteredDescription);
  
          // Get and print GeoJSON for each drawn layer
          editableLayers.eachLayer(function(layer) {
              let drawing = JSON.stringify(layer.toGeoJSON().geometry);
              let GeoJSONdrawing = layer.toGeoJSON().geometry;

              // console.log("stringify",drawing);
              // console.log("geojson",GeoJSONdrawing);
              // var newUser = "Des"
              GeoJSONdrawing.name = enteredUsername;
              GeoJSONdrawing.description = enteredDescription;
              // console.log("geojson2",GeoJSONdrawing);

              var layerGroup = L.geoJSON(GeoJSONdrawing, {
                onEachFeature: function (feature, layer) {
                  layer.bindPopup('<h1> name: '+feature.name+'</h1><p>description: '+feature.description+'</p>');
                }
              }).addTo(map.current);
          });
  
          // Clear drawn items layer
          editableLayers.closePopup();
          // editableLayers.clearLayers();
  
      }
      // var layerGroup = L.geoJSON(drawing, {
      //   onEachFeature: function (feature, layer) {
      //     layer.bindPopup('<h1> name: '+feature.properties.name+'</h1><p>description: '+feature.properties.description+'</p>');
      //   }
      // }).addTo(map.current);
  }
  document.addEventListener("click", setData);

  function addPopup(feature, layer) {
    layer.bindPopup(
        feature.properties.description + 
        "<br>Submitted by " + feature.properties.name
    );
  }

//   map.current.addEventListener("draw:editstart", function(e) {
//     editableLayers.closePopup();
// });
// map.current.addEventListener("draw:deletestart", function(e) {
//     editableLayers.closePopup();
// });
// map.current.addEventListener("draw:editstop", function(e) {
//     editableLayers.openPopup();
// });
// map.current.addEventListener("draw:deletestop", function(e) {
//     if(editableLayers.getLayers().length > 0) {
//         editableLayers.openPopup();
//     }
// });

      
    }
    
  }, [map])

  

  var SLDStyle = null;

  const setStyle = ()=>{
    var SLDStyle = null;
    var SLDText = null;
  //console.log("brgys = ", brgys);
    // console.log("brgys[0] = ", brgys[0], brgys.length);
    try{ // Try this
      SLDText = brgys[brgys.length-1].properties.sld_txt; // Ito ay para sa shapefiles na maraming polygons (nagging array yung brgys))
    } catch(err) { // mag eeror yung una pag hindi array yung brgys
    //console.log("Error encountered in assigning SLDText")
    };
  
    if (SLDText != "na"){  // if sld_txt is available
    // const parser = new DOMParser();
    // setXml(parser.parseFromString(SLDText, "text/xml"))
    // console.log(setXml);
      try {
        SLDStyle = new L.SLDStyler(SLDText).getStyleFunction(); //test
        return SLDStyle
      } catch (error) { // if it contains SLD for single shapefiles only
        SLDStyle = extractSingleSLD(SLDText);
        return SLDStyle
      }
    
    } else { // if sld_name doesn't exist, this will be the default SLD
      SLDStyle = {color: "black", 
      weight: 1,
      opacity: 1,
      fillColor: "white",
      fillOpacity: 0.2,
      }
      return SLDStyle
    };}

  // if (xmlText){
  //   setXml(xmlText)
  // }
  
  const addLayerG = (brgys, style) => {
    // lControl.remove()
    brgys.map((data)=>{
      // console.log(data)
      var popup = L.popup().setContent('('+data.properties.ID_3+ ') ' +data.properties.NAME_2 + ': ' + data.properties.NAME_3)
      var poly = new L.geoJSON(data, {
        style: setStyle(),
  
      }).bindPopup(popup)
  
      layerGroup.addLayer(poly)
      // poly.addTo(map.current);
      // lControl.addOverlay(poly, brgys.indexOf(data))
      // console.log(brgys.indexOf(data))
      poly = null
    })
    // console.log("Layer control: ", lControl)
    // lControl.removeLayer(layerGroup)

    lControl.addOverlay(layerGroup, brgys[brgys.length-1].properties.mtd_id)
    
    layerGroup.addTo(map.current)
    // lControl.removeLayer(layerGroup)
    
    // setBrgys([])

  }
  
  // console.log(brgys)
  return (
    <div style={{overflow: 'hidden', height: '100%'}} >
      <div id="map" style={{height: height, width: width}} >
        {map.current ? brgys.length > 0 ? addLayerG(brgys, SLDStyle)
        : null : null }
        <div id ="leaflet-rose">

        </div>
        <div id ="leaflet-rose-print">

        </div>
      </div>

    </div>
  )
}

export default ReactMap;