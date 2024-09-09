import React from "react";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
  const map = React.useRef(null);

  React.useEffect(function () {
    if (!map.current) {
      const basemap = new L.TileLayer("https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.{ext}", {
        minZoom: 0,
        maxZoom: 20,
        attribution: `&copy; <a href = "https://www.stadiamaps.com/" target = "_blank">Stadia Maps</a> &copy; <a href = "https://www.stamen.com/" target = "_blank">Stamen Design</a> &copy; <a href = "https://openmaptiles.org/" target = "_blank">OpenMapTiles</a> &copy; <a href = "https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`,
        ext: "png"
      });

      const location_lat = 14.582;
      const location_lng = 121.060;

      map.current = new L.Map("about-map", {
        center: [location_lat, location_lng],
        zoom: 12,
        layers: [basemap]
      });

      const location_interactive = new L.CircleMarker([location_lat, location_lng],
        {
          color: "var(--color-00)",
          opacity: 0.50,
          fillColor: "var(--color-00)",
          fillOpacity: 0.25,
          radius: 12
        });

      location_interactive.addTo(map.current);
      
      const location = new L.CircleMarker([location_lat, location_lng],
        {
          color: "var(--color-dark)",
          opacity: 1.00,
          fillColor: "var(--color-dark)",
          fillOpacity: 0.50,
          radius: 5
        });

      location.addTo(map.current);

      const popup = new L.Popup({
        keepInView: true,
        closeButton: false,
        autoClose: false,
        closeOnEscapeKey: false,
        closeOnClick: false,
        className: "about-popup"
      });

      popup
        .setLatLng([location_lat, location_lng])
        .setContent("<p>GEOSPECTRUM</p>")
        .openOn(map.current);
    }
  }, []);

  return (
    <div id = "about-map"/>
  );
}