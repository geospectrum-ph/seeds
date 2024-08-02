import React, {useEffect, useContext, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Button, Grid, Paper, Card, CardHeader, LinearProgress}  from '@material-ui/core';
import { Checkbox, FormGroup, FormLabel, FormControl, FormControlLabel } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { TextField, InputAdornment, Select, MenuItem, Chip, Backdrop, Toolbar, Typography, Dialog, DialogActions, DialogContent} from '@material-ui/core/';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { InputLabel }  from '@material-ui/core';
import './index.css';
import { HashRouter as Router, Switch, Route, Link, useHistory} from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search'
import CircularProgress from '@material-ui/core/CircularProgress';

// import contexts
import { SEEDSContext } from '../../../context/SEEDSContext'
import { MapContext } from '../../../context/MapContext'
import { FeaturesContext } from '../../../context/FeaturesContext'

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const parseDate = (date) => {
  var splitdate = date.toLocaleString().split(",")[0].split("/")
  return (pad(splitdate[2],4).concat(pad(splitdate[0],2)).concat(pad(splitdate[1],2)))
};

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}


const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 400,
    width: '100%',
    flexGrow: 1,
  },
  appbarTitle:{
    flexGrow: '1',
    color: '#fffefe',
    fontFamily:'LeagueSpartan',
  },
  appbar: {
    backgroundColor: '#0d3c47',
    fontFamily:'LeagueSpartan',
    textAlign: "center",
    // fontSize: "1.25rem",
  }, 
  root1: {
    justify:"center",
    formControlLabel: {
    fontSize: '0.5em',
    height: '0.5em',
    lineHeight: '0.5em',
  },
  
  borderRadius: 0,
    '& .MuiCardHeader-root': {
      // color:"#fffefe",
      // backgroundColor:"#1b798e",
      color:"#fffefe",
      // backgroundColor:"#fffefe",
      backgroundColor: "#1b798e",
      borderRadius: "0px",
      textAlign: "left",
      justifyContent: "left",
      alignItems:"left",
      alignContent:"left",
      justify:"left",
    },
    '& .MuiCardHeader-title': {
      fontSize: '1.5rem',
      fontFamily: "GlacialIndifference",
    },
    '& .MuiCardHeader-subheader': {
      color:"#fffefe",
    }
  },
  marginTop: {
    marginTop: theme.spacing(1),
    width: '100%',
  },
  grid: {
    height: "92vh",
    backgroundColor: "#fffefe",
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    backgroundColor: "#e6ebec",
    color: theme.palette.text.secondary,
    width: "12.5vw",
    // width: "210px",
    // height: "200px",
  },
  login1: {
    border: 0,
    borderRadius: 0,
    width: "12.5vw",
    backgroundColor: '#1b798e',
    color: '#ffffff',
    fontSize: '1rem',
    height: '5vh',
    top: '2vh',
    padding: '0 30px',
    fontFamily:'LeagueSpartan',
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922',
    }
  },
  okay: {
    border: 0,
    // width: "12.5vw",
    borderRadius: 0,
    backgroundColor: '#1b798e',
    color: '#ffffff',
    fontSize: '1rem',
    height: '5vh',
    top: '2vh',
    padding: '0 30px',
    fontFamily:'LeagueSpartan',
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922',
    }
  },
  deleteButton: {
    border: 0,
    borderRadius: 0,
    backgroundColor: '#e6ebec',
    color: '#33202A',
    fontSize: '1rem',
    height: '5vh',
    width: "12.5vw",
    top: '2vh',
    padding: '0 30px',
    fontFamily:'LeagueSpartan',
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#A31621',
    }
  },
  menuPaper: {
    maxHeight: 150
  },
  buttonProgress: {
    color: '#0d3c47',
    position: 'absolute',
    top: '100%',
    left: '100%',
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  linearProgress: {
    // color: green[500],
    position: 'absolute',
    top: '50%',
    // left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1b798e',
    },
    secondary: {
      main: '#0d3c47',
    },
  },
});

export default function DataCatalogue() {
  const classes = useStyles();
  const { selectedIndex, setSelectedIndex } = React.useContext(FeaturesContext);
  const [open, setOpen] = React.useState(false);
  const {dataCat, setDataCat, setDataShow, dataShow, brgys, setBrgys, setSelect, selected, setSelected, layerList, setLayerList, legendItems, setLegendItems} = React.useContext(FeaturesContext)
  const [list, setList] = React.useState([])
  const [clicked, setClicked] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loadingDelete, setLoadingD] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openWarningDialog, setOpenWarningDialog] = React.useState(false);
  const [toDelete, setToDelete] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [state, setState] = React.useState({
    Social: true,
    Economic: true,
    Environmental: true,
    Demographic: true,
    Vector: true,
    Raster: true,
    Table: true,
    keywords: [],
  });

  const handleKeyChange = (e) => {
    setState({ ...state,
    keywords: e.target.value})
    setDataShow(dataCat.filter((x) => {
      for (var i = 0; i < e.target.value.length; i++){
        if (x.keywords.includes(e.target.value[i])){
          return x.keywords.includes(e.target.value[i])
        }
      }
    }))
  }
  var keywords = ["barangay", "purok", "points", "land use", "hazard zone", "disease", "employment", "facility", "person", "building"]
  const history = useHistory();
  
  // console.log(state.keywords)
  // console.log(dataCat, dataShow)

  const rows = []
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Data Name', width: 250 },
    { field: 'type', headerName: 'Data Type', width: 200 },
    { field: 'tag', headerName: 'Module', width: 200 },
    { field: 'keywords', headerName: 'Keywords', width: 200 },

  ];

  const { Social, Economic, Environmental, Demographic, Vector, Raster, Table } = state;

  
  useEffect(() => {
    if (loading){
      if (brgys){
        setSelect('SEEDs Map Portal')
        setLoading(false)
        history.push('/map/seedsmapportal')
        setSelectedIndex(2)

      }
    }
    
  }, [brgys])
  
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
  const handleClickOpen = () => {
    setOpen(true);

  };


  const handleClose = () => {  //para ma-display yung data sa mapa
    const fetchData = async (i) =>{
      const res = await axios.get(`http://localhost:5000/getdata/`,{params:{id: selected[i]}})
      const res2 = await axios.get(`http://localhost:5000/getdata/sld`,{params:{metadataID: selected[i]}})

      // const res = await axios.get(`https://seeds.geospectrum.com.ph/getdata/`,{params:{id: selected[i]}})
      // const res2 = await axios.get(`https://seeds.geospectrum.com.ph/getdata/sld`,{params:{metadataID: selected[i]}})

      setBrgys(brgys.concat(res.data))
      var legendStyles = legendItems // weird na pag cinomment out ko to, nawawala yung ibang legend,
      await legendStyles.push(res2.data) // eh di ko naman ginamit. dahil sa await?
      setLegendItems([...legendItems])
      // setLegendItems([...legendItems, res2.data])
    }
    if (selected.length > 1){
      for (var i = 0; i < selected.length; i++){
        // console.log(i)
        fetchData(i)
      }
    } else {
      fetchData(0)
    }
    setLoading(true)
    // setSelectedIndex(2)
    // setSelect(selectedIndex === 2)



  };

  const handleAddToMap = async () => {
    const res = await axios.get(`http://localhost:5000/metadata/checkData`,{params:{selected: selected}})
    // const res = await axios.get(`https://seeds.geospectrum.com.ph/metadata/checkData`,{params:{selected: selected}})
    if (res.data.length > 0) {handleOpenWarningDialog()} else handleClose()
  }

  const handleChange = (event) => { //
    setState({ ...state, [event.target.name]: event.target.checked });
    
    var tags = ['Social', 'Demographic', 'Environmental', 'Economic'];
    if (tags.includes(event.target.name)){
      if (event.target.checked){
        setDataShow( dataCat.filter((x)=> {
          const there = [];
          for (var i = 0; i < x.tag.length; i++){ 
            if (state[x.tag[i]]){
              there.push(x.tag[i])
            }
          }
          return x.tag.includes(event.target.name) || there.length > 0
        }))
      } else{
        // setDataShow( dataCat.filter((x)=> {
        //   return !x.tag.includes(event.target.name) && state[x.type]
        // }))
        setDataShow( dataCat.filter((x)=> {
          const there = [];
          for (var i = 0; i < x.tag.length; i++){
            if (state[x.tag[i]]){
              there.push(x.tag[i])
            }
          }
          // console.log(there)
          return !x.tag.includes(event.target.name) && there.length > 0
        }))
      }
    } else {
      setDataShow( dataCat.filter((x)=> {
        // console.log("kyeme", state[x.type], x.type)
        if (!state[x.type] && event.target.name === x.type){
          return x
        } else if (event.target.name !== x.type && state[x.type]){
          return x
        }
      }))
    }
    
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

  

  const handleStartDateChange = (date) => {

    const fetchData = async() => {
      const res = await axios(`http://localhost:5000/healthmapper/brgy/single`, 
      {params: {brgy_id: healthLoc,
                startdate: parseDate(date),
                enddate: endDate}}); //ito yung gagamitin pag sa web yung server

      setJobSelect(res.data)

      const res_graph = await axios(`http://localhost:5000/jobmapper/graph`, 
      {params: {brgy_id: healthLoc}} );
      // console.log(res_graph.data.values);
      setJobMapperGraph(res_graph.data.values)
    }

    fetchData();
    setStartDateLocal(date);
    setStartDate(parseDate(date));
      // console.log(res_graph.data.values);


  };
  const handleEndDateChange = (date) => {

    const fetchData = async() => {
      const res = await axios.get('http://localhost:5000/jobmapper/brgy/single',
      {params: {brgy_id: healthLoc,
                startdate: startDate,
                enddate: parseDate(date)}}); //ito yung gagamitin pag sa web yung server

      setJobSelect(res.data)
      // console.log("HEALTH SELECT");
      // console.log(healthSelect)

      const res_graph = await axios.get('http://localhost:5000/jobmapper/graph',
      {params: {brgy_id: healthLoc}} );
      // console.log(res_graph.data);
      setJobMapperGraph(res_graph.data.values)
    }
    fetchData();
    setEndDateLocal(date);
    setEndDate(parseDate(date));
    // console.log("date",startDate, endDate)

  };

  // const handleStartDateChange = (date) => {

  //   const fetchData = async() => {
  //     const res = await axios(`https://seeds.geospectrum.com.ph/healthmapper/brgy/single`, 
  //     {params: {brgy_id: healthLoc,
  //               startdate: parseDate(date),
  //               enddate: endDate}}); //ito yung gagamitin pag sa web yung server

  //     setJobSelect(res.data)

  //     const res_graph = await axios(`https://seeds.geospectrum.com.ph/jobmapper/graph`, 
  //     {params: {brgy_id: healthLoc}} );
  //     // console.log(res_graph.data.values);
  //     setJobMapperGraph(res_graph.data.values)
  //   }

  //   fetchData();
  //   setStartDateLocal(date);
  //   setStartDate(parseDate(date));
  //     // console.log(res_graph.data.values);


  // };
  // const handleEndDateChange = (date) => {

  //   const fetchData = async() => {
  //     const res = await axios.get('https://seeds.geospectrum.com.ph/jobmapper/brgy/single',
  //     {params: {brgy_id: healthLoc,
  //               startdate: startDate,
  //               enddate: parseDate(date)}}); //ito yung gagamitin pag sa web yung server

  //     setJobSelect(res.data)
  //     // console.log("HEALTH SELECT");
  //     // console.log(healthSelect)

  //     const res_graph = await axios.get('https://seeds.geospectrum.com.ph/jobmapper/graph',
  //     {params: {brgy_id: healthLoc}} );
  //     // console.log(res_graph.data);
  //     setJobMapperGraph(res_graph.data.values)
  //   }
  //   fetchData();
  //   setEndDateLocal(date);
  //   setEndDate(parseDate(date));
  //   // console.log("date",startDate, endDate)

  // };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  }

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  }

  const DeleteDialog = () => {
    const [textFieldContent, setTextFieldContent] = React.useState("");

    const handleDeleteData = () => {
      if (textFieldContent == selected[0]) {
        axios.post('http://localhost:5000/getdata/delete', {"id": textFieldContent})
        // axios.post('https://seeds.geospectrum.com.ph/getdata/delete', {"id": textFieldContent})
        .then(async (res) => {
          const res4 = await axios('http://localhost:5000/metadata/',); //ito yung gagamitin pag sa web yung server
          // const res4 = await axios('https://seeds.geospectrum.com.ph/metadata/',); //ito yung gagamitin pag sa web yung server
          setDataCat(res4.data);
          setDataShow(res4.data);
          alert(res.data)
        })
        .catch(error => {
          // console.log(error)
      })
      }
      setOpenDeleteDialog(false);
    }

    return (
      
      (selected.length == 1) ?
        <Paper elevation={0} style={{ height:250, width:400}}>
          <div className={classes.root}>
          <Toolbar className={classes.appbar}>
          <Typography className={classes.appbarTitle} style={{fontSize:20, textAlign:"center", }}>Delete Data</Typography>
          </Toolbar>
          <DialogContent align='center'>
              <Typography style={{fontSize:18, textAlign:"center"}}>Please type Metadata ID to delete.</Typography>
              <Typography style={{fontSize:18, textAlign:"center"}}>(ex. MTD0xx)</Typography>

              <TextField value={textFieldContent} onChange={e=>setTextFieldContent(e.target.value)} />
          </DialogContent>
          <DialogActions>
            <Button className={classes.deleteButton} variant="contained" onClick={handleDeleteData} color="primary" >
              Delete
            </Button>
            <Button className={classes.login1} variant="contained" onClick={handleCloseDeleteDialog} color="primary" >
              Cancel
            </Button>
            </DialogActions>
            </div>
        </Paper>
        : <Paper elevation={0} style={{height:250, width:400}}>
            <div className={classes.root}>
          <Toolbar className={classes.appbar}>
          <Typography className={classes.appbarTitle} style={{fontSize:20, textAlign:"center", }}>Multiple SEED Data Selected</Typography>


          </Toolbar>
            
            <DialogContent >
              <br></br>
                <Typography style={{fontSize:18, textAlign:"center"}}>Sorry, you can only delete one (1) SEED Data at a time</Typography>
            </DialogContent>
            <DialogActions>
              <Button className={classes.okay} variant="contained" onClick={handleCloseDeleteDialog} color="primary" >
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
          <Typography className={classes.appbarTitle} style={{fontSize:20, textAlign:"center", }}>Non-Shapefile Data Selected</Typography>
          </Toolbar>
        {/* <Typography style={{fontSize:20, textAlign:"center", }}>Non-Shapefile Data Selected</Typography> */}
        <DialogContent align='center'>
              <br></br>

            <Typography style={{fontSize:18, textAlign:"center",}}>Sorry, you can only add shapefile data to the map. Please check your inputs.</Typography>
        </DialogContent>
        <DialogActions>
          <Button className={classes.okay} variant="contained" onClick={handleCloseWarningDialog} color="primary" style={{backgroundColor: "#025e73"}}>
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

  const { healthLoc, setHealthLoc }  = useContext(MapContext);

  const { setJobSelect, setJobMapperGraph , healthSelect} = useContext(FeaturesContext);

  // react nice dates
  const {startDate, setStartDate, endDate, setEndDate} = useContext(SEEDSContext);
  const [startDateLocal, setStartDateLocal] = useState(null);
  const [endDateLocal, setEndDateLocal] = useState(null);
  // setSelectedIndex(1)
  // console.log(selectedIndex,"seleced index")

  return (
    <ThemeProvider theme={theme}>
      <div style={{width: window.innerWidth - 69}}>
        <Grid container xs ={12} justify="center" alignItems="center"className={classes.grid} style={{backgroundColor:"#e6ebec"}}>
          <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} aria-labelledby="form-dialog-title" >
            <DeleteDialog />
          </Dialog>

          <Dialog open={openWarningDialog} onClose={handleCloseWarningDialog} aria-labelledby="form-dialog-title" >
            <WarningDialog />
          </Dialog>

          <Grid container xs={10} 
          // direction="column"
          justify="center"   
          alignItems="center"   
          className={classes.root1} 

          >
            <Paper style={{ height: '80vh', width:"95%", borderRadius:2, 
            }}>
              <Card className={classes.root}>
                <CardHeader
                  title="SEEDs Catalogue"
                  subheader="This module shows all data uploaded through SEEDs Populate."
                  // subheader="Last Updated: September 14, 2016"
                />
              </Card><br></br>
              <form noValidate>
                <TextField  label="Search" variant="outlined" size="large" style={{width:"100%", justify: "center"}} value={ searchTerm } 
                  onChange={e => searchTermChanged(e)} onKeyPress={e => handleKeyPress(e)} 
                  InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                    <SearchIcon color="primary"/>
                    </InputAdornment>)}}/>
              </form>
              <div style={{ height: 535, width: '100%' }}>
                {dataShow ? 
                  <DataGrid rowHeight={25} pagination pageSize={20} rowsPerPageOptions={[5, 10, 20, 30, 40]} className={classes.root} rows={dataShow} columns={columns} style={{ cursor: 'pointer' }} checkboxSelection
                    onSelectionChange={(newSelection) => {
                    setSelected(newSelection.rowIds);
                    setLayerList(dataShow.filter((d)=>{
                      return newSelection.rowIds.includes(d.id)
                    }))
                    // console.log(layerList)
                  }
                }
                />:<DataGrid pagination rows={rows} columns={columns} pageSize={5} checkboxSelection loading="true"/>}  
              </div>                   
            </Paper>
          </Grid>
                  
          {/* right side */}
          <Grid container xs={2} className={classes.root1}> 
            <Paper style={{backgroundColor:"#fffefe", height: '80vh', borderRadius:5, width:"95%", textAlign:"center"}} >
              <Card className={classes.root}>
                <CardHeader title="Filter" 
                  subheader="Filter data from SEEDs Catalogue"
                  />
              </Card><br></br>
              <Grid container justify="center" alignItems="center" className={classes.marginTop}>
                <Grid item xs = {10} >
                  <FormControl focused variant="outlined" fullWidth size="small" >
                    <InputLabel focused InputLabelProps={{ shrink: true,}} >Keywords</InputLabel>
                    <Select 
                      MenuProps={{
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left"
                        },
                        transformOrigin: {
                          vertical: "top",
                          horizontal: "left"
                        },
                        getContentAnchorEl: null,
                        classes: { paper: classes.menuPaper }
                      }}
                    
                      required multiple value={state.keywords} onChange={handleKeyChange} fullWidth label="Keywords"
                      renderValue={(selected) => (
                      <div className={classes.chips}>
                          {selected.map((value) => (
                            <Chip variant="outlined" key={value} label={value} className={classes.chip} />
                          ))}
                      </div>
                      )} >
                      {keywords.map((name) => (
                        <MenuItem variant="outlined" key={name} value={name} style={getStyles(name, state.keywords, theme)}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs ={12} container direction="row" justify="center">
                  <Grid item >
                    <Paper className={classes.paper}>
                      <FormControl component="fieldset" >
                      <FormLabel component="legend">Module/s</FormLabel>
                        <FormGroup >
                          <FormControlLabel control={<GreenCheckbox checked={Social} onChange={(event)=>handleChange(event)} name="Social" />}
                            label="Social"/>
                          <FormControlLabel control={<GreenCheckbox checked={Economic} onChange={(event)=>handleChange(event)} name="Economic" />}
                            label="Economic"/>
                          <FormControlLabel control={<GreenCheckbox checked={Environmental} onChange={(event)=>handleChange(event)} name="Environmental" />}
                            label="Environmental"/>
                          <FormControlLabel control={<GreenCheckbox checked={Demographic} onChange={(event)=>handleChange(event)} name="Demographic" />}
                            label="Demographic"/>
                        </FormGroup>
                      </FormControl>
                    </Paper>
                  </Grid>
                  <Grid item>
                    <Paper className={classes.paper}>
                      <FormControl component="fieldset" >
                      <FormLabel component="legend">Data Type/s</FormLabel><br></br>
                        <FormGroup>
                          <FormControlLabel control={<GreenCheckbox checked={Vector} onChange={(event)=>handleChange(event)} name="Vector" />}
                            label="Vector (.shp)"/>
                          {/* <FormControlLabel control={<GreenCheckbox checked={Raster} onChange={(event)=>handleChange(event)} name="Raster" />}
                            label="Raster (.tif)"/> */}
                          <FormControlLabel control={<GreenCheckbox checked={Table} onChange={(event)=>handleChange(event)} name="Table" />}
                            label="Table (.csv)"/>
                        </FormGroup>
                      </FormControl>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid item className={classes.wrapper}>
                  {selected ? selected.length > 0 ?
                  <>
                  <Button className={classes.login1} onClick={handleAddToMap}>ADD TO MAP</Button>
                   {loading? <LinearProgress />:null}</>:null: null}
                </Grid>
                <Grid xs={12} style={{padding:5}}/>
                  <Grid item className={classes.wrapper} >
                    {selected ? selected.length > 0 ?
                    <>
                    <Button className={classes.deleteButton} onClick={handleOpenDeleteDialog}>DELETE</Button>
                      {loadingDelete?<LinearProgress />:null}</>:null:null}
                  </Grid>
                </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}