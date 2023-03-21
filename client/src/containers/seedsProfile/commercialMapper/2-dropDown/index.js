import React, {useContext, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Tooltip, OutlinedInput, Grid, Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
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
    marginTop: theme.spacing(2)
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
      backgroundColor: '#29b5d5'
    }
  }, menuPaper: {
    maxHeight: 200
  }
}));

export default function MultipleSelect() {
  const classes = useStyles();
  const labelRef = useRef()

  const { profileLoc, setProfileLoc } = useContext(MapContext);
  const { brgysList, commercialClassMap, commercialClassSelect, setCommercialClassSelect } = useContext(FeaturesContext);

  const labelWidth = labelRef.current ? 65 : 0

  const handleBrgyChange = (event) => {
    setProfileLoc(event.target.value)
  };

  const handleCommercialChange = (event) => {
    setCommercialClassSelect(event.target.value)
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
            }} input={<OutlinedInput notched={profileLoc ? true : false} labelWidth={labelWidth}/>}>
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
          <ToggleButton  size="small" aria-label="markercluster" >
            <RoomIcon />
          </ToggleButton>
        </Tooltip>
      </Grid>
      
      <Grid item xs={12}>
        <FormControl size="small" variant="outlined" className={classes.formControl}>
          <InputLabel>Type</InputLabel>
          <Select size="small" onChange={handleCommercialChange} label="Demographic" value={commercialClassSelect}
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
            <MenuItem aria-label="None" value="" />
            {commercialClassMap?commercialClassMap.map((name) => 
              (name.field === 'barangay'? null: <MenuItem value={name.field}>{name.headerName}</MenuItem>)
            ):null}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}