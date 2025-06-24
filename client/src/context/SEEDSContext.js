import * as React from "react";

export const SEEDSContext = React.createContext();

const SEEDSContextProvider = (props) => {
  const [startDate, setStartDate] = React.useState("19000101");
  const [endDate, setEndDate] = React.useState("21001231");

  // these local start and end dates are for display format used in the date picker
  // Sun Nov 28 2021 00:00:00 GMT+0800 (Philippine Standard Time)
  const [startDateLocal, setStartDateLocal] = React.useState(new Date(1900, 0, 1));
  const [endDateLocal, setEndDateLocal] = React.useState(new Date(2100, 11, 31));
  
  // for monitoring the current module, domain, and subdomain
  const [currentModule, setCurrentModule] = React.useState();
  const [currentDomain, setCurrentDomain] = React.useState();
  const [currentSubdomain, setCurrentSubdomain] = React.useState();

  const [openLeftDrawer, setOpenLeftDrawer] = React.useState(false); //  for opening/closing left drawer in seeds 

  const [appBarValue, setAppBarValue] = React.useState("home"); // for setting the state of appbar in landing page

  const [disUp, setDisUp] = React.useState(false); //for loading MOVE TO SEEDS CONTEXT

  const [tabValue, setTabValue] = React.useState("Overview"); // seeds profile tab value

  const [loadingDataCat, setLoadingDataCat] = React.useState(false); // status of data catalogue in dialog (true or false) MOVE TO SEEDS CONTEXT

  const [selectedIndex, setSelectedIndex] = React.useState(null); // highlight of chosen btn in left nav MOVE TO SEEDS CONTEXT

  const [checked, setChecked] = React.useState(true); //for tutorial dialog box - not used tho

  const [open, setOpen] = React.useState(true); //for tutorial dialog box - not used tho

  const [openLayerGroups, setOpenLayerGroups] = React.useState(true); // for layer groups panel

  return (
    <SEEDSContext.Provider
      value = {{ 
        startDate, setStartDate,
        endDate, setEndDate,
        
        startDateLocal, setStartDateLocal,
        endDateLocal, setEndDateLocal,
        
        currentModule, setCurrentModule,
        currentDomain, setCurrentDomain,
        currentSubdomain, setCurrentSubdomain,
        
        openLeftDrawer, setOpenLeftDrawer,
        
        appBarValue, setAppBarValue,

        disUp, setDisUp,
        
        tabValue, setTabValue,
        
        loadingDataCat, setLoadingDataCat,
        
        selectedIndex, setSelectedIndex,
        
        checked, setChecked,
        
        open, setOpen,
        
        openLayerGroups, setOpenLayerGroups
      }}>
      { props.children }
    </SEEDSContext.Provider>
  );
}

export default SEEDSContextProvider;