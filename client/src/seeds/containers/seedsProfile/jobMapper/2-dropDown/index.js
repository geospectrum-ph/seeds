import React, {useContext, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Tooltip, OutlinedInput, Grid, Chip, Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
import { ToggleButton } from '@material-ui/lab';

import RoomIcon from '@material-ui/icons/Room';
import CancelIcon from "@material-ui/icons/Cancel";

import { FeaturesContext } from '../../../../context/FeaturesContext.js';
import { MapContext } from '../../../../context/MapContext.js';

import _without from "lodash/without";

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

export default function DropdownJob() {

  const classes = useStyles();
  const { profileLoc, setProfileLoc }  = useContext(MapContext);
  const { brgysList, employmentClassMap, jobClassSelect, setJobClassSelect }  = useContext(FeaturesContext);
  const labelRef = useRef()
  const labelWidth = labelRef.current ? 65 : 0

  const handleBrgyChange = (event) => {
    setProfileLoc(event.target.value)
  };

  const handleJobChange = (event) => {
    setJobClassSelect(event.target.value);
  };

  const handleDelete = (e, value) => {
    e.preventDefault();
    setJobClassSelect((jobClassSelect) => _without(jobClassSelect, value));
  };
 
  return (
    <div>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Grid item xs={9} md={10} lg={10}>
          <FormControl size="small" variant="outlined" fullWidth style={{marginTop:2}}>
            <InputLabel ref={labelRef} shrink={profileLoc}>
              Location
            </InputLabel>
            <Select value={profileLoc} label="Location" onChange={handleBrgyChange}
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
              <MenuItem aria-label="None" value=""/>
              {brgysList? brgysList.map((name)=>{
                return(
                  <MenuItem value={name.brgy_id}>{name.brgy_name}</MenuItem> //option na barangay names
                )
              })
              : null}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3} md={2} lg={2} container direction="column" justifyContent="center" 
          alignItems="flex-end" style={{marginTop:2}}>
          <Tooltip placement="top" title="Show marker">
            <ToggleButton size="small" aria-label="markercluster" >
              <RoomIcon />
            </ToggleButton>
          </Tooltip>
        </Grid>
        <Grid item xs={12} >
          <FormControl size="small" variant="outlined" className={classes.formControl}>
            <InputLabel>Job Class</InputLabel>
            <Select multiple label="Job Class" value={jobClassSelect} onChange={handleJobChange}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} className={classes.chip} 
                    deleteIcon={<CancelIcon onMouseDown={(event) => event.stopPropagation()}/>}
                    onDelete={(e) => handleDelete(e, value)}/>
                  ))}
                </div>
              )} MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left"
                }, transformOrigin: {
                  vertical: "top",
                  horizontal: "left"
                }, getContentAnchorEl: null,
                classes: { paper: classes.menuPaper }
              }}>
              {employmentClassMap? employmentClassMap.map((name) => (
                <MenuItem key={name.field} value={name.field}>
                  {name.headerName}
                </MenuItem>
              )): null}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}