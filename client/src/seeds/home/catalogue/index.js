import React, {useEffect, useContext, useState} from 'react';
import { useHistory} from "react-router-dom";
import axios from 'axios';
import { withStyles, makeStyles, createTheme } from '@material-ui/core/styles';
import { Backdrop, Button, Grid, Paper, Card, CardHeader, Checkbox, FormGroup, FormLabel, FormControl, 
        FormControlLabel, TextField, InputAdornment, Select, MenuItem, Chip, Toolbar, Typography, Dialog, 
        DialogActions, DialogContent, InputLabel, CircularProgress }  from '@material-ui/core';
// import { DataGrid } from '@material-ui/data-grid';

import _without from "lodash/without";
import CsvDownloader from 'react-csv-downloader';
// https://www.npmjs.com/package/react-csv-downloader

import SearchIcon from '@material-ui/icons/Search'
import ExportToCSVIcon from '../../assets/icons/44 Export Table.png'

// import contexts
import { SEEDSContext } from '../../context/SEEDSContext'
import { FeaturesContext } from '../../context/FeaturesContext'
import { AdminContext } from '../../context/AdminContext'
import { MapContext } from '../../context/MapContext';

function getStyles(name, specificName, theme) {
  return {
    fontWeight:
    specificName.indexOf(name) === -1
      ? theme.typography.fontWeightRegular
      : theme.typography.fontWeightMedium,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiCardHeader-root': {
      borderRadius:0
    }
  }, appbarTitle:{
    flexGrow: '1',
    color: '#fffefe',
    fontFamily: "'Outfit', sans-serif",
  }, appbar: {
    backgroundColor: '#0d3c47',
    fontFamily: "'Outfit', sans-serif",
    textAlign: "center",
  }, root1: {
    justify:"center",
    formControlLabel: {
      fontSize: '0.5em',
      lineHeight: '0.5em',
    }, borderRadius: 0,
    '& .MuiCardHeader-root': {
      color:"#fffefe",
      backgroundColor: "#1b798e",
      borderRadius: "0px",
      textAlign: "left",
      justify: "left",
      alignItems:"left",
      alignContent:"left",
      justify:"left",
      borderRadius: 0
    }, '& .MuiCardHeader-title': {
      fontSize: '1.5rem',
      fontFamily: "GlacialIndifference"
    }, '& .MuiCardHeader-subheader': {
      color:"#fffefe"
    }
  }, paper: {
    padding: theme.spacing(1.25),
    backgroundColor: "#e6ebec",
  }, keyword: {
    backgroundColor:"cyan", 
    width:"100%",padding:theme.spacing(1.25)
  }, login1: {
    border: 0,
    borderRadius: 5,
    backgroundColor: '#1b798e',
    color: '#ffffff',
    fontSize: '1rem',
    fontFamily: "'Outfit', sans-serif",
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922'
    }
  }, okay: {
    border: 0,
    borderRadius: 0,
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
      backgroundColor: '#229922'
    }, width: 80
  }, deleteButton: {
    border: 0,
    borderRadius: 5,
    backgroundColor: '#e6ebec',
    color: '#33202A',
    fontSize: '1rem',
    fontFamily: "'Outfit', sans-serif",
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#A31621',
    }
  }, menuPaper: {
    maxHeight: 150
  }, backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#ffffff'
  }
}));

const theme = createTheme({
  palette: {
    primary: {
      main: '#1b798e'
    }, secondary: {
      main: '#0d3c47'
    }
  }
});

export default function SEEDsCatalogue() {
  const classes = useStyles();

  const {setSelectedIndex, setLoadingDataCat} = useContext(SEEDSContext);
  const {loginDetails, groupPrivilege, sessionData, setSessionData} = useContext(AdminContext)
  const {dataCat, setDataCat, setDataShow, dataShow, brgys, setBrgys, selected, 
        setSelected, legendItems, setLegendItems, loadedMtd} = useContext(FeaturesContext)
  const {setSldBrgy} = useContext(MapContext);
  
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openWarningDialog, setOpenWarningDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openBackdrop, setOpenBackdrop] = useState(false);

  useEffect(() => {
    const fetchData = async() => {
      const res4 = await axios('https://seeds.geospectrum.com.ph/metadata/',);
      // const res4 = await axios('http://localhost:5000/metadata/',);

      setDataCat(res4.data);
      setDataShow(res4.data);
    }
    fetchData()
  }, [])
  
  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  const [state, setState] = useState({
    Social: true,
    Economic: true,
    Environmental: true,
    Demographic: true,
    Vector: true,
    Raster: true,
    Table: true,
    keywords: [],
  });

  const handleKeyChange = (e) => { // for keyword filter
    setState({ ...state,
    keywords: e.target.value})
  }

  var keywords = ["barangay", "purok", "points", "land use", "hazard zone", 
                  "disease", "employment", "facility", "person", "building"]
  const history = useHistory();
  
  const rows = []
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Data Name', width: 350 },
    { field: 'type', headerName: 'Type', width: 125, },
    { field: 'tag', headerName: 'Module',  width: 350, sortable: false},
    { field: 'keywords', headerName: 'Keywords', width: 350, sortable: false},
    { field: 'upload_date', headerName: 'Date Uploaded', width: 200 },
  ];
  
  const columns2csv = [
    { id: 'id', displayName: 'ID' },
    { id: 'name', displayName: 'Data Name' },
    { id: 'type', displayName: 'Type' },
    { id: 'tag', displayName: 'Module' },
    { id: 'keywords', displayName: 'Keywords' },
    { id: 'upload_date', displayName: 'Date Uploaded' }
  ];

  const { Social, Economic, Environmental, Demographic, Vector, Raster, Table } = state;
  
  useEffect(() => {
    setSelectedIndex(1)
    if (loading){
      if (brgys){
        setLoading(false)
        setLoadingDataCat(false)
        history.push('/seeds/mapportal')
        setSelectedIndex(2)
      }
    }
  }, [brgys])

  useEffect(()=> { // for filtering dataCat depending on state context
    if (dataCat){
      var filtered_datacat = dataCat.filter((x)=> {
        for (var i = 0; i < x.tag.length; i++){  // for module
          if (state[x.tag[i]]){
            return true
          }
        }
      })
  
      filtered_datacat = filtered_datacat.filter((x) => {
        if (state[x.type]){ // for data type
          return true
        }
      })

      if (state.keywords.length > 0){
        // for keywords
        filtered_datacat = filtered_datacat.filter((x) => {
          for (var i = 0; i < x.keywords.length; i++){  // for module
            if (state["keywords"].includes(x.keywords[i])){
              return true
            }
          }
        })

        setDataShow(filtered_datacat)
      } else {
        setDataShow(filtered_datacat)
      }
    }
  }, [state, dataCat])

  useEffect(() => {
    const interval = setInterval(() => {
      const saveSession = async() => {
        const res = await axios.post("https://seeds.geospectrum.com.ph/session/edit", sessionData)
        // const res = await axios.post("http://localhost:5000/session/edit", sessionData)
        .then(function(res) {
          if ('errors' in res) {
            alert(res.data.errors)
          }
        })
        .catch((error) => {
          // console.log(error)
        })
      }
      // saveSession()

    }, 1000);
  
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  })
  
  useEffect(() => {
    if (sessionData.catalogue){
      setState(sessionData.catalogue)
    }
  }, [])

  if( !state ) return null; 
  
  const searchTermChanged = (e) => {
    const {value} = e.target
    liveSearch(value)
    setSearchTerm(value);
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      e.preventDefault()
    }
  }

  const liveSearch = (searchTerm) => {
    setDataShow( searchTerm ? 
      dataCat.filter(data =>
        data.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || 
        data.id.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      ) : dataCat
    )
  }

  const handleClose = (loaded) => {  //para ma-display yung data sa mapa
    setSessionData({...sessionData, 
      map: {
        ...sessionData.map,
        layers: selected
      }
    })

    const fetchData = async (i) =>{
      const res = await axios.get(`https://seeds.geospectrum.com.ph/getdata/`,{params:{id: selected[i]}})
      const res2 = await axios.get(`https://seeds.geospectrum.com.ph/getdata/sld`,{params:{metadataID: selected[i]}})
      // const res = await axios.get(`http://localhost:5000/getdata/`,{params:{id: selected[i]}})
      // const res2 = await axios.get(`http://localhost:5000/getdata/sld`,{params:{metadataID: selected[i]}})

      var wantedKey = 'mtd_id'
      if (loadedMtd.length===0) {
        setSldBrgy(res2.data)
        setBrgys(brgys => [...brgys, res.data])
        var legendStyles = legendItems // weird na pag cinomment out ko to, nawawala yung ibang legend,
        await legendStyles.push(res2.data) // eh di ko naman ginamit. dahil sa await?
        setLegendItems([...legendItems])
      } else if (loadedMtd.length > 0 && selected.length>0) {          
        if (loadedMtd.includes(selected[i])) { // pag loaded na sa map, di na nya i-aadd. lalagay lang nya sa loaded na list.
          setLoading(false)
          setLoadingDataCat(false)
          loaded.push(selected[i])
          counter += 1
          if (counter === selected.length) { // wala pang laman yung loaded dito
            alert("These layers are already loaded to the map:\n\u2022  " + loaded.toString().replace(/,/g, '\n\u2022  '))
          }
        } else { // pag di pa loaded sa map, dito pupunta
          var barangay = res.data.filter((it) => it.properties[wantedKey] === selected[i])
          setLoading(false)
          setLoadingDataCat(false)
          history.push('/seeds/mapportal')
          setSelectedIndex(2)
          if (barangay.length>0) { 
            setBrgys(brgys => [...brgys, barangay])
          }
          if (res2.data['metadataID'] === selected[i]) {
            var legendStyles = legendItems // weird na pag cinomment out ko to, nawawala yung ibang legend,

            await legendStyles.push(res2.data) // eh di ko naman ginamit. dahil sa await?
            setLegendItems([...legendItems])
          }
          counter += 1
          if (counter === selected.length && loaded.length>0) {
            alert("These layers are already loaded to the map:\n\u2022  " + loaded.toString().replace(/,/g, "\n\u2022  "))
          }
        }
      } 
    }
    
    var counter = 0

    if (selected.length > 1){
      for (var i = 0; i < selected.length; i++){
        fetchData(i)
      }
    } else {
      fetchData(0)
    }
    setLoading(true)
    setLoadingDataCat(true)
  };

  const handleAddToMap = async () => {
    setOpenBackdrop(true);
    var loaded = []
    const res = await axios.get(`https://seeds.geospectrum.com.ph/metadata/checkData`,{params:{selected: selected}})
    // const res = await axios.get(`http://localhost:5000/metadata/checkData`,{params:{selected: selected}})
    if (res.data.length > 0) {handleOpenWarningDialog(); setLoadingDataCat(false)} else handleClose(loaded)
  }

  const handleChange = (event) => { // for module and data type filter
    setState({ ...state, [event.target.name]: event.target.checked });
    setSessionData({...sessionData, 
      catalogue: { 
        ...state, 
        [event.target.name]: event.target.checked
      }
    })    
  };
  
  const GreenCheckbox = withStyles({
    root: {
      color: '#1b798e',
      '&$checked': {
        color: '#1b798e',
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);


  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  }

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  }

  const DeleteDialog = () => {
    const [textFieldContent, setTextFieldContent] = React.useState("");

    const handleDeleteData = () => {
      if (textFieldContent === selected[0]) {
        setLoadingDelete(true)
        setOpenBackdrop(true)
        axios.post('https://seeds.geospectrum.com.ph/getdata/delete', {"id": textFieldContent})
        // axios.post('http://localhost:5000/getdata/delete', {"id": textFieldContent})
        .then(async (res) => {
          const res4 = await axios('https://seeds.geospectrum.com.ph/metadata/',); //ito yung gagamitin pag sa web yung server
          // const res4 = await axios('http://localhost:5000/metadata/',); //ito yung gagamitin pag sa web yung server
          setDataCat(res4.data);
          setDataShow(res4.data);
          setLoadingDelete(false)

          alert(res.data)
        }).catch(error => console.log(error))
      }
      else {
        alert("Incorrect Metadata")
      }
      setOpenDeleteDialog(false);
    }

    return (
      selected.length === 1 ?
      <Paper elevation={0} style={{height:250, width:400}}>
        <div className={classes.root}>
          <Toolbar className={classes.appbar}>
            <Typography className={classes.appbarTitle} style={{fontSize:20, textAlign:"center"}}>
              Delete Data
            </Typography>
          </Toolbar>
          <DialogContent align='center'>
            <Typography style={{fontSize:18, textAlign:"center"}}>
              Please type Metadata ID to delete.
            </Typography>
            <Typography style={{fontSize:18, textAlign:"center"}}>
              (ex. MTD0xx)
            </Typography>
            <TextField value={textFieldContent} 
              onChange={e=>setTextFieldContent(e.target.value)} />
          </DialogContent>
          <DialogActions>
          
            <Button className={classes.login1} variant="contained" 
              onClick={handleCloseDeleteDialog} color="primary">
              Cancel
            </Button>

            <Button className={classes.deleteButton} variant="contained" 
              onClick={handleDeleteData} color="primary" >
              Delete
            </Button>
          </DialogActions>
        </div>
      </Paper>
      : <Paper elevation={0} style={{height:250, width:400}}>
        <div className={classes.root}>
          <Toolbar className={classes.appbar}>
            <Typography className={classes.appbarTitle} style={{fontSize:20, textAlign:"center"}}>
              Multiple SEED Data Selected
            </Typography>
          </Toolbar>  
          <DialogContent >
            <br></br>
            <Typography style={{fontSize:18, textAlign:"center"}}>
              Sorry, you can only delete one (1) SEED Data at a time
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button className={classes.okay} variant="contained" 
              onClick={handleCloseDeleteDialog} color="primary" >
              Okay
            </Button>
          </DialogActions>
        </div>
      </Paper>
    );
  }

  const WarningDialog = () => {
    return (
      <Paper elevation={0} style={{height:250, width:400}}>
        <div className={classes.root}>
          <Toolbar className={classes.appbar}>
            <Typography className={classes.appbarTitle} style={{fontSize:20, textAlign:"center"}}>
              Non-Shapefile Data Selected
            </Typography>
          </Toolbar>
          <DialogContent align='center'>
            <br/>
            <Typography style={{fontSize:18, textAlign:"center",}}>
              Sorry, you can only add shapefile data to the map. Please check your inputs.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button className={classes.okay} variant="contained" onClick={handleCloseWarningDialog} 
              color="primary" style={{backgroundColor: "#025e73", alignSelf:"center"}}>
              Okay
            </Button>
          </DialogActions>
        </div>
      </Paper>
    );
  }

  const handleCloseWarningDialog = () => {
    setOpenWarningDialog(false);
  }

  const handleOpenWarningDialog = () => {
    setOpenWarningDialog(true);
  }

  return (
    <>
      <Grid direction="row" container justifyContent="center" alignItems="center" style={{minHeight:"93.1vh"}}>
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DeleteDialog />
        </Dialog>

        <Dialog open={openWarningDialog} onClose={handleCloseWarningDialog}>
          <WarningDialog />
        </Dialog>

        <Grid item xs={12} md={8} lg={10} style={{padding:15}} >
          <Paper style={{height:"100%", borderRadius:5}} className={classes.root1}>
            <Card style={{color:"#FFFEFE", backgroundColor:"#1b798e"}} >
              <CardHeader titleTypographyProps={{style: {fontFamily:"'Outfit', sans-serif", fontWeight:100}}}
                subheaderTypographyProps={{style: {color:"#fffefe"}}} title="SEEDs Catalogue"
                subheader="This module shows all data uploaded through SEEDs Populate."/>
            </Card><br></br>
            <form noValidate>
              <TextField label="Search" variant="outlined" size="medium" 
                style={{width:"100%", justify: "center"}} value={ searchTerm } 
                onChange={e => searchTermChanged(e)} onKeyPress={e => handleKeyPress(e)} 
                InputProps={{ startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary"/>
                  </InputAdornment>)}
                }/>
            </form>
            <div style={{minHeight: "96vh"}}  >
              {/* {dataShow ? 
                <DataGrid rowHeight={30} pagination rowsPerPageOptions={[25, 50, 100]} className={classes.root} 
                  rows={dataShow} columns={columns} style={{ cursor: 'pointer', height: '60vh' }} 
                  onSelectionModelChange={(newSelectionModel) => {
                    setSelected(newSelectionModel);
                  }} selectionModel={selected}
                  checkboxSelection={(params) => {
                    return (params.row.type === "Vector")
                  }} isRowSelectable={false}/>
                : <DataGrid pagination rows={rows} columns={columns} 
                  rowsPerPageOptions={[25, 50, 100]} checkboxSelection loading="true"/>
              }  */}
              <CsvDownloader style={{left:10, top: 590, width:210}} filename={"exportedData"} 
                datas={dataShow} columns={columns2csv} wrapColumnChar={`"`}>
                <Button className={classes.login1} variant="contained" disabled={!dataShow || !columns2csv} 
                  startIcon={<img src={ExportToCSVIcon} style={{width:35}}/>}>
                  Export to CSV
                </Button>
              </CsvDownloader>  
            </div>        
          </Paper>
        </Grid>
                  
        <Grid item xs={10} sm={6} md={4} lg={2} xl={2} style={{paddingTop:15, paddingRight:15, paddingBottom:15}}> 
          <Paper style={{minHeight:800, borderRadius:5, height:"100%"}} className={classes.root1}>
            <Card style={{color:"#FFFEFE", backgroundColor:"#1b798e"}}>
              <CardHeader titleTypographyProps={{style: {fontWeight:100}}}
                subheaderTypographyProps={{style: {color:"#fffefe"}}}
                title="Filter" subheader="Filter data from SEEDs Catalogue"/>
            </Card><br/>
            <Grid container direction="column" justifyContent="space-around" alignItems="center" spacing={3} >
              <Grid item xs={12} style={{width:"90%"}}>
                <FormControl focused variant="outlined" size="small" fullWidth>
                  <InputLabel focused>Keywords</InputLabel>
                  <Select onChange={handleKeyChange} fullWidth label="Keywords" multiple value={state.keywords}
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left"
                      }, transformOrigin: {
                        vertical: "top",
                        horizontal: "left"
                      }, getContentAnchorEl: null,
                      classes: { paper: classes.menuPaper }
                    }} required renderValue={(selected) => (
                      <div className={classes.chips}>
                        {selected.map((value) => (
                          <Chip variant="outlined" key={value} label={value} className={classes.chip} />
                        ))}
                      </div>
                    )}>
                    {keywords.map((name) => (
                      <MenuItem variant="outlined" key={name} value={name} 
                        style={getStyles(name, state.keywords, theme)}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} style={{width:"90%"}}>
                <Paper className={classes.paper}>
                  <FormControl>
                    <FormLabel>Module/s</FormLabel>
                    <FormGroup>
                      <FormControlLabel control={<GreenCheckbox checked={Social} 
                        onChange={(event)=>handleChange(event)} name="Social" />}
                        label="Social"/>
                      <FormControlLabel control={<GreenCheckbox checked={Economic} 
                        onChange={(event)=>handleChange(event)} name="Economic" />}
                        label="Economic"/>
                      <FormControlLabel control={<GreenCheckbox checked={Environmental} 
                        onChange={(event)=>handleChange(event)} name="Environmental" />}
                        label="Environmental"/>
                      <FormControlLabel control={<GreenCheckbox checked={Demographic} 
                        onChange={(event)=>handleChange(event)} name="Demographic" />}
                        label="Demographic"/>
                    </FormGroup>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item xs={12} style={{width:"90%"}}>
                <Paper className={classes.paper}>
                  <FormControl>
                    <FormLabel>Data Type/s</FormLabel><br></br>
                    <FormGroup>
                      <FormControlLabel label="Vector (.shp)" control={<GreenCheckbox checked={Vector} 
                        onChange={(event)=>handleChange(event)} name="Vector" />}/>
                      <FormControlLabel label="Table (.csv)" control={<GreenCheckbox checked={Table} 
                        onChange={(event)=>handleChange(event)} name="Table" />}/>
                    </FormGroup>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item xs={12} style={{width:"90%"}}>
                <Button disabled={!selected || !selected.length>0} fullWidth 
                  className={classes.login1} onClick={handleAddToMap}>
                  ADD TO MAP
                </Button>
              </Grid >
              <Grid item xs={12} style={{width:"90%"}}>
                {loginDetails && groupPrivilege.length > 0 ? 
                JSON.parse(localStorage.getItem('user')).user_type.user_group_type ? 
                JSON.parse(localStorage.getItem('user'))
                  .user_type.privileges.includes(
                    groupPrivilege.find(o => o.privilege_name === 'Delete Data')._id
                  ) ? (<Button disabled={!selected || !selected.length>0} 
                    fullWidth className={classes.deleteButton} 
                    onClick={handleOpenDeleteDialog}>DELETE</Button>) 
                  : null : null : null
                }
              </Grid>
            </Grid>
        </Paper>
      </Grid>
    </Grid>

    {loading? <Backdrop className={classes.backdrop} open={openBackdrop} onClick={handleCloseBackdrop}>
        <CircularProgress />
      </Backdrop>
    : null}

    {loadingDelete? <Backdrop className={classes.backdrop} open={openBackdrop} onClick={handleCloseBackdrop}>
        <CircularProgress />
      </Backdrop>
    : null}
    </>
  );
}