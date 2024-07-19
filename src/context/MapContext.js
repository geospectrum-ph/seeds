import React, { createContext, useState, useRef } from 'react';
import L from 'leaflet';


export const MapContext = createContext();


const MapContextProvider = (props) => {

    const defaultMapSettings = {
      lat: 14.4553872,
      lng: 120.9644141,
      zoom: 13
    }

    const defaultBasemap = {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      id: 'mapbox.light'
    }

    var baseMaps = {
      "OSM": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution:
              '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}),
      "Stadia": L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {attribution:
              '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'}),
      "ESRI": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {attribution:
              'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'})
    };

    const defaultBounds = [
      [120.924420, 14.462566],
      [121.016258, 14.356811],
    ]

    const [viewport, setViewport] = useState(defaultMapSettings);

    const [mapReference, setMapReference] = useState(useRef(null));

    const [shapefile, setShapefile] = useState(["city", "brgy", "bldg"])

    const [basemap, setBasemap] = useState(defaultBasemap);

    const [checked, setChecked] = useState(true);

    const [layerside, setLayerside] = useState(false);

    const [healthLoc, setHealthLoc] = useState(null)

    const [legend, setLegend] = React.useState({})

    const [seedPage, setSeedPage] = useState('Health')

    const [toggleOn, setToggleOn] = useState(false)

    const layerGroup = new L.LayerGroup();

    const map = React.useRef(null);

    const [lControl, setLC] = React.useState()

    const closePopups = () => {
      mapReference.current.leafletElement.closePopup();
  };

  return (
    <MapContext.Provider value={{ closePopups, mapReference, setMapReference, defaultMapSettings,
                                  viewport, setViewport, shapefile, setShapefile, basemap, setBasemap,
                                  checked, setChecked, layerside, setLayerside, healthLoc, setHealthLoc,
                                  legend, setLegend, layerGroup, map, lControl, setLC,
                                  seedPage, setSeedPage,
                                  toggleOn, setToggleOn}}>
      {props.children}
    </MapContext.Provider>
  );
}

export default MapContextProvider;