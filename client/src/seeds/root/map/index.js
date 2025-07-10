import * as React from "react";

import { makeStyles } from "@material-ui/core";

import * as leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

const useStyles = makeStyles(function () {
  return ({
    rootMap: {
      width: "100vw",
      height: "100vh",

      display: "block",

      position: "absolute",
      top: "0",
      left: "0",
      zIndex: "-500",

      filter: "grayscale(100%) brightness(100%)",
    },
  });
});

export default function Map () {
  const styles = useStyles();

  const mapRoot = React.useRef(null);

  React.useEffect(() => {
    mapRoot.current = leaflet.map("map-root", {
      center: [14.5680, 120.9632],
      zoom: 12,      
      zoomControl: false,
    });

    leaflet
      .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: `&copy; <a href = "https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`,
      })
      .addTo(mapRoot.current);
  }, []);

  return (
    <div id = "map-root" className = { styles.rootMap }/>
  );
}
