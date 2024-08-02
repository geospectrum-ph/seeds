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

// import MultipleSelection from '../../datepicker copy';
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

const keywords = ["Barangay", "Purok", "Points", "Land use", "Hazard Zone", "Disease", "Employment", "Facility", "Person"];

function getStyles(name, keyWord, theme) {
  return {
    fontWeight:
      keyWord.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export default function MultipleSelect() {
  const classes = useStyles();
//83-99
  const theme = useTheme();
  const [keyWord, setkeyWord] = React.useState([]);

  const handleKeyWordChange = (event) => {
    setkeyWord(event.target.value);
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setkeyWord(value);
  };

  const { healthLoc, setHealthLoc }  = useContext(MapContext);

  const { brgysList, setHealthSelect, setHealthMapperGraph}  = useContext(FeaturesContext);
  // console.log("BARANGAYS IN SEEDS", brgysList)
  // var names = brgysList;
  // console.log( "SEEDS",names)

  const { startDate, endDate}  = useContext(SEEDSContext);

  const [state, setState] = React.useState({ });


  const handleBrgyChange = (event) => {
    const brgyname = event.target.value; 
    setState({
      ...state,
      [brgyname]: event.target.value,
      
    });
    setHealthLoc(event.target.value)
    // console.log(startDate, endDate)
    const fetchData = async() => {
      const res = await axios('http://localhost:5000/healthmapper/brgy/single', 
      {params: {brgy_id: event.target.value,
                startdate: startDate,
                enddate: endDate}}); //ito yung gagamitin pag sa web yung server

      setHealthSelect(res.data)

      const res_graph = await axios('http://localhost:5000/healthmapper/graph', 
      {params: {brgy_id: event.target.value}} );
      // console.log(res_graph.data.values);
      setHealthMapperGraph(res_graph.data.values)

    } 

    // const fetchData = async() => {
    //   const res = await axios('https://seeds.geospectrum.com.ph/healthmapper/brgy/single', 
    //   {params: {brgy_id: event.target.value,
    //             startdate: startDate,
    //             enddate: endDate}}); //ito yung gagamitin pag sa web yung server

    //   setHealthSelect(res.data)

    //   const res_graph = await axios('https://seeds.geospectrum.com.ph/healthmapper/graph', 
    //   {params: {brgy_id: event.target.value}} );
    //   // console.log(res_graph.data.values);
    //   setHealthMapperGraph(res_graph.data.values)

    // } 
    fetchData();
  
  };
  const handleDiseaseChange = (event) => {
    const diseasename = event.target.value;
    setState({
      ...state,
      [diseasename]: event.target.value,
    });
  

  };
  // console.log(healthLoc)


  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [alignment, setAlignment] = React.useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  // console.log(healthLoc)
  return (
    <div>
      <Grid container direction="column" xs={12} >
        <Grid 
        container 
        direction="row" 
        justify="space-between"
        alignItems="center" 
        className={classes.marginTop}
        >
          <FormControl size="small" variant="outlined" style={{width:'85%'}} InputLabelProps={{shrink: true,}}>
            <InputLabel id="demo-simple-select-outlined-label" >Location</InputLabel>
            <Select InputLabelProps={{shrink: true,}}
              // native
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              // value={age}
              // onChange={handleChange}
              label="Location"
              onChange={handleBrgyChange}
              value={healthLoc}
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
              <MenuItem aria-label="None" value={healthLoc} />
              {brgysList? brgysList.map((name, index)=>{
                return(
                  <MenuItem value={name.brgy_id} key={index}>{name.brgy_name}</MenuItem> //option na barangay names
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
            {/* <ToggleButton
      value="check"
      selected={selected}
      onChange={() => {
        setSelected(!selected);
      }}
    >
      <CheckIcon />
    </ToggleButton> */}
        </Grid>

        <Grid item xs={12}>
          
          <FormControl size="small" variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Category</InputLabel>
            <Select
            size="small"  
              // native
              onChange={handleDiseaseChange}
              label="Hazard"
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
              <MenuItem value={''}>Hazard1</MenuItem>
              <MenuItem value={''}>Hazard2</MenuItem>
              <MenuItem value={''}>Hazard3</MenuItem>
            </Select>
          </FormControl>
          {/* <FormControl size="small" variant="outlined" className={classes.formControl}>
            <InputLabel >Keywords</InputLabel>
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