import React, { useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Tooltip, Box, Grid, Typography, Radio, FormLabel, FormControlLabel, RadioGroup, InputLabel, 
        OutlinedInput, Button, MenuItem, FormControl, Select } from '@material-ui/core';
import { ToggleButton } from '@material-ui/lab';

import RoomIcon from '@material-ui/icons/Room';

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
      backgroundColor: '#29b5d5',
    }
  }, menuPaper: {
    maxHeight: 200
  }, deleteButton: {
    border: 0,
    borderRadius: 5,
    backgroundColor: '#ced8da',
    color: '#33202A',
    fontSize: '1rem',
    fontFamily:'LeagueSpartan',
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#A31621'
    }
  }
}));

export default function DropdownPhilsys() {
  const classes = useStyles();

  const { profileLoc, setProfileLoc }  = useContext(MapContext);
  const { brgysList, setBrgySelect, setHouseholdSelect, householdMin, setHouseholdMin, 
    householdMax, setHouseholdMax, setHouseholdBldgShape, setHouseholdBldgPopulation,
    areaMax, setAreaMax, housingLandUse, setHousingLandUse, housingLandUseSelected, setHousingLandUseSelected,
    numberStoreysMin, setNumberStoreysMin, numberStoreysMax, setNumberStoreysMax, materialType, setMaterialType,
    materialTypeSelected, setMaterialTypeSelected, occupation, setOccupation, occupationSelected, setOccupationSelected,
    profession, setProfession, professionSelected, setProfessionSelected, gender, setGender, secondClick,
    setAgeMin, ageMin, setAgeMax, ageMax, householdLabels, setHouseholdLabels} = useContext(FeaturesContext);

  const rangeMembersList = ["1 - 2","3 - 4","5 - 6"," > 6"]
  const rangeAgeList = ["0 - 14","15 - 64"," > 65"]
  const areaList = ["less than 100 sq.m.","less than 500 sq.m.","less than 1000 sq.m.","less than 5000 sq.m."]

  const handleRadioChange = (event) => {
    if (event.target.value===gender) {
      setGender("");
      setHouseholdLabels({...householdLabels, Gender: ""}) // for label/ value only
    } else {
      setGender(event.target.value);
      setHouseholdLabels({...householdLabels, Gender: event.target.value}) // for label/ value only
    }
  };

  useEffect(() =>{
    const fetchData = async() => {
      const res = await axios('https://seeds.geospectrum.com.ph/analytics/getsubcategory/single',
      {params: {layerKey: 'Household_Population', specific_subcategory: 'housing_unit_serial_number'}});

      const res2 = await axios('https://seeds.geospectrum.com.ph/analytics/getsubcategory/single',
      {params: {layerKey: 'Household_Population', specific_subcategory: 'address_field'}});

      const res3 = await axios('https://seeds.geospectrum.com.ph/analytics/getsubcategory/single',
      {params: {layerKey: 'Household_Shape', specific_subcategory: 'properties.land_use'}});
      
      const res4 = await axios('https://seeds.geospectrum.com.ph/analytics/getsubcategory/single',
      {params: {layerKey: 'Household_Shape', specific_subcategory: 'properties.type_of_material'}});
      
      setHousingLandUse(res3.data)
      setMaterialType(res4.data)
      
      const p_res = await axios('https://seeds.geospectrum.com.ph/analytics/getsubcategory/single',
      {params: {layerKey: 'Household_Population', specific_subcategory: 'occupation'}});
      const p_res2 = await axios('https://seeds.geospectrum.com.ph/analytics/getsubcategory/single',
      {params: {layerKey: 'Household_Population', specific_subcategory: 'profession'}}); 
      
      setOccupation(p_res.data) 
      setProfession(p_res2.data) 
    };

    fetchData()
  }, [])

  
  const handleBrgyChange = (event) => {
    setProfileLoc(event.target.value)
    const fetchData = async() => {
      const res_brgy_only = await axios("https://seeds.geospectrum.com.ph/barangay",  
        {params: {brgy_name: event.target.value,}});

      // console.log(res_brgy_only.data)

      setBrgySelect(res_brgy_only.data[0])
      setHouseholdSelect(res_brgy_only.data[0])
    }
    fetchData();
  };

  const handleMembersRange = (event) => {
    setHouseholdLabels({...householdLabels, Range: event.target.value}) // for label/ value only
    var membersRange = event.target.value
    var newMembersRange =[]
    if (membersRange.includes("-")) {
      (membersRange.split("-")).map(i=>newMembersRange.push(Number(i)))
      setHouseholdMin(newMembersRange[0])
      setHouseholdMax(newMembersRange[1])
    } else if (membersRange.includes(">")){
      (membersRange.split(">")).map(i=>newMembersRange.push(Number(i)))
      setHouseholdMin(newMembersRange[1])
      setHouseholdMax(null)
    } else {
      setHouseholdMin(null)
      setHouseholdMax(null)
    }
  };
  
  const handleAgeRange = (event) => {
    setHouseholdLabels({...householdLabels, AgeRange: event.target.value}) // for label/ value only
    var ageRange = event.target.value
    var newAgeRange =[]
    if (ageRange.includes("-")) {
      (ageRange.split("-")).map(i=>newAgeRange.push(Number(i)))
      setAgeMin(newAgeRange[0])
      setAgeMax(newAgeRange[1])
    } else if (ageRange.includes(">")){
      (ageRange.split(">")).map(i=>newAgeRange.push(Number(i)))
      setAgeMin(newAgeRange[1])
      setAgeMax(null)
    } else {
      setAgeMin(null)
      setAgeMax(null)
    }
  };

  const handleStoreysRange = (event) => {
    setHouseholdLabels({...householdLabels, Storeys: event.target.value}) // for label/ value only
    var storeysRange = event.target.value
    var newStoreysRange =[]
    if (storeysRange.includes("-")) {
      (storeysRange.split("-")).map(i=>newStoreysRange.push(Number(i)))
      setNumberStoreysMin(newStoreysRange[0])
      setNumberStoreysMax(newStoreysRange[1])
    } else if (storeysRange.includes(">")){
      (storeysRange.split(">")).map(i=>newStoreysRange.push(Number(i)))
      setNumberStoreysMin(newStoreysRange[1])
      setNumberStoreysMax(null)
    } else {
      setNumberStoreysMin(null)
      setNumberStoreysMax(null)
    }
  }; 

  const handleArea = (event) => {
    var area = event.target.value
    setHouseholdLabels({...householdLabels, Area: event.target.value}) // for label/ value only

    var areaArray = []

    if (area) {
      area.split(" ").map(i=>areaArray.push(i))
      setAreaMax(Number(areaArray[2]))
    } else {
      setAreaMax(null)
    }
  };

  const handleOccupation = (event) => {
    setOccupationSelected(event.target.value)
    setHouseholdLabels({...householdLabels, Occupation: event.target.value}) // for label/ value only
  };

  const handleProfession = (event) => {
    setProfessionSelected(event.target.value)
    setHouseholdLabels({...householdLabels, Profession: event.target.value}) // for label/ value only
  };

  const handleLandUse = (event) => {
    setHouseholdLabels({...householdLabels, LandUse: event.target.value}) // for label/ value only
    setHousingLandUseSelected(event.target.value)
  };

  const handleMaterialType = (event) => {
    setHouseholdLabels({...householdLabels, Material: event.target.value}) // for label/ value only
    setMaterialTypeSelected(event.target.value)
  };

  useEffect(() => {
    const fetchData = async() => {
      // console.log("profileLoc: " + profileLoc)
      const res = await axios("https://seeds.geospectrum.com.ph/household/get", { 
        params: {
          brgy_id: profileLoc,
          no_members_min: householdMin,
          no_members_max: householdMax,
          area_max: areaMax,
          land_use: housingLandUseSelected,
          number_of_storeys_min: numberStoreysMin,
          number_of_storeys_max: numberStoreysMax,
          type_of_material: materialTypeSelected,
          occupation: occupationSelected,
          profession: professionSelected,
          gender: gender,
          age_min: ageMin,
          age_max: ageMax,
        }
      });
      setHouseholdBldgShape(res.data.Household_Shape)
      if (secondClick == false) {
        setHouseholdBldgPopulation(res.data.Household_Population.map((x)=>{ 
          x['id'] = x._id
          return x
        }));
      }
    }
    fetchData();
  }, [profileLoc, householdMin, householdMax, areaMax, housingLandUseSelected, numberStoreysMin, numberStoreysMax,
    materialTypeSelected, occupationSelected, professionSelected, gender, secondClick, ageMin, ageMax])

  const labelRef = useRef()
  const labelWidth = labelRef.current ? 65 : 0

  const clearItems = () => {
    setProfileLoc(null)
    setBrgySelect(null)
    setHouseholdSelect(null) 
    setHouseholdMin(null)
    setHouseholdMax(null)
    setHouseholdBldgShape(null)
    setHouseholdBldgPopulation(null)
    setAreaMax(null)
    setHousingLandUseSelected(null)
    setNumberStoreysMin(null)
    setNumberStoreysMax(null)
    setMaterialType(null)
    setMaterialTypeSelected(null)
    setOccupationSelected(null)
    setProfessionSelected(null)
    setGender('')
    setAgeMin(null)
    setAgeMax(null)
    setHouseholdLabels({
      Range: "",
      Area: "",
      LandUse: "",
      Storeys: "",
      Material: "",
      AgeRange: "",
      Occupation: "",
      Profession: "",
      Gender: "",
    })
  }

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={9} md={10} lg={10}>
        <FormControl size="small" variant="outlined" fullWidth style={{marginTop:2}} > 
          <InputLabel ref={labelRef} shrink={profileLoc}>
            Location
          </InputLabel>
          <Select label="Location" onChange={handleBrgyChange} value={profileLoc}
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
              return <MenuItem value={name.brgy_name} key={index}>{name.brgy_name}</MenuItem> //option na barangay names
            }) : null}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={3} md={2} lg={2} container direction="column" justifyContent="center" alignItems="flex-end" 
        style={{marginTop:2}}>
        <Tooltip placement="top" title="Show marker">
          <ToggleButton size="small" aria-label="markercluster">
            <RoomIcon/>
          </ToggleButton>
        </Tooltip>
      </Grid>
      <Grid item className={classes.formControl}>
        <Box>
          <Typography>Household</Typography>
          <br></br>
          <Grid container direction="row" justifyContent="space-between" spacing={2}>
            <Grid item xs={11} md={12} lg={12}>
              <FormControl size="small" variant="outlined" fullWidth style={{marginTop:2}} > 
                <InputLabel># of Household Members</InputLabel>
                <Select onChange={handleMembersRange} label="# of household members" value={householdLabels.Range}
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
                  <MenuItem aria-label="None" value="">None</MenuItem>
                  {rangeMembersList? rangeMembersList.map((item)=>{
                    return <MenuItem value={item} key={item}>{item}</MenuItem> //option na barangay names
                  }): null}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={11} md={12} lg={12}>
              <FormControl size="small" variant="outlined" fullWidth style={{marginTop:2}} > 
                <InputLabel>Area</InputLabel>
                <Select onChange={handleArea} label="Area" value={householdLabels.Area}
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
                  <MenuItem aria-label="None" value="">None</MenuItem>
                  {areaList? areaList.map((item)=>{
                    return <MenuItem value={item} key={item}>{item}</MenuItem> //option na barangay names  
                  }): null}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={11} md={12} lg={12}>
              <FormControl size="small" variant="outlined" fullWidth style={{marginTop:2}}> 
                <InputLabel>Land Use</InputLabel>
                <Select onChange={handleLandUse} label="Land Use" value={householdLabels.LandUse}
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
                  <MenuItem aria-label="None" value="">None</MenuItem>
                  {housingLandUse? housingLandUse.map((item)=>{
                    return <MenuItem value={item.headerName} key={item.headerName}>{item.headerName}</MenuItem> //option na barangay names  
                  }): null}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={11} md={12} lg={12}>
              <FormControl size="small" variant="outlined" fullWidth style={{marginTop:2}}> 
                <InputLabel># of Storeys</InputLabel>
                <Select onChange={handleStoreysRange} label="# of Storeys" value={householdLabels.Storeys}
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
                  <MenuItem aria-label="None" value="" >None</MenuItem>
                  {rangeMembersList? rangeMembersList.map((item)=>{
                    return <MenuItem value={item} key={item}>{item}</MenuItem> //option na barangay names  
                  }): null}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={11} md={12} lg={12}>
              <FormControl size="small" variant="outlined" fullWidth style={{marginTop:2}} > 
                <InputLabel>Type of Material</InputLabel>
                <Select onChange={handleMaterialType} label="Type of Material" value={householdLabels.Material}
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
                  <MenuItem aria-label="None" value="">None</MenuItem>
                  {materialType? materialType.map((item)=>{
                    return <MenuItem value={item.headerName} key={item.headerName}>{item.headerName}</MenuItem> //option na barangay names
                  }): null}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <br/>
        <Box>
          <Typography>Population</Typography>
          <br/>
          <Grid container direction="row" justifyContent="space-between" spacing={2}>
            <Grid item xs={11} md={12} lg={12}>
              <FormControl size="small" variant="outlined"  fullWidth style={{marginTop:2}}> 
                <InputLabel>Age Range</InputLabel>
                <Select onChange={handleAgeRange} label="Age Range" value={householdLabels.AgeRange}
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
                  <MenuItem aria-label="None" value="">None</MenuItem>
                  {rangeAgeList? rangeAgeList.map((item)=>{
                    return <MenuItem value={item} key={item}>{item}</MenuItem> //option na barangay names    
                  }): null}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={11} md={12} lg={12}>
              <FormControl size="small" variant="outlined" fullWidth style={{marginTop:2}} > 
                <InputLabel>Occupation</InputLabel>
                <Select onChange={handleOccupation} label="Occupation" value={householdLabels.Occupation}
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
                  <MenuItem aria-label="None" value="">None</MenuItem>
                  {occupation? occupation.map((item)=>{
                    return <MenuItem value={item.field} key={item.field}>{item.field}</MenuItem> //option na barangay names
                  }): null}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={11} md={12} lg={12}>
              <FormControl size="small" variant="outlined" fullWidth style={{marginTop:2}} > 
                <InputLabel>Profession</InputLabel>
                <Select onChange={handleProfession} label="Profession" value={householdLabels.Profession}
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
                  <MenuItem aria-label="None" value="">None</MenuItem>
                  {profession? profession.map((item)=>{
                    return <MenuItem value={item.headerName} key={item.headerName}>{item.headerName}</MenuItem> //option na barangay names
                  }): null}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={11} md={12} lg={12}>
              <FormControl className={classes.formControl}>
                <FormLabel>Gender</FormLabel>
                <RadioGroup row name="gender" value={householdLabels.Gender} >
                  <FormControlLabel value="M" control={<Radio onClick={handleRadioChange}/>} label="Male"/>
                  <FormControlLabel value="F" control={<Radio onClick={handleRadioChange}/>} label="Female"/>
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Button style={{height:"63%"}} fullWidth className={classes.deleteButton} variant="contained" 
        onClick={()=>clearItems()} >
        Clear
      </Button>
    </Grid>
  );
}