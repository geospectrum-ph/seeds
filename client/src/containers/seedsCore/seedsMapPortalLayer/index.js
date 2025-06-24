import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Collapse, Button, Tooltip, CssBaseline, Divider,
        IconButton, Dialog, Paper, Checkbox, Slide, Slider } from '@material-ui/core';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import ZoomInIcon from '@material-ui/icons/ZoomIn';

import _without from "lodash/without";

import { SEEDSContext } from '../../../context/SEEDSContext'
import { MapContext } from '../../../context/MapContext'
import { FeaturesContext } from '../../../context/FeaturesContext'

import DataCatalogueForEdit2 from '../../seedsCore/seedsCatalogue'
import AddToMapIcon from '../../../assets/icons/42 Add to Map.png'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(() => ({
  login1: {
    border: 0,
    borderRadius: 5,
    backgroundColor: '#1b798e',
    color: '#ffffff',
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922',
    }
  },
  divider: {
    backgroundColor:"#fffefe"
  }
})); 

export default function MapLayer() {

  const classes = useStyles();
  const {brgys, setBrgys, legendItems, setLegendItems, lg, setLG, setLoadedMtd} = React.useContext(FeaturesContext)
  const {map, lControl} = useContext(MapContext)
  const {loadingDataCat, setLoadingDataCat} = useContext(SEEDSContext);

  const handleDeleteLayer = (lgi, legenditem, barangay, i) => {
    if (lgi) {
      var retVal = window.confirm(`Do you want to delete this layer?\n\u2022  ${legenditem.name.replace(/_/g, ' ')}`);
      if( retVal == true ) {
        lControl.removeLayer(lgi.layerGroup);
        map.current.removeLayer(lgi.layerGroup);
    
        setLoadedMtd((current) => _without(current, lgi.mtdId));
        setBrgys((current) => _without(current, barangay))
        setLG((current) => _without(current, lgi));
        setLegendItems((current) => _without(current, legenditem));
      }
    }
  };

  const handleZoom = (lgi) => {
    map.current.flyToBounds(lgi.layerGroup.getBounds())
  }

 
  const handleOpacity = (val, lgi, i) => {
    val = val/100.0 // get percentage

    lgi.layerGroup.eachLayer(function(layer) {
      layer.setStyle({opacity: val, fillOpacity: val})
      lgi.layerGroup.addTo(map.current) 
    });
  }

  const LegendLayer = (layer) => {
    const i = layer.i
    const legendName = layer.layer.name || layer.layer.metadataID || "Untitled Layer"
    const legendStyle = layer.layer.style
    const barangay = layer.barangay
    const lgi = layer.layerGroup
    const [checked, setChecked] = useState(false)
    const [sliderVal, setSliderVal] = lgi.fillOpacity ? React.useState(lgi.fillOpacity*100) : React.useState(0);
    const sliderValRef = lgi.fillOpacity ? React.useState(lgi.fillOpacity*100) : React.useState(0);
    const deletionProcess = React.useRef(false)
    const [isLayerOn, setIsLayerOn] = React.useState(lgi.active)
    const isLayerOnRef = React.useRef(lgi.active)


    useEffect(() => {
      if(sliderVal!=lgi.fillOpacity*100){
        handleOpacity(sliderVal, lgi, i)
      }
    },[sliderVal])

    useEffect(() => {
      return () => { // cleanup function
        if(lg && legendItems && lg.length === legendItems.length 
          && legendItems.length > 0 && deletionProcess.current === false){
        
        }
    }}, [])
  
    return(
      <Paper style={{padding:5, backgroundColor:"#ced8da", marginBottom:10, marginBottom:10}} elevation={3}>
        <Grid container direction="row" justifyContent="center" alignItems="center" 
          style={{paddingTop:2, paddingBottom:2}}>
          <Grid item xs={2}>
            <Tooltip title="Visibility">
              <Checkbox style={{color: '#1b798e'}} checked={isLayerOn}
                onChange={(event) => {
                  isLayerOnRef.current = event.target.checked;
                  setIsLayerOn(event.target.checked)
                  if (event.target.checked) {
                    lgi.layerGroup.addTo(map.current) 
                  } else {
                    map.current.removeLayer(lgi.layerGroup);
                  }
                }}/>
            </Tooltip>
          </Grid>
          <Grid item xs={8}>
            <Typography style={{ 
                width:"100%", 
                wordWrap:"break-word", 
                fontWeight:700, 
                paddingLeft:5
              }}>
              {legendName.replace(/_/g, ' ')}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            {legendStyle.length>0?<Tooltip title="Legend">
              <IconButton style={{width: '50px'}} onClick={()=>setChecked(!checked)}>
                {checked? <ExpandLess style={{color: '#1b798e'}}/>: 
                <ExpandMore style={{color: '#1b798e'}}/>}
              </IconButton>
            </Tooltip>:null}
          </Grid>
        </Grid>
        <Divider/>
        <Grid container direction="row" justifyContent="space-between" 
          alignItems="center" style={{paddingLeft:10, paddingRight:10, paddingTop:2}} >
          <Grid item xs={3}>
            <Typography variant="caption"> Opacity: {sliderVal}%</Typography>
          </Grid>
          <Grid item xs ={5}>
            <Slider value={sliderVal} valueLabelDisplay="auto" onChange={(e, val) => {
                sliderValRef.current = val;
                setSliderVal(val)
              }} disabled={isLayerOn == false}/>
          </Grid>
          <Grid item xs={1}>
            <Tooltip title="Zoom to layer">
              <IconButton style={{color: '#1b798e'}} onClick={() => {handleZoom(lgi)}}>
                <ZoomInIcon/>
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={1}>
            <Tooltip title="Delete">
              <IconButton style={{color: '#1b798e'}}
                onClick={() => {
                  deletionProcess.current = true
                  handleDeleteLayer(lgi, layer.layer, barangay, i)
                }}>
                <DeleteOutlineOutlinedIcon/>
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Collapse in={checked} style={{marginBottom:2}}>
          {legendStyle.map((x, i) => {
            let fillColor = x.fillColor
            return(
              <Grid container direction="row" justifyContent="flex-start" alignItems="center" 
                spacing={2} key={i}>
                <Grid item xs={2} container direction="row" justifyContent="flex-end">
                  <div style={{backgroundColor: fillColor, width: '20px', height: '20px'}}/>
                </Grid>
                <Grid item xs={9} >
                  <Typography>{x.name}</Typography>
                </Grid>
              </Grid>
            )
          })}
        </Collapse>
      </Paper>      
    )
  }
  
  const handleClickOpen = () => {
    setLoadingDataCat(true);
  };

  const handleClose = () => {
    setLoadingDataCat(false);
  };

  return (
    <>
      <CssBaseline />
      <Grid container style={{overflowY: 'hidden'}}>
        <Grid item container direction='row' justifyContent='space-between' alignItems="center">
          <Grid item className={classes.toolbar}>
            <Typography style={{
                fontWeight:1000, 
                fontSize:"1.2rem", 
                fontFamily:"'Outfit', sans-serif"
              }}>
              Layer Groups
            </Typography>
          </Grid>
          <Grid item>
            <Tooltip title="Add Layer from SEEDs Catalogue">
              <Button className={classes.login1} onClick={handleClickOpen}>
                <img src={AddToMapIcon} style={{width:35}}/>
              </Button>
            </Tooltip>
          </Grid>
        </Grid>

        <Divider light={true} className={classes.divider}/>
        <Grid item xs={12} style={{
            overflowY: 'auto', 
            height: window.innerHeight-200,
            marginTop:20
          }}>
          {legendItems.length !== 0 && lg.length > 0 ? 
            legendItems.map((item, index) => (
              <LegendLayer key={index} layer={item} layerGroup={lg[index]} 
                barangay={brgys[index]} i={index}/>)) 
          : <Typography>
            No selected layers found. Please select from the SEED Catalogue.
          </Typography>}
        </Grid>
      </Grid>
      <Dialog fullWidth={true} maxWidth="lg" open={loadingDataCat}
        TransitionComponent={Transition} keepMounted onClose={handleClose}>
        <DataCatalogueForEdit2/>
      </Dialog>
    </>
  );
}