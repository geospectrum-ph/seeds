import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers';
import MapContextProvider from './context/MapContext';
import FeaturesContextProvider from './context/FeaturesContext';
import SEEDSContextProvider from './context/SEEDSContext';
import * as serviceWorker from './serviceWorker';

// useEffect(() => {
//   window.localStorage.setItem('ap',)
// })

ReactDOM.render(
  <React.StrictMode>
    <FeaturesContextProvider>
      <MapContextProvider>
        <SEEDSContextProvider>
          <App />
        </SEEDSContextProvider>
      </MapContextProvider>
    </FeaturesContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
