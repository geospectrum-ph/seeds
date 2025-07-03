import React, { useContext, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, InputLabel, MenuItem, FormControl, Select, Tooltip, OutlinedInput} from '@material-ui/core'
import { ToggleButton } from '@material-ui/lab';

import RoomIcon from '@material-ui/icons/Room';

import { FeaturesContext } from '../../../../context/FeaturesContext.js';
import { MapContext } from '../../../../context/MapContext.js';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: '100%',
    maxWidth: 300
  }, marginTop: {
    marginTop: theme.spacing(2),
  }, chips: {
    display: 'flex',
    flexWrap: 'wrap'
  }, chip: {
    margin: 2
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

export default function DropdownLandUse() {
  const classes = useStyles();
  const labelRef = useRef()
  const labelWidth = labelRef.current ? 65 : 65

  const { profileLoc, setProfileLoc }  = useContext(MapContext);
  const { brgysList, landUseGraph, setLandUseCategory, landUseClassSelect, setLandUseClassSelect } = useContext(FeaturesContext);

  const handleBrgyChange = (event) => {
    setProfileLoc(event.target.value)
    setLandUseCategory(null);
    setLandUseClassSelect(null);
  };

  const handleLandUseCategory = (event) => {
    const result = landUseGraph.filter(land_use => land_use.name == event.target.value)[0];
    setLandUseClassSelect(event.target.value);
    setLandUseCategory(result);
  };
  
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={9} md={10} lg={10}>
        <FormControl size="small" variant="outlined" InputLabelProps={{shrink: true}} fullWidth style={{marginTop:2}}>
          <InputLabel ref={labelRef} shrink={profileLoc}>
            Location
          </InputLabel>
          <Select InputLabelProps={{shrink: true}} label="Location" onChange={handleBrgyChange} value={profileLoc}
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left"
              }, transformOrigin: {
                vertical: "top",
                horizontal: "left"
              }, getContentAnchorEl: null,
              classes: { paper: classes.menuPaper }
            }} input={
              <OutlinedInput notched={profileLoc ? true : false} labelWidth={labelWidth}/>
            }>
            <MenuItem aria-label="None" value={profileLoc} />
            {brgysList? brgysList.map((name, index)=>{
              return(
                <MenuItem value={name.brgy_id} key={index}>{name.brgy_name}</MenuItem> //option na barangay names
              )
            })
            : null}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3} md={2} lg={2} container direction="column" justifyContent="center" alignItems="flex-end" 
        style={{marginTop:2}}>
        <Tooltip placement="top" title="Show marker">
          <ToggleButton size="small" aria-label="markercluster">
            <RoomIcon />
          </ToggleButton>
        </Tooltip>
      </Grid>
      <Grid container direction="row" justifyContent="space-between" alignItems="center" className={classes.marginTop}>
        <FormControl size="small" variant="outlined" style={{width:'100%'}}>
          <InputLabel>Land Use Category</InputLabel>
          <Select label="Land Use Category" onChange={handleLandUseCategory} value={landUseClassSelect}
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
            <MenuItem aria-label="None" value='' />
            {landUseGraph? landUseGraph.map((land_use, index)=>{
              return(
                <MenuItem value={land_use.name} key={index}>{land_use.name}</MenuItem> //option na barangay names
              )
            })
            : null}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}