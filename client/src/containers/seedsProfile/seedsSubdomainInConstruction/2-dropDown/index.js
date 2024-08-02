import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Select, FormControl, MenuItem, InputLabel, Tooltip } from '@material-ui/core'
import axios from 'axios';
import { ToggleButton } from '@material-ui/lab';

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
  }, marginTop: {
    marginTop: theme.spacing(2),
  }, chips: {
    display: 'flex',
    flexWrap: 'wrap',
  }, chip: {
    margin: 2,
  }, fabButton2: {
    border: 0,
    borderRadius: 0,
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: '#29b5d5',
    }
  }, menuPaper: {
    maxHeight: 200
  }
}));

export default function MultipleSelect() {
  const classes = useStyles();

  const [state, setState] = React.useState({ });

  const { profileLoc, setProfileLoc } = useContext(MapContext);
  const { brgysList, setHealthSelect, setDiseaseMapperGraph} = useContext(FeaturesContext);
  const { startDate, endDate} = useContext(SEEDSContext);

  const handleBrgyChange = (event) => {
    const brgyname = event.target.value; 
    setState({
      ...state,
      [brgyname]: event.target.value,
    });
    setProfileLoc(event.target.value)
    const fetchData = async() => {
      const res = await axios('http://localhost:5000/healthmapper/brgy/single', {
        params: {
          brgy_id: event.target.value,
          startdate: startDate,
          enddate: endDate
        }
      }); //ito yung gagamitin pag sa web yung server

      setHealthSelect(res.data)

      const res_graph = await axios('http://localhost:5000/healthmapper/graph', {params: {brgy_id: event.target.value}});
      setDiseaseMapperGraph(res_graph.data.values)
    } 
    // const fetchData = async() => {
    //   const res = await axios('https://seeds.geospectrum.com.ph/healthmapper/brgy/single', {
    //     params: {
    //       brgy_id: event.target.value,
    //       startdate: startDate,
    //       enddate: endDate
    //     }
    //   }); //ito yung gagamitin pag sa web yung server

    //   setHealthSelect(res.data)

    //   const res_graph = await axios('https://seeds.geospectrum.com.ph/healthmapper/graph', {params: {brgy_id: event.target.value}});
    //   setDiseaseMapperGraph(res_graph.data.values)
    // } 
    fetchData();
  
  };
  const handleDiseaseChange = (event) => {
    const diseasename = event.target.value;
    setState({
      ...state,
      [diseasename]: event.target.value,
    })
  };

  return (
    <div>
      <Grid container direction="column" xs={12} >
        <Grid container direction="row" justifyContent="space-between" alignItems="center" 
          className={classes.marginTop}>
          <FormControl size="small" variant="outlined" style={{width:'85%'}} InputLabelProps={{shrink: true,}}>
            <InputLabel>Location</InputLabel>
            <Select InputLabelProps={{shrink: true,}} label="Location" onChange={handleBrgyChange} value={profileLoc}
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
              }}>
              <MenuItem aria-label="None" value={profileLoc} />
              {brgysList? brgysList.map((name, index)=>{
                return(
                  <MenuItem value={name.brgy_id} key={index}>{name.brgy_name}</MenuItem> //option na barangay names
                )
              })
              : null}
            </Select>
          </FormControl>
          <Tooltip placement="top" title="Show marker">
            <ToggleButton size="small" aria-label="markercluster" >
              <RoomIcon />
            </ToggleButton>
          </Tooltip>
        </Grid>

        <Grid item xs={12}>
          <FormControl size="small" variant="outlined" className={classes.formControl}>
            <InputLabel>Category</InputLabel>
            <Select size="small" onChange={handleDiseaseChange} label="Hazard"
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
              }}>
              <MenuItem aria-label="None" value="" />
              <MenuItem value={''}>Hazard1</MenuItem>
              <MenuItem value={''}>Hazard2</MenuItem>
              <MenuItem value={''}>Hazard3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}