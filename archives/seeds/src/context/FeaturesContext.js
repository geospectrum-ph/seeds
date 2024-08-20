import React, { createContext, useState, useRef } from 'react';
import {locState, useLocalState} from '../hook/locState';

export const FeaturesContext = createContext();


const FeaturesContextProvider = (props) => {

    const [brgys, setBrgys] = useState([]);

    const [brgysList, setBrgysList] = useState(null);

    const [bldgs, setBldgs] = useState(null);

    const [cities, setCities] = useState(null);

    const [dataCat, setDataCat] = useState(null);

    const [dataShow, setDataShow] = useState(null);

    // const [select, setSelect] = useState('SEEDs Map Portal');

    const [select, setSelect] = useLocalState('select');

    const [selected, setSelected] = useState(null); // layers chosen in Data Catalogue

    const [selectedIndex, setSelectedIndex] = React.useState(null); // lchosen in left nav

    const [healthSelect, setHealthSelect] = useState(null); // dito isstore yung data na may filter!

    const [layerList, setLayerList] = useState();

    const [healthMapperGraph, setHealthMapperGraph] = useState([{"date":"20210101","active":0,"recovered":0,"death":0}]);

    const [jobSelect, setJobSelect] = useState(null);

    const [commercialSelect, setCommercialSelect] = useState(null);

    const [commercialMapperGraph, setCommercialMapperGraph] = useState([]);

    const [legendItems, setLegendItems] = useState([]);

    const [jobMapperGraph, setJobMapperGraph] = useState(null);

    const [landUseSelect, setLandUseSelect] = useState(null);

    const [landUseGraph, setLandUseGraph] = useState(null);

    const [landUseCategory, setLandUseCategory] = useState(null);

    const [checked, setChecked] = React.useState(true); //for tutorial dialog box

    const [open, setOpen] = React.useState(true); //for tutorial dialog box

    const [tabValue, setTabValue] = React.useState('Overview');


  return (
    <FeaturesContext.Provider value={{ brgys, setBrgys, brgysList, setBrgysList, bldgs, setBldgs, cities, setCities, dataCat,
                                        setDataCat, dataShow, setDataShow, select, setSelect, selected, setSelected, selectedIndex, setSelectedIndex,
                                        healthSelect, setHealthSelect, layerList, setLayerList, healthMapperGraph, setHealthMapperGraph,
                                        jobMapperGraph, setJobMapperGraph, jobSelect, setJobSelect, legendItems, setLegendItems,
                                        commercialMapperGraph, setCommercialMapperGraph, commercialSelect, setCommercialSelect,
                                        landUseSelect, setLandUseSelect, landUseGraph, setLandUseGraph, landUseCategory, setLandUseCategory,
                                        checked, setChecked, open, setOpen,
                                        tabValue, setTabValue}}>
      {props.children}
    </FeaturesContext.Provider>
  );
}

export default FeaturesContextProvider;