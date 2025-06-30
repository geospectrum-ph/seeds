
import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import _without from "lodash/without";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Label, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button, Typography, Grid, Container, Paper, Checkbox, Divider, FormControl, FormGroup,
          InputLabel, MenuItem, Select ,Radio, RadioGroup, FormControlLabel, ListSubheader, FormHelperText }from '@material-ui/core';
import { createTheme, makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';

import SeedsAnalyticsMap from './seedsAnalyticsMap/index'
import AnalyticsDatePicker from './datePicker'
import LoadingPage from '../loadingPage'

import { SEEDSContext } from '../../context/SEEDSContext';
import {AnalyticsContext} from '../../context/AnalyticsContext';

const theme = createTheme({
  typography: {
    h3: {
      fontFamily: "Outfit"
    },
    h6: {
      fontFamily: "Outfit"
    }
  },
  palette: {
    primary: {
      main: "#1b798e"
    },
    secondary: {
      main: "#0d3c47"
    }
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTypography-h3': {
      fontFamily: "'Outfit', sans-serif"
    }, '& .MuiTypography-h5': {
      fontFamily: "'Outfit', sans-serif"
    }, '& .MuiTypography-h6': {
      fontFamily: "'Outfit', sans-serif"
    }
  }, formControl: {
    marginTop: theme.spacing(2),
    minWidth: '100%',
    maxWidth: 300
  }, login2: {
    borderWidth: 1,
    borderRadius: 0,
    borderColor: "#1b798e",
    color: '#1b798e',
    padding: '10px 20px',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '1rem',
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#1b798e',
      borderColor: "#1b798e"
    }, '&:active': {
      color: '#fffefe',
      borderColor: "#1b798e",
      backgroundColor: '#229922'
    }, '&:focus': {
      color: '#fffefe',
      borderColor: "#229922",
      backgroundColor: '#229922'
    }
  }, cardGrid: {
    paddingBottom: theme.spacing(8)
  }, login1: {
    border: 0,
    borderRadius: 5,
    backgroundColor: '#1b798e',
    color: '#ffffff',
    fontSize: '1rem',
    fontFamily: "'Outfit', sans-serif",
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922',
    }
  }, deleteButton: {
    border: 0,
    borderRadius: 5,
    backgroundColor: '#ced8da',
    color: '#33202A',
    fontSize: '1rem',
    fontFamily: "'Outfit', sans-serif",
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#A31621',
    }
  }, menuPaper: {
    maxHeight: 300
  },
}));

export default function Analytics() {
  const classes = useStyles();

  const { setSelectedIndex, setDisUp } = useContext(SEEDSContext);

  const { selectLoc, setSelectLoc, locLayers, setLocLayers, catLayers, setCatLayers, 
    selectCatDataOne, setSelectCatDataOne, subCat, setSubCat, selectSubCat2, setSelectSubCat2, 
    selectSubCat1, setSelectSubCat1, subCat2, setSubCat2, setCentroids, mapBrgys, setMapBrgys,
    setAnalyticsMapping, analyticsmap, temporalLegend, disNum, setDisNum, disStr, setDisStr, 
    dis2Num, setDis2Num, dis2Str, setDis2Str, graphData, setGraphData, graphLabels, setGraphLabels, 
    checkboxChecked, setCC, checkedAll, setCheckedAll, rows, setRows, cols, setCols} = useContext(AnalyticsContext)
  
  useEffect(() => {
    if (selectSubCat1 && disStr && selectSubCat2 && dis2Str){
      var dn1 = 0
      var dn2 = 0

      if (disNum[0].length>0) {dn1=1} 
      if (dis2Num[0].length>0) {dn2=1} 

      if (selectSubCat1.length === disStr[0].length + dn1 && selectSubCat2.length === dis2Str[0].length + dn2){
        var sc1 = selectSubCat1.filter((item)=>item.schematype === "String" && item.column_classes.length === 0)
        var sc2 = selectSubCat2.filter((item)=>item.schematype === "String" && item.column_classes.length === 0)
        if (sc1.length === 0 && sc2.length === 0){ // if it doesn't contains empty column_classes
          setCC(true)
        } else { // if it contains empty column_classes
          setCC(false)
        }

      } else {
        setCC(false)
      }
    }
  
  }, [selectSubCat1, selectSubCat2, disStr, dis2Str, disNum, dis2Num])
 
  useEffect(()=>{
    const fetchData = async () => {
      const res = await axios('https://seeds.geospectrum.com.ph/analytics/getlayers', ); // data layer dropdown
      // const res = await axios('http://localhost:5000/analytics/getlayers', ); // data layer dropdown
      setCatLayers(res.data)
    }
    fetchData()
    setSelectedIndex(4)
  }, [])

  const onCatChangeDataOne = (e) => {
    var sc1 = e.target.value[0]
    var sc2 = null
    if (e.target.value.length < 2){
      sc2 = e.target.value[0]
      setSelectCatDataOne([sc1, sc2]) //selected category by user [e.target.value[0], e.target.value[0] == e.target.value
    } else if (e.target.value.length > 2){
      sc2 = e.target.value[2] || e.target.value[1]
      setSelectCatDataOne([sc1, sc2]) //selected category by user
    }
    const fetchData = async () => {
      const res = await axios('https://seeds.geospectrum.com.ph/analytics/getlocations', {params:{
      // const res = await axios('http://localhost:5000/analytics/getlocations', {params:{
        layerArray: e.target.value.length > 2 ? [sc1, sc2]: [sc1]
      }});  
      setLocLayers(res.data) // ito yung lalamanin ng location dropdown
      setSelectLoc(res.data.map((item) => {
        return item.value
      }))
    }
    const fetchData2 = async () => {
      const res = await axios('https://seeds.geospectrum.com.ph/analytics/getsubcategories', {params:{
      // const res = await axios('http://localhost:5000/analytics/getsubcategories', {params:{
        layerArray: e.target.value.length > 2 ? [sc1, sc2]: [sc1]
      }}); 
      if (e.target.value.length > 1){

        var numArray = res.data[0].filter((item) => { if (item.schematype === "Number" ) {return true}})
        var strArray = res.data[0].filter((item) => { if (item.schematype === "String" ) {return true}})
        
        setDisNum([numArray])
        setDisStr([strArray])
        
        if (numArray.length>0) { // added this one to prevent crashing of website upon unchecking of disease checkbox, 
          setSelectSubCat1([numArray[0]].concat(strArray))
        } else {
          setSelectSubCat1(strArray)
        }

        var num2Array = res.data[1].filter((item) => { if (item.schematype === "Number" ) {return true}})
        var str2Array = res.data[1].filter((item) => { if (item.schematype === "String" ) {return true}})
        setDis2Num([num2Array])
        setDis2Str([str2Array])

        setSubCat([res.data[0]]) // ito yung lalamanin ng left panel
        setSubCat2([res.data[1]]) // ito yung lalamanin ng left panel

        if (num2Array.length>0) {
          setSelectSubCat2([num2Array[0]].concat(str2Array))
        } else {
          setSelectSubCat2(str2Array)
        }
      } else {

        var numArray = res.data[0].filter((item) => { if (item.schematype === "Number" ) {return true}})
        var strArray = res.data[0].filter((item) => { if (item.schematype === "String" ) {return true}})

        setDisNum([numArray])
        setDisStr([strArray])
        setDis2Num([numArray])
        setDis2Str([strArray])

        if (numArray.length>0) {
          setSelectSubCat1([numArray[0]].concat(strArray))
          setSelectSubCat2([numArray[0]].concat(strArray))
        } else {
          setSelectSubCat1(strArray)
          setSelectSubCat2(strArray)
        }
        
        setSubCat(res.data)
        setSubCat2(res.data)
      }
    }
    fetchData2()
    fetchData()
  }

  const onLocChange = (e) => {
    if (e.target.value[e.target.value.length-1] !== 'Select all'){
      setSelectLoc(e.target.value)//selected location by user
    } else {
      if(checkedAll){
        setSelectLoc([]);
      } else{
        setSelectLoc(locLayers.map((i)=> i.value));
      } setCheckedAll(!checkedAll)
    }
    setSelectSubCat1(selectSubCat1.filter((item) => {
      if (item !==undefined){return item}
    }))
    setSelectSubCat2(selectSubCat2.filter((item) => { 
      if (item !==undefined){return item}
    }))
  }

  const selectAll = () => {
    if(checkedAll){
      setSelectLoc([]);
    } else{
      setSelectLoc(locLayers);
    } setCheckedAll(!checkedAll)
  }
  
  const clearItems = () => {
    setSelectCatDataOne([])
    setSelectLoc([])
    setSubCat([])
    setSubCat2([])
    setLocLayers([])
    analyticsmap.current.eachLayer(function(layer) {
      if (layer.feature) {
        analyticsmap.current.removeLayer(layer);
      }
    })

    setGraphData(null)
    setGraphLabels(null)
    setRows({})
    setMapBrgys([])
    if (temporalLegend) {
      analyticsmap.current.removeControl(temporalLegend);
    }

  }

  const onRadioChange = (e) => {
    setSelectSubCat1(selectSubCat1.filter((item)=> item.schematype!=='Number').concat(subCat[0].filter((item) => item.column_name === e.target.value)[0]))
  }

  const onRadioChangeNon = (e) => {
    setDisStr([disStr[0].map((item)=>{
      if (e.target.value === item.column_name){
        return{
          ...item,
          checked: !item.checked
        }
      } else {return item}
    })])
    if (e.target.checked){
      setSelectSubCat1(selectSubCat1.filter((item)=> item.column_name!==e.target.value).concat(subCat[0].filter((item) => item.column_name === e.target.value )[0]))
    } else {
      setSelectSubCat1(selectSubCat1.filter((item) => item.column_name !== e.target.value))
      if (disStr[0].filter((item) => !item.checked).length < 2){
      }
    }
  }

  const onRadioChangeSub = (e, name) => {
    var parentChecked = selectSubCat1.filter((item) => item.column_name === name)[0]
    if (!parentChecked && name && e.target.checked) {
      var sc_item = subCat[0].filter((item) => item.column_name === name)[0]
      sc_item = JSON.parse(JSON.stringify(sc_item)) // create deep copy so it doesn't change contents of subCat
      sc_item.column_classes = [e.target.value]
      setSelectSubCat1([...selectSubCat1, sc_item])
    } else if (e.target.checked) {
      setSelectSubCat1(selectSubCat1.map((item)=>{
        if (item.column_name === name){
          return{
            ...item,
            column_classes: [
              ...item.column_classes, e.target.value
            ]
          }
        } else return item
      }))
    } else {
      setSelectSubCat1(selectSubCat1.filter((item) => { 
        if (item !==undefined ){ return item }
      }).map((item)=>{
        if (item.column_name === name){ // name ng inuncheck
          if (item.column_classes.length < 2){ //? why?? ?? ?? nani
            // setSC(false)
          } 
          return {
            ...item,
            column_classes: item.column_classes.filter((i)=> i !== e.target.value)
          }   
        } else return item
      }))
    }
  }

  const onRadioChange2 = (e) => {
    setSelectSubCat2(selectSubCat2.filter((item)=> item.schematype!== 'Number').concat(subCat2[0].filter((item) => item.column_name === e.target.value )[0]))
  }

  const onRadioChange2Non = (e) => {
    setDis2Str([dis2Str[0].map((item)=>{
      if (e.target.value === item.column_name){
        return{
          ...item,
          checked: !item.checked
        }
      } else {return item}
    })])
    if (e.target.checked){
      setSelectSubCat2(selectSubCat2.filter((item)=> item.column_name!==e.target.value).concat(subCat2[0].filter((item) => item.column_name === e.target.value )[0]))
    } else {
      setSelectSubCat2(selectSubCat2.filter((item) => item.column_name !== e.target.value))

      if (dis2Str[0].filter((item) => !item.checked).length > 1){
      }

    }
  }

  const onRadioChange2Sub = (e, name) => {
    var parentChecked = selectSubCat2.filter((item) => item.column_name === name)[0]

    if (!parentChecked && name && e.target.checked) {
    
      var sc_item = subCat2[0].filter((item) => item.column_name === name)[0]
      sc_item = JSON.parse(JSON.stringify(sc_item)) // create deep copy so it doesn't change contents of subCat
      sc_item.column_classes = [e.target.value]
      setSelectSubCat2([...selectSubCat2, sc_item])
    } else if (e.target.checked) {
      setSelectSubCat2(selectSubCat2.map((item)=>{
        if (item.column_name === name){
          return{
            ...item,
            column_classes: [
              ...item.column_classes, e.target.value
            ]
          }
        } else return item
      }))
    } else {
      setSelectSubCat2(selectSubCat2.filter((item) => { 
        if (item !==undefined){return item}
      }).map((item)=>{
        if (item.column_name === name){
          if (item.column_classes.length < 2){
            // setS2C(false)
          }
          return{
            ...item,
            column_classes: item.column_classes.filter((i)=> i !== e.target.value)
          }      
        }else return item 
      }))
    }
  }
  
  const saveAnalyticsMapping = () => {
    var selectSubCatArr = [selectSubCat1, selectSubCat2]
    var output = []
    if (selectCatDataOne[0] === selectCatDataOne[1]){ // if selected layers are the same
      for (var i = 0; i < selectCatDataOne.length; i++){
        var num =  "_"
        num = num.concat((i.toString()))
        var layerName = selectCatDataOne[i].concat(num) // add _i
        var selectsubCatI = selectSubCatArr[i]
        var subcat = selectsubCatI.filter((item) => {
          if(item !==undefined){
            if (item.schematype === "Number"){return item.column_name;} // ccheck if may number
          }
        })
        if (subcat.length == 0){ // kung wala, 0 yung length, walang nafilter
          var sc = selectsubCatI.filter((item) => {
            if(item !==undefined){ // papasok dito, tapos kukunin nya anything basta may laman
              return item.column_name;
            }
          })
          subcat = [sc[0]]
        }
        output.push({layerName: layerName, column_name: subcat[0].column_name})
      }
    } else { // if selected layers are not the same
      for (var i = 0; i < selectCatDataOne.length; i++){
        var layerName = selectCatDataOne[i]
        var selectsubCatI = selectSubCatArr[i]
        var subcat = selectsubCatI.filter((item) => {
          if(item !==undefined){
            if (item.schematype === "Number"){return item.column_name;}
          }
        })
        if (subcat.length == 0){
          var sc = selectsubCatI.filter((item) => {
            if(item !==undefined){
              return item.column_name;
            }
          })
          subcat = [sc[0]]
        }
        output.push({layerName: layerName, column_name: subcat[0].column_name})
      }
    }
    
    setAnalyticsMapping(output)
  }

  const performAnalysis = (e) => {
    setDisUp(true)
    const fetchData = async () => {
      var performAnalysisInput = {layerArray: selectCatDataOne, locationArray: selectLoc, subcategories: [
        selectSubCat1.filter((item) => {
          if (item !==undefined){return item}
        }), selectSubCat2.filter((item) => { 
          if (item !==undefined){return item}
        })]} // performAnalysis - galing sa dropdown layer, location, subcat, ito yung binabalik sa backend para makuha yung baseOutput.
      const res = await axios.post('https://seeds.geospectrum.com.ph/analytics/basicanalysis', 
      // const res = await axios.post('http://localhost:5000/analytics/basicanalysis', 
        performAnalysisInput
      ).then((response)=>{
        setDisUp(false)
        saveAnalyticsMapping(performAnalysisInput) // performAnalysis - galing sa dropdown layer, location, subcat, ito yung binabalik sa backend para makuha yung baseOutput.

        setGraphData(response.data.graph.values)
        setGraphLabels(response.data.graph.columns)
        setCentroids(response.data.map.centroids)
        setMapBrgys(response.data.map.barangays)
        // sinesave din natin to. 
        setCols(Object.keys(response.data.table.columns).map((item)=>{
          return {
            field: item, headerName: response.data.table.columns[item], width:250
          }
        }))
        setRows(response.data.table.values.map((item) => {
          return {
            ...item,
            id: item.brgy_id
          }
        }).filter((x)=> x.id !== null))
      }); 
    }
    fetchData()
  }

  return (
    <div className={classes.root}>
      <LoadingPage/>
      <br/><br/>
      <Container maxWidth="xl">
        <Grid container spacing={3} justifyContent="flex-start">
          <Grid item xs={12} md={6} lg={5}>
            <FormControl focused required variant="outlined" className={classes.formControl}>
              <InputLabel>Data Layers</InputLabel>  
              <Select multiple label="Data Layers" displayEmpty={true} value={selectCatDataOne}
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                  }, transformOrigin: {
                    vertical: "top",
                    horizontal: "left"
                  }, getContentAnchorEl: null
                }} onChange={(e)=>onCatChangeDataOne(e)}>
                <ListSubheader disabled>JSON</ListSubheader>
                {catLayers.length > 0 ? catLayers.map((item, index) =>
                  {if (item.json_type==='json'){
                    return (
                      <MenuItem value={item.layer_name} key={index} disabled={
                        selectCatDataOne.length > 1 && selectCatDataOne.includes(item.layer_name) == false 
                        && selectCatDataOne[0] != selectCatDataOne[1]}>
                        {item.layer_name}
                      </MenuItem>
                    )
                  }})
                : null}
                <ListSubheader disabled>GeoJSON Point</ListSubheader>
                {catLayers.length > 0 ? catLayers.map((item, index) =>
                  {if (item.json_type==='geojson.Point'){
                    return (
                      <MenuItem value={item.layer_name} key={index} disabled={
                        selectCatDataOne.length > 1 && selectCatDataOne.includes(item.layer_name) == false 
                        && selectCatDataOne[0] != selectCatDataOne[1]}>
                        {item.layer_name}
                      </MenuItem>
                    )
                  }})
                : null}
              </Select>
              <FormHelperText>Please select one or two.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <FormControl focused required variant="outlined" className={classes.formControl} >
              <InputLabel>Location</InputLabel>
              <Select multiple label="Location" value={selectLoc} onChange={(e)=>onLocChange(e)}
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
                {locLayers.length > 0 ? 
                  <MenuItem value="Select all" onClick={selectAll} 
                    primaryText={checkedAll?"Select None":"Select all"}>
                    {checkedAll?"Select None":"Select all"}
                  </MenuItem>
                : null}
                {locLayers.length > 0 ? locLayers.map((item, index) =>{
                  return (
                    <MenuItem value={item.value} key={index} selected={selectLoc.includes(item.value)}>
                      {item.label}
                    </MenuItem>
                  )
                }) : null}
              </Select>
              <FormHelperText>Please select at least two.</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6} lg={1} className={classes.formControl2}>
            <AnalyticsDatePicker/>
          </Grid>
          <Grid item xs={12} md={6} lg={1} container direction="row" justifyContent="flex-start" 
            alignItems="center">
            <Button style={{height:"63%"}} fullWidth className={classes.deleteButton} 
              variant="contained" onClick={()=>clearItems()} >
              Clear
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={3} justifyContent="center" > 
          <Grid item xs={12} md={12} lg={4} style={{height:"65vh"}}>
            <Paper style={{height:"90%", overflowY:"scroll"}}>
              <Grid container direction="column" justifyContent="space-between" style={{padding:20}}>
                <Grid item xs={12}>
                  {selectLoc.length > 1? subCat.map((item, index) => {
                    return (
                      <Grid>
                        <Typography variant="h6">{selectCatDataOne[0].replace(/_/g, ' ')}</Typography>
                        <Divider/>
                        {disNum?
                          <FormControl required style={{paddingLeft:20}}>
                            <RadioGroup required onChange={onRadioChange} 
                              defaultValue={disNum[0].length>0 ? disNum[0][0].column_name:null}>
                              {disNum[index].map((item, index) => {
                                return (
                                <div>
                                  <FormControlLabel style={{fontWeight:700}} label={item.column_label}
                                    control={<Radio value={item.column_name}/>}/>
                                </div>)})
                              }
                            </RadioGroup>
                          </FormControl>
                        : null}
                        <Divider/>
                      </Grid>
                    )
                  }) : null}
      
                  {selectLoc.length > 1? subCat.map((item, index) => {
                    return (
                    <Grid container direction='column'>
                      {disStr ? disStr[index].map((item2) => {
                        var isCheckedNon = selectSubCat1.filter((item3)=>{ 
                          if (item3.column_name == item2.column_name) { // check if selectSubCat contains the JSON for corresponding column_name
                            if (item3.column_classes.length > 0) { // check if there are checked column_classes under it
                              return true // naka-check lahat or at least 1 ng anak. pag return false, empty array
                            }
                          }
                        })
                        return (
                          <FormControl required style={{paddingLeft:10}} >
                            <FormGroup>
                              <div style={{display: 'flex', direction: 'row', alignItems: 'center'}}>
                                <Checkbox required defaultChecked value={item2.column_name} 
                                  label={item2.column_label} onChange={onRadioChangeNon} 
                                  checked={isCheckedNon.length>0}/>
                                <Typography style={{fontWeight:700}}>{item2.column_label}</Typography>
                              </div>
                            
                              {item2.column_classes? item2.column_classes.map((item) => {
                                var isChecked = selectSubCat1.filter((item3)=>{
                                  if (item3.column_name == item2.column_name) {  // check if selectSubCat contains the JSON for corresponding column_name
                                    if (item3.column_classes.includes(item)) { // check if column_classes contains this specific item
                                      return true
                                    }
                                  }
                                })
                                return(
                                  <div style={{display: 'flex', direction: 'row', alignItems: 'center'}}>
                                    <Checkbox required defaultChecked value={item} label={item} 
                                      style={{paddingLeft:30}} checked={isChecked.length>0}
                                      onChange={(e)=>onRadioChangeSub(e, item2.column_name)}/>
                                    <Typography>{item}</Typography>
                                  </div>)
                                })
                              : null}
                            </FormGroup>
                          </FormControl>
                        )
                      }): null}
                      <Divider/>
                    </Grid>
                  )}): null}
                  <br/>
                  {selectLoc.length > 1? subCat2.map((item, index) => {
                    return (
                      <Grid container direction="column" >
                        <Typography variant="h6">{selectCatDataOne[1].replace(/_/g, ' ')}</Typography>
                        <Divider/>
                        {dis2Num ?
                          <FormControl required style={{paddingLeft:20}} >
                            <RadioGroup required onChange={onRadioChange2} 
                              defaultValue={dis2Num[0].length>0?dis2Num[0][0].column_name:null}>
                              {dis2Num[index].map((item) => {
                                return (
                                  <div>
                                    <FormControlLabel control={<Radio value={item.column_name} />} label={item.column_label}/>
                                  </div>
                                )
                              })}
                            </RadioGroup>
                          </FormControl>
                        :null}
                        <Divider/>
                      </Grid>
                    )
                  }): null}
                  {selectLoc.length > 1? subCat2.map((item, index) => {
                    return (
                      <Grid container direction='column' style={{paddingLeft:10}} >
                        {dis2Str?dis2Str[index].map((item2) => {
                          var isCheckedNon = selectSubCat2.filter((item3)=>{
                            if (item3.column_name == item2.column_name) {
                              if (item3.column_classes.length > 0) { // check if there are checked column_classes under it
                                return true
                              }
                            }
                          })
                          return (
                            <FormControl required>
                              <FormGroup required>
                                <div style={{display: 'flex', direction: 'row', alignItems: 'center'}}>
                                  <Checkbox required defaultChecked value={item2.column_name} 
                                    label={item2.column_label} onChange={onRadioChange2Non} 
                                    checked={isCheckedNon.length>0}/>
                                  <Typography style={{fontWeight:700}}>{item2.column_label}</Typography>
                                </div>
                                {item2.column_classes? item2.column_classes.map((item) => {
                                  var isChecked = selectSubCat2.filter((item3)=>{
                                    if (item3.column_name == item2.column_name) {
                                      if (item3.column_classes.includes(item)) {
                                        return true
                                      }
                                    }
                                  })
                                  return(
                                    <div style={{display: 'flex', direction: 'row', alignItems: 'center'}}>
                                      <Checkbox defaultChecked value={item} label={item} style={{paddingLeft:30}} 
                                        onChange={(e)=>onRadioChange2Sub(e, item2.column_name)} 
                                        checked={isChecked.length>0}/>
                                      <Typography>{item}</Typography>
                                    </div>
                                  )})
                                : null}
                              </FormGroup>
                            </FormControl>
                          )
                        }): null}
                        <Divider/>
                      </Grid>
                    )
                  }): null}
                </Grid>
              </Grid>
            </Paper>

            <Paper style={{height:"10%", }} variant="outlined" elevation={0}>
              <Button className={classes.login1} style={{height:"100%", width:"100%",}} variant="contained" 
                onClick={performAnalysis} disabled={!selectCatDataOne.length>0 || !checkboxChecked || 
                selectLoc.length < 2}>
                Perform Analysis
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={12} lg={8} style={{height:"65vh"}}>
            <SeedsAnalyticsMap/>
          </Grid>
        </Grid>

        <Grid container direction="row" spacing={3} justifyContent="center" >
          <Grid item xs={12} md={12} lg={6} >
            <Typography align="center" variant="h5">Table</Typography>
            <Paper style={{height:500}}>
              {rows.length > 0 ?
                <DataGrid rows={rows} columns={cols} rowsPerPageOptions={[25, 50, 100]}/>
              : null}
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={6} >
            <Typography align="center" variant="h5">Graphs</Typography>
            <Paper style={{height:500}}> 
              {mapBrgys.length > 0 && graphLabels ?
                <ResponsiveContainer>
                  <ScatterChart width={600} height={400} >
                    <CartesianGrid />
                    <XAxis type="number" dataKey={Object.keys(graphLabels)[0]} 
                      name={graphLabels[Object.keys(graphLabels)[0]]} unit="">
                      <Label value={graphLabels[Object.keys(graphLabels)[0]]} offset={0} position="insideBottom"/>
                    </XAxis>
                    <YAxis type="number" dataKey={Object.keys(graphLabels)[1]} 
                      name={graphLabels[Object.keys(graphLabels)[1]]} unit="" 
                      label={{value: graphLabels[Object.keys(graphLabels)[1]], angle: -90, position: 'insideLeft'}}/>
                    <ZAxis type="string" dataKey="brgy_name" name="Barangay" unit="" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Graph" data={graphData} fill={theme.palette.primary.main}/>
                  </ScatterChart> 
                </ResponsiveContainer>
              : null}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}