import React, {useContext}  from 'react';
import { Card, CardHeader, Grid, Paper } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

import CardHousehold from './1-cardHousehold';
import SeedsMap from '../seedsProfileMap';

import { FeaturesContext } from '../../../context/FeaturesContext';
import { SEEDSContext } from '../../../context/SEEDSContext'

export default function DemLabor() {
  const { householdBldgPopulation }  = useContext(FeaturesContext);
  const { currentDomain, currentSubdomain }  = useContext(SEEDSContext);

  const columns = [
    { field: 'name', headerName: 'Name', width: 400,},
    { field: 'gender', headerName: 'Gender', width: 150,},
    { field: 'occupation', headerName: 'Occupation', width: 250,},
    { field: 'profession', headerName: 'Profession', width: 250,},
    { field: 'housing_unit_serial_number', headerName: 'Housing Unit Serial Number', width: 250,},
    { field: 'is_household_head', headerName: 'Is Household Head?', width: 250,},
    { field: 'age', headerName: 'Age', width: 250,},
  ];
  
  const rows = [];

  return (
    <Grid container direction="column" spacing={2}>
      <br/>
      <Grid item container xs={12} spacing={2}>
        <Grid item xs={12} md={8} lg={8}>
          <Paper elevation={3} style={{backgroundColor:"#ededed", height: 700, width:"100%", borderRadius:0}}>
            <SeedsMap/>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper elevation={3} style={{width:"100%", height: 700, borderRadius: 0, overflowY:"scroll"}}>
            <Card style={{backgroundColor:"#FFFEFE", color:"#1b798e", borderRadius: 0, width:"100%"}}>
              <CardHeader title={currentSubdomain} subheader={currentDomain}  titleTypographyProps={{
                style: {
                  textAlign: "left", 
                  fontFamily:"LeagueSpartan", 
                  fontSize:"0.9", 
                  wordWrap:"break-word"
                }}}>
              </CardHeader>
            </Card>
            <CardHousehold />
          </Paper>
        </Grid>
      </Grid>
      <Grid item container xs={12} spacing={2} >
        <Grid item container>
          <Paper elevation={3} style={{height: '100%', width:"100%"}}>
              <div style={{ height: 700, width: '100%' }}>
                { householdBldgPopulation ?
                  <DataGrid borderRadius={0} rowHeight={30} pagination rowsPerPageOptions={[25, 50, 100]} 
                    rows={householdBldgPopulation} columns={columns} />
                : <DataGrid borderRadius={0} rowHeight={30} pagination rowsPerPageOptions={[25, 50, 100]} 
                    rows={rows} columns={columns} loading="true"/>}
              </div>
          </Paper> 
        </Grid>
      </Grid>
    </Grid>
  );
}