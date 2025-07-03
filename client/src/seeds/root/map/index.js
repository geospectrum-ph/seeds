import * as React from "react";

import { makeStyles, useTheme } from '@material-ui/core/styles';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';



import { MapContext } from "../../context/MapContext";

const useStyles = makeStyles(function () {
  return ({
    map: {
      width: "100vw",
      height: "100vh",

      display: "block",

      position: "absolute",
      top: "0",
      left: "0",
      zIndex: "-100",

      filter: "color(from hsl(0 100% 50%) srgb calc(r - 0.4) calc(g + 0.1) calc(b + 0.6) / calc(alpha - 0.1))",
    },
  });
});

export default function Map () {

    const {viewport,  map, lControl, setLC} = React.useContext(MapContext);

      const styles = useStyles();

        const position = [viewport.lat, viewport.lng]


  

React.useEffect(() => {
    map.current = L.map('map', {
      center: [14.5680,120.9632],
      zoom: 12,      
      zoomControl: false
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map.current);
  }, []);

  return (
        <div id="map" className = { styles.map }></div>
  );
}