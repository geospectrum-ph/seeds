import React, { useEffect, useState, useContext} from 'react';
import axios from 'axios';
import L from 'leaflet';

import { MapContext } from '../../../context/MapContext';
import { FeaturesContext } from '../../../context/FeaturesContext';
import { SEEDSContext } from '../../../context/SEEDSContext';

import './index.css';
import './leaflet.markercluster-src.js'
import './MarkerCluster.css'
import './MarkerCluster.Default.css'
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import '../../../assets/Leaflet.SLD-master/leaflet.sld.js'
import '../../../assets/Leaflet.fullscreen.min.js';
import "leaflet.featuregroup.subgroup";
import '../../../assets/L.Control.Rose'
import 'leaflet.utm/L.LatLng.UTM.js'

import sld from '../../../assets/Sld-Legend/sld2legend.js'
import markerIcon from '../../../../node_modules/leaflet-draw/dist/images/marker-icon.png'

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

  var SLDJson = {
    color: "black", // default style
    weight: 1,
    opacity: 0.8,
    fillColor: "#5aff3d",
    fillOpacity: 0.3,
    dashArray: '8 5'
  };

  SLDJson.fillColor = keyextract(SLDText, 'fillColor', 'name="fill">'); // find fillColor
  SLDJson.fillOpacity = keyextract(SLDText, 'fillOpacity', 'name="fill-opacity">'); // find fillOpacity
  SLDJson.color = keyextract(SLDText, 'color', 'name="stroke">'); // find color of line
  SLDJson.weight = keyextract(SLDText, 'weight', 'name="stroke-width">'); // find stroke width
  return SLDJson; // return the sld style as json
};

function SeedsMap() {
  const { viewport, profileLoc, setProfileLoc, seedsmap, setLayerSideProperties, 
          prevLayer, setPrevLayer, prevBldgShape, setPrevBldgShape, setPrevBrgySelect } = useContext(MapContext)
  const { currentSubdomain, startDate, endDate, } = useContext(SEEDSContext)
  const { brgys, jobClassSelect, setLandUseCategory, setDiseaseSelect, setDiseaseMapperGraph, 
    setJobSelect, setJobMapperGraph, setLandUseSelect, setLandUseClassSelect, setLandUseGraph, 
    brgySelect, setBrgySelect, setCommercialSelect, setCommercialMapperGraph, setHouseholdSelect, 
    householdMin, householdMax, householdBldgShape, setHouseholdBldgShape, 
    householdBldgSelect, setHouseholdBldgSelect, setHouseholdBldgPopulation,
    housingLandUseSelected, numberStoreysMin, numberStoreysMax, materialTypeSelected, areaMax, 
    occupationSelected, professionSelected, gender, setSecondClick, secondClick,
    ageMin, ageMax, points, setLandUseColor } = useContext(FeaturesContext)

  const position = [viewport.lat, viewport.lng]
  const [clickPos, setClickPos] = useState([])
  const [brgyID, setID] = useState(null)
  const [bounds, setBounds] = useState([])
  const [lControl, setLC] = useState()
  const [layerProperties, setLayerProperties] = useState(null);
  const [hoverControl, setHC] = useState(null);

  var layerGroup = new L.featureGroup()

  var SLDStyle = null;
  var SLDText = null;

  const routeArray = [
    {
      "subdomain":"Disease Incidence",
      "route_brgy": `https://seeds.geospectrum.com.ph/healthmapper/brgy/single`, 
      "route_graph":'https://seeds.geospectrum.com.ph/healthmapper/graph', 
      "set_select":setDiseaseSelect, 
      "set_graph":setDiseaseMapperGraph,
      "class_select": [
        {"context": startDate, "param": "startdate"},
        {"context": endDate, "param": "enddate"}
        // {"context": diseaseClassSelect, "param": ""} // di pa na iimplement
      ]
    }, {
      "subdomain":"Commercial Establishments",
      "route_brgy": `https://seeds.geospectrum.com.ph/commercialmapper/brgy/single`, 
      "route_graph":'https://seeds.geospectrum.com.ph/commercialmapper/graph', 
      "set_select":setCommercialSelect, 
      "set_graph":setCommercialMapperGraph,
      "class_select": [
        {"context": startDate, "param": "startdate"},
        {"context": endDate, "param": "enddate"}
        // {"context": commercialClassSelect, "param": "com_class"} // di ginagamit?
      ]
    }, {
      "subdomain":"Existing Land Use",
      "route_brgy": `https://seeds.geospectrum.com.ph/landuse/brgy`, 
      "route_graph":'https://seeds.geospectrum.com.ph/landuse/graph', 
      "set_select":setLandUseSelect,
      "set_graph":setLandUseGraph,
      "class_select":  [] // wala talaga
    }, {
      "subdomain":"Jobs",
      "route_brgy": `https://seeds.geospectrum.com.ph/jobmapper/brgy/single`, 
      "route_graph":'https://seeds.geospectrum.com.ph/jobmapper/graph', 
      "set_select":setJobSelect,
      "set_graph":setJobMapperGraph,
      "class_select": [
        {"context": startDate, "param": "startdate"},
        {"context": endDate, "param": "enddate"},
        {"context": jobClassSelect, "param": "job_class"}
      ]
    },
  ]

  var osm = L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'})
  var cartodb = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'})
  var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {attribution:
    'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'})

  useEffect(() => {
    const fetchData = async() => {
      const res = await axios.get(`https://seeds.geospectrum.com.ph/getdata/bounds`,)
      setBounds(res.data)
    }

    const fetchDataMandaluyong = async() => {
      const res = await axios("https://seeds.geospectrum.com.ph/household/mandaGet")
      setHouseholdBldgShape(res.data)
    }
    
    fetchDataMandaluyong()
    fetchData()

    seedsmap.current = L.map('seedsmap', {
      fullscreenControl: true,
      center: [14,7423, -120.8693],
      zoom: 13,
      layers: [esri]
    });

    var rose = new L.control.rose('rose', {position:'bottomleft', icon:'default', iSize:'medium', opacity:0.8});
    rose.addTo(seedsmap.current)
  }, []);

  var bound 

  useEffect(() => {
    if (bounds.length > 0){
      var myStyle = {
        fillColor: "#ffffff",
        color: "#ffffff",
        weight: 2,
        fillOpacity: 0.1
      };
      bound = new L.geoJSON(bounds, {style: myStyle})
      bound.addTo(seedsmap.current)
    }
  }, [bounds]);

  var layerStyle = new L.featureGroup()

  useEffect(() => {
    var baseMaps = {
      "OSM": osm,
      "CartoDB": cartodb,
      "ESRI": esri
    };
    if (seedsmap){
      setLC(L.control.layers(baseMaps).addTo(seedsmap.current))
    }
  }, [seedsmap])

  var infoHoverControl = L.control({position:"bottomright"});  

  infoHoverControl.onAdd = function () {
    this._div = new L.DomUtil.create('div', 'infoHover'); // create a div with a class "info"
    this.update();
    return this._div;
  };

  // method that we will use to update the control based on feature properties passed
  infoHoverControl.update = function (props) {
    this._div.innerHTML = (props ?
      '<h4>Housing Unit SN:&nbsp;</h4>' + props.BLDG_ID + "<br/><br/>" +
      '<h4>Area:&nbsp;</h4>' +  roundToTwo(Number(props.IMP_AREA)) + " m<sup>2</sup>" + "<br/><br/>" +
      '<h4>Address:&nbsp;</h4>' +  props.FULL_ADD + "<br/><br/>" +
      '<h4>No. of Storeys:&nbsp;</h4>' +  props.NO_OF_FLRS + "<br/><br/>" +
      '<h4>Land Use:&nbsp;</h4>' +  props.ACT_USED + "<br/><br/>"
      : 
      'Hover over a building'
    );
  };

  function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
  }

  useEffect(() => { 
    // console.log("208: " + brgySelect)
    if (brgySelect) {
      var landUses = null;
      var popup = new L.popup().setContent('Details')

      if (brgySelect['values']) {
        landUses = brgySelect['values']
        try { // Try this
          SLDText = landUses[0].properties.sld_txt
        } catch(err) { // mag eeror yung una pag hindi array yung brgys
          
        };
        if (SLDText != "na"){  // if sld_txt is available
          let sldEme = sld(SLDText).then((out) => { 
            setLandUseColor(out)
          }) // used to get sldStyles and store it in context
          try {
            SLDStyle = new L.SLDStyler(SLDText).getStyleFunction(); //test
          } catch (error) { // if it contains SLD for single shapefiles only
            SLDStyle = extractSingleSLD(SLDText);
          }
        }
        for (var i in brgySelect['values']) {
          var itemData = brgySelect['values'][i]
          var poly = new L.geoJSON(itemData, {
            style: SLDStyle, 
          }).bindPopup(popup)
          layerStyle.addLayer(poly)
          setPrevLayer(layerStyle) // this is used to remove previously selected barangay

          layerStyle.addTo(seedsmap.current)
          seedsmap.current.flyToBounds(poly.getBounds());

          if (prevLayer) {
            if (seedsmap.current.hasLayer(prevLayer)) {
              seedsmap.current.removeLayer(prevLayer)
            } 
          }
        }
      } else {
        try { // Try this
          SLDText = brgys[0].properties.sld_txt;
        } catch(err) { // mag eeror yung una pag hindi array yung brgys
        };
        if (SLDText !== "na"){  // if sld_txt is available
          try {
            SLDStyle = new L.SLDStyler(SLDText).getStyleFunction(); //test
          } catch (error) { // if it contains SLD for single shapefiles only
            SLDStyle = extractSingleSLD(SLDText);
          }
        } 
        var poly = new L.geoJSON(brgySelect, {
          style: SLDStyle,
        }).bindPopup(popup)
        layerStyle.addLayer(poly)
        setPrevLayer(layerStyle)
        layerStyle.addTo(seedsmap.current)

        if (prevLayer) {
          if (seedsmap.current.hasLayer(prevLayer)) {
            seedsmap.current.removeLayer(prevLayer)
          }
        }
        if (currentSubdomain && currentSubdomain.replace(/\s+/g, "") === "HouseholdSurveys"){
          var poly 
          // for drawing bldg shapefile
          // console.log(householdBldgSelect)
          if (householdBldgSelect ) {
            poly = new L.geoJSON(householdBldgSelect, {
              style: {fillColor: 'red', fillOpacity: 0.95},
            }).bindPopup(popup)
            layerStyle.addLayer(poly)
            setPrevLayer(layerStyle)
            layerStyle.addTo(seedsmap.current)
            seedsmap.current.flyToBounds(poly.getBounds())
          } else { // kapag nagclick sa map/ nagselect gamit dropdown ng normal
            poly = new L.geoJSON(brgySelect, {
              style: SLDStyle,
            }).bindPopup(popup)
            layerStyle.addLayer(poly)
            setPrevLayer(layerStyle)
            layerStyle.addTo(seedsmap.current)
            seedsmap.current.flyToBounds(poly.getBounds())
          }
          setPrevBrgySelect(brgySelect)          
        } else  {
          seedsmap.current.flyToBounds(poly.getBounds(), {animate: true})
        } 
      }
    } 
    else {
      if (prevLayer) {
        if (seedsmap.current.hasLayer(prevLayer)) {
          seedsmap.current.removeLayer(prevLayer)
        }
      }
    }
  }, [profileLoc, brgySelect, householdBldgSelect, currentSubdomain])

  // pindot query
  useEffect(() => {
    if (seedsmap.current){
      seedsmap.current.on('click', function(e) {
        setClickPos([e.latlng.lng, e.latlng.lat])
      })
    }
  }, [clickPos]) // removed clickPos here to prevent unwanted fetching on second to succeeding clicks :)

  useEffect(() => {
    if (clickPos){
      const fetchData = async() => {
        const get_brgyID = await axios.get(`https://seeds.geospectrum.com.ph/barangay/findBarangay`, {
          params: {
            lat: clickPos[1], 
            long: clickPos[0]
          }
        });
        // console.log("325: ", get_brgyID.data)
        if (get_brgyID && profileLoc && get_brgyID.data[0]) { // for 2nd click,  && get_brgyID.data[0] this is needed para kapag lumipat sa ibang profile, hindi mag eerror.
          // console.log("327: ", get_brgyID.data[0]["properties"].brgy_name, profileLoc)
          if (get_brgyID.data[0]["properties"].BARANGAY === profileLoc) {
            // console.log("papasok dito")
            setSecondClick(true)
            const res = await axios.get(`https://seeds.geospectrum.com.ph/household/click`,  {
              params: {
                lat: clickPos[1], 
                long: clickPos[0]
              }
            });
            // console.log(res)
            if (res.data.Household_Population) {
              setHouseholdBldgPopulation(res.data.Household_Population.map((x)=>{ 
                x['id'] = x._id
                return x
              }));
            }
          } else {setSecondClick(false)}
        }
        setID(get_brgyID.data)
        setLandUseCategory(null)
        setLandUseClassSelect(null);
      }
      fetchData();
    }
  }, [clickPos])

  useEffect(() => {
    if (currentSubdomain && currentSubdomain.replace(/\s+/g, "") !== "HouseholdSurveys" && brgyID) { 
      var current_subdomain = routeArray.filter((items) => {
        return items.subdomain.replace(/\s+/g, "") === currentSubdomain.replace(/\s+/g, "")
      })[0]

      var c = 0 // counter
      var subdomain_route_brgy = current_subdomain.route_brgy
      var subdomain_route_graph = current_subdomain.route_graph
      var subdomain_set_brgy = current_subdomain.set_select
      var subdomain_set_graph = current_subdomain.set_graph
      var subdomain_class_select = current_subdomain.class_select
      var formData = {brgy_id: brgyID[0].properties.brgy_id}
      if (subdomain_class_select.length > 0) {
        subdomain_class_select.forEach((item) => {
          formData[item.param] = item.context // appends parameter to be passed in the backend route
          c += 1 
        })
      }

      setProfileLoc(brgyID[0].properties.brgy_name)
      const fetchData = async() => {
        const res = await axios(subdomain_route_brgy, {params: formData});
        subdomain_set_brgy(res.data) //landUseSelect
        setBrgySelect(res.data) // for maps

        const res_graph = await axios(subdomain_route_graph, {params: formData});
        if (res_graph.data.hasOwnProperty('values')) {
          subdomain_set_graph(res_graph.data.values)
        } else {
          subdomain_set_graph(res_graph.data)
        }
      }

      if (c === subdomain_class_select.length){
        fetchData()
      }
    } else if (currentSubdomain.replace(/\s+/g, "") === "Household Surveys".replace(/\s+/g, "" ) && brgyID) {
      setProfileLoc(brgyID[0].properties.brgy_name)
      
      const fetchData = async() => {
        const res_brgy_only = await axios("https://seeds.geospectrum.com.ph/barangay",
          {params: {brgy_name:brgyID[0].properties.brgy_name}});
        setBrgySelect(res_brgy_only.data[0])
        setHouseholdSelect(res_brgy_only.data[0])

        const res = await axios("https://seeds.geospectrum.com.ph/household/get", {
          params: {
            brgy_id: brgyID[0].properties.brgy_name,
            no_members_min: householdMin,
            no_members_max: householdMax,
            area_max: areaMax,
            land_use: housingLandUseSelected,
            number_of_storeys_min: numberStoreysMin,
            number_of_storeys_max: numberStoreysMax,
            type_of_material: materialTypeSelected,
            occupation: occupationSelected,
            profession: professionSelected,
            gender: gender,
            age_min: ageMin,
            age_max: ageMax,
          }
        }).then(function(res) {
          if (res) {
            // setHouseholdBldgShape(res.data.Household_Shape)
            if (secondClick === false) {
              setHouseholdBldgPopulation(res.data.Household_Population.map((x)=>{
                x['id'] = x._id
                return x
              }));
            }
          }
        }) // yung Household_Shape shape lang yung kinukuha sa map!
      }
      fetchData(); 
    }    
  }, [brgyID,currentSubdomain, householdMin, householdMax, areaMax, housingLandUseSelected, 
    numberStoreysMin, numberStoreysMax, materialTypeSelected, occupationSelected, professionSelected, gender, 
    secondClick, ageMin, ageMax])

  useEffect(() => {
    setHC(infoHoverControl.addTo(seedsmap.current))
  }, [])

  useEffect(() => {
    if (hoverControl) {
      if (layerProperties) {
        hoverControl.update(layerProperties)
      } 
      else {
        hoverControl.update()
      }
    }
  }, [hoverControl, layerProperties])

  useEffect(() => {
    if (points && currentSubdomain.replace(/\s+/g, "") === 'Disease Incidence'.replace(/\s+/g, "")){
      if (lControl){// 1 Define markerClusterGroup
        var markerCluster = new L.markerClusterGroup();
        points.map((p)=>{
          var geoJsonLayer = L.marker([p.geometry.coordinates[1], p.geometry.coordinates[0]], {
            icon: L.icon({
              iconAnchor: [0, 0],
              popupAnchor: [0, 0],
              iconUrl: markerIcon
            })
          }).bindPopup("Lat: " + p.geometry.coordinates[0] + ', Long: ' + p.geometry.coordinates[1]+ '<br>' +
            p.properties.disease + ': ' + p.properties.status);
          markerCluster.addLayer(geoJsonLayer)
        })
        markerCluster.on('mouseover',function(ev) {
          ev.target.openPopup();
        })
        lControl.addOverlay(markerCluster, "Markers")
        markerCluster.addTo(seedsmap.current)
      }
    } else {
      layerGroup.eachLayer(function (l) {
        layerGroup.removeLayer(l)
      })
      seedsmap.current.addLayer(osm)
    }
  }, [currentSubdomain, lControl, points]);  

  // load hover
  useEffect(()=>{
    if (currentSubdomain && currentSubdomain.replace(/\s+/g, "") === "HouseholdSurveys") {
      var allBldgs = new L.markerClusterGroup();
      if (householdBldgShape.length > 0) {
        var bldg;
        
        function highlightFeature(e) {
          var layer = e.target;
          layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7,
            fillColor: "red",
          });
          if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
          }
          setLayerProperties(layer.feature.properties)
        }
        
        function resetHighlight(e) {
          bldg.resetStyle(e.target);
          setLayerProperties(null)
        } 
      
        function zoomToFeature(e) {
          setHouseholdBldgSelect(e.target.feature.geometry)
          setLayerSideProperties(e.target.feature.properties)
        }      

        function onEachFeature(feature, layer) {
          layer.on({
            click: zoomToFeature,
            mouseover: highlightFeature,
            mouseout: resetHighlight,
          });
        }

        bldg = new L.geoJson(householdBldgShape, {
          onEachFeature: onEachFeature
        })
        bldg.addTo(seedsmap.current)
        setPrevBldgShape(bldg) 
        if (prevBldgShape) { // needed to display correct bldg
          if (seedsmap.current.hasLayer(prevBldgShape)) {
            seedsmap.current.removeLayer(prevBldgShape)
          } 
        }
        allBldgs.addLayer(bldg)
      }
    }
  }, [currentSubdomain, householdBldgShape])

  return (
    <div>
      <div id="seedsmap" >       
        <div id ="rose">
        </div>
      </div>
    </div>
  )
}

export default SeedsMap;