import React, { useState, useContext} from 'react';
import axios from 'axios';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Toolbar, Divider, Fab } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Select, InputLabel, TextField } from '@material-ui/core';
import { Checkbox, FormGroup, Paper, Card, CardHeader, CardContent, Input, MenuItem,
   Chip, Dialog, DialogActions, DialogContent, LinearProgress} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import './index.css'

import clsx from 'clsx';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import { OutlinedInput } from '@material-ui/core';
import Check from '@material-ui/icons/Check';

import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';

import { FeaturesContext } from '../../../context/FeaturesContext'
import LeftNav from '../..'

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#1b798e',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#0d3c47',
    },
  },
});
const GreenCheckbox = withStyles({
  root: {
    color: '#1b798e',
    '&$checked': {
      color: '#1b798e',
    },
  },

  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#1b798e',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#1b798e',
      
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#1b798e',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#1b798e',
    zIndex: 1,
    fontSize: 18,
  },
  instructions: {
    // marginTop: theme.spacing(1),
    // marginBottom: theme.spacing(1),
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 136deg, #1b798e 0%, #1b798e 50%, #1b798e 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
      'linear-gradient( 136deg, #1b798e 0%, #1b798e 50%, #1b798e 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
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
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, #1b798e 0%, #1b798e 50%, #1b798e 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
    'linear-gradient( 136deg, #1b798e 0%, #1b798e 50%, #1b798e 100%)',
  },
});


function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 400,
    width: '100%',
    flexGrow: 1,
  },
  deleteButton: {
    border: 0,
    borderRadius: 0,
    backgroundColor: '#e6ebec',
    color: '#33202A',
    fontSize: '1rem',
    height: '5vh',
    // width: "12.5vw",
    top: '2vh',
    padding: '0 30px',
    fontFamily:'LeagueSpartan',
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#A31621',
    }
  },
  login1: {
    border: 0,
    // width: "12.5vw",
    borderRadius: 0,
    backgroundColor: '#1b798e',
    color: '#ffffff',
    // fontSize: '1rem',
    height: '5vh',
    top: '2vh',
    padding: '0 30px',
    fontFamily:'LeagueSpartan',
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922',
    }
  },
  popbrowse: {
    border: 0,
    borderRadius: 0,
    backgroundColor: '#1b798e',
    color: '#ffffff',
    fontSize: '1.5rem',
    textAlign: "center",
    justify:"center",
    padding: '20px 50px', //tb lr
    fontFamily:'LeagueSpartan',
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922',
    }
  },
  appbarTitle:{
    flexGrow: '1',
    color: '#fffefe',
    fontFamily:'LeagueSpartan',
    fontSize:20
  },
  appbar: {
    backgroundColor: '#0d3c47',
    fontFamily:'LeagueSpartan',
    textAlign: "center",
    // fontSize: "1.25rem",
  }, 
  
  addtomap: {
    border: 0,
    borderRadius: 0,
    backgroundColor: '#1b798e',
    color: '#ffffff',
    fontSize: '1.2rem',
    textAlign: "center",
    justify:"center",
    padding: '14px 30px',
    fontFamily:'LeagueSpartan',
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922',
    }
  },
  '& .MuiTypography-h3': {
    // backgroundColor: "#000000",
    fontFamily: "GlacialIndifference",
    fontSize: "0.9rem",
    // color: "#fffefe",
    color: '#0c343d',
    '&:hover': {
      color: '#0c343d',
      // backgroundColor: '#5aff3d',
      }
  },
  root1: {
    borderRadius:0,
    // height: '100vh',
    '& .MuiCardHeader-root': {
      color:"#1b798e",
      // backgroundColor:"#000000",
    },
    
      '& .MuiCardHeader-title': {
        fontSize: '1.5rem',
        // textAlign: "center",
      fontFamily: "GlacialIndifference",
      },
  },
  backButton: {
    border: 1,
    borderTopWidth: 2,
    borderRadius: 1,
    backgroundColor: '#e6ebec',
    borderColor:'#1b798e',
    color: '#1b798e',
    textAlign: "center",
    padding: '18.5px 36px',
    fontFamily:'LeagueSpartan',
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922',
    }
  },
  menuPaper: {
    maxHeight: 200
  },
  textFieldLabel: {
    fontSize: "2rem",
    fontSize: "50px",

  },
  fabButton2: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    // borderRadius: 25 ,
    // border: 1,
    // borderRadius: 0,
    color: '#1b798e',
    borderColor: "#1b798e",
    // backgroundColor: '#fffefe',
    // height: 30,
    fontSize: '1rem',
    // opacity: '2',
    '&:hover': {
      color: '#229922',
      borderColor: "#229922",
      }
  },
}));


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
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
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [selected, setSelected] = useState();

  const {setDataCat, setDataShow} = React.useContext(FeaturesContext)

  const [valueradio, setValueRadio] = React.useState(["shp"]);

  const handleRadioChange = (event,value) => {
    setValueRadio(event.target.value);
    setState({ ...state, type: event.target.value})

  };



  const [state, setState] = React.useState({
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

  const handleKeyChange = (e) => {
    setState({ ...state,
    keywords: e.target.value})
    // console.log(state.keywords)
  }


  // var keywords = ["barangay", "purok", "points", "land use", "disease", "employment", "facility", "person", "building", "commercial"]
  var keywords = ["barangay", "purok", "points", "land use", "disease", "employment", "commercial", "boundary", "other"]

  function getStepContent(stepIndex) {

    switch (stepIndex) {
      case 0:
        return (
    <ThemeProvider theme={theme}>
      <Grid container xs ={9} 
        //kasize dapat nung sa baba
        direction ="row"
         justify ="center"
         alignItems="flex-end"
        style={{backgroundColor: "#e6ebec", height:"55vh"}}
        //para mawala spaces before file name
        >
          
          <Grid container item style={{backgroundColor: "#e6ebec"}} xs ={11} >
            <Grid item xs ={9} > 
              <TextField required InputLabelProps={{style: {fontSize: "1.5rem"}, shrink:"true"}}
 key="File Name"
              InputLabelProps={{style: {fontSize: "1.5rem"}, shrink:"true"}}
              variant="filled" focused  label="File name" fullWidth value={state.file.name} size="large" />
            </Grid>

            <Grid item container direction="column" xs ={3} style={{justify:"flex-end", alignItems:"flex-end"}} >
              <FormControl required focused variant="filled" size ="large" >
                <InputLabel focused htmlFor="filled-age-native-simple">Data Type</InputLabel>
                
                <Select required
                
                style={{width:'300px'}} 
                  value={state.type} onChange={handleTypeChange}
                  label="Select Type" inputProps={{
                    name: 'type',
                    id: 'filled-age-native-simple',}}
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
                    >
                  <MenuItem value='shp'>Vector (.zip) </MenuItem>
                  {/* <MenuItem value='tif'>Raster (.tiff) </MenuItem> */}
                  <MenuItem value='csv'>Table (.csv)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
            

          <Grid container item style={{backgroundColor: "#e6ebec"}} xs={11}>
            <FormControl required focused variant="filled" fullWidth size="small" >
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
                required multiple value={state.keywords} onChange={handleKeyChange} 
                  fullWidth 
                label="Keywords"
                renderValue={(selected) => (
                  <div className={classes.chips}>
                      {selected.map((value) => (
                        <Chip variant="filled" key={value} label={value} className={classes.chip} />
                      ))}
                  </div>
                )} >
                  {keywords.map((name) => (
                    <MenuItem variant="filled" key={name} value={name} style={getStyles(name, state.keywords, theme)}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>           
          </Grid>

          <Grid container item style={{backgroundColor: "#e6ebec"}} xs={11}>
            <Grid item xs = {9}  >
              <TextField  required  InputLabelProps={{style: {fontSize: "1.5rem"}, shrink:"true"}}
 
              InputLabelProps={{style: {fontSize: "1.5rem"}, shrink:"true"}}
              
              focused variant="filled" label="Description" fullWidth multiline rows={12}  name="description" value={state.description} onChange={e => handleTextChange(e)}/>
            </Grid>

            <Grid item xs = {3} container direction="column" style={{ justify:"center", alignItems:"center"}}  > 
              <FormControl required component="fieldset" >
                <FormLabel component="legend">Tag/s</FormLabel>
                
                <FormGroup>
                  <FormControlLabel control={<GreenCheckbox checked={social} onChange={handleChange} name="social" />}
                    label="Social"/>
                  <FormControlLabel control={<GreenCheckbox checked={economic} onChange={handleChange} name="economic" />}
                    label="Economic"/>
                  <FormControlLabel control={<GreenCheckbox checked={environmental} onChange={handleChange} name="environmental" />}
                    label="Environmental"/>
                  <FormControlLabel control={<GreenCheckbox checked={demographic} onChange={handleChange} name="demographic" />}
                    label="Demographic"/>
                    
                </FormGroup>
              </FormControl>

            </Grid>
          </Grid>
        </Grid>
  
        {/* </div> */}
        </ThemeProvider>);
      case 1:
        return (
        <ThemeProvider theme={theme}>

        <Grid container xs ={9} 
        //kasize dapat nung sa baba
        direction ="row"
         justify ="space-evenly" 
         alignItems="center"
        style={{backgroundColor: "#e6ebec", height:"60vh"}}  
        //para mawala spaces before file name 
        >
        <Grid item container direction="column" xs={3} spacing={5} >
            <Grid item >
              <TextField required InputLabelProps={{style: {fontSize: "1.5rem"}, shrink:"true"}}
 focused variant="filled" label="Language" fullWidth size="large" name="language" value={state.language} onChange={e => handleTextChange(e)}/>
              </Grid>
            <Grid item>
              <TextField required InputLabelProps={{style: {fontSize: "1.5rem"}, shrink:"true"}}
 focused variant="filled"  label="License" fullWidth size="large" name="license" value={state.license} onChange={e => handleTextChange(e)}/>
            </Grid>
            <Grid item>
              <TextField required InputLabelProps={{style: {fontSize: "1.5rem"}, shrink:"true"}}
 focused variant="filled"  label="DOI" fullWidth size="large" name="doi" value={state.doi} onChange={e => handleTextChange(e)}/>
            </Grid>
            <Grid item>
              <TextField required InputLabelProps={{style: {fontSize: "1.5rem"}, shrink:"true"}}
 focused variant="filled" label="Attribution" fullWidth size="large" name="attribution" value={state.attribution} onChange={e => handleTextChange(e)}/>
            </Grid>
          </Grid>
          <Grid item container direction="column" xs={4} spacing={5} >
            <Grid item>
              <TextField required InputLabelProps={{style: {fontSize: "1.5rem"}, shrink:"true"}}
 focused variant="filled" label="Regions" fullWidth size="large" name="regions" value={state.regions} onChange={e => handleTextChange(e)}/>
            </Grid>
            <Grid item>
              <TextField required InputLabelProps={{style: {fontSize: "1.5rem"}, shrink:"true"}}
 focused variant="filled" label="Data quality statement" fullWidth multiline rows={12} name="dqs" value={state.dqs} onChange={e => handleTextChange(e)} />
            </Grid>

          </Grid>
          <Grid item container direction="column" xs={4} spacing={5} >
            <Grid item>
              <TextField required  InputLabelProps={{style: {fontSize: "1.5rem"}, shrink:"true"}} focused variant="filled" label="Restrictions"
                fullWidth size="large" name="restrictions" value={state.restrictions} onChange={e => handleTextChange(e)}/>
            </Grid>
            <Grid item>
              <TextField required InputLabelProps={{style: {fontSize: "1.5rem"}, shrink:"true"}} focused variant="filled" label="Other constraints"
                fullWidth multiline rows={12} name="constraints" value={state.constraints} onChange={e => handleTextChange(e)} />
            </Grid>

          </Grid>
          </Grid>
  
        {/* </div> */}
        </ThemeProvider>
        );
      case 2:
        return (
          <ThemeProvider theme={theme}>
            <Grid container xs ={9} 
              //kasize dapat nung sa baba
              direction ="row" justify ="center"  alignItems="center" style={{backgroundColor: "#e6ebec", height:"60vh"}}
              //para mawala spaces before file name
              >
              <Grid item xs={11}>
                <TextField InputLabelProps={{style: {fontSize: "1.5rem"}, shrink:"true"}} focused variant="filled" label="Additional Details (if any)"
                  fullWidth multiline rows={15} name="details" value={state.details} onChange={e => handleTextChange(e)}/>
              </Grid>
          </Grid>
        </ThemeProvider>
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
  };
  const [open, setOpen] = React.useState(false);
  const [disUp, setDisUp] = React.useState(false)

  const handleFileChange = event => {
    setState({ ...state, file: event.target.files[0] });
  };

  // console.log(state.file)
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
        // axios.post('http://localhost:5000/upload/shp', formData, config).then(async ()=>{
        axios.post('http://ec2-52-55-74-109.compute-1.amazonaws.com/upload/shp', formData, config).then(async ()=>{
          const res4 = await axios('http://ec2-52-55-74-109.compute-1.amazonaws.com/metadata/',); //ito yung gagamitin pag sa web yung server
          // const res4 = await axios('http://localhost:5000/metadata/',); //ito yung gagamitin pag sa web yung server
          setDataCat(res4.data);
          setDataShow(res4.data);
          alert('Upload Complete');
          setDisUp(false)
        })
      } else if (state.type === 'tif'){
        axios.post('http://ec2-52-55-74-109.compute-1.amazonaws.com/upload/tif', formData, config).then(async ()=>{
          const res4 = await axios('http://ec2-52-55-74-109.compute-1.amazonaws.com/metadata/',); //ito yung gagamitin pag sa web yung server
          // const res4 = await axios('http://localhost:5000/metadata/',); //ito yung gagamitin pag sa web yung server
          setDataCat(res4.data);
          setDataShow(res4.data);
          alert('Upload Complete');
          setDisUp(false)
        })
      } else {
        axios.post('http://ec2-52-55-74-109.compute-1.amazonaws.com/upload/csv', formData, config).then(async ()=>{
          const res4 = await axios('http://ec2-52-55-74-109.compute-1.amazonaws.com/metadata/',); //ito yung gagamitin pag sa web yung server
          // const res4 = await axios('http://localhost:5000/metadata/',); //ito yung gagamitin pag sa web yung server
          setDataCat(res4.data);
          setDataShow(res4.data);
          alert('Upload Complete');
          setDisUp(false)
        })
        // axios.post('http://localhost:5000/upload/csv', formData, config)
      }
    }
  }

  const handleTypeChange = event => {
    setState({ ...state, type: event.target.value})
  }

  const handleClose = () => {
    axios.get('http://ec2-52-55-74-109.compute-1.amazonaws.com/clearTemp');
    setOpen(false);
  };
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleTextChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  const handleOpenDialog = () => {
    setOpenDialog(true);
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
      if (module && domain && data && granularity){
        var assignedKeywords = [];
        var dataType = '';
        if (granularity == "Points" && data == "Disease Incidence") {assignedKeywords = ["disease", "points"]; dataType = 'csv'}
        if (granularity == "Purok" && data == "Disease Incidence") {assignedKeywords = ["disease", "purok"]; dataType = 'csv'}
        if (granularity == "Barangay" && data == "Disease Incidence") {assignedKeywords = ["disease", "barangay"]; dataType = 'csv'}
        if (granularity == "Points" && data == "Jobs") {assignedKeywords = ["employment", "points"]; dataType = 'csv'}
        if (granularity == "Purok" && data == "Jobs") {assignedKeywords = ["employment", "purok"]; dataType = 'csv'}
        if (granularity == "Barangay" && data == "Jobs") {assignedKeywords = ["employment", "barangay"]; dataType = 'csv'}
        if (granularity == "Points" && data == "Commercial Establishments") {assignedKeywords = ["commercial", "points"]; dataType = 'csv'}
        if (granularity == "Purok" && data == "Commercial Establishments") {assignedKeywords = ["commercial", "purok"]; dataType = 'csv'}
        if (granularity == "Barangay" && data == "Commercial Establishments") {assignedKeywords = ["commercial", "barangay"]; dataType = 'csv'}
        if (granularity == "Points" && data == "Existing Land Use") {assignedKeywords = ["land use", "boundary"]; dataType = 'shp'}
        if (granularity == "Purok" && data == "Existing Land Use") {assignedKeywords = ["land use", "boundary"]; dataType = 'shp'}
        if (granularity == "Barangay" && data == "Existing Land Use") {assignedKeywords = ["land use", "boundary"]; dataType = 'shp'}
        setState({ ...state, keywords: assignedKeywords, type: dataType, description: insertDescription(),
                    social: false, economic: false, environmental: false, demographic: false, [module.toLowerCase()]: true}) // override
      }
      handleCloseDialog()
    }

    const moduleChoices = ["Social", "Economic", "Environmental", "Demographic"]

    const domainChoices = {
        'Social':["Education","Health","Housing and Welfare","Sports and Recreation","Protective and Safety Services"],
        'Economic':["Agriculture and Forestry","Commerce, Trade and Industry","Tourism"],
        'Environmental':["Land Resource","Land Use and Land Use Trends","Topography","Soil","Climate", "Hazards and Disaster Risk", "Sanitation"],
        'Demographic':["Human Resources","Labor Force Profile","Census Level Profile"],
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
      };

    return (
      <ThemeProvider theme={theme}>
              <Paper elevation={0} style={{ height:350, width:500}}>
              <div className={classes.root}>
                <Toolbar className={classes.appbar}>
                  {/* <DialogTitle id="ViewData" align="center">{openReport.type}</DialogTitle> */}
                  <Typography className={classes.appbarTitle} style={{textAlign:"center", fontWeight:700}}>Insert Template</Typography>
                </Toolbar>
                  <DialogContent align='center' >
                    <Grid container spacing={2} >
                      <Grid item container justify='space-between'>
                        <Grid item>
                          <Typography style={{fontSize:18, textAlign:"left", fontWeight:700}}>SEED Module</Typography>
                          
                        </Grid>
                        <Grid item>
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
                          value={module} onChange={e=>setModule(e.target.value)} style={{fontSize: 14, width: 275}} align="center"> 
                            {moduleChoices.map((choice)=>{
                                return(
                                <MenuItem value={choice} align="center" style={{fontSize: 16, }}>{choice}</MenuItem>
                                )
                            })}
                          </Select>
                        </Grid>
                      </Grid>
                      <Grid item container justify='space-between'>
                        <Grid item>
                          <Typography style={{fontSize:18, textAlign:"left", fontWeight:700}}>Domain</Typography>                     
                        </Grid>
                        <Grid item>
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
                          value={domain} onChange={e=>setDomain(e.target.value)} style={{fontSize: 14, width: 275}} align="center">
                            {module ? domainChoices[module].map((choice)=>{
                                    return(
                                    <MenuItem value={choice} align="center" style={{fontSize: 16}}>{choice}</MenuItem>
                                    )
                                }) : null}
                          </Select>
                        </Grid>
                      </Grid>
                      <Grid item container justify='space-between'>
                        <Grid item>
                          <Typography style={{fontSize:18, textAlign:"left", fontWeight:700}}>Data Information</Typography>                    
                        </Grid>
                        <Grid item>
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
                          value={data} onChange={e=>setData(e.target.value)} style={{fontSize: 14, width: 275}} align="center">
                            {domain ? dataChoices[domain].map((choice)=>{
                                        return(
                                        <MenuItem value={choice} align="center" style={{fontSize: 16}}>{choice}</MenuItem>
                                        )
                                    }) : null}
                          </Select>
                        </Grid>
                      </Grid>
                      <Grid item container justify='space-between'>
                        <Grid item>
                          <Typography style={{fontSize:18, textAlign:"left", fontWeight:700}}>Granularity Level</Typography>
                        </Grid>
                        <Grid item>
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
                          value={granularity} onChange={e=>setGranularity(e.target.value)} style={{fontSize: 14, width: 275}} align="center">
                            <MenuItem value={"Barangay"} align="center" style={{fontSize: 16}}>Barangay</MenuItem>
                            {/* <MenuItem value={"Purok"} align="center" style={{fontSize: 16}}>Purok</MenuItem> */}
                            <MenuItem value={"Points"} align="center" style={{fontSize: 16}}>Points</MenuItem>
                          </Select>
                        </Grid>
                      </Grid>
                    </Grid>


                  </DialogContent>
                  <DialogActions >
                    {/* <Grid container justify="flex-end" spacing={3}>
                    <Grid item> */}
                      <Button className={classes.login1} variant="contained" onClick={insertKeywords}>
                          Insert Template
                      </Button>
                    {/* </Grid>
                    <Grid item> */}
                      <Button className={classes.deleteButton} variant="contained" onClick={handleCloseDialog} >
                          Close
                      </Button>
                    {/* </Grid>upload
                    </Grid> */}
                  </DialogActions>
                  </div>
              </Paper>
              </ThemeProvider>
    );
  }


  const { social, economic, environmental, demographic, type } = state;
  const error = [social, economic, environmental, demographic].filter((v) => v).length < 1;
  const { selectedIndex, setSelectedIndex } = React.useContext(FeaturesContext);

  setSelectedIndex(0)

  return (
    <ThemeProvider theme={theme}>
    <div style={{width: window.innerWidth - 69}} >
      

      

      <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title" >
            <TemplateDialog />
      </Dialog>

     <Grid
     container xs ={12}
  // direction="row"
  // justify="flex-start"
  // alignItems="flex-start"
  >
        <Card  >
        {/* <CardHeader title="Metadata"/>  */}
        <Divider/>
          {/* <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
            </Step>
          ))}
          </Stepper> */}

          <Stepper style = {{backgroundColor: "#b6c4c7"}} alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Grid item container direction ="row" xs={12} 
          // justify="flex-start" 
          // alignItems="center" 
          >
            <Grid container item xs = {3} 
            style = {{backgroundColor: "#ced8da", height: "78vh"}} 
            justify="center" 
            alignItems="center" 
            >
              {/* <div 
              style={{ 
                backgroundColor: 'white', position: 'absolute', top: '38vh', left: '14vw', zIndex: '100', 
                height: '100px', width: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                textAlign: 'center', borderStyle: 'solid', borderRadius: '5px', 
                borderWidth: '2px', 
                borderColor: '#1b798e'
              }} 
              
                >
              <CloudUploadIcon  style={{ fontSize: 100, color: "#1b798e" }} /></div> */}
              <Paper style ={{backgroundColor: "#e6ebec", height: "30vh", width: "20vw", position:"absolute",top:"35vh",align:"center"}}>
              <Grid container direction ="column" justify="center" alignItems="center" style={{height:"35vh"}}>
              <label className={classes.popbrowse}  >
                <input  type="file" onChange={handleFileChange} accept=".zip, .tiff, .csv" />
                BROWSE FILE:
              </label><br></br>
              <Button  variant="outlined" className={classes.backButton}  color="primary" onClick={handleOpenDialog}>
                      {/* <CloudUploadIcon className={classes.extendedIcon} /> */}
                      Insert Template
                    </Button>
                    </Grid>
              </Paper>

            </Grid>
            <Grid container item xs = {9} direction = "row"
            style = {{backgroundColor: "#e6ebec", height: "78vh"}} 
            >
              {/* <Grid item xs ={12} >
                { <Stepper style = {{backgroundColor: "#ced8da"}} alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                  </Step>
                ))}
                </Stepper>}
              </Grid> */}
              {/* <Grid item  > */}
                {/* <Grid item 
                > */}
                 {activeStep === steps.length ? (
                  // <Grid align="center">
                    <Button variant="contained" className={classes.backButton} onClick={handleReset} >Reset
                    </Button>
                  // </Grid>
                  ) : (
                  <div >
                    <Typography className={classes.instructions}>
                      <div style={{width: window.innerWidth - 69 }} class="populatebody" >    
                        {getStepContent(activeStep)} 
                      </div>
                    </Typography>
                    <Button variant="contained" className={classes.backButton}
                      style={{ 
                      position: 'absolute', 
                      top: '85vh', 
                      right: '19vw', 
                      }}

                      disabled={activeStep === 0}
                      onClick={handleBack}
                    >Back
                      {/* <Typography className={classes.backButton}></Typography>   */}
                    </Button>

                  {activeStep === steps.length - 1 ? 
                  <Button variant="contained" className={classes.backButton} style={{ 
                    position: 'absolute', 
                    top: '85vh', 
                    right: '12vw', 
                    }}   onClick={handleReset} >Reset
                    {/* <Typography className={classes.backButton}>Reset</Typography> */}
                  </Button>
                  : 
                  <Button variant="contained" className={classes.backButton} style={{ 
                    position: 'absolute', 
                    top: '85vh', 
                    right: '12vw', 
                    }}   onClick={handleNext} disabled={!state.file || state.keywords.length < 1 || error || !state.type}>Next
                    {/* <Typography className={classes.backButton}>Next</Typography> */}
                  </Button>
                  }
                  
                  <Button variant="contained" className={classes.addtomap} 
                  style={{  
                    position: 'absolute', 
                    top: '85vh', 
                    right: '3vw', 
                    }} 
                    disabled={activeStep === 0} onClick={handleUpload} color="primary">
                      {/* Upload */}
                      {disUp? "Uploading": "Upload"}
                  </Button>
                  {disUp? <LinearProgress />:null}

                  </div>)}

                  
                {/* </Grid> */}
              {/* </Grid> */}
              

            </Grid>
          </Grid>


          
      </Card>
      </Grid>
    </div>
    </ThemeProvider>
      
  );
}