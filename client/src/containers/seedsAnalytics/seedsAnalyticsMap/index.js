import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import L from 'leaflet';
import $ from 'jquery';

import './index.css';

import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import "leaflet.featuregroup.subgroup";

import '../../../assets/Leaflet.SLD-master/leaflet.sld.js'
import '../../../assets/Leaflet.fullscreen.min.js';
import '../../../assets/L.Control.Rose'

import { AnalyticsContext } from '../../../context/AnalyticsContext';

var legend
function AnalyticsMap() {
  const {centroids, mapBrgys, analyticsMapping, analyticsmap, setTemporalLegend } = useContext(AnalyticsContext)

  var cities;
  
  // get the sample data using jquery getJSON function 
  // The getJSON() method is used to get JSON data
  var osm = L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  })
  
  var group = new L.FeatureGroup()

  function processData(data) {
    // First, initialize the variables to hold the timestamps and min/max population values
    
    var	minCircle = Infinity; // for the min, begin with the largest possible value - infinity
    var	maxCircle = -Infinity;// for the max, begin with the smallest possible value - negative infinity
    var	min = Infinity; // for the min, begin with the largest possible value - infinity
    var	max = -Infinity;

    // Note data is the variable name in the function definition - processData(data)
    var colorArray = []
    var circleArray = []

    for (var feature in data) {
      var properties = data[feature].properties;
      for (var attribute in properties) {
        if ( attribute != 'brgy_id' && attribute != 'brgy_name' ) {
          if (attribute === analyticsMapping[0]["layerName"] ) {
            colorArray.push(properties[attribute])
            if ( properties[attribute] < min ) {
              min = properties[attribute]
            } if ( properties[attribute] > max ) {
              max = properties[attribute]
            } 
          } else if (attribute === analyticsMapping[1]["layerName"]) {
            circleArray.push(properties[attribute])
            if ( properties[attribute] < minCircle ) {
              minCircle = properties[attribute]
            } if ( properties[attribute] > maxCircle ) {
              maxCircle = properties[attribute]
            }
          }
        }
      }
    }

    return { // the function finally returns the timestamps array, the min and max of population data
      minCircle : minCircle, // minCircle, maxCircle: radius ng circle
      maxCircle : maxCircle,
      min : min, // min, max: choropleth
      max : max,
      colorArray: colorArray, // array na naglalaman ng min, max
      circleArray: circleArray // array na naglalaman ng minCircle, maxCircle
    }
  }

  // The function to draw the proportional symbols
  function getColor(d, max, min) { // array, max, min
    var interval = (max-min)/7

    return (d-min)/interval > 7 ? '#800026' :
            (d-min)/interval > 6  ? '#BD0026' :
            (d-min)/interval > 5  ? '#E31A1C' :
            (d-min)/interval > 4  ? '#FC4E2A' :
            (d-min)/interval > 3   ? '#FD8D3C' :
            (d-min)/interval > 2   ? '#FEB24C' :
            (d-min)/interval > 1   ? '#FED976' :
            '#FFEDA0';
  }

  function createPropSymbols(data) {
    for (var feature in data) {
      var locGeom = data[feature].geometry
      cities = L.geoJSON(locGeom, {
        fillColor:getColor(info.colorArray[feature], info.max, info.min), 
      })
      group.addLayer(cities)
      group.addTo(analyticsmap.current)
    }
  }
  
  function createCircleSymbols(data) {
    for (var feature in data) {
      var locGeom = data[feature].geometry
      var radius = calcPropRadius(info.circleArray[feature],info.minCircle, info.maxCircle) 

      cities = L.geoJSON(locGeom, {
        pointToLayer: function(feature, latlng) {
          return L.circle(latlng, {
            fillColor: 'rgba(27, 121, 142, .6)',  // fill color of the circles
            color: 'rgba(27, 121, 142, .6)',      // border color of the circles
            weight: 2,             // circle line weight in pixels
            fillOpacity: 0.5,       // fill opacity (0-1)
            radius: radius
          }).on({
            mouseover: function(e) {
              this.openPopup();
              this.setStyle({fillColor: '#5aff3d'});  // fill color turns green when mouseover
            }, mouseout: function(e) {
              this.closePopup();
              this.setStyle({fillColor: 'rgba(27, 121, 142, .6)'});  // fill turns original color when mouseout
            }
          });
        }
      })
      group.addLayer(cities)
      group.addTo(analyticsmap.current)
    }
  }
   
  // calculate the radius of the proportional symbols based on area
  function calcPropRadius(attributeValue, min, max) {
    const lat = analyticsmap.current.getCenter().lat
    var zoom = 12
    // Source: https://stackoverflow.com/questions/22467177/draw-a-circle-of-constant-size-for-all-zoom-levels-leaflet-js
    const metersPerPixel = 156543.03392 * Math.cos(lat * Math.PI / 180) / Math.pow(2, zoom) 
    
    // the scale factor is used to scale the values; the units of the radius are in meters
    var area = metersPerPixel *7*(((attributeValue-min))/((max-min))) + 100;   
    // if area is NaN source: https://stackoverflow.com/questions/2652319/how-do-you-check-that-a-number-is-nan-in-javascript
    if (area !== area){ 
      return 0
    }
    return area
  }

  function createLegend(min, max) {
    var interval = (max-min)/7
    var colorLimits = []
    for (var i=0; i<8; i++) {
      var col = min + interval*i
      col = roundNumber(col)
      if (i != 0) {
        col = "<"+col.toString()
      } else {
        col = ">"+col.toString()
      } colorLimits.push(col)
    } if (min < 10) {	
      min = 10; 
    }

    function roundNumber(inNumber) {
      return (Math.round(inNumber));  
    }  

    if (legend instanceof L.Control) { 
      analyticsmap.current.removeControl(legend); 
    }

    legend = L.control( { position: 'bottomright', backgroundColor: '#bebebe', color: '#bebebe'} );

    legend.onAdd = function() {
      
      var legendContainer = L.DomUtil.create("div", "legend");  
      var symbolsContainer1 = L.DomUtil.create("div", "symbolsContainer1");
      var symbolsContainer2 = L.DomUtil.create("div", "symbolsContainer2");

      var classes = [info.minCircle,info.maxCircle]; 
      var color = ['#800026', '#BD0026', '#E31A1C', '#FC4E2A', '#FD8D3C', '#FEB24C', '#FED976', '#FFEDA0']
      var color2 = colorLimits
      
      var legendCircle;  
      var legendColor;
      var lastRadius = 0;
      var currentRadius;
      var margin;
  
      L.DomEvent.addListener(legendContainer, 'mousedown', function(e) { 
        L.DomEvent.stopPropagation(e); 
      });  

      $(legendContainer).append("<h3 id='legendTitle'>Legend</h3>");
      $(legendContainer).append(`<h4 id='legendTitle'>${analyticsMapping[1].column_name}</h4>`.replace(/_/g, ' '));
      
      for (var i = 0; i <= classes.length-1; i++) {  
        legendCircle = L.DomUtil.create("div", "legendCircle");  
        currentRadius = 7*i*2+5
        margin = -currentRadius - lastRadius ;

        $(legendCircle).attr("style", "width: " + currentRadius*2 + 
          "px; height: " + currentRadius*2 + 
          "px; margin-left: " + margin + "px" );
  
        $(legendCircle).append("<span class='legendValue'>"+classes[i]+"</span>");
        $(symbolsContainer1).append(legendCircle);
  
        lastRadius = currentRadius;
      }

      $(legendContainer).append(symbolsContainer1); 

      for (var i = 0; i <= color.length-1; i++) {  
  
        legendColor = L.DomUtil.create("div", "legendColor");  
        currentRadius = calcPropRadius(classes[i]);
        margin = -currentRadius - lastRadius - 2;
  
        $(legendColor).attr("style", " width: " + 20 + 
          "px; height: " + 20 + "px;" 
          + "background-color: " + color[i] +"80");				

        $(legendColor)
          .append("<span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='legendValueText'>"
          +color2[color2.length-i-1]+"</span>");
        $(symbolsContainer2).append(legendColor);

      }

      $(legendContainer).append(`<br><br><h4 id='legendTitle'>${analyticsMapping[0].column_name}</h4>`.replace(/_/g, ' '));
      $(legendContainer).append(symbolsContainer2); 
  
      return legendContainer; 
    };
    setTemporalLegend(legend.addTo(analyticsmap.current))
  } // end createLegend();

  var bound

  useEffect(() => {
    if (analyticsmap.current === undefined || analyticsmap.current === null) { 
      analyticsmap.current = L.map('analyticsmap', {
        center: [14.5832, 121.0409],
        zoom: 14,
        layers: [
          osm
        ]
      });
    } else {
      analyticsmap.current = L.map('analyticsmap', {
        center: [14.5832, 121.0409],
        zoom: 14,      
        layers: [
          osm
        ],
      });
    }
    const northArrow = L.control.rose('leaflet-rose', {
      position:'bottomleft', icon:'default', iSize:'medium', opacity:0.8
    });
    northArrow.addTo(analyticsmap.current); 
  }, [])

  useEffect(() => {
    var myStyle = {
      "fillColor": "#ffffff",
      "color": "#0d3c47",
      "weight": 1,
      "opacity": 0.65
    };
    const fetchData = async() => {
      const res = await axios.get(`http://ec2-52-90-134-187.compute-1.amazonaws.com/getdata/bounds`,)
      if (res.data){
        bound = new L.geoJSON(res.data, {style: myStyle})
        bound.addTo(analyticsmap.current)
      }
    }
    fetchData()
  }, []);

  var info = processData(mapBrgys); 

  useEffect(()=>{
    analyticsmap.current.eachLayer(function (l) {
      if (l.feature && !Object.keys(l.feature.properties).includes('mtd_id')){
        analyticsmap.current.removeLayer(l)
      }
    })
    if (mapBrgys.length > 1){
      createPropSymbols(mapBrgys); // ito yung choropleth map
      createCircleSymbols(centroids); // ito yung bilog sa map
      if (info.colorArray.length>0 && info.circleArray.length>0){
        createLegend(info.min,info.max)
      }
    }
  },[mapBrgys])
  
  return (
    <div id="analyticsmap">
      <div id ="rose">
      </div>
    </div>
  )
}

export default AnalyticsMap;