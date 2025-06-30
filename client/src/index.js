import ReactDOM from "react-dom";

import AdminContextProvider from "./context/AdminContext";
import AnalyticsContextProvider from "./context/AnalyticsContext";
import FeaturesContextProvider from "./context/FeaturesContext";
import MapContextProvider from "./context/MapContext";
import SEEDSContextProvider from "./context/SEEDSContext";

import App from "./containers";

import "./index.css";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  // <React.StrictMode>
    <AdminContextProvider>
      <AnalyticsContextProvider>
        <FeaturesContextProvider>
          <MapContextProvider>
            <SEEDSContextProvider>
              <App/>
            </SEEDSContextProvider>
          </MapContextProvider>
        </FeaturesContextProvider>
      </AnalyticsContextProvider>
    </AdminContextProvider>
  // </React.StrictMode>
  ,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change unregister() to register() below. Note that this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
