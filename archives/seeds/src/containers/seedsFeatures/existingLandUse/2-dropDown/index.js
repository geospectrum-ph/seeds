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

import { Card, CardHeader, ButtonGroup, List, ListItem, Fab, Menu, Button, Tooltip, Box} from '@material-ui/core';
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

function getStyles(name, keyWord, theme) {
  return {
    fontWeight:
      keyWord.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function DropdownLandUse() {
  const classes = useStyles();
//83-99
  const theme = useTheme();
  const [landUse, setLandUse] = React.useState(null);
  const [keyword, setkeyWord] = React.useState([]);

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

  const { brgysList, setLandUseSelect, landUseGraph, setLandUseGraph, landUseCategory, setLandUseCategory}  = useContext(FeaturesContext);
  const { startDate, endDate}  = useContext(SEEDSContext);

  const [state, setState] = React.useState({ });
  const {commercialClassSelect, setCommercialClassSelect} =useContext(SEEDSContext);

  const handleBrgyChange = (event) => {
    const brgyname = event.target.value;
    setState({
      ...state,
      [brgyname]: event.target.value,
    });
    setHealthLoc(event.target.value)
    setLandUseCategory(null);
    setLandUse(null);

    const fetchData = async() => {

      const res = await axios(`https://seeds.geospectrum.com.ph/landuse/brgy`,
      // const res = await axios(`http://localhost:5000/landuse/brgy`,
      {params: {brgy_id: event.target.value
                }}); //ito yung gagamitin pag sa web yung server
      setLandUseSelect(res.data)


      const res_graph = await axios('https://seeds.geospectrum.com.ph/landuse/graph',
      // const res_graph = await axios('http://localhost:5000/landuse/graph',
      {params: {brgy_id: event.target.value}} );
      // console.log("res_graph.data.values",res_graph.data.values);
      setLandUseGraph(res_graph.data)
      // console.log("Landusegraph",res_graph.data)
      // console.log("LanduseSelect",res.data)
    }
    fetchData();
  };

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

  const handleLandUseCategory = (event) => {
    // console.log(event.target.value);
    const result = landUseGraph.filter(land_use => land_use.name == event.target.value)[0];
    setLandUse(event.target.value);
    setLandUseCategory(result);
  };
  // console.log(healthLoc)
  return (
    <div>
      <Grid container direction="column" xs={12} >
        <Grid container direction="row" justify="space-between" alignItems="center" className={classes.marginTop}>
          <FormControl size="small" variant="outlined" style={{width:'85%'}} InputLabelProps={{shrink: true,}}>
            <InputLabel id="demo-simple-select-outlined-label" >Location</InputLabel>
            <Select InputLabelProps={{shrink: true,}}
              // native
              labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined"
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

            <Tooltip placement="top" title="Show marker">
              <ToggleButton  size="small" aria-label="markercluster" >
                <RoomIcon />
              </ToggleButton>
            </Tooltip>
        </Grid>

        <Grid container direction="row" justify="space-between" alignItems="center" className={classes.marginTop}>
          <FormControl size="small" variant="outlined" style={{width:'100%'}} InputLabelProps={{shrink: true,}}>
            <InputLabel id="demo-simple-select-outlined-label" >Land Use Category</InputLabel>
            <Select InputLabelProps={{shrink: true,}}
              // native
              labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined"
              // value={age}
              // onChange={handleChange}
              label="Location"
              onChange={handleLandUseCategory}
              value={landUse}
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
              <MenuItem aria-label="None" value={landUse} />
              {landUseGraph? landUseGraph.map((land_use, index)=>{
                return(
                  <MenuItem value={land_use.name} key={index}>{land_use.name}</MenuItem> //option na barangay names
                )
              })
              : null}
            </Select>
          </FormControl>
        </Grid>

        {/* <Grid item xs={12}>
          <FormControl size="small" variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Typerrseasdas</InputLabel>
            <Select
            size="small"
              onChange={handleCommercialChange}
              label="Demographic"
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
              {commercialClassMapping.map((name) => (
              <MenuItem value={name}>{name}</MenuItem>))}
            </Select>
          </FormControl>
        </Grid> */}
      </Grid>


    </div>
  );
}