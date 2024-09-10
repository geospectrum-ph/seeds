import React from "react";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function Map() {
  React.useEffect(function () {
    const basemap = "https://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/openStreetMap.json";    
    const center = [121.06027390911558, 14.581667728584403];
    
    const map = new maplibregl.Map({
      container: "about-map",
      style: basemap,
      center: center,
      zoom: 12,
      minZoom: 2,
      maxZoom: 18
    });

    const scale = new maplibregl.ScaleControl({
      maxWidth: 120,
      unit: "metric"
    });

    map.addControl(scale);
  
    const navigation = new maplibregl.NavigationControl();
    
    map.addControl(navigation, "top-left");

    const full_screen = new maplibregl.FullscreenControl({
      container: document.querySelector("root")
    });

    map.addControl(full_screen);

    const icon = document.createElement("div");

    icon.className = "map-location";

    const marker = new maplibregl.Marker({
      element: icon
    });

    marker
      .setLngLat(center)
      .addTo(map);

    map.on("dragend", function () {
      map.easeTo({
        center: center,
        essential: true
      });
    });

    map.on("zoomend", function () {
      map.easeTo({
        center: center,
        essential: true
      });
    });
  }, []);

  return (
    <div id = "about-map" className = "map"/>
  );
}