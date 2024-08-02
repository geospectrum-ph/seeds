import React, {useContext, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import { Grid, Paper, Checkbox, Chip } from '@material-ui/core'
import axios from 'axios';

import { Card, CardHeader, ButtonGroup, List, ListItem, Fab, Menu, Button, Tooltip} from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup} from '@material-ui/lab';

import RoomIcon from '@material-ui/icons/Room';


import { FeaturesContext } from '../../../../context/FeaturesContext.js';
import { MapContext } from '../../../../context/MapContext.js';
import { SEEDSContext } from '../../../../context/SEEDSContext.js';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: '100%',
    maxWidth: 300,
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
  
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },

  fabButton2: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 0,
    // color: '#fffefe',
    // backgroundColor: '#1b798e',
    // height: 30,
    fontSize: '1rem',
    // opacity: '2',
    '&:hover': {
      // color: '#fffefe',
      backgroundColor: '#29b5d5',
      }
  },

  menuPaper: {
    maxHeight: 200
  }

}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const keywords = ["Male", "Female"];
const employmentstatus = ["Employed", "Unemployed"];
const jobclass = [
  {name: 'Managers', f: 4000,  m: 2400, code: "MGR"},
  {name: 'Professionals', f: 3000, m: 1398, code: "PRF"},
  {name: 'Technicians and associate professionals', f: 2000,m: 1000, code: "TAP"},
  {name: 'Clerical support workers', f: 2390, m: 1000, code: "CSW"},
  {name: 'Service and sales workers', f: 2780, m: 1000, code: "SSW"},
  {name: 'Skilled agricultural, forestry, and fishing workers', f: 1000, m: 1000, code: "SAFFW"},
  {name: 'Craft and related trades workers', f: 2000, m: 1000, code: "CRTW"},
  {name: 'Plant and machine operators', f: 5000, m: 1000, code: "PMO"},
  {name: 'Elementary occupations', f: 1890, m: 1000, code: "EO"},
  {name: 'Armed forces occupations and special occupations', f: 3490, m: 1000, code: "AFS"},
  {name: 'Underemployed', f: 1000, m: 2100, code: "UND"},
  {name: 'Unemployed', f: 500, m: 4300, code: "UNEMP"},
];

const jobClassMapping = [
  {name: '1: Managers', code: "MGR", val: "1"},
  {name: '2: Professionals', code: "PRF", val: "2"},
  {name: '3: Technicians and associate professionals', code: "TAP", val: "3"},
  {name: '4: Clerical support workers', code: "CSW", val: "4"},
  {name: '5: Service and sales workers', code: "SSW", val: "5"},
  {name: '6: Skilled agricultural, forestry, and fishing workers', code: "SAFFW", val: "6"},
  {name: '7: Craft and related trades workers', code: "CRTW", val: "7"},
  {name: '8: Plant and machine operators',code: "PMO", val: "8"},
  {name: '9: Elementary occupations', code: "EO", val: "9"},
  {name: '10: Armed forces occupations and special occupations', code: "AFS", val: "10"},
  {name: '11: Underemployed', code: "UND", val: "11"},
  {name: '12: Unemployed', code: "UNEMP", val: "12"}
];


  
// const jobclass = ['Managers', 'Professionals',
//                     'Technicians and associate professionals',
//                     'Clerical support workers',
//                     'Service and sales workers',
//                     'Skilled agricultural, forestry, and fishing workers',
//                     'Craft and related trades workers',
//                     'Plant and machine operators',
//                     'Elementary occupations',
//                     'Armed forces occupations and special occupations',
//                   'Unemployed',
//                   'Underemployed'];
function getStyles(name, JobClass, theme) {
  return {
    fontWeight:
      JobClass.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}     


const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom"
    }}
    transformOrigin={{
      vertical: "top"
    }}
    {...props}
  />
));
const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

export default function DropdownJob() {

  const { healthLoc, setHealthLoc }  = useContext(MapContext);

  const { brgysList, jobSelect, setJobSelect, setJobMapperGraph}  = useContext(FeaturesContext);

  const { startDate, endDate, jobClassSelect, setJobClassSelect}  = useContext(SEEDSContext);

  const classes = useStyles();
  const [state, setState] = React.useState({ });


  const handleBrgyChange = (event) => {
    const brgyname = event.target.value; 
    setState({
      ...state,
      [brgyname]: event.target.value,
      
    });
    setHealthLoc(event.target.value)
    const fetchData = async() => {
      const res = await axios.get('http://localhost:5000/jobmapper/brgy/single', 
      {params: {brgy_id: event.target.value,
                startdate: startDate,
                enddate: endDate,
                job_class: jobClassSelect
              }} ); //ito yung gagamitin pag sa web yung server

      setJobSelect(res.data) // dito yung brgy
      // console.log("jobSelect on Location Change",res.data)

      const res_graph = await axios.get('http://localhost:5000/jobmapper/graph', 
      {params: {brgy_id: event.target.value,
                startdate: startDate,
                enddate: endDate,
                job_class: jobClassSelect}} );
      setJobMapperGraph(res_graph.data.values)
    } 
    // const fetchData = async() => {
    //   const res = await axios.get('https://seeds.geospectrum.com.ph/jobmapper/brgy/single', 
    //   {params: {brgy_id: event.target.value,
    //             startdate: startDate,
    //             enddate: endDate,
    //             job_class: jobClassSelect
    //           }} ); //ito yung gagamitin pag sa web yung server

    //   setJobSelect(res.data) // dito yung brgy
    //   // console.log("jobSelect on Location Change",res.data)

    //   const res_graph = await axios.get('https://seeds.geospectrum.com.ph/jobmapper/graph', 
    //   {params: {brgy_id: event.target.value,
    //             startdate: startDate,
    //             enddate: endDate,
    //             job_class: jobClassSelect}} );
    //   setJobMapperGraph(res_graph.data.values)
    // } 
    fetchData();

  };
  const handleJobChange = (event) => {
    setJobClassSelect(event.target.value);

    const fetchData = async() => {
      const res = await axios.get('http://localhost:5000/jobmapper/brgy/single', 
      {params: {brgy_id: healthLoc,
                startdate: startDate,
                enddate: endDate,
                job_class: event.target.value
              }} ); //ito yung gagamitin pag sa web yung server

      setJobSelect(res.data)
      // console.log(res.data);
      // console.log("jobSelect on Job Change",res.data)


      const res_graph = await axios.get('http://localhost:5000/jobmapper/graph', 
      {params: {brgy_id: healthLoc,
                startdate: startDate,
                enddate: endDate,
                job_class: event.target.value}} );
      // console.log(res_graph.data.values);
      setJobMapperGraph(res_graph.data.values)


    } 

    // const fetchData = async() => {
    //   const res = await axios.get('https://seeds.geospectrum.com.ph/jobmapper/brgy/single', 
    //   {params: {brgy_id: healthLoc,
    //             startdate: startDate,
    //             enddate: endDate,
    //             job_class: event.target.value
    //           }} ); //ito yung gagamitin pag sa web yung server

    //   setJobSelect(res.data)
    //   // console.log(res.data);
    //   // console.log("jobSelect on Job Change",res.data)


    //   const res_graph = await axios.get('https://seeds.geospectrum.com.ph/jobmapper/graph', 
    //   {params: {brgy_id: healthLoc,
    //             startdate: startDate,
    //             enddate: endDate,
    //             job_class: event.target.value}} );
    //   // console.log(res_graph.data.values);
    //   setJobMapperGraph(res_graph.data.values)


    // } 
    fetchData();
  };



  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const handleClick = event => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

   
const theme = useTheme();

// const [keyWord, setkeyWord] = React.useState([]);

//   const handleKeyWordChange = (event) => {
//     setkeyWord(event.target.value);
//   };

//   const handleChangeMultiple = (event) => {
//     const { options } = event.target;
//     const value = [];
//     for (let i = 0, l = options.length; i < l; i += 1) {
//       if (options[i].selected) {
//         value.push(options[i].value);
//       }
//     }
//     setkeyWord(value);
//   };
  // const [jobClass, setJobClass] = React.useState([]);

  // const handleJobClassSelectChange = (event) => {
  //   setJobClassSelect(event.target.value);
  // };

  
  return (
    <div>
      <Grid container direction="column" xs={12} >
        <Grid 
        container 
        direction="row" 
        justify="space-between"
        alignItems="center" 
        className={classes.formControl}
        >

          <FormControl size="small" variant="outlined" style={{width:'85%'}}>
            <InputLabel id="demo-simple-select-outlined-label">Location</InputLabel>
            <Select
              // native
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={healthLoc}
              // onChange={handleChange}
              label="Location"
              onChange={handleBrgyChange}
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
              <MenuItem aria-label="None" value="" />
              {brgysList? brgysList.map((name, index)=>{
                return(
                  <MenuItem value={name.brgy_id}>{name.brgy_name}</MenuItem> //option na barangay names
                )
              })
              : null}
            </Select>
          </FormControl>

            <Tooltip  placement="top" title="Show marker">
              <ToggleButton  size="small" aria-label="markercluster" >
                <RoomIcon />
              </ToggleButton>
            </Tooltip>
        </Grid>

        <Grid item xs={12}>
          
      

 
          {/* <FormControl size="small" variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Job Class</InputLabel>
            <Select
            size="small"
              // native
              onChange={handleDiseaseChange}
              label="Job Class"
            >
              {jobClass.map((job,index) =>
              <MenuItem
              key={job}
              value={job}>{job}
              </MenuItem>
              )}
            </Select>
          </FormControl> */}

          <FormControl size="small" variant="outlined" className={classes.formControl}>
            <InputLabel >Job Class</InputLabel>
            <Select
              multiple
              label="Job Class"
              value={jobClassSelect}
              onChange={handleJobChange}
              // input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              // MenuProps={MenuProps}
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
              {jobClassMapping.map((name) => (
                <MenuItem key={name.val} value={name.val} style={getStyles(name.val, jobClassSelect, theme)}>
                  {name.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* <FormControl size="small" variant="outlined" className={classes.formControl}>
            <InputLabel >Gender</InputLabel>
            <Select
              multiple
              label="Keywords"
              value={keyWord}
              onChange={handleKeyWordChange}
              // input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {keywords.map((name) => (
                <MenuItem key={name} value={name} style={getStyles(name, keyWord, theme)}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
        </Grid>
      </Grid>
    </div>
  );
}