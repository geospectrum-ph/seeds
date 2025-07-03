import * as React from "react";

export const AdminContext = React.createContext();

const AdminContextProvider = (props) => {
  const [selectedItem, setSelectedItem] = React.useState();
  
  const [loginDetails, setLoginDetails] = React.useState();
  const [groupPrivilege, setGroupPrivilege] = React.useState([]);
  
  const [sessionData, setSessionData] = React.useState([]);
  const [sessionFile, setSessionFile] = React.useState();

  return (
    <AdminContext.Provider
      value = {{ 
        selectedItem, setSelectedItem,
        
        loginDetails, setLoginDetails,
        groupPrivilege, setGroupPrivilege,
        
        sessionData, setSessionData,
        sessionFile, setSessionFile 
      }}>
      { props.children }
    </AdminContext.Provider>
  );
}

export default AdminContextProvider;
