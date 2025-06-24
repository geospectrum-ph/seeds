import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Paper, Box, Typography, Grid, TextField, Dialog, DialogActions,
        Button, Toolbar } from '@material-ui/core';

import { FeaturesContext } from '../../../context/FeaturesContext.js';
import { SEEDSContext } from '../../../context/SEEDSContext.js';

import DropdownDialog from './dropdownDialog'
import LoadingPage from '../../loadingPage'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} aria-labelledby={`wrapped-tab-${index}`} {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }, appbarTitle:{
    flexGrow: '1',
    color: '#fffefe',
    fontFamily: "'Outfit', sans-serif",
    fontSize:20
  }, appbar: {
    backgroundColor: '#0d3c47',
    fontFamily: "'Outfit', sans-serif",
    textAlign: "center",
    borderRadius:0
  }, deleteButton: {
    border: 0,
    borderRadius: 5,
    backgroundColor: '#e6ebec',
    color: '#33202A',
    fontSize: '1rem',
    height: '5vh',
    top: '2vh',
    padding: '9px 18px',
    fontFamily: "'Outfit', sans-serif",
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#A31621'
    }
  }, login1: {
    border: 0,
    borderRadius: 5,
    backgroundColor: '#1b798e',
    color: '#ffffff',
    fontSize: '1rem',
    height: '5vh',
    top: '2vh',
    padding: '0 30px',
    fontFamily: "'Outfit', sans-serif",
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922',
    }
  }
});

export default function ExternalDB( ) {
  const classes = useStyles();

  const [value, setValue] = useState(2);
  const [openTableDialog, setOpenTableDialog] = useState(false);

  const { setDatabaseState, setOpenDBDialog, openDropdown, setOpenDropdown, internalTableName,
          externalTableName} = useContext(FeaturesContext);
  const {setDisUp} = useContext(SEEDSContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [state, setState] = useState({
    user: 'seeds',
    password: 'seedsadmin',
    database: 'philsys_db',
    host: "seeds.c5wpuczd5vyc.ap-southeast-1.rds.amazonaws.com",
    connectionLimit: 10,
  });
  
  
  const handleUser = event => {setState({ ...state, user: event.target.value})}
  const handlePassword = event => {setState({ ...state, password: event.target.value})}
  const handleDatabase = event => {setState({ ...state, database: event.target.value})}
  const handleHost = event => {setState({ ...state, host: event.target.value})}
  const handleConnectionLimit = event => {setState({ ...state, connectionLimit: event.target.value})}

  const handleCloseDB = () => {setOpenDBDialog(false)}
  const handleCloseTable = () => {setOpenTableDialog(false);}
  const handleCloseDropdown = () => {setOpenDropdown(false); }

  const handleConnectDatabase = () => {
    setDisUp(true)

    const fetchData = async() => {
      const res = await axios.get('https://seeds.geospectrum.com.ph/mysqldb/mysqlCredentials',{
        params: {
          user: state.user,
          password: state.password,
          database: state.database,
          host: state.host,
          connectionLimit: Number(state.connectionLimit),
        }
      }).then(function(res) {
        setDatabaseState(res.data)
        if (res.data=="Database Access Successful") { 
          setOpenDropdown(true)
          setDisUp(false)
        }
      }); 
    }
    fetchData();
  }
 
  const HouseholdTableDialog = () => { 
    const [stateTable, setStateTable] = useState({
      table: 'philsys_db.Malolos',
      serialNo: 'Serial_number',
      shapeArea: 'Shape_Area',
      address: 'Address',
      storeys: 'Storeys',
      type: 'Type',
      numMembers: 'No_Members',
      name: 'Name',
      gender: 'Gender',
      age: 'Age',
      birthday: 'Birthday',
      head: 'Head',
      occupation: 'Occupation',
      profession: 'Profession'
    });

    const handleImportTable = () => {
      setDisUp(true)
      const fetchData = async() => {
        const res = await axios("https://seeds.geospectrum.com.ph/mysqldb/tableColumnsH", {
          params: { // ito yung mga parameters na naka-list sa insomnia
            Table: stateTable.table, //Number(stateTable.serialNo)
            Serial_number: stateTable.serialNo,  //Number(stateTable.serialNo)  
            Shape_Area: stateTable.shapeArea,
            Address: stateTable.address,
            Storeys: stateTable.storeys,
            Type: stateTable.type,
            No_Members: stateTable.numMembers,
            Name: stateTable.name,
            Gender: stateTable.gender,
            Age: stateTable.age,
            Birthday: stateTable.birthday,
            Head: stateTable.head,
            Occupation: stateTable.occupation,
            Profession: stateTable.profession
          }
        }).then(function(res ) {
          // handle success
          if (res.data == "Household Data Imported") { 
            axios.post('https://seeds.geospectrum.com.ph/mysqldb/postP', stateTable).then(async ()=>{
              setDisUp(false) 
              setOpenDBDialog(false)
            })
            alert(res.data)
          }
        });
      }
      fetchData(); 
    }

    const handleTable = event => {setStateTable({ ...stateTable, table: event.target.value})}
    const handleSerialNo = event => {setStateTable({ ...stateTable, serialNo: event.target.value})}
    const handleShapeArea = event => {setStateTable({ ...stateTable, shapeArea: event.target.value})}
    const handleAddress = event => {setStateTable({ ...stateTable, address: event.target.value})}
    const handleStoreys = event => {setStateTable({ ...stateTable, storeys: event.target.value})}
    const handleType = event => {setStateTable({ ...stateTable, type: event.target.value})}
    const handleNumMembers = event => {setStateTable({ ...stateTable, numMembers: event.target.value})}
    const handleName = event => {setStateTable({ ...stateTable, name: event.target.value})}
    const handleAge = event => {setStateTable({ ...stateTable, age: event.target.value})}
    const handleGender = event => {setStateTable({ ...stateTable, gender: event.target.value})}
    const handleBirthday = event => {setStateTable({ ...stateTable, birthday: event.target.value})}
    const handleHead = event => {setStateTable({ ...stateTable, head: event.target.value})}
    const handleOccupation = event => {setStateTable({ ...stateTable, occupation: event.target.value})}
    const handleProfession = event => {setStateTable({ ...stateTable, profession: event.target.value})}

    return (
      <Paper style={{height:650,overflowX:"hidden", borderRadius:0}}>
        <Toolbar className={classes.appbar}>
          <Typography className={classes.appbarTitle} style={{
              textAlign:"center", 
              fontWeight:700
            }}>
            Household Dialog
          </Typography>
        </Toolbar>
        <Grid container spacing={3} style={{padding:20}}>
          <Grid item xs={6}>
            <form noValidate autoComplete="off">
              <TextField required  value={stateTable.table} onChange={e => handleTable(e)} 
                size="small" fullWidth label="Table" variant="outlined" />
            </form>
          </Grid>
          <Grid item required xs={6}>
            <form noValidate autoComplete="off">
              <TextField required value={stateTable.serialNo} onChange={e => handleSerialNo(e)} 
                size="small" fullWidth label="Serial Number" variant="outlined"/>
            </form>
          </Grid>
          <Grid item xs={6}>
            <form noValidate autoComplete="off">
              <TextField required value={stateTable.shapeArea} onChange={e =>handleShapeArea(e)} 
                size="small" fullWidth label="Shape Area" variant="outlined"/>
            </form>
          </Grid>
          <Grid item xs={6}>
            <form noValidate autoComplete="off">
              <TextField required value={stateTable.address} onChange={e =>handleAddress(e)} 
                size="small" fullWidth label="Address" variant="outlined" />
            </form>
          </Grid>
          <Grid item xs={6}>
            <form noValidate autoComplete="off">
              <TextField required value={stateTable.storeys} onChange={e => handleStoreys(e)}
                size="small" fullWidth label="Storeys" variant="outlined"/>
            </form>
          </Grid>
          <Grid item xs={6}>
            <form noValidate autoComplete="off">
              <TextField required value={stateTable.type} onChange={e => handleType(e)} 
                size="small" fullWidth label="Type" variant="outlined"/>
            </form>
          </Grid>
          <Grid item required xs={6}>
            <form noValidate autoComplete="off">
              <TextField required  value={stateTable.numMembers} onChange={e =>handleNumMembers(e)} 
                size="small" fullWidth label="No. of members" variant="outlined"/>
            </form>
          </Grid>
          <Grid item xs={6}>
            <form noValidate autoComplete="off">
              <TextField required  value={stateTable.name} onChange={e => handleName(e)} 
                size="small" fullWidth label="Name" variant="outlined"/>
            </form>
          </Grid>
          <Grid item xs={6}>
            <form noValidate autoComplete="off">
              <TextField required  value={stateTable.gender} onChange={e => handleGender(e)}
                size="small" fullWidth label="Gender" variant="outlined"/>
            </form>
          </Grid>
          <Grid item xs={6}>
            <form noValidate autoComplete="off">
              <TextField required  value={stateTable.age} onChange={e => handleAge(e)} 
                size="small" fullWidth label="Age" variant="outlined" />
            </form>
          </Grid>
          <Grid item xs={6}>
            <form noValidate autoComplete="off">
              <TextField required value={stateTable.birthday} onChange={e =>handleBirthday(e)} 
                size="small" fullWidth label="Birthday" variant="outlined"/>
            </form>
          </Grid>
          <Grid item required xs={6}>
            <form noValidate autoComplete="off">
              <TextField required  value={stateTable.head} onChange={e =>handleHead(e)} 
                size="small" fullWidth label="Head" variant="outlined"/>
            </form>
          </Grid>
          <Grid item xs={6}>
            <form noValidate autoComplete="off">
              <TextField required  value={stateTable.occupation} 
                onChange={e => handleOccupation(e)} size="small" fullWidth
                id="outlined-basic-13" label="Occupation" variant="outlined"/>
            </form>
          </Grid>
          <Grid item xs={6}>
            <form noValidate autoComplete="off">
              <TextField required value={stateTable.profession} onChange={e => handleProfession(e)} 
                size="small" fullWidth  label="Profession" variant="outlined"/>
            </form>
          </Grid>
        </Grid>
        <DialogActions>
          <Button disabled={!stateTable.table || !stateTable.serialNo || 
            !stateTable.shapeArea || !stateTable.address || !stateTable.storeys || 
            !stateTable.type || !stateTable.numMembers || !stateTable.name || 
            !stateTable.gender || !stateTable.age || !stateTable.birthday || 
            !stateTable.head || !stateTable.occupation || !stateTable.profession} 
             className={classes.login1} variant="contained" onClick={handleImportTable}>
            Import Table
          </Button>
          <Button className={classes.deleteButton} variant="contained" 
            onClick={handleCloseTable}>
            Close
          </Button>
        </DialogActions>
        <LoadingPage/>
      </Paper>
    );
  }

  const DiseaseTableDialog = () => { 
    const [stateTable, setStateTable] = useState({
      disease: 'disease',
      status: 'status',
      latitude: 'lat',
      longitude: 'lon',
      date: 'date',
      remarks: 'remarks',
    });

    // handler to import ng table
    const handleImportTable = event => {
      setDisUp(true)
      const fetchData = async() => {
        const res = await axios("https://seeds.geospectrum.com.ph/mysqldb/tableColumnsD", {
          params: { // ito yung mga parameters na naka-list sa insomnia
            // diseaseID: stateTable.diseaseID, //Number(stateTable.serialNo)
            disease: stateTable.disease,  //Number(stateTable.serialNo)  
            status: stateTable.status,
            latitude: stateTable.latitude,
            longitude: stateTable.longitude,
            date: stateTable.date,
            remarks: stateTable.remarks,
          }
        }).then(function(res) {
          if (res.data == "Disease Data Imported") { 
            axios.post('https://seeds.geospectrum.com.ph/mysqldb/postD', stateTable).then(async ()=>{
              setDisUp(false)
              setOpenDBDialog(false)
            })
            alert(res.data)   
          }
        });
      }
      fetchData(); 
    }
    
    const handleDisease = event => {setStateTable({ ...stateTable, disease: event.target.value})} 
    const handleStatus = event => {setStateTable({ ...stateTable, status: event.target.value})}
    const handleLatitude = event => {setStateTable({ ...stateTable, latitude: event.target.value})}
    const handleLongitude = event => {setStateTable({ ...stateTable, longitude: event.target.value})}
    const handleDate = event => {setStateTable({ ...stateTable, date: event.target.value})}
    const handleRemarks = event => {setStateTable({ ...stateTable, remarks: event.target.value})}
   
    return (
      <Paper style={{height:650,overflowX:"hidden", borderRadius:0}}>
        <Toolbar className={classes.appbar}>
          <Typography className={classes.appbarTitle} style={{
              textAlign:"center", 
              fontWeight:700
            }}>
            Disease Dialog
          </Typography>
        </Toolbar>
        <Grid container spacing={3} style={{padding:20}} >
          <Grid item required xs={6}>
            <form noValidate autoComplete="off">
              <TextField required value={stateTable.disease} onChange={e =>handleDisease(e)} 
                size="small" fullWidth label="Disease" variant="outlined"/>
            </form>
          </Grid>
          <Grid item xs={6}>
            <form noValidate autoComplete="off">
              <TextField required value={stateTable.status} onChange={e =>handleStatus(e)} 
                size="small" fullWidth label="Status" variant="outlined"/>
            </form>
          </Grid>
          <Grid item xs={6}>
            <form noValidate autoComplete="off">
              <TextField required value={stateTable.latitude} onChange={e =>handleLatitude(e)} 
                size="small" fullWidth label="Latitude" variant="outlined"/>
            </form>
          </Grid>
          <Grid item xs={6}>
            <form noValidate autoComplete="off">
              <TextField required value={stateTable.longitude} onChange={e =>handleLongitude(e)}
              size="small" fullWidth label="Longitude" variant="outlined"/>
            </form>
          </Grid>
          <Grid item xs={6}>
            <form noValidate autoComplete="off">
              <TextField required value={stateTable.date} onChange={e =>handleDate(e)} 
                size="small" fullWidth label="Date" variant="outlined"/>
            </form>
          </Grid>
          <Grid item required xs={6}>
            <form noValidate autoComplete="off">
              <TextField required value={stateTable.remarks} onChange={e =>handleRemarks(e)} 
                size="small" fullWidth label="Remarks" variant="outlined"/>
            </form>
          </Grid>
        </Grid>
        <DialogActions >
          <Button disabled={!stateTable.disease ||  !stateTable.status || !stateTable.latitude || 
            !stateTable.longitude || !stateTable.date || !stateTable.remarks} 
            className={classes.login1} variant="contained" onClick={handleImportTable}>
            Import Table
          </Button>
          <Button className={classes.deleteButton} variant="contained" onClick={handleCloseTable}>
            Close
          </Button>
        </DialogActions>
        <LoadingPage/>
      </Paper>
    );
  }
  
  const handleDropdownDialog = () => {
    setDisUp(true)
    const fetchData = async() => {
      const res = await axios("https://seeds.geospectrum.com.ph/mysqldb/tableSchema", {
        params: { // ito yung mga parameters na naka-list sa insomnia
         table: internalTableName, //Number(stateTable.serialNo)
         table1: externalTableName,  //Number(stateTable.serialNo)  
        }
      }).then(function(res) {
        if (res.data =="Table Access Successful") { 
          setOpenTableDialog(true);
          setDisUp(false)
        }
      });
    }
    fetchData(); 
  }

  return (
    <div>
      <Dialog open={openDropdown} onClose={handleCloseDropdown}>
        <Paper style={{height:650, overflowX:"hidden", borderRadius:0}}>
          <Toolbar className={classes.appbar}>
            <Typography className={classes.appbarTitle} style={{
                textAlign:"center", 
                fontWeight:700
              }}>
              Internal-External
            </Typography>
          </Toolbar>
          <DropdownDialog />

          <DialogActions>
            <Button className={classes.login1} variant="contained" onClick={handleDropdownDialog} 
              disabled={!internalTableName || !externalTableName }>
              Next
            </Button>
            <Button className={classes.deleteButton} variant="contained" onClick={handleCloseDropdown}>
              Close
            </Button>
          </DialogActions>
        </Paper>
      </Dialog>

      <Dialog open={openTableDialog} onClose={handleCloseTable}>
        {internalTableName=="Household"?
          <HouseholdTableDialog />
          :<DiseaseTableDialog />
        }
      </Dialog>
        
      <Toolbar className={classes.appbar}>
        <Typography className={classes.appbarTitle} style={{
            textAlign:"center", 
            fontWeight:700
          }}>
          Connect to External Database
        </Typography>
      </Toolbar>
      <Paper className={classes.root}>
        <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
          <Tab label="MongoDB"/>
          <Tab label="PostgreSQL"/>
          <Tab label="MySQL"/>
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <Typography>MongoDB</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <form noValidate autoComplete="off">
              <TextField size="small" fullWidth label="User" variant="outlined"/>
            </form>
          </Grid>
          <Grid item xs={12}>
            <form noValidate autoComplete="off">
              <TextField size="small" fullWidth label="Password" variant="outlined"/>
            </form>
          </Grid>
          <Grid item xs={12}>
            <form noValidate autoComplete="off">
              <TextField size="small" fullWidth label="Database" variant="outlined"/>
            </form>
          </Grid>
          <Grid item xs={12}>
            <form noValidate autoComplete="off">
              <TextField size="small" fullWidth label="Host" variant="outlined"/>
            </form>
          </Grid>
          <Grid item xs={12}>
            <form noValidate autoComplete="off">
              <TextField size="small" fullWidth label="Connection Limit" variant="outlined"/>
            </form>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Typography>PostgreSQL</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <form noValidate autoComplete="off">
              <TextField size="small" fullWidth label="User" variant="outlined" />
            </form>
          </Grid>
          <Grid item xs={12}>
            <form noValidate autoComplete="off">
              <TextField size="small" fullWidth label="Password" variant="outlined" />
            </form>
          </Grid>
          <Grid item xs={12}>
            <form noValidate autoComplete="off">
              <TextField size="small" fullWidth label="Database" variant="outlined"/>
            </form>
          </Grid>
          <Grid item xs={12}>
            <form noValidate autoComplete="off">
              <TextField size="small" fullWidth label="Host" variant="outlined"/>
            </form>
          </Grid>
          <Grid item xs={12}>
            <form noValidate autoComplete="off">
              <TextField size="small" fullWidth label="Connection Limit" variant="outlined"/>
            </form>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography>MySQL</Typography>
        <Grid container spacing={3} >
          <Grid item xs={12}>
            <form noValidate autoComplete="off">
              <TextField required value={state.user} onChange={e => handleUser(e)} size="small" 
                fullWidth label="User" variant="outlined"/>
            </form>
          </Grid>
          <Grid item required xs={12}>
            <form noValidate autoComplete="off">
              <TextField required value={state.password} onChange={e => handlePassword(e)} size="small" 
                fullWidth label="Password" variant="outlined" />
            </form>
          </Grid>
          <Grid item xs={12}>
            <form noValidate autoComplete="off">
              <TextField required value={state.database} onChange={e => handleDatabase(e)} size="small" 
                fullWidth label="Database" variant="outlined"/>
            </form>
          </Grid>
          <Grid item xs={12}>
            <form noValidate autoComplete="off">
              <TextField required value={state.host} onChange={e => handleHost(e)} size="small" 
                fullWidth label="Host" variant="outlined"/>
            </form>
          </Grid>
          <Grid item xs={12}>
            <form noValidate autoComplete="off">
              <TextField required value={state.connectionLimit} onChange={e => handleConnectionLimit(e)} 
                size="small" fullWidth label="Connection Limit" variant="outlined"/>
            </form>
          </Grid>
        </Grid>
      </TabPanel>

      <DialogActions >
        <Button variant="contained" disabled={!state.user || !state.password || !state.database || !state.host || 
          !state.connectionLimit} className={classes.login1} onClick={handleConnectDatabase}>
          Connect
        </Button>
        <Button className={classes.deleteButton} variant="contained" onClick={handleCloseDB}>
          Close
        </Button>
      </DialogActions>
    </div>
  );
}