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
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';

// import MultipleSelection from '../../datepicker copy';
import { FeaturesContext } from '../../../../context/FeaturesContext.js';
import { MapContext } from '../../../../context/MapContext.js';
import { SEEDSContext } from '../../../../context/SEEDSContext.js';

import PropTypes from 'prop-types';
// import { FixedSizeList } from 'react-window';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
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




const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];


export default function DropdownDisease() {
  const classes = useStyles();
//83-99
  const theme = useTheme();
  const [keyWord, setkeyWord] = React.useState([]);
  const [toggle, setToggle] = React.useState(true);

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

  // const { startDate, endDate}  = useContext(SEEDSContext);
  const { startDate, endDate, diseaseClassSelect, setDiseaseClassSelect, setPoints}  = useContext(SEEDSContext);

  const [state, setState] = React.useState({ });


  const handleBrgyChange = (event) => {
    const brgyname = event.target.value; 
    setState({
      ...state,
      [brgyname]: event.target.value,
      
    });
    setHealthLoc(event.target.value)
    const fetchData = async() => {
      const res = await axios('http://ec2-52-55-74-109.compute-1.amazonaws.com/healthmapper/brgy/single', 
      {params: {brgy_id: event.target.value,
                startdate: startDate,
                enddate: endDate}}); //ito yung gagamitin pag sa web yung server
      setHealthSelect(res.data) 

      
      const res_graph = await axios('http://ec2-52-55-74-109.compute-1.amazonaws.com/healthmapper/graph', 
      {params: {brgy_id: event.target.value}} );
      setHealthMapperGraph(res_graph.data.values)
    } 
    
    fetchData();

  };


  const handleDiseaseChange = (event) => {
    setDiseaseClassSelect(event.target.value);
    const fetchData = async() => {
      const res = await axios('http://ec2-52-55-74-109.compute-1.amazonaws.com/healthmapper/brgy/single', 
      {params: {brgy_id: event.target.value,
                startdate: startDate,
                enddate: endDate}}); //ito yung gagamitin pag sa web yung server
      setHealthSelect(res.data) 

      
      const res_graph = await axios('http://ec2-52-55-74-109.compute-1.amazonaws.com/healthmapper/graph', 
      {params: {brgy_id: event.target.value}} );
      setHealthMapperGraph(res_graph.data.values)

    } 
    
    fetchData();

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

  const handleToggleOn = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const { toggleOn, setToggleOn } = React.useContext(MapContext)
  // console.log("toggleon",toggleOn)

  const handleToggle = async () => {
    if (toggle) {
      setPoints([])
      setToggle(false)
      // console.log("clear points")

    } else {
      // const res5 = await axios('http://ec2-52-55-74-109.compute-1.amazonaws.com/healthmapper/allpoints',);
      // setPoints(res5.data)
      setToggle(true)
    }
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

{/* <div className={classes.root}>
      <FixedSizeList height={100} width={300} itemSize={46} itemCount={200}>
        {renderRow}
      </FixedSizeList>
    </div> */}


          <FormControl  size="small" variant="outlined" height="100px" height="100" style={{width:'85%'}} InputLabelProps={{shrink: true,}}>
            <InputLabel id="demo-simple-select-outlined-label" >Location</InputLabel>
            <Select InputLabelProps={{shrink: true,}}
              // native
              height="100px" 
              height="100" 
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={healthLoc}
              // onChange={handleChange}
              label="Location"
              onChange={handleBrgyChange}
              // value={healthLoc}
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
              <MenuItem   aria-label="None" value={healthLoc} />
              {brgysList? brgysList.map((name, index)=>{
                return(
                  <MenuItem value={name.brgy_id} key={index}>{name.brgy_name}</MenuItem> //option na barangay names
                )
              })
              : null}
            </Select>
          </FormControl>

            <Tooltip placement="top" title="Show marker">
              {/* <ToggleButton selected={toggleOn} size="small" aria-label="markercluster" onChange={() => {setToggleOn(!toggleOn);}}> */}
              <ToggleButton selected={toggleOn} size="small" aria-label="markercluster" onClick={() => {setToggleOn(!toggleOn);}}>

                {toggle? <RoomIcon /> : <RoomOutlinedIcon/> }
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
          
          <FormControl size="small" variant="outlined" className={classes.formControl} >
            <InputLabel htmlFor="age-native-simple">Disease</InputLabel>
            <Select
            size="small"
              // native
              onChange={handleDiseaseChange}
              label="Disease"
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left"
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left"
                },
                getContentAnchorEl: null
              }}

            >
              <MenuItem aria-label="None" value="" />
              <MenuItem value={'COVID'}>Covid</MenuItem>
              {/* <MenuItem value={'Dengue'}>Dengue</MenuItem>
              <MenuItem value={'Rabies'}>Rabies</MenuItem> */}
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