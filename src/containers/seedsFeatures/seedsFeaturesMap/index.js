import React from 'react';
import axios from 'axios';
import L, { map } from 'leaflet';
import { MapContext } from '../../../context/MapContext';
import { FeaturesContext } from '../../../context/FeaturesContext';
import { SEEDSContext } from '../../../context/SEEDSContext';
import { ToggleButton, ToggleButtonGroup} from '@material-ui/lab';
import RoomIcon from '@material-ui/icons/Room';

import './index.css';
import './leaflet.markercluster-src.js'
import './MarkerCluster.css'
import './MarkerCluster.Default.css'
import { Divider, Toolbar, Grid, Typography, makeStyles} from '@material-ui/core/'
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import '../../../assets/Leaflet.SLD-master/leaflet.sld.js'
// import '../../../assets/leaflet.fullscreen.css';
import '../../../assets/Leaflet.fullscreen.min.js';

import { GeoSearchControl, OpenStreetMapProvider, EsriProvider } from 'leaflet-geosearch';
import "leaflet.featuregroup.subgroup";
// import 'leaflet.markercluster.js';
// import 'leaflet.markercluster/dist/leaflet.markercluster.js';
// import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
// import 'leaflet.markercluster/dist/MarkerCluster.css';
import shadow from "leaflet/dist/images/marker-shadow.png"
import { PieChart, Pie, Legend, Tooltip } from 'recharts';
import seedIcon from '../../../assets/seedMark.png'
import '../../../assets/L.Control.Rose'

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
    fillColor: "#5aff3d",
    fillOpacity: 0.8,
    dashArray: '8 5',};
    SLDJson.fillColor = keyextract(SLDText, 'fillColor', 'name="fill">'); // find fillColor
    SLDJson.fillOpacity = keyextract(SLDText, 'fillOpacity', 'name="fill-opacity">'); // find fillOpacity
    SLDJson.color = keyextract(SLDText, 'color', 'name="stroke">'); // find color of line
    SLDJson.weight = keyextract(SLDText, 'weight', 'name="stroke-width">'); // find stroke width
    return SLDJson; // return the sld style as json
  };

function SeedsMap(props) {
  const { closePopups,mapReference, viewport, shapefile, basemap, checked, healthLoc, setHealthLoc, seedPage, setSeedPage, toggleOn} = React.useContext(MapContext)
  const {points} = React.useContext(SEEDSContext)
  const { brgys, setBrgys, bldgs, setBldgs, cities, setCities, healthSelect, landUseSelect, setHealthSelect, setHealthMapperGraph, 
    setJobSelect, setJobMapperGraph, setLandUseSelect, setLandUseGraph} = React.useContext(FeaturesContext)
  const position = [viewport.lat, viewport.lng]
  const [clickPos, setClickPos] = React.useState([])
  const [mapPos, setMapPos] = React.useState()
  const [brgyID, setID] = React.useState(null)
  const [poly, setPoly] = React.useState()
  const [bounds, setBounds] = React.useState()
  const [lControl, setLC] = React.useState()
  var layerGroup = L.featureGroup()
  
  const seedMark = L.icon({
    iconUrl: seedIcon,
    shadowUrl: shadow,
    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [16, 79],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


  const seedsmap = React.useRef(null);

  var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'})
  var stadia =  L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {attribution:
      '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'})
  var cartodb = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'})
  var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {attribution:
      'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'})
  
  

  React.useEffect(() => {
    // create map
    const fetchData = async() => {
      const res = await axios.get(`http://ec2-52-55-74-109.compute-1.amazonaws.com/barangay/`,)
      setBounds(res.data)
    }
    fetchData()
    seedsmap.current = L.map('seedsmap', {
      fullscreenControl: true,
      center: position,
      zoom: 13,
      layers: [
        osm
      ]
    });
    if (bounds){
      var bound = new L.geoJSON(bounds, )
      bound.addTo(seedsmap.current)
    }
    
    var scale = L.control.scale().addTo(seedsmap.current);
    var rose = L.control.rose('rose', {position:'bottomleft', icon:'default', iSize:'medium', opacity:0.8});

    rose.addTo(seedsmap.current)

  }, []);

  // React.useEffect(() => {
  //   layerGroup.clearLayers()
  //   if (bounds){
  //     var bound = new L.geoJSON(bounds, )
  //     bound.addTo(seedsmap.current)
  //   }
  // }, [healthSelect])

  
  React.useEffect(() => {
    var baseMaps = {
      "OSM": osm,
      // "Stadia": stadia,
      "CartoDB": cartodb,
      "ESRI": esri
    };
    
    if (seedsmap){
      setLC(L.control.layers(baseMaps).addTo(seedsmap.current))

    }

  }, [seedsmap])

  var SLDStyle = null;
  var SLDText = null;
  // console.log("brgys = ", brgys);
  // console.log("brgys[0] = ", brgys[0]);
  try{ // Try this
    SLDText = brgys[0].properties.sld_txt; // Ito ay para sa shapefiles na maraming polygons (nagging array yung brgys)
    // console.log("SLDText", SLDText)

  } catch(err) { // mag eeror yung una pag hindi array yung brgys
    // console.log("Error encountered in assigning SLDText")
 };
  //console.log("SLDStyle= ", SLDStyle);

  if (SLDText != "na"){  // if sld_txt is available
    
    try {
      SLDStyle = new L.SLDStyler(SLDText).getStyleFunction(); //test
    } catch (error) { // if it contains SLD for single shapefiles only
      SLDStyle = extractSingleSLD(SLDText);
    }
    
  } else { // if sld_name doesn't exist, this will be the default SLD
    SLDStyle = {color: "yellow", 
    weight: 1,
    opacity: 0.5,
    fillColor: "yellow",
    fillOpacity: 0.5,
    dashArray: '8 5',}
  };

  const addLayer = (data, style) => {
    // if (healthSelect){
    //   setHealthLoc(healthSelect.properties.brgy_name)
    // }
    seedsmap.current.eachLayer(function (l) {
      if (l.feature){
        seedsmap.current.removeLayer(l)
      }
    })
    var popup = L.popup().setContent('Details')
    var poly = L.geoJSON(data, {
      style: style
    }).bindPopup(popup)
    //poly.addTo(seedsmap.current);
    layerGroup.addLayer(poly)
    layerGroup.addTo(seedsmap.current)
    if (bounds){
      var bound = new L.geoJSON(bounds, )
      bound.addTo(seedsmap.current)
    }

    seedsmap.current.flyToBounds(poly.getBounds(), {animate: true})
  }

  React.useEffect(() => {
    if (seedsmap.current){
      seedsmap.current.on('click', function(e) {
        // alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
        // layerGroup.removeLayers(poly)
        setClickPos([e.latlng.lng, e.latlng.lat])
      })
    }
  }, [clickPos])

  React.useEffect(() => {
    if (clickPos){
      const fetchData = async() => {
        const get_brgyID = await axios.get(`http://ec2-52-55-74-109.compute-1.amazonaws.com/barangay/findBarangay`,
        {params: {lat: clickPos[1], long: clickPos[0]}} );
        
        setID(get_brgyID.data)
      }
      
      fetchData();
    }
  }, [clickPos])

  React.useEffect(() => {
    if(brgyID){
      // console.log(brgyID)
      setHealthLoc(brgyID[0].properties.brgy_id)
      const fetchData = async() => {
        const res = await axios.get(`http://ec2-52-55-74-109.compute-1.amazonaws.com/healthmapper/brgy/single`,
        {params: {brgy_id: brgyID[0].properties.brgy_id}} );
        setMapPos(res.data)
        setHealthSelect(res.data)
        // console.log(res.data)
        const res_graph = await axios.get('http://ec2-52-55-74-109.compute-1.amazonaws.com/healthmapper/graph',
        {params: {brgy_id: brgyID[0].properties.brgy_id}} );
        setHealthMapperGraph(res_graph.data.values)

        const res_job = await axios.get('http://ec2-52-55-74-109.compute-1.amazonaws.com/jobmapper/brgy/single',
        {params: {brgy_id: brgyID[0].properties.brgy_id}} );
        setJobSelect(res_job.data)

        const res_job_graph = await axios.get('http://ec2-52-55-74-109.compute-1.amazonaws.com/jobmapper/graph',
        {params: {brgy_id: brgyID[0].properties.brgy_id}} );
        setJobMapperGraph(res_job_graph.data.values)

        const res_land_use = await axios(`http://ec2-52-55-74-109.compute-1.amazonaws.com/landuse/brgy`,
        {params: {brgy_id: brgyID[0].properties.brgy_id}});
        setLandUseSelect(res_land_use.data)

        const res_land_use_graph = await axios('http://ec2-52-55-74-109.compute-1.amazonaws.com/landuse/graph',
        {params: {brgy_id: brgyID[0].properties.brgy_id}} );
        setLandUseGraph(res_land_use_graph.data)
      }

      fetchData();
    }
  }, [brgyID])

  React.useEffect(() => {
    if (mapPos){
      // setHealthLoc(mapPos.properties.brgy_name)
      // setHealthSelect(mapPos)
    }
  }, [mapPos])
  // console.log(healthLoc)
  // React.useEffect(()=> {
  //   if (healthSelect){
  //     var poly = L.geoJSON(healthSelect, {
  //       style: function (feature) {
  //         return {color: SLDStyle};
  //     }}).bindPopup(function (layer) {
  //       return layer.feature.properties.brgy;
  //     })
  //   }
  //   if (poly){
  //     seedsmap.current.fitBounds(poly.getBounds(), {duration: 1})
  //   }
  // }, [healthSelect])

  // return (
  //   <div >

  //     <div id="seedsmap">
  //       {seedsmap.current ? healthSelect ? 
  //         addLayer(healthSelect, SLDStyle)
  //       : brgys? brgys.map((brgy)=>
  //       addLayer(brgy, SLDStyle)): null:null}
  //     </div>
  //   </div>
  // )

  // FOR LAND USE
  React.useEffect(() => {
    if (landUseSelect){
      var landUses = landUseSelect.values

      // const landUseStyle = () => {
      //   var SLDStyle = null;
      //   var SLDText = null;

      //   try {
      //     SLDText = landUses[0].properties.sld_txt;
      //     console.log("SLDTECT", SLDText)
      //   } catch (error) {
      //     console.log("ERROR:", error)
      //   }

      //   try {
      //     SLDStyle = new L.SLDStyler(SLDText).getStyleFunction();
      //     console.log("SLDSTyle", SLDStyle)
      //     return SLDStyle
      //   } catch (error) {
      //     console.log("ERROR:", error)
      //   }
      // }

      var SLDStyle = null;

      const setStyle = ()=>{
        var SLDStyle = null;
        var SLDText = null;

        try{ // Try this
          SLDText = landUses[0].properties.sld_txt; // Ito ay para sa shapefiles na maraming polygons (nagging array yung brgys))
          // console.log(SLDText)
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
          } catch (error) {
            return
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

      landUses.map(element => {
        L.geoJSON(element, {
          style: setStyle(),
        }).bindPopup(element.properties.land_use).addTo(seedsmap.current);
      });
    }
  }, [landUseSelect])

  // console.log(lControl)
  React.useEffect(() => {
    if (seedPage === 'Health'){
      if (points && lControl){// 1 Define markerClusterGroup
        var markerCluster = L.markerClusterGroup(),
        mySubGroup = L.featureGroup.subGroup(markerCluster);
        mySubGroup.addTo(map.current);

        document.getElementById("add").addEventListener("click", function () {
          map.addLayer(markerCluster);
        });
        
        document.getElementById("remove").addEventListener("click", function () {
          map.removeLayer(markerCluster);
        }); 
        
        // console.log("POUNT", points[1])
        points.map((p)=>{
          var geoJsonLayer = L.marker([p.geometry.coordinates[1], p.geometry.coordinates[0]], {icon: seedMark}).
          bindPopup("Lat: " + p.geometry.coordinates[0] + ', Long: ' + p.geometry.coordinates[1]+ '<br>' +
            p.properties.disease + ': ' + p.properties.status);
          markerCluster.addLayer(geoJsonLayer)
        })
        
  
        markerCluster.on('mouseover',function(ev) {
          ev.target.openPopup();
        })
        lControl.addOverlay(markerCluster, "Markers")
        markerCluster.addTo(seedsmap.current)
        
      }
      var bound = new L.geoJSON(bounds, )
      bound.addTo(seedsmap.current)
    }
    // else if (seedPage === 'Land Use'){
    //   console.log("this seedpage", seedPage)
    //   console.log("and this is land use", landUseSelect)
      
    //   layerGroup.eachLayer(function (l) {
    //     layerGroup.removeLayer(l)
    //   })
    //   seedsmap.current.addLayer(osm)
    //   var bound = new L.geoJSON(bounds, )
    //   console.log("eto si bound", bound)
      
    //   bound.addTo(seedsmap.current)
    // }
    else {
      layerGroup.eachLayer(function (l) {
        layerGroup.removeLayer(l)
      })
      seedsmap.current.addLayer(osm)
      var bound = new L.geoJSON(bounds, )
      bound.addTo(seedsmap.current)
    }
  
  }, [seedPage, clickPos]);  
  
  //TRIAL 1: WORKING ONLY AFTER TOGGLE ON, BUT NOT TOGGLE OFF
  // React.useEffect(() => {
  //   if (seedPage === 'Health' ){
  //     // if (points ){// 1 Define markerClusterGroup
  //     //   var markerCluster = L.markerClusterGroup(); 

  
  //     //   points.map((p)=>{
  //     //     var geoJsonLayer = L.marker([p.geometry.coordinates[1], p.geometry.coordinates[0]], {icon: seedMark}).
  //     //     bindPopup("Lat: " + p.geometry.coordinates[0] + ', Long: ' + p.geometry.coordinates[1]+ '<br>' +
  //     //       p.properties.disease + ': ' + p.properties.status);
  //     //     markerCluster.addLayer(geoJsonLayer)
  //     //   })
        
  
  //     //   markerCluster.on('mouseover',function(ev) {
  //     //     ev.target.openPopup();
  //     //   })
  
  //     //   markerCluster.addTo(seedsmap.current)
  //     // }
  //     if (points) {
        
  
  //     if (toggleOn===true){
  //       var markerCluster = L.markerClusterGroup(); 
  //       points.map((p)=>{
  //         var geoJsonLayer = L.marker([p.geometry.coordinates[1], p.geometry.coordinates[0]], {icon: seedMark}).
  //         bindPopup("Lat: " + p.geometry.coordinates[0] + ', Long: ' + p.geometry.coordinates[1]+ '<br>' +
  //           p.properties.disease + ': ' + p.properties.status);
  //         markerCluster.addLayer(geoJsonLayer)
  //       })
  //       markerCluster.on('mouseover',function(ev) {
  //         ev.target.openPopup();
  //       })
  //       console.log("Health-Points")
  //       markerCluster.addTo(seedsmap.current)

  //       console.log("Health-Points-True")
  //     } else if (toggleOn===false){
  //       console.log("Health-Points-False")
  //     }
  //   }
  //     var bound = new L.geoJSON(bounds, )
  //     bound.addTo(seedsmap.current)
  //   }
  //   // else {
  //   //   layerGroup.eachLayer(function (l) {
  //   //     layerGroup.removeLayer(l)
  //   //   })
  //   //   seedsmap.current.addLayer(osm)
  //   //   var bound = new L.geoJSON(bounds, )
  //   //   bound.addTo(seedsmap.current)
  //   // }
  
  // }, [seedPage, clickPos]); 

  // document.getElementById("add").addEventListener("click", function () {
  //   map.addLayer(parent);
  // });
  
  // document.getElementById("remove").addEventListener("click", function () {
  //   map.removeLayer(parent);
  // });
  return (
   
    <div>
      <div id="seedsmap" 
      // style={{position:"absolute", zIndex:2}}
      >
        {seedsmap.current ? healthSelect ? 
          addLayer(healthSelect, SLDStyle)
        :null: null}
      <div id ="rose">

      </div>
      
      </div>
      {/* <input id="add" type="button" value="Add MarkerClusterGroup to Map" /> */}
        
      {/* <div id="add">
      <Tooltip placement="top" title="Show marker">
              <ToggleButton  size="small" aria-label="add"  id="add">
                <RoomIcon />
              </ToggleButton>
            </Tooltip>
            </div> */}
      {/* <input id="remove" type="button" value="Remove MarkerClusterGroup from Map" />     */}
      </div>
  )
}

export default SeedsMap;