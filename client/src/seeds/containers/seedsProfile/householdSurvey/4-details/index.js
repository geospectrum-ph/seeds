import React, {useContext} from 'react';
import { Grid, Paper, Table, TableContainer, TableBody, TableRow, TableCell } from '@material-ui/core';

import { MapContext } from '../../../../context/MapContext';

export default function Details(){
  const {layerSideProperties} = useContext(MapContext);

  return(
    <Grid container direction="row" justifyContent="center" alignItems='center'>
      <Grid item>
        {layerSideProperties? <TableContainer component={Paper}>
          <Table padding="checkbox" size="small" aria-label="simple table" sx={{ 
              padding: 1, 
              width: '100%', 
              fontSize:'2vh'
            }}>
            <TableBody sx={{ fontSize:'2vh'}}>
              <TableRow>
                <TableCell><b>Housing Unit SN</b></TableCell>
                <TableCell align="center">
                  {layerSideProperties.BLDG_ID}
                </TableCell>
                <TableCell><b>MTD ID</b></TableCell>
                <TableCell align="center">
                  {layerSideProperties.mtd_id}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Address</b></TableCell>
                <TableCell colSpan={3} align="center">
                  {layerSideProperties.FULL_ADD}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Owner</b></TableCell>
                <TableCell colSpan={3} align="center">
                  {layerSideProperties.OWNER_2018}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Previous Owner</b></TableCell>
                <TableCell colSpan={3} align="center">
                  {layerSideProperties.PREV_OWNER ? layerSideProperties.PREV_OWNER:
                    layerSideProperties.OWNER_2018}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Land Use</b></TableCell>
                <TableCell align="center">
                  {layerSideProperties.ACT_USED}
                </TableCell>
                <TableCell><b>Area (sq. m.)</b></TableCell>
                <TableCell align="center">
                  {parseFloat(layerSideProperties.IMP_AREA ? layerSideProperties.IMP_AREA:
                    0).toFixed(4)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>No. of Members</b></TableCell>
                <TableCell align="center">
                  {layerSideProperties.no_members}
                </TableCell>
                <TableCell><b>No. of Storeys</b></TableCell>
                <TableCell align="center">
                  {layerSideProperties.NO_OF_FLRS}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Remarks</b></TableCell>
                <TableCell colSpan={3} align="center">
                  {layerSideProperties.REMARKS}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Data from</b></TableCell>
                <TableCell colSpan={3} align="center">
                  {layerSideProperties.DATA_FROM}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Validation Status</b></TableCell>
                <TableCell colSpan={3} align="center">
                  {layerSideProperties.VAL_STAT}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer> : <div>Select building polygon</div>}
      </Grid>
      <Grid item>

      </Grid>
    </Grid>
  )
}