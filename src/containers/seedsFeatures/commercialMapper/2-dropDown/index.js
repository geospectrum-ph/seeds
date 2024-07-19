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

// const commercialClassMapping = [
//   {class:"Food"},
//   {class:"Energy"},
//   {class:"Transport"},
// ];

export default function MultipleSelect() {
  const classes = useStyles();
//83-99
  const theme = useTheme();
  const [keyWord, setkeyWord] = React.useState([]);
  const [commercialClassMap, setCommercialClassMap] = React.useState();
  const { healthLoc, setHealthLoc }  = useContext(MapContext);

  const { brgysList, commercialSelect, setCommercialSelect, setCommercialMapperGraph}  = useContext(FeaturesContext);
  const { startDate, endDate}  = useContext(SEEDSContext);

  const [state, setState] = React.useState({ });
  const {commercialClassSelect, setCommercialClassSelect} =useContext(SEEDSContext);

  const handleKeyWordChange = (event) => {
    setkeyWord(event.target.value);
  };
  React.useEffect(() =>{
  if (commercialSelect){
    setCommercialClassMap(
      commercialSelect["properties"].map(function (value) {
        var object = {
          class: value.class,
          // name: value.class,
          // code: data[parseInt(value.job_class)-1].code,
          // value: value.institution_count,
        }
        return object;
    }))
  }

}, [commercialSelect])
// console.log(commercialClassMap,"commercialClassMap")
// console.log(commercialClassMapping,"commercialClassMapping")

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


  // console.log("Comm", commercialSelect)

  React.useEffect(() => {
    const fetchData = async() => {

      const res = await axios(`http://ec2-52-55-74-109.compute-1.amazonaws.com/commercialmapper/brgy/single`, 
      {params: {brgy_id: healthLoc,
                startdate: startDate,
                enddate: endDate, 
                // com_class: commercialClassSelect
                }}); //ito yung gagamitin pag sa web yung server
      setCommercialSelect(res.data) 
      // console.log("jobSelect on Date1 Change", res.data)

      const res_graph = await axios('http://ec2-52-55-74-109.compute-1.amazonaws.com/commercialmapper/graph', 
      
      {params: {brgy_id: healthLoc}} );
      // console.log("res_graph.data.values",res_graph.data.values);
      setCommercialMapperGraph(res_graph.data.values)
      // console.log("Commercial Select upon Dropdown 1",res_graph.data)
      // console.log("DD1-LOCATION")
      // console.log("DD1-HealthLoc",healthLoc)
      // console.log("DD1-Start", startDate)
      // console.log("DD1-End", endDate)
      // console.log("DD1-CommercialClassSelect", commercialClassSelect)
      // console.log("DD1-type", typeof(commercialClassSelect))
      

    }
    fetchData();
  }, [healthLoc])

  const handleBrgyChange = (event) => {
    const brgyname = event.target.value; 
    setState({
      ...state,
      [brgyname]: event.target.value,
      
    });
    setHealthLoc(event.target.value)
    
    // console.log("HealthLoc-even",(event.target.value))
    // console.log("kek")


    const fetchData = async() => {
      // console.log('hehe')
      const res = await axios(`http://ec2-52-55-74-109.compute-1.amazonaws.com/commercialmapper/brgy/single`, 
      {params: {brgy_id: event.target.value,
                startdate: startDate,
                enddate: endDate, 
                }}); //ito yung gagamitin pag sa web yung server
      setCommercialSelect(res.data) 
      // console.log("jobSelect on Brgy Change---withjim", res.data)

      const res_graph = await axios('http://ec2-52-55-74-109.compute-1.amazonaws.com/commercialmapper/graph', 
      
      {params: {brgy_id: event.target.value}} );
      // console.log("res_graph.data.values",res_graph.data.values);
      setCommercialMapperGraph(res_graph.data.values)
      // console.log("Commercial Select upon Dropdown 1",res_graph.data)
      // console.log("DD1-LOCATION")
      // console.log("DD1-HealthLoc",event.target.value)
      // console.log("DD1-Start", startDate)
      // console.log("DD1-End", endDate)
      // console.log("DD1-CommercialClassSelect", commercialClassSelect)
      // console.log("DD1-type", typeof(commercialClassSelect))
      

    }
    fetchData();
  };

  const handleCommercialChange = (event) => {
    // const commercialname = event.target.value; 
    // setState({
    //   ...state,
    //   [commercialname]: event.target.value,
    // });
    setCommercialClassSelect(event.target.value)
    // console.log("commercial class",commercialClassSelect)
    // console.log("commercial class-event",event.target.value)
    // console.log("commercial class-event",typeof(event.target.value))


    const fetchData = async() => {
      const res = await axios(`http://ec2-52-55-74-109.compute-1.amazonaws.com/commercialmapper/brgy/single`, 
      {params: {brgy_id: healthLoc,
                startdate: startDate,
                enddate: endDate,
                }}); //ito yung gagamitin pag sa web yung server
      setCommercialSelect(res.data) // general data, ito yung magpprint dapat sa card/paper

      const res_graph = await axios(`http://ec2-52-55-74-109.compute-1.amazonaws.com/commercialmapper/graph`, 
      {params: {brgy_id: healthLoc}} );

      // console.log("res_graph.data.values",res_graph.data.values);
      setCommercialMapperGraph(res_graph.data.values)

      // console.log("Commercial Select upon Dropdown 2",res.data)
      // console.log("DD2-LOCATION")
      // console.log("DD2-HealthLoc",healthLoc)
      // console.log("DD2-Start", startDate)
      // console.log("DD2-End", endDate)
      // console.log("DD2-CommercialClassSelect", event.target.value)
      // console.log("DD1-type", typeof(event.target.value))

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

        <Grid item xs={12}>
          
          <FormControl size="small" variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Type</InputLabel>
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
              {commercialClassMap?commercialClassMap.map((name) => (
              <MenuItem value={name.class}>{name.class}</MenuItem>)):null}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
          
 

    </div>
  );
}