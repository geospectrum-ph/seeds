import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AdminContextProvider from "../seeds/context/AdminContext";
import AnalyticsContextProvider from "../seeds/context/AnalyticsContext";
import FeaturesContextProvider from "../seeds/context/FeaturesContext";
import MapContextProvider from "../seeds/context/MapContext";
import SEEDSContextProvider from "../seeds/context/SEEDSContext";

import Root from "./root/index.js";
// import Home from "./home/index.js";

export default function SEEDs() {  
  return (
    <AdminContextProvider>
      <AnalyticsContextProvider>
        <FeaturesContextProvider>
          <MapContextProvider>
            <SEEDSContextProvider>
              <Router>
                <Switch>
                  <Route path = "/">
                    <Root/>
                  </Route>
                  {/* <Route path = "/home" >
                    <Home/>
                  </Route> */}
                </Switch>
              </Router>
            </SEEDSContextProvider>
          </MapContextProvider>
        </FeaturesContextProvider>
      </AnalyticsContextProvider>
    </AdminContextProvider>
  );
}
