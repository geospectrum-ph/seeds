import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers';
import MapContextProvider from './context/MapContext';
import FeaturesContextProvider from './context/FeaturesContext';
import SEEDSContextProvider from './context/SEEDSContext';
import AnalyticsContextProvider from './context/AnalyticsContext';
import AdminContextProvider from './context/AdminContext';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  // <React.StrictMode>
    <AdminContextProvider>
      <AnalyticsContextProvider>
        <FeaturesContextProvider>
          <MapContextProvider>
            <SEEDSContextProvider>
              <ThemeProvider theme={theme}>
                <App />
              </ThemeProvider>
            </SEEDSContextProvider>
          </MapContextProvider>
        </FeaturesContextProvider>
      </AnalyticsContextProvider>
    </AdminContextProvider>
  // </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
