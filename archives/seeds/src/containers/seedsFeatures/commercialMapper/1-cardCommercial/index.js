import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Fab, withStyles, Menu, MenuItem, Box, Paper} from '@material-ui/core/'
import MultipleSelect from "../2-dropDown";
import CalendarsDateRangePicker from "../3-datePicker";
// import CalendarsDateRangePicker from "../";
import {FeaturesContext} from '../../../../context/FeaturesContext';
import {SEEDSContext} from '../../../../context/SEEDSContext';
import {MapContext} from '../../../../context/MapContext';

import { columnReorderDragColSelector } from '@material-ui/data-grid';

// import GeneralDatePicker from '../../components/datepicker'

const useStyles = makeStyles((theme) => ({
root: {
  borderRadius: 0,
  textAlign: 'center',
  '& .MuiCardHeader-root': {
    backgroundColor:"#1b798e",
    width:"100%",
    color:"#1b798e",
    backgroundColor:"#000000",
  },
  '& .MuiCardHeader-title': {
    fontSize: '1.2rem',
    // color:"#fffefe",
    fontFamily: "GlacialIndifference",

  },
 
  '& .MuiTypography-h1': {
    // backgroundColor: "#000000",
    fontSize: "3.0rem",
    color: "#0c343d",
    fontFamily: "LeagueSpartan",
    // padding: '3px',
  },
  '& .MuiTypography-h2': {
    // backgroundColor: "#000000",
    fontFamily: "Nunito",
    fontSize: "1rem",
    color: "#0c343d",
    
  },
  '& .MuiTypography-h3': {
    // backgroundColor: "#000000",
    fontFamily: "GlacialIndifference",
    fontSize: "0.9rem",
    // color: "#fffefe",
    color: '#0c343d',
    '&:hover': {
      color: '#0c343d',
      // backgroundColor: '#5aff3d',
      }
  },
  '& .MuiTypography-h4': {
    // width: '145px',
    // height: '50px',
    fontSize: "0.9rem",
    color: '#0d3c47',
    backgroundColor: "#ffffff",
    border: "2px solid #1b798e",
    cursor: 'pointer',
    padding: '5px',
  },
  '& .MuiTypography-h5': {
    // backgroundColor: "#000000",
    fontSize: "2.0rem",
    color: "#0c343d",
    // color: "#fffefe",

    fontFamily: "LeagueSpartan",
    // padding: '3px',
  },
  '& .MuiTypography-h6': {
    // backgroundColor: "#000000",
    fontSize: "0.8rem",
    color: "#1b798e",
    fontFamily: "LeagueSpartan",
    // padding: '3px',
  },
},
summary : {
  // padding: 
  marginTop: theme.spacing(2),
  // color: "#29b5d5",
  padding: theme.spacing(1),
  borderRadius: 0,
},
}));

export default function SampleCardPop() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { commercialSelect }  = useContext(FeaturesContext);
  const { healthLoc }  = useContext(MapContext);
  const {commercialClassSelect, setCommercialClassSelect} =useContext(SEEDSContext);
  const [capitalizationTotal, setCT] = React.useState();
  const [employeesTotal, setET] = React.useState();
  const [institutionCount, setIC] = React.useState();

  // console.log("commercialSelect in samplecard",commercialSelect)
  // console.log("commercialSelect in samplecard",commercialSelect['properties'])
  // console.log("commercialClassSelect",commercialClassSelect)
  // console.log(commercialSelect)
  console.log("commercialSelect in card-start", commercialSelect)
  console.log("commercialClassSelect in card-start", commercialClassSelect)


  React.useEffect(() => {
    if (commercialSelect && commercialClassSelect){
      // console.log(commercialSelect, healthLoc)
      setCT(commercialSelect? (commercialSelect.properties.filter(obj => {return obj.class === commercialClassSelect})[0]['capitalization_total']):0)
      setET(commercialSelect? (commercialSelect.properties.filter(obj => {return obj.class === commercialClassSelect})[0]['employees_total']):0)
      setIC(commercialSelect? (commercialSelect.properties.filter(obj => {return obj.class === commercialClassSelect})[0]['institution_count']):0)
    };
    
  }, [commercialSelect, commercialClassSelect])
  

  // if (commercialSelect){
  //       console.log("hehe1")
  //       var capitalizationTotal2 = commercialSelect? (commercialSelect.properties.filter(obj => {console.log("hehe2"); return obj.class === commercialClassSelect})[0]['capitalization_total']):0
  //       var employeesTotal2 = commercialSelect? (commercialSelect.properties.filter(obj => {return obj.class === commercialClassSelect})[0]['employees_total']):0
  //       var institutionCount2 = commercialSelect? (commercialSelect.properties.filter(obj => {return obj.class === commercialClassSelect})[0]['institution_count']):0
  //     };
  // console.log("commercialSelect in card-end-jim ", commercialSelect)
  // console.log("commercialClassSelect in card-end", commercialClassSelect)

  // console.log("capitalizationTotal", capitalizationTotal)
  // console.log("employeesTotal", employeesTotal)
  // console.log("institutionCount", institutionCount)
  // console.log("capitalizationTotal2", capitalizationTotal)
  // console.log("employeesTotal2", employeesTotal)
  // console.log("institutionCount2", institutionCount)




  return (
    <Grid container 
    // xs={11}
    direction="column"
    justify="flex-end"
    alignItems="center"
    className={classes.root} 
    > 
      <Grid item 
      xs ={10}
      // style={{backgroundColor:'#000000'}}
      >                    
        <MultipleSelect />
        <CalendarsDateRangePicker/>    
        {/* <GeneralDatePicker/>    */}
      </Grid>  
      <Grid item style={{width:'80%', height:'10vh'}}>
      <Paper className={classes.summary}>
          <Typography variant="h5">{commercialSelect ? capitalizationTotal: <div>N/A</div>}</Typography>
          <Typography> <Box >Capitalization</Box> </Typography>
        </Paper>
      </Grid>
      <Grid item style={{width:'80%', height:'10vh'}}>
        <Paper className={classes.summary}>
          <Typography variant="h5">{commercialSelect ? employeesTotal: <div>N/A</div>}</Typography>
          <Typography  >Employee Count</Typography>
        </Paper>
      </Grid>
      <Grid item style={{width:'80%', height:'10vh'}}>
        <Paper className={classes.summary}>
          <Typography variant="h5">{commercialSelect ? institutionCount: <div>N/A</div>}</Typography>
          <Typography >Institution Count</Typography>
        </Paper>
      </Grid>
     
      
    </Grid>
  );
}