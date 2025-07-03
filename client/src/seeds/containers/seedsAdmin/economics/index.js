import React, {useState, useEffect}  from 'react';
import axios from 'axios'
import { Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderWidth:0
  }, body: {
    fontSize: 14,
    borderWidth:0
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    }
  }, edit: {
    borderRadius: 35,
    backgroundColor: '#1b798e',
    color: '#ffffff',
    fontSize: "9px",
    padding: "9px 27px",
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922',
    }
  }, delete: {
    borderRadius: 35,
    backgroundColor: '#e6ebec',
    color: '#33202A',
    fontSize: "9px",
    padding: "9px 27px",
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#A31621',
    }
  }
}));

export default function Economics() {
  const classes = useStyles();
   // Get All Domains
  const [domain, setDomain] = useState([])
  const getDomains = async () => {
    try{
      const domains = await axios.get("https://seeds.geospectrum.com.ph/metadata/getdomainseconomic");
      // const domains = await axios.get("http://localhost:5000/metadata/getdomainseconomic");
      setDomain(domains.data);    
    }
    catch(e){
      /* console.log(e) */
    }
  }
 
  useEffect (() => {
    getDomains();
  }, []);

  return (
    <>
      <Paper elevation={3}  style={{height: '100%',  width:"100%"}}>
        <TableContainer >
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">MTD ID</StyledTableCell>
                <StyledTableCell align="center">Domain</StyledTableCell>
                <StyledTableCell align="center">Sub Domain</StyledTableCell>
                <StyledTableCell align="center">Granularity</StyledTableCell>
                <StyledTableCell align="center">Domain Name</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {domain.map((row) => (
                <StyledTableRow key= {row.Module}>
                  <StyledTableCell align="center">{row.mtd_id_list.map((item) => <div>{item}</div>)}</StyledTableCell>
                  <StyledTableCell align="center">{row.Domain}</StyledTableCell>
                  <StyledTableCell align="center">{row.Subdomain}</StyledTableCell>
                  <StyledTableCell align="center">{row.Granularity}</StyledTableCell>
                  <StyledTableCell align="center">{row.domain_name}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button className={classes.edit} variant="contained" onClick="">
                      Edit
                    </Button>
                    &nbsp;
                    <Button className={classes.delete} variant="contained" onClick="">
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>   
    </>
  );
}