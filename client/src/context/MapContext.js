import React, { createContext, useState, useRef } from 'react';

export const MapContext = createContext();

const MapContextProvider = (props) => {

    const defaultMapSettings = {
      lat: 14.4130,
      lng: 120.9737,

    }

    const [viewport, setViewport] = useState(defaultMapSettings); // sets the map viewport using the default map settings

    const [layerSideProperties, setLayerSideProperties] = useState(null); // not used

    const [profileLoc, setProfileLoc] = useState('') // general - selected location dropdown in profile

    const map = useRef(null); // map portal

    const seedsmap = useRef(null); // profile map

    const [lControl, setLC] = useState() // initially used for controlling the visibility of layers in map portal (alongside basemap layers)

    const [prevLayer, setPrevLayer] = useState(null) // for checking previously added layers to the map

    const [prevBldgShape, setPrevBldgShape] = useState(null) // for checking previously added bldg shape to the map
    
    const [prevBrgySelect, setPrevBrgySelect] = useState(null) // used to handle click in brgys - prevents zoom in/out to barangay level

    const [sldBrgy, setSldBrgy] = useState([])

  return (
    <MapContext.Provider value={{ 
      defaultMapSettings, viewport, setViewport, layerSideProperties, setLayerSideProperties, profileLoc, setProfileLoc,
      map, seedsmap, lControl, setLC, prevLayer, setPrevLayer, prevBldgShape, setPrevBldgShape,
      prevBrgySelect, setPrevBrgySelect, sldBrgy, setSldBrgy
    }}>
      {props.children}
    </MapContext.Provider>
  );
}

export default MapContextProvider;