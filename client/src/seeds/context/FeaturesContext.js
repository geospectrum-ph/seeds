import * as React from "react";

export const FeaturesContext = React.createContext();

const FeaturesContextProvider = (props) => {
  const [brgys, setBrgys] = React.useState([]); // for layers to be added in map (used in catalogue, map portal, and profile)
  const [brgysList, setBrgysList] = React.useState(null); // for populating the location dropdown in seeds profile :: AXIOS (located in containers)

  // context for all the tables in seeds profile :: AXIOS
  const [diseaseIncidenceAll, setDiseaseIncidenceAll] = React.useState(); 
  const [commercialAll, setCommercialAll] = React.useState();
  const [landUseAll, setLandUseAll] = React.useState();
  const [laborForceAll, setLaborForceAll] = React.useState();

  // for points in profile: disease incidence :: AXIOS
  const [points, setPoints] = React.useState();
  
  // context for all the graphs in seeds profile :: AXIOS
  const [diseaseMapperGraph, setDiseaseMapperGraph] = React.useState([{"date":"20210101","active":0,"recovered":0,"death":0}]);
  const [commercialMapperGraph, setCommercialMapperGraph] = React.useState([]);
  const [landUseGraph, setLandUseGraph] = React.useState(null);
  const [jobMapperGraph, setJobMapperGraph] = React.useState(null);

  // selected location for seeds profile :: AXIOS 
  const [brgySelect, setBrgySelect] = React.useState(null) // for response of map to selected barangay in dropdown
  const [diseaseSelect, setDiseaseSelect] = React.useState(null); 
  const [commercialSelect, setCommercialSelect] = React.useState(null);
  const [landUseSelect, setLandUseSelect] = React.useState(null);
  const [jobSelect, setJobSelect] = React.useState(null); 
  const [householdSelect, setHouseholdSelect] = React.useState(null);

  // for populating classes/ category dropdown in profile :: AXIOS 
  // for land use: landUseGraph is used
  const [diseaseClassMap, setDiseaseClassMap] = React.useState("");
  const [commercialClassMap, setCommercialClassMap] = React.useState(null); // for dropdown and table
  const [employmentClassMap, setEmploymentClassMap] = React.useState(null); // for dropdown and table

  // for household surveys - household section
  const [householdMin, setHouseholdMin] = React.useState(null);
  const [householdMax, setHouseholdMax] = React.useState(null);
  const [areaMax, setAreaMax] = React.useState(null);
  const [housingLandUse, setHousingLandUse] = React.useState(null); // axios
  const [housingLandUseSelected, setHousingLandUseSelected] = React.useState(null);
  const [numberStoreysMin, setNumberStoreysMin] = React.useState(null);
  const [numberStoreysMax, setNumberStoreysMax] = React.useState(null);
  const [materialType, setMaterialType] = React.useState(null); // axios
  const [materialTypeSelected, setMaterialTypeSelected] = React.useState(null);

  // for household surveys: population section
  const [ageMin, setAgeMin] = React.useState(null);
  const [ageMax, setAgeMax] = React.useState(null);
  const [occupation, setOccupation] = React.useState(null); // axios
  const [occupationSelected, setOccupationSelected] = React.useState(null);
  const [profession, setProfession] = React.useState(null); // axios
  const [professionSelected, setProfessionSelected] = React.useState(null);
  const [gender, setGender] = React.useState("");

  // for household labels
  const [householdLabels, setHouseholdLabels] = React.useState({
    Range: "",
    Area: "",
    LandUse: "",
    Storeys: "",
    Material: "",
    AgeRange: "",
    Occupation: "",
    Profession: "",
    Gender: "",
  });

  // for household map & table
  // for all the building shapes that satisfy the conditions selected
  const [householdBldgShape, setHouseholdBldgShape] = React.useState([]); // axios

  // for the list of people (in table) that satisfy the conditions selected
  const [householdBldgPopulation, setHouseholdBldgPopulation] = React.useState(null);

  // for the selected building on click
  const [householdBldgSelect, setHouseholdBldgSelect] = React.useState(null);
 
  // used to handle the click on bldg. to differentiate it from click on barangay.
  const [secondClick, setSecondClick] = React.useState(false);

  // for selected classes/ category in all profiles
  const [diseaseClassSelect, setDiseaseClassSelect] = React.useState("");
  const [commercialClassSelect, setCommercialClassSelect] = React.useState();
  const [landUseClassSelect, setLandUseClassSelect] = React.useState(null);
  const [landUseCategory, setLandUseCategory] = React.useState(null); // with additional filter - for display in card
  const [jobClassSelect, setJobClassSelect] = React.useState([]);

  // for data catalogue
  const [dataCat, setDataCat] = React.useState(null); // uploaded data in populate/ deleted data in data catalogue
  const [dataShow, setDataShow] = React.useState(null); // for filtered data in data catalogue using the various filters
  const [selected, setSelected] = React.useState([]); // layers selected in Data Catalogue 
  
  // for connection to external database
  const [databaseState, setDatabaseState] = React.useState(null); // for connection to external database - credentials
  const [openDropdown, setOpenDropdown] = React.useState(null); // for opening next of dialog box - internal & external name
  const [internalTableName, setInternalTableName] = React.useState(); // for internal table name
  const [externalTableName, setExternalTableName] = React.useState("disease"); // for internal table name
  const [openDBDialog, setOpenDBDialog] = React.useState(false); // for opening next of dialog box - table 
  const [tableState, setTableState] = React.useState(null); // for connection to external database - table state
  
  // for map portal
  const [loadedMtd, setLoadedMtd] = React.useState([]); // array of MTD IDs of loaded layers
  const [lg, setLG] = React.useState([]); // lg and mtd
  const [lgCurrent, setLGCurrent] = React.useState([]); // current layergroup
  const [mtdCurrent, setMtdCurrent] = React.useState([]); // current mtd id
  const [lControlId, setLControlId] = React.useState(""); // leaflet control id of the control
  const [legendItems, setLegendItems] = React.useState([]); // legends shown in layer groups panel
  const [landUseColor, setLandUseColor] = React.useState([]);

  return (
    <FeaturesContext.Provider
      value = {{ 
        brgys, setBrgys, brgysList, setBrgysList, 

        diseaseIncidenceAll, setDiseaseIncidenceAll, commercialAll, setCommercialAll, landUseAll, setLandUseAll,
        laborForceAll, setLaborForceAll, points, setPoints,

        diseaseMapperGraph, setDiseaseMapperGraph, commercialMapperGraph, setCommercialMapperGraph, 
        landUseGraph, setLandUseGraph, jobMapperGraph, setJobMapperGraph, 

        brgySelect, setBrgySelect, diseaseSelect, setDiseaseSelect, commercialSelect, setCommercialSelect,
        landUseSelect, setLandUseSelect, jobSelect, setJobSelect, householdSelect, setHouseholdSelect,

        diseaseClassMap, setDiseaseClassMap, commercialClassMap, setCommercialClassMap,
        employmentClassMap, setEmploymentClassMap,      

        // for household dropdowns
        // household section
        householdMin, setHouseholdMin, householdMax, setHouseholdMax, areaMax, setAreaMax,
        housingLandUse, setHousingLandUse, housingLandUseSelected, setHousingLandUseSelected,
        numberStoreysMin, setNumberStoreysMin, numberStoreysMax, setNumberStoreysMax,
        materialType, setMaterialType, materialTypeSelected, setMaterialTypeSelected,

        // population section
        ageMin, setAgeMin, ageMax, setAgeMax,
        occupation, setOccupation, occupationSelected, setOccupationSelected,
        profession, setProfession, professionSelected, setProfessionSelected, gender, setGender,

        householdLabels, setHouseholdLabels,

        // for household map & table
        householdBldgShape, setHouseholdBldgShape, householdBldgPopulation, setHouseholdBldgPopulation,
        householdBldgSelect, setHouseholdBldgSelect,
        
        secondClick, setSecondClick,
      
        diseaseClassSelect, setDiseaseClassSelect, commercialClassSelect, setCommercialClassSelect,
        landUseClassSelect, setLandUseClassSelect, landUseCategory, setLandUseCategory,
        jobClassSelect, setJobClassSelect,

        // data catalogue context
        dataCat, setDataCat, 
        dataShow, setDataShow, 
        selected, setSelected, 

        // for connection to external database
        databaseState, setDatabaseState, openDropdown, setOpenDropdown, internalTableName, setInternalTableName,
        externalTableName, setExternalTableName, openDBDialog, setOpenDBDialog, tableState, setTableState,

      // for map portal
        loadedMtd, setLoadedMtd, lg, setLG, lgCurrent, setLGCurrent, mtdCurrent, setMtdCurrent,
        lControlId, setLControlId, legendItems, setLegendItems,

        landUseColor, setLandUseColor
      }}>
      { props.children }
    </FeaturesContext.Provider>
  );
}

export default FeaturesContextProvider;
