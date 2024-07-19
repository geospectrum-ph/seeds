import React, { createContext, useState, useRef } from 'react';


export const SEEDSContext = createContext();


const SEEDSContextProvider = (props) => {
  const [healthAll, setHealthAll] = useState(); // para mapakita yung table sa seeds profile

  const [commercialAll, setCommercialAll] = useState();

  const [laborForceAll, setLaborForceAll] = useState();

  const [landUseAll, setLandUseAll] = useState();

  // const [healthOne, setHealthOne] = useState();

  const [dd, setDd] = useState();

  const [points, setPoints] = useState();

  const [startDate, setStartDate] = useState('20200101');

  const [endDate, setEndDate] = useState('20211231');

  const [currentSubdomain, setCurrentSubdomain] = useState('');

  const [diseaseClassSelect, setDiseaseClassSelect] = useState();

  const [jobClassSelect, setJobClassSelect] = useState(["1","2","3","4","5","6","7","8","9","10","11","12"]);
  
  const [commercialClassSelect, setCommercialClassSelect] = useState();

  return (
    <SEEDSContext.Provider value={{ healthAll, setHealthAll, 
      // healthOne, setHealthOne, 
                                    dd, setDd, 
                                    points, setPoints,
                                    startDate, setStartDate, endDate, setEndDate, 
                                    jobClassSelect, setJobClassSelect,
                                    commercialAll, setCommercialAll, 
                                    laborForceAll, setLaborForceAll, landUseAll, setLandUseAll,
                                    currentSubdomain, setCurrentSubdomain,
                                    commercialClassSelect, setCommercialClassSelect,
                                    diseaseClassSelect, setDiseaseClassSelect}}>
      {props.children}
    </SEEDSContext.Provider>
  );
}

export default SEEDSContextProvider;