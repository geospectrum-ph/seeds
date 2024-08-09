import React, { createContext, useState } from 'react';

export const AnalyticsContext = createContext();

const AnalyticsContextProvider = (props) => {

    // const [locLayers, setLocLayers] = useState([]); // used to populate location dropdown in analytics

    // const [selectLoc, setSelectLoc] = useState([]); // selected location

    // const [catLayers, setCatLayers] = useState([]); // used to populated the data layers dropdown in analytics
 
    // const [selectCatDataOne, setSelectCatDataOne] = useState([]); // array of selected data layers

    // const [subCat, setSubCat] = useState([]); // used to populate checkbox/radiogroup (subcategories of layer 1)

    // const [subCat2, setSubCat2] = useState([]); // used to populate checkbox/radiogroup - (subcategories of layer 2)

    // const [selectSubCat1, setSelectSubCat1] = useState([]); // array of selected subcategory (layer 1)

    // const [selectSubCat2, setSelectSubCat2] = useState([]); // array of selected subcategory (layer 2)

    // const [mapBrgys, setMapBrgys] = useState([]) // data used to generate choropleth map

    // const [centroids, setCentroids] = useState([]) // data used to generate density map

    // const [analyticsMapping, setAnalyticsMapping] = useState(null)

    // const [temporalLegend, setTemporalLegend] = useState(null) // contents of legend

    // const [checkedAll, setCheckedAll] = useState(true) // for location dropdown selection
 
    // const [disNum, setDisNum] = React.useState() // for populating data with type: number (layer 1) - radiogroup

    // const [disStr, setDisStr] = React.useState() // for populating data with type: string (layer 1)  - checkboxes

    // const [dis2Num, setDis2Num] = React.useState() // for populating data with type: number (layer 2) - radiogroup

    // const [dis2Str, setDis2Str] = React.useState() // for populating data with type: number (layer 2) - checkboxes

    // const [graphData, setGraphData] = React.useState() // data displayed in graph

    // const [graphLabels, setGraphLabels] = React.useState() // labels displayed in graph
    
    // const [checkboxChecked, setCC] = React.useState(true)

    // const [rows, setRows] = useState({}) // rows in analytics table

    // const [cols, setCols] = useState({}) // columns in analytics table

    const [list, setList] = React.useState([]);
    const [layers, setLayers] = React.useState([]);

    const [layerSelected, setLayerSelected] = React.useState([]);

    const [columns, setColumns] = React.useState([]);
    const [rows, setRows] = React.useState([]);

    const [aspectFormDisabled, setAspectFormDisabled] = React.useState(true);

    const [aspects, setAspects] = React.useState([]);

    const [aspectSelected, setAspectSelected] = React.useState("");

    const [dataset, setDataset] = React.useState([]);

    const [statistics, setStatistics] = React.useState(null);




    // const analyticsmap = React.useRef(null); // map

  return (
        <AnalyticsContext.Provider value={{ 
          list, setList,
          layers, setLayers,
      
          layerSelected, setLayerSelected,
      
          columns, setColumns,
          rows, setRows,
      
          aspectFormDisabled, setAspectFormDisabled,
      
          aspects, setAspects,
      
          aspectSelected, setAspectSelected,
      
          dataset, setDataset,
      
          statistics, setStatistics
    }}>
      {props.children}
    </AnalyticsContext.Provider>
  );
}

export default AnalyticsContextProvider;