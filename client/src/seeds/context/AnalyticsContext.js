import * as React from "react";

export const AnalyticsContext = React.createContext();

const AnalyticsContextProvider = (props) => {
    const [locLayers, setLocLayers] = React.useState([]); // used to populate location dropdown in analytics
    const [selectLoc, setSelectLoc] = React.useState([]); // selected location

    const [catLayers, setCatLayers] = React.useState([]); // used to populated the data layers dropdown in analytics
    const [selectCatDataOne, setSelectCatDataOne] = React.useState([]); // array of selected data layers
    const [subCat, setSubCat] = React.useState([]); // used to populate checkbox/radiogroup (subcategories of layer 1)
    const [subCat2, setSubCat2] = React.useState([]); // used to populate checkbox/radiogroup - (subcategories of layer 2)
    const [selectSubCat1, setSelectSubCat1] = React.useState([]); // array of selected subcategory (layer 1)
    const [selectSubCat2, setSelectSubCat2] = React.useState([]); // array of selected subcategory (layer 2)

    const [mapBrgys, setMapBrgys] = React.useState([]); // data used to generate choropleth map

    const [centroids, setCentroids] = React.useState([]); // data used to generate density map

    const [analyticsMapping, setAnalyticsMapping] = React.useState(null);

    const analyticsmap = React.useRef(null); // map

    const [temporalLegend, setTemporalLegend] = React.useState(null); // contents of legend

    const [checkedAll, setCheckedAll] = React.useState(true); // for location dropdown selection
 
    const [disNum, setDisNum] = React.useState(); // for populating data with type: number (layer 1) - radiogroup
    const [disStr, setDisStr] = React.useState(); // for populating data with type: string (layer 1)  - checkboxes
    const [dis2Num, setDis2Num] = React.useState(); // for populating data with type: number (layer 2) - radiogroup
    const [dis2Str, setDis2Str] = React.useState(); // for populating data with type: number (layer 2) - checkboxes

    const [graphData, setGraphData] = React.useState(); // data displayed in graph
    const [graphLabels, setGraphLabels] = React.useState(); // labels displayed in graph
    
    const [checkboxChecked, setCC] = React.useState(true);

    const [rows, setRows] = React.useState({}); // rows in analytics table
    const [cols, setCols] = React.useState({}); // columns in analytics table


  return (
    <AnalyticsContext.Provider
      value = {{ 
        locLayers, setLocLayers,
        selectLoc, setSelectLoc,
        
        catLayers, setCatLayers,
        selectCatDataOne, setSelectCatDataOne,
        subCat, setSubCat,
        subCat2, setSubCat2, 
        selectSubCat1, setSelectSubCat1,
        selectSubCat2, setSelectSubCat2,
        
        mapBrgys, setMapBrgys,

        centroids, setCentroids,
        
        analyticsMapping, setAnalyticsMapping,
        
        analyticsmap,

        temporalLegend, setTemporalLegend,
        
        checkedAll, setCheckedAll,
        
        disNum, setDisNum, 
        disStr, setDisStr,
        dis2Num, setDis2Num,
        dis2Str, setDis2Str,
        
        graphData, setGraphData, 
        graphLabels, setGraphLabels,
        
        checkboxChecked, setCC,
        
        rows, setRows,
        cols, setCols
      }}>
      { props.children }
    </AnalyticsContext.Provider>
  );
}

export default AnalyticsContextProvider;
