import React, {useEffect, useContext, useRef} from 'react';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import '../../../../assets/Leaflet.fullscreen.min.js';
import icon from '../../../../assets/seedMark.png'

import { MapContext } from '../../../../context/MapContext';

var MyCustomMarker = L.Icon.extend({
  options: {
    iconUrl: icon,
    iconSize:     [38, 57], // size of the icon
    iconAnchor:   [22, 56], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -56]
  }
});

export default function ContactUsMap() {
 
  const { setLC } = useContext(MapContext)
  const position = [14.581862409433546, 121.0603130695035]
  
  const contactusmap = useRef(null);

  var osm = L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'})
  var stadia =  L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'})
  var cartodb = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'})
  var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution:'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'})
    
  useEffect(() => {
    contactusmap.current = L.map('contactusmap', {
      fullscreenControl: true,
      center: position,
      zoom: 14,
      layers: [osm]
    });

    var rose = L.control.rose('rose', {position:'bottomleft', icon:'default', iSize:'medium', opacity:0.8});
    rose.addTo(contactusmap.current)
    L.marker([14.582,121.059], {icon: new MyCustomMarker()}).addTo(contactusmap.current)
		  .bindPopup("<b>Geospectrum Main Office</b><br />is here!.").openPopup();
  }, []);

  useEffect(() => {
    var baseMaps = {
      "OSM": osm,
      "Stadia": stadia,
      "CartoDB": cartodb,
      "ESRI": esri
    };
    if (contactusmap){
      setLC(L.control.layers(baseMaps).addTo(contactusmap.current))
    }
  }, [contactusmap])

  return (
    <div id="contactusmap" style={{height: 500}} >
      <div id ="leaflet-rose"/>
      <div id ="leaflet-rose-print"/>
    </div>
  )
}
