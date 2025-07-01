import React, { useState, useContext, useEffect} from 'react';
import axios from 'axios';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, withStyles, createTheme } from '@material-ui/core/styles';
import { Button, Toolbar, Typography, Grid, FormControlLabel, FormControl, FormLabel, Checkbox, 
        FormGroup, Paper, Select, InputLabel, TextField, MenuItem, Chip, Dialog, DialogActions, 
        DialogContent, Stepper, Step, StepLabel, StepConnector } from '@material-ui/core';

import _without from "lodash/without";

import './index.css'

import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import CancelIcon from "@material-ui/icons/Cancel";

import LoadingPage from '../../loadingPage'
import ExternalDatabase from './externalDatabase'

import { SEEDSContext } from '../../../context/SEEDSContext';
import { AdminContext } from '../../../context/AdminContext';
import { FeaturesContext } from '../../../context/FeaturesContext'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1b798e',
    }, secondary: {
      main: '#0d3c47',
    }
  }
});

const GreenCheckbox = withStyles({
  root: {
    color: '#1b798e',
    '&$checked': {
      color: '#1b798e'
    }
  }, checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center'
  }, active: {
    color: '#1b798e',
  }, circle: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: 'currentColor'
  }, completed: {
    color: '#1b798e',
    zIndex: 1,
    fontSize: 18
  }
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div className={clsx(classes.root, {
        [classes.active]: active,
      })}>
      {completed ? 
        <Check className={classes.completed}/>
        : <div className={classes.circle}/>
      }
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool
};

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  }, active: {
    '& $line': {
      backgroundImage: 'linear-gradient( 136deg, #1b798e 0%, #1b798e 50%, #1b798e 100%)',
    }
  }, completed: {
    '& $line': {
      backgroundImage: 'linear-gradient( 136deg, #1b798e 0%, #1b798e 50%, #1b798e 100%)'
    }
  }, line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1
  }
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  }, active: {
    backgroundImage: 'linear-gradient( 136deg, #1b798e 0%, #1b798e 50%, #1b798e 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  }, completed: {
    backgroundImage: 'linear-gradient( 136deg, #1b798e 0%, #1b798e 50%, #1b798e 100%)'
  }
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />
  };

  return (
    <div className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}>
      {icons[String(props.icon)]}
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    flexGrow: 1
  }, rootSecondSelect: {
    paddingTop: 42,
    paddingBottom: 15,
    paddingLeft: 20
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
      backgroundColor: '#229922'
    }
  }, popbrowse: {
    border: 0,
    borderRadius: 5,
    backgroundColor: '#1b798e',
    color: '#ffffff',
    fontSize: '1.4rem',
    textAlign: "center",
    justify:"center",
    padding: '20px', //tb lr
    fontFamily: "'Outfit', sans-serif",
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922',
    }
  }, popbrowse2: {
    border: 0,
    borderRadius: 5,
    backgroundColor: '#1b798e',
    color: '#ffffff',
    fontSize: '1rem',
    textAlign: "center",
    justify:"center",
    padding: '10px', //tb lr
    fontFamily: "'Outfit', sans-serif",
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922'
    }
  }, appbarTitle:{
    flexGrow: '1',
    color: '#fffefe',
    fontFamily: "'Outfit', sans-serif",
    fontSize:20
  }, appbar: {
    backgroundColor: '#0d3c47',
    fontFamily: "'Outfit', sans-serif",
    textAlign: "center",
  }, addtomap: {
    border: 0,
    borderRadius: 5,
    backgroundColor: '#1b798e',
    color: '#ffffff',
    fontSize: '1.2rem',
    textAlign: "center",
    justify:"center",
    fontFamily: "'Outfit', sans-serif",
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922',
    }
  }, '& .MuiTypography-h3': {
    fontFamily: "GlacialIndifference",
    fontSize: "0.9rem",
    color: '#0c343d',
    '&:hover': {
      color: '#0c343d',
    }
  }, backButton: {
    borderRadius: 5,
    backgroundColor: '#e6ebec',
    borderColor:'#1b798e',
    color: '#1b798e',
    textAlign: "center",
    padding: '9px 18px',
    fontFamily: "'Outfit', sans-serif",
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922',
    }
  }, menuPaper: {
    maxHeight: 200
  }
}));

function getStyles(name, specificName, theme) {
  return {
    fontWeight:
      specificName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function getSteps() {
  return ['Mandatory Metadata', 'Location & Licenses', 'Optional Metadata'];
}

export default function SeedsPopulate() {
  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const steps = getSteps();

  const {setDataCat, setDataShow,openDBDialog, setOpenDBDialog} = useContext(FeaturesContext)
  const {sessionData, setSessionData, sessionFile, setSessionFile} = useContext(AdminContext)

  const [state, setState] = useState({
    mapName: '',
    file: '',
    social: false,
    economic: false,
    environmental: false,
    demographic: false,
    type: '',
    keywords: [],
    description: '',
    language: '',
    license: '',
    doi: '',
    attribution: '',
    regions: '',
    dqs: '',
    restrictions: '',
    constraints: '',
    details: ''
  });

  useEffect(() => {
    if (sessionData.populate){
      setState(sessionData.populate)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const saveSession = async() => {
        const res = await axios.post("https://seeds.geospectrum.com.ph/session/edit", sessionData)
        // const res = await axios.post("http://localhost:5000/session/edit", sessionData)
        .then(function(res) {
          if ('errors' in res) {
            // console.log("errors:")
            alert(res.data.errors)
          }
        }).catch((error) => {
          // console.log(error)
        })
      }
      // saveSession()

      const uploadFile = async() => {
        let formData = new FormData();
        formData.append('userId', sessionData.userId);
        formData.append('file', sessionFile);
        const res = await axios.post("https://seeds.geospectrum.com.ph/session/upload", formData)
        // const res = await axios.post("http://localhost:5000/session/upload", formData)
        .then(function(res) {
          if ('errors' in res) {
            // console.log("errors:")
            alert(res.data.errors)
          }
        })
        .catch((error) => {
          // console.log(error)
        })
      }
      // uploadFile()
    }, 1000);
  
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  })

  const handleKeyChange = (e) => {
    setState({ ...state,
      keywords: e.target.value})
    setSessionData({...sessionData,
      populate: {...sessionData.populate,
      keywords: e.target.value}})
  }

  const handleDelete = (e, value) => {
    e.preventDefault();
    const deleteKey = _without(state.keywords, value)
    setState({ ...state,
      keywords: deleteKey})
    setSessionData({...sessionData,
      populate: {...sessionData.populate,
      keywords: deleteKey}})
  };

  var keywords = ["barangay", "points", "land use", "disease", "employment", "commercial", "household", "boundary", "other"]

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <Grid container direction="row" spacing={3}>
            <Grid item xs={12} lg={8}>
              <TextField  InputProps={{style: {padding:10}}} required variant="filled" autoFocus
                InputLabelProps={{style: {fontSize: "1.5rem"}, shrink: true}}
                label="File name" fullWidth value={state.file.name} size="medium" />
            </Grid>
            <Grid item xs={12} lg={4}>
              <FormControl required autoFocus fullWidth variant="filled" size ="medium">
                <InputLabel style={{fontSize: "1rem"}} autoFocus>
                  Data Type
                </InputLabel>
                <Select classes={{ root: classes.rootSecondSelect }} required inputProps={{style: {padding:10}}}
                  value={state.type} onChange={handleTypeChange} label="Select Type" 
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left"
                    }, transformOrigin: {
                      vertical: "top",
                      horizontal: "left"
                    }, getContentAnchorEl: null,
                    classes: { paper: classes.menuPaper }
                  }}>
                  <MenuItem value='shp'>Vector (.zip) </MenuItem>
                  <MenuItem value='csv'>Table (.csv)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={12}>
              <FormControl required autoFocus variant="filled" fullWidth size="small">
                <InputLabel autoFocus style={{fontSize: "1rem"}}>Keywords</InputLabel>
                <Select required autoFocus fullWidth multiple value={state.keywords} onChange={handleKeyChange} 
                  label="Keywords" MenuProps={{
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left"
                    }, transformOrigin: {
                      vertical: "top",
                      horizontal: "left"
                    }, getContentAnchorEl: null,
                    classes: { paper: classes.menuPaper }
                  }} renderValue={(selected) => (
                    <div className={classes.chips} style={{padding:10}}>
                      {selected.map((value) => (
                        <Chip variant="filled" key={value} label={value} className={classes.chip} 
                          deleteIcon={<CancelIcon onMouseDown={(event) => event.stopPropagation()}/>}
                          onDelete={(e) => handleDelete(e, value)} onClick={() => console.log("clicked chip")}/>
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
            <Grid item xs={12} lg={8}>
              <TextField required autoFocus minRows={12} name="description" variant="filled" InputLabelProps={{
                  style: {
                    fontSize: "1.5rem"
                  }, shrink: true,
                }} InputProps={{style: {padding:40}}} label="Description" fullWidth multiline 
                value={state.description} onChange={e => handleTextChange(e)}/>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Paper style={{height:"100%", padding:20}}>
                <FormControl required>
                  <FormLabel>Tag/s</FormLabel>
                  <FormGroup>
                    <FormControlLabel control={<GreenCheckbox checked={social} 
                      onChange={handleChange} name="social"/>} label="Social"/>
                    <FormControlLabel control={<GreenCheckbox checked={economic} 
                      onChange={handleChange} name="economic"/>} label="Economic"/>
                    <FormControlLabel control={<GreenCheckbox checked={environmental} 
                      onChange={handleChange} name="environmental"/>}
                      label="Environmental"/>
                    <FormControlLabel control={<GreenCheckbox checked={demographic} 
                      onChange={handleChange} name="demographic"/>} label="Demographic"/>
                  </FormGroup>
                </FormControl>
              </Paper>
            </Grid>
          </Grid>
        )
    
      case 1:
        return (
          <Grid container direction="row" spacing={3} alignItems="center">
            <Grid item xs={12} lg={4} container spacing={3}> 
              <Grid item xs={12}>
                <TextField InputProps={{style: {padding:20}}} required name="language" value={state.language} 
                  InputLabelProps={{style: {fontSize: "1.5rem"}, shrink: true}} autoFocus variant="filled" 
                  label="Language" fullWidth size="medium" onChange={e => handleTextChange(e)}/>
              </Grid>
              <Grid item xs={12}>
                <TextField InputProps={{style: {padding:20}}} required name="license" value={state.license}
                  InputLabelProps={{style: {fontSize: "1.5rem"}, shrink: true}} autoFocus variant="filled" 
                  label="License" fullWidth size="medium" onChange={e => handleTextChange(e)}/>
              </Grid>
              <Grid item xs={12}>
                <TextField InputProps={{style: {padding:20}}} required autoFocus name="doi" value={state.doi}
                  InputLabelProps={{style: {fontSize: "1.5rem"}, shrink: true}} variant="filled" label="DOI"
                  fullWidth size="medium" onChange={e => handleTextChange(e)}/>
              </Grid>
              <Grid item xs={12}>
                <TextField InputProps={{style: {padding:20}}} required autoFocus name="attribution" 
                  InputLabelProps={{style: {fontSize: "1.5rem"}, shrink: true}} value={state.attribution} 
                   variant="filled" label="Attribution" fullWidth size="medium" onChange={e => handleTextChange(e)}/>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4} container spacing={3}>
              <Grid item xs={12}>
                <TextField InputProps={{style: {padding:20}}} required autoFocus name="regions" value={state.regions} 
                  InputLabelProps={{style: {fontSize: "1.5rem"}, shrink: true}} variant="filled"
                  label="Regions" fullWidth size="medium" onChange={e => handleTextChange(e)}/>
              </Grid>
              <Grid item xs={12}>
                <TextField InputProps={{style: {padding:40}}} required autoFocus name="dqs" value={state.dqs} 
                  InputLabelProps={{style: {fontSize: "1.5rem"}, shrink: true}} variant="filled" fullWidth
                  label="Data quality statement" size="medium" multiline minRows={12} 
                  onChange={e => handleTextChange(e)}/>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4} container spacing={3}>
              <Grid item xs={12}>
                <TextField InputProps={{style: {padding:20}}} required size="medium" name="restrictions" 
                  InputLabelProps={{style: {fontSize: "1.5rem"}, shrink: true}} value={state.restrictions}
                  autoFocus variant="filled" label="Restrictions" fullWidth onChange={e => handleTextChange(e)}/>
              </Grid>
              <Grid item xs={12}>
                <TextField InputProps={{style: {padding:40}}} required autoFocus name="constraints" 
                  InputLabelProps={{style: {fontSize: "1.5rem"}, shrink: true}} value={state.constraints} 
                  variant="filled" label="Constraints" fullWidth size="medium" multiline minRows={12} 
                  onChange={e => handleTextChange(e)}/>
              </Grid>
            </Grid>           
          </Grid>
        );

      case 2:
        return (
          <Grid container>
            <TextField InputProps={{style: {padding:40}}} focused variant="filled" name="details" value={state.details}
              InputLabelProps={{style: {fontSize: "1.5rem"}, shrink: true}} label="Additional Details (if any)" 
              fullWidth multiline minRows={22} onChange={e => handleTextChange(e)}/>
          </Grid>
        );

      default:
        return 'Unknown stepIndex';
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setState({ ...state, 
      mapName: '',
      file: '',
      social: false,
      economic: false,
      environmental: false,
      demographic: false,
      type: '',
      keywords: [],
      description: '',
      language: '',
      license: '',
      doi: '',
      attribution: '',
      regions: '',
      dqs: '',
      restrictions: '',
      constraints: '',
      details: '' 
    });
    setSessionData({...sessionData,
      populate: { ...state, 
        mapName: '',
        file: '',
        social: false,
        economic: false,
        environmental: false,
        demographic: false,
        type: '',
        keywords: [],
        description: '',
        language: '',
        license: '',
        doi: '',
        attribution: '',
        regions: '',
        dqs: '',
        restrictions: '',
        constraints: '',
        details: '' 
      }})
  };

  const handleFileChange = event => {
    setState({ ...state, file: event.target.files[0] });
    setSessionData({...sessionData,
      populate: { ...sessionData.populate,
      file: {name: event.target.files[0].name}}})
    setSessionFile(event.target.files[0])
  };

  const handleUpload = () => {
    setDisUp(true)
    if (state.file){
      
      var formData = new FormData();
      formData.append("file", state.file);
      formData.append("mapName", state.mapName);
      formData.append("social", state.social);
      formData.append("economic", state.economic);
      formData.append("environmental", state.environmental);
      formData.append("demographic", state.demographic);
      formData.append("dataType", state.type);
      formData.append("keywords", state.keywords);
      formData.append("description", state.description);
      formData.append("language", state.language);
      formData.append("license", state.license);
      formData.append("doi", state.doi);
      formData.append("attribution", state.attribution);
      formData.append("regions", state.regions);
      formData.append("dqs", state.dqs);
      formData.append("restrictions", state.restrictions);
      formData.append("constraints", state.constraints);
      formData.append("details", state.details);

      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };

      if (state.type === 'shp'){
        // axios.post('https://seeds.geospectrum.com.ph/upload/shp', formData, config).then(async ()=>{
        //   const res4 = await axios('https://seeds.geospectrum.com.ph/metadata/',); //ito yung gagamitin pag sa web yung server
        axios.post('http://localhost:5000/upload/shp', formData, config).then(async ()=>{
          const res4 = await axios('http://localhost:5000/metadata/',); //ito yung gagamitin pag sa web yung server          setDataCat(res4.data);
          setDataShow(res4.data);
          alert('Upload Complete');
          setDisUp(false)
        }).catch(err => {alert('Error: ' + err); setDisUp(false)})
      } else if (state.type === 'tif'){
        axios.post('https://seeds.geospectrum.com.ph/upload/tif', formData, config).then(async ()=>{
          const res4 = await axios('https://seeds.geospectrum.com.ph/metadata/',); //ito yung gagamitin pag sa web yung server
        // axios.post('http://localhost:5000/upload/tif', formData, config).then(async ()=>{
        //   const res4 = await axios('http://localhost:5000/metadata/',); //ito yung gagamitin pag sa web yung server          setDataCat(res4.data);
          setDataShow(res4.data);
          alert('Upload Complete');
          setDisUp(false)
        })
      } else if (state.type === 'csv'){
        axios.post('https://seeds.geospectrum.com.ph/upload/csv', formData, config).then(async ()=>{
          const res4 = await axios('https://seeds.geospectrum.com.ph/metadata/',); //ito yung gagamitin pag sa web yung server
        // axios.post('http://localhost:5000/upload/csv', formData, config).then(async ()=>{
        //   const res4 = await axios('http://localhost:5000/metadata/',); //ito yung gagamitin pag sa web yung server          setDataCat(res4.data);
          setDataShow(res4.data);
          alert('Upload Complete');
          setDisUp(false)
        })
      }
    }
  }

  const handleTypeChange = event => {
    setState({ ...state, type: event.target.value})
    setSessionData({...sessionData,
      populate: {...sessionData.populate,
      type: event.target.value}})
  }

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    setSessionData({...sessionData,
      populate: {...sessionData.populate,
      [event.target.name]: event.target.checked}})
  };

  const handleTextChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
    setSessionData({...sessionData,
      populate: {...sessionData.populate, 
      [event.target.name]: event.target.value}})
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  const handleOpenDialog = () => {
    setOpenDialog(true);
  }
  
  const handleOpenDBDialog = () => {
    setOpenDBDialog(true);
  }

  const TemplateDialog = () => {
    const [module, setModule] = useState(null);
    const [domain, setDomain] = useState(null);
    const [data, setData] = useState(null);
    const [granularity, setGranularity] = useState(null);

    const insertDescription = () => {
      return `${data} - ${granularity} Level Granularity. Uploaded ${new Date().toLocaleDateString()}`
    }

    const insertKeywords = () => {
      if ((module && domain && data && granularity) || (granularity && domain == "Barangay Shapefile" && 
            module == "Barangay Boundaries")){
        var assignedKeywords = [];
        var dataType = '';
        if (granularity == "Points" && data == "Disease Incidence"){
          assignedKeywords = ["disease", "points"]; dataType = 'csv'
        } if (granularity == "Purok" && data == "Disease Incidence"){
          assignedKeywords = ["disease", "purok"]; dataType = 'csv'
        } if (granularity == "Barangay" && data == "Disease Incidence"){
          assignedKeywords = ["disease", "barangay"]; dataType = 'csv'
        } if (granularity == "Points" && data == "Jobs"){
          assignedKeywords = ["employment", "points"]; dataType = 'csv'
        } if (granularity == "Purok" && data == "Jobs"){
          assignedKeywords = ["employment", "purok"]; dataType = 'csv'
        } if (granularity == "Barangay" && data == "Jobs"){
          assignedKeywords = ["employment", "barangay"]; dataType = 'csv'
        } if (granularity == "Points" && data == "Commercial Establishments"){
          assignedKeywords = ["commercial", "points"]; dataType = 'csv'
        } if (granularity == "Purok" && data == "Commercial Establishments"){
          assignedKeywords = ["commercial", "purok"]; dataType = 'csv'
        } if (granularity == "Barangay" && data == "Commercial Establishments"){
          assignedKeywords = ["commercial", "barangay"]; dataType = 'csv'
        } if (granularity == "Points" && data == "Existing Land Use"){
          assignedKeywords = ["land use", "boundary"]; dataType = 'shp'
        } if (granularity == "Purok" && data == "Existing Land Use"){
          assignedKeywords = ["land use", "boundary"]; dataType = 'shp'
        } if (granularity == "Barangay" && data == "Existing Land Use"){
          assignedKeywords = ["land use", "boundary"]; dataType = 'shp'
        } if (granularity == "Points" && data == "Household Surveys"){
          assignedKeywords = ["household", "points"]; dataType = 'csv'
        } if (granularity == "Building" && data == "Household Surveys"){
          assignedKeywords = ["household", "boundary"]; dataType = 'shp'
        } if (domain == "Barangay Shapefile" && module == "Barangay Boundaries"){
          assignedKeywords = ["barangay", "boundary"]; dataType = 'shp'
        }
        setState({...state, 
          keywords: assignedKeywords, 
          type: dataType, 
          description: insertDescription(),
          social: false, 
          economic: false, 
          environmental: false, 
          demographic: false, 
          [module.toLowerCase()]: true
        }) // override
        setSessionData({ ...sessionData, 
          populate: { ...sessionData.populate, 
            keywords: assignedKeywords, 
            type: dataType, 
            description: insertDescription(),
            social: false, 
            economic: false, 
            environmental: false, 
            demographic: false, 
            [module.toLowerCase()]: true
          }
        }) // override
      }
      handleCloseDialog()
    }

    const moduleChoices = ["Social", "Economic", "Environmental", "Demographic", 
      "Barangay Boundaries"]

    const domainChoices = {
      'Social':["Education", "Health", "Housing and Welfare", "Sports and Recreation",
        "Protective and Safety Services"],
      'Economic':["Agriculture and Forestry", "Commerce, Trade and Industry", "Tourism"],
      'Environmental':["Land Resource", "Land Use and Land Use Trends", "Topography",
        "Soil", "Climate", "Hazards and Disaster Risk", "Sanitation"],
      'Demographic':["Human Resources", "Labor Force Profile", "Census Level Profile"],
      'Barangay Boundaries': ["Barangay Shapefile"]
    };

    const dataChoices = {
      'Education':["Schools"],
      'Health':["Health Facilities","Disease Incidence"],
      'Housing and Welfare':["Building Type", "Residential Maps", "Household Maps"],
      'Sports and Recreation':["Sports Facilities", "Recreational Facilities"],
      'Protective and Safety Services':["Crime Incidence", "Fire Incidence"],
      'Agriculture and Forestry':["Agricultural Crops", "Livestock", "Agricultural Facilities", "Forestry"],
      'Commerce, Trade and Industry':["Commercial Establishments", "Industrial Establishments"],
      'Tourism':["Tourism Spots", "Tourist Activities and Events"],
      'Land Resource':["Territorial Boundary", "Land and Vegetation Cover", "Land Classification"],
      'Land Use and Land Use Trends':["Existing Land Use","Proposed Land Use", "Development Projects"],
      'Topography':["Slope", "Elevation", "Drainage Map", "Water Resources"],
      'Soil':["Soil Classification", "Hydrogeologic Features"],
      'Climate':["Climate Types", "Hydro-meteorologic Features"],
      'Hazards and Disaster Risk':["Climate-related Hazards", "Geologic Related Hazards", "Disaster Risk"],
      'Sanitation':["Garbage and Waste Disposal"],
      'Human Resources':["Population Size", "Population Distribution", "Civil Registry"],
      'Labor Force Profile':["Age", "Jobs"],
      'Census Level Profile':["Household Surveys", "PhilSys Registry", "Oplan Surveys"],
      'Barangay Shapefile': []
    };

    return (
      <>
        <Paper elevation={0} style={{ height:350, width:500}}>
          <div className={classes.root}>
            <Toolbar className={classes.appbar}>
              <Typography className={classes.appbarTitle} style={{
                  textAlign:"center", 
                  fontWeight:700
                }}>
                Insert Template
              </Typography>
            </Toolbar>
            <DialogContent align='center'>
              <Grid container spacing={2}>
                <Grid item container justifyContent='space-between'>
                  <Grid item>
                    <Typography style={{
                        fontSize:18, 
                        textAlign:"left", 
                        fontWeight:700
                      }}>
                      SEED Module
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Select value={module} onChange={e=>setModule(e.target.value)}
                      MenuProps={{
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left"
                        }, transformOrigin: {
                          vertical: "top",
                          horizontal: "left"
                        }, getContentAnchorEl: null,
                        classes: { paper: classes.menuPaper }
                      }} style={{fontSize: 14, width: 275}} align="center"> 
                      {moduleChoices.map((choice)=>{
                        return(
                          <MenuItem value={choice} align="center" style={{fontSize: 16}}>{choice}</MenuItem>
                        )
                      })}
                    </Select>
                  </Grid>
                </Grid>
                <Grid item container justifyContent='space-between'>
                  <Grid item>
                    <Typography style={{
                        fontSize:18, 
                        textAlign:"left", 
                        fontWeight:700
                      }}>
                      Domain
                    </Typography>                     
                  </Grid>
                  <Grid item>
                    <Select value={domain} onChange={e=>setDomain(e.target.value)} align="center"
                      style={{fontSize: 14, width: 275}} MenuProps={{
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left"
                        }, transformOrigin: {
                          vertical: "top",
                          horizontal: "left"
                        }, getContentAnchorEl: null,
                        classes: { paper: classes.menuPaper }
                      }}>
                      {module ? domainChoices[module].map((choice)=>{
                        return(
                          <MenuItem value={choice} align="center" style={{fontSize: 16}}>{choice}</MenuItem>
                        )
                      }) : null}
                    </Select>
                  </Grid>
                </Grid>
                <Grid item container justifyContent='space-between'>
                  <Grid item>
                    <Typography style={{
                        fontSize:18, 
                        textAlign:"left", 
                        fontWeight:700
                      }}>
                      Data Information
                    </Typography>                    
                  </Grid>
                  <Grid item>
                    <Select value={data} onChange={e=>setData(e.target.value)} align="center"
                      style={{fontSize: 14, width: 275}} MenuProps={{
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left"
                        }, transformOrigin: {
                          vertical: "top",
                          horizontal: "left"
                        }, getContentAnchorEl: null,
                        classes: { paper: classes.menuPaper }
                      }}>
                      {domain ? dataChoices[domain].map((choice)=>{
                        return(
                          <MenuItem value={choice} align="center" style={{fontSize: 16}}>{choice}</MenuItem>
                        )
                      }) : null}
                    </Select>
                  </Grid>
                </Grid>
                <Grid item container justifyContent='space-between'>
                  <Grid item>
                    <Typography style={{fontSize:18, textAlign:"left", fontWeight:700}}>
                      Granularity Level
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Select value={granularity} onChange={e=>setGranularity(e.target.value)}
                      style={{fontSize: 14, width: 275}} align="center" MenuProps={{
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left"
                        }, transformOrigin: {
                          vertical: "top",
                          horizontal: "left"
                        }, getContentAnchorEl: null,
                        classes: { paper: classes.menuPaper }
                      }}>
                      <MenuItem value={"Barangay"} align="center" style={{fontSize: 16}}>Barangay</MenuItem>
                      <MenuItem value={"Points"} align="center" style={{fontSize: 16}}>Points</MenuItem>
                      <MenuItem value={"Building"} align="center" style={{fontSize: 16}}>Building</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions >
              <Button className={classes.login1} variant="contained" onClick={insertKeywords}>
                Insert Template
              </Button>
              <Button className={classes.deleteButton} variant="contained" onClick={handleCloseDialog}>
                Close
              </Button>
            </DialogActions>
          </div>
        </Paper>
      </>
    );
  }

  const { social, economic, environmental, demographic, type } = state;
  const error = [social, economic, environmental, demographic]
    .filter((v) => v).length < 1;
  const { setSelectedIndex, disUp, setDisUp } = useContext(SEEDSContext);

  useEffect(() => {
    setSelectedIndex(0)
  }, [])

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <TemplateDialog/>
      </Dialog>
      <Dialog open={openDBDialog}>
        <Paper elevation={0} style={{height:600, width:500}}>
          <ExternalDatabase/>
        </Paper>
      </Dialog>
      
      <Grid direction="row" container justifyContent="center" alignItems="stretch" style={{minHeight:"93.1vh"}} >
        <Grid item xs={12}>
          <Stepper style={{backgroundColor: "#b6c4c7", width:"100%",}} alternativeLabel 
            activeStep={activeStep} connector={<ColorlibConnector />}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
          <Grid item container justifyContent="center" alignItems="center" xs={12} md={4} lg={4}>
            <Paper elevation={5} style={{height:350, width:"90%"}}>
              <Grid container direction ="column" justifyContent="center" alignItems="center"
                style={{minHeight:"100%"}}>
                <Typography color="primary" style={{fontWeight:700, fontSize: 20}}>
                  Choose a method in populating data:
                </Typography><br/>
                <Button variant="outlined" className={classes.popbrowse2} onClick={handleOpenDBDialog}
                  style={{width:"90%", marginTop:2, marginBottom:5}} color="primary">
                  <label style={{wordWrap:"break-word",width:"90%"}}>
                    Connect to External Database
                  </label>
                </Button>
                <label className={classes.popbrowse} style={{width:"90%", wordWrap:"break-word", marginTop:5}}>
                  <input type="file" onChange={handleFileChange} accept=".zip, .tiff, .csv" />
                  BROWSE FILE:
                </label><br></br>
                <Button variant="outlined" className={classes.backButton} style={{width:"80%",}} 
                  color="primary" onClick={handleOpenDialog}>
                  <label style={{wordWrap:"break-word", width:"90%"}}>
                    Insert Template
                  </label>
                </Button>
              </Grid>
            </Paper>
          </Grid>
          <Grid item container xs={12} md={8} lg={8} style={{paddingLeft:50, paddingRight:50, paddingTop:30}}>
            <Grid container direction="row" justifyContent="flex-end">
              {getStepContent(activeStep)} 
              <Grid item xs={12} sm={9} md={9} lg={6} container justifyContent="space-around" 
                alignItems="center" style={{padding:10}}>
                <Grid item>
                  <Button variant="outlined" disabled={activeStep === 0} onClick={handleBack} 
                    className={classes.backButton}>
                    Back
                  </Button>
                </Grid>
                {activeStep === steps.length - 1 ?
                  <Grid item>
                    <Button variant="outlined" disabled={disUp} onClick={handleReset} className={classes.backButton}>
                      Reset
                    </Button>
                  </Grid> :
                  <Grid item>
                    <Button variant="outlined" onClick={handleNext} className={classes.backButton} 
                      disabled={!state.file ||  state.keywords.length < 1 || error || !state.type || 
                      disUp || !state.description}>
                      Next
                    </Button>
                  </Grid>}
                  <Grid item>
                    <Button className={classes.addtomap} variant="contained" onClick={handleUpload} color="primary"
                      disabled={activeStep === 0|| !state.language|| !state.license || 
                      error || !state.doi || !state.attribution || !state.regions || 
                      !state.dqs || !state.restrictions || !state.constraints}>
                      Upload
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
          </Grid>
        </Grid>
        <LoadingPage/>
    </>
  );
}