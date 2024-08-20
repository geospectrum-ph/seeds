import React, { createContext, useState } from 'react';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [selectedItem, setSelectedItem] = useState();
    const [loginDetails, setLoginDetails] = useState();
    const [groupPrivilege, setGroupPrivilege] = useState([]);
    const [sessionData, setSessionData] = useState([]);
    const [sessionFile, setSessionFile] = React.useState()

  return (
    <AdminContext.Provider value={{ 
      selectedItem, setSelectedItem, loginDetails, setLoginDetails, groupPrivilege, setGroupPrivilege,
      sessionData, setSessionData, sessionFile, setSessionFile 
    }}>
      {props.children}
    </AdminContext.Provider>
  );
}

export default AdminContextProvider;