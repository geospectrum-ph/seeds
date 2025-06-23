import ReactDOM from "react-dom";

import AdminContextProvider from "./context/AdminContext";
import AnalyticsContextProvider from "./context/AnalyticsContext";
import FeaturesContextProvider from "./context/FeaturesContext";
import MapContextProvider from "./context/MapContext";
import SEEDSContextProvider from "./context/SEEDSContext";

import App from "./containers";

import "./index.css";

import { ThemeProvider, createTheme } from "@material-ui/core/styles";

import * as serviceWorker from "./serviceWorker";

const theme = createTheme({
  typography: {
    h3: {
      fontFamily: "Outfit"
    },
    h6: {
      fontFamily: "Outfit"
    }
  },
  palette: {
    primary: {
      main: "#1b798e"
    },
    secondary: {
      main: "#0d3c47"
    }
  },
});

ReactDOM.render(
  // <React.StrictMode>
    <AdminContextProvider>
      <AnalyticsContextProvider>
        <FeaturesContextProvider>
          <MapContextProvider>
            <SEEDSContextProvider>
              <ThemeProvider theme = { theme }>
                <App />
              </ThemeProvider>
            </SEEDSContextProvider>
          </MapContextProvider>
        </FeaturesContextProvider>
      </AnalyticsContextProvider>
    </AdminContextProvider>
  // </React.StrictMode>
  ,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
