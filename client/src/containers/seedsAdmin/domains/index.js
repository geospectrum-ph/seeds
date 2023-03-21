import React, {useState, useEffect}  from 'react';
import axios from 'axios';
import { InputAdornment, Paper, Grid, Button , Toolbar, Dialog, TextField, DialogActions} from '@material-ui/core';
import { Box, Table, TableBody, TableCell, TableHead, TableContainer, TableFooter, TablePagination, 
        TableRow, IconButton, Typography } from '@mui/material'
import { withStyles, makeStyles, useTheme} from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search'

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

const StyledTableCell = withStyles((theme) => ({
  root: {
    backgroundColor: '#1b798e',
    width: 100,
    padding: 5
  }, body: {
    fontSize: 14,
    borderWidth:0,
    width: 100,
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    }
  }
}))(TableRow);

const rows = []
const useStyles = makeStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
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

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0}>
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0}>
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1}>
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1}>
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function Domains() {
  const classes = useStyles();
   // Get All Domains
   const [domain, setDomain] = useState([])

   const getDomains = async () => {
    try{
      const domains = await axios.get("http://ec2-52-90-134-187.compute-1.amazonaws.com/metadata/");
      setDomain(domains.data);      
    }
    catch(e){
      console.log(e)
    }
  }
 
  useEffect (() => {
    getDomains();
   }, []);

  //delete metadata
  const [selectedDeleteRow, setSelectedDeleteRow] = useState([]);
  const [openDeleteMetaDataDialog, setopenDeleteMetaDataDialog] = useState(false);
  const [openUpdateGroupDialog, setOpenUpdateGroupDialog] = useState(false);

  const handleCloseUpdateGroupDialog = () => {setOpenUpdateGroupDialog(false);}
  const handleCloseDeleteMetaDataDialog = () => {setopenDeleteMetaDataDialog(false);}
  
  //update metadata
  const [openUpdateMetadataDialog, setOpenUpdateMetadataDialog] = useState(false);

  const [selectedUpdateMetadataRow, setSelectedUpdateMetadataRow] = useState([]);
  const handleCloseUpdateMetadataDialog = () => {setOpenUpdateMetadataDialog(false);}

  const handleOpenUpdateMetadataDialog = row => {
    setSelectedUpdateMetadataRow(row)
    setOpenUpdateMetadataDialog(true)
  }

  const [openViewMetadataDialog, setOpenViewMetadataDialog] = useState(false);

  const [selectedViewMetadataRow, setSelectedViewMetadataRow] = useState([]);
  const handleCloseViewMetadataDialog = () => {setOpenViewMetadataDialog(false);}
  

  const handleOpenViewMetadataDialog = row => {
    setSelectedViewMetadataRow(row)
    setOpenViewMetadataDialog(true)
  }
//functional for update group
    
  const UpdateMetadataDialog = () => { 
    // handler to import ng table
    const [updateMetadataState, setUpdateMetadataState] = useState({
      description: selectedUpdateMetadataRow.properties["description"],
      language: selectedUpdateMetadataRow.properties["language"],
      license: selectedUpdateMetadataRow.properties["license"],
      doi: selectedUpdateMetadataRow.properties["doi"],
      attribution: selectedUpdateMetadataRow.properties["attribution"],
      regions: selectedUpdateMetadataRow.properties["regions"],
      dqs: selectedUpdateMetadataRow.properties["dqs"],
      restrictions: selectedUpdateMetadataRow.properties["restrictions"],
      constraints: selectedUpdateMetadataRow.properties["constraints"],
      details: selectedUpdateMetadataRow.properties["details"],
    })

    //functional for update group
    const handleUpdateMetadataState = () => {
      const updateMetadata = async() => {
        const res = await axios.put(`http://ec2-52-90-134-187.compute-1.amazonaws.com/metadata/metadataproperties/${selectedUpdateMetadataRow.id}`, // lalagay dito yung link na gamit mo
          {// ito yung mga parameters na naka-list sa insomnia
            description: updateMetadataState.description,
            language: updateMetadataState.language,
            license: updateMetadataState.license,
            doi: updateMetadataState.doi,
            attribution: updateMetadataState.attribution,
            regions: updateMetadataState.regions,
            dqs: updateMetadataState.dqs,
            restrictions: updateMetadataState.restrictions,
            constraints: updateMetadataState.constraints,
            details: updateMetadataState.details,
          })
          .then(function(res) {
            alert("Metadata Updated Successfully!");
            getDomains();
          })
          .catch((error) => {
            console.log(error.response)
          })
      }
      updateMetadata(); 
    }

    const handleDescription = event => {setUpdateMetadataState({ ...updateMetadataState, description: event.target.value})} 
    const handleLanguage = event => {setUpdateMetadataState({ ...updateMetadataState, language: event.target.value})} 
    const handleLicense = event => {setUpdateMetadataState({ ...updateMetadataState, license: event.target.value})} 
    const handleDOI = event => {setUpdateMetadataState({ ...updateMetadataState, doi: event.target.value})} 
    const handleAttribution = event => {setUpdateMetadataState({ ...updateMetadataState, attribution: event.target.value})} 
    const handleRegions = event => {setUpdateMetadataState({ ...updateMetadataState, regions: event.target.value})} 
    const handleDQS = event => {setUpdateMetadataState({ ...updateMetadataState, dqs: event.target.value})} 
    const handleRestrictions = event => {setUpdateMetadataState({ ...updateMetadataState, restrictions: event.target.value})} 
    const handleConstraints = event => {setUpdateMetadataState({ ...updateMetadataState, constraints: event.target.value})} 
    const handleDetails = event => {setUpdateMetadataState({ ...updateMetadataState, details: event.target.value})} 
    
    return (

      <Paper style={{height:"100%", overflowX:"hidden", borderRadius:0}}>
        <Toolbar className={classes.appbar}>
          <Typography className={classes.appbarTitle} style={{textAlign:"center", fontWeight:700}}>
            Edit Metadata Attributes
          </Typography>
        </Toolbar>
        <Grid container spacing={3} style={{padding:20}} >
          <Grid container spacing={3} style={{padding:20}} >
            <Grid item required xs={12}>
              <form noValidate autoComplete="off">
                <TextField required value={updateMetadataState.description} onChange={e =>handleDescription(e)} 
                  size="small" fullWidth label="Description" variant="outlined" />
              </form>
            </Grid>
            <Grid item required xs={12}>
              <form noValidate autoComplete="off">
                <TextField required value={updateMetadataState.language} onChange={e =>handleLanguage(e)} 
                  size="small" fullWidth label="Language" variant="outlined" />
              </form>
            </Grid>
            <Grid item required xs={12}>
              <form noValidate autoComplete="off">
                <TextField required  value={updateMetadataState.license} onChange={e =>handleLicense(e)}
                  size="small" fullWidth label="License" variant="outlined" />
              </form>
            </Grid>
            <Grid item required xs={12}>
              <form noValidate autoComplete="off">
                <TextField required value={updateMetadataState.doi} onChange={e =>handleDOI(e)}
                  size="small" fullWidth label="DOI" variant="outlined" />
              </form>
            </Grid>
            <Grid item required xs={12}>
              <form noValidate autoComplete="off">
                <TextField required value={updateMetadataState.attribution} onChange={e =>handleAttribution(e)} 
                  size="small" fullWidth label="attribution" variant="outlined" />
              </form>
            </Grid>
            <Grid item required xs={12}>
              <form noValidate autoComplete="off">
                <TextField required value={updateMetadataState.regions} onChange={e =>handleRegions(e)} 
                  size="small" fullWidth label="regions" variant="outlined" />
              </form>
            </Grid>
            <Grid item required xs={12}>
              <form noValidate autoComplete="off">
                <TextField required value={updateMetadataState.dqs} onChange={e =>handleDQS(e)} 
                  size="small" fullWidth label="dqs" variant="outlined" />
              </form>
            </Grid>
            <Grid item required xs={12}>
              <form noValidate autoComplete="off">
                <TextField required value={updateMetadataState.restrictions} onChange={e =>handleRestrictions(e)} 
                  size="small" fullWidth label="restrictions" variant="outlined" />
              </form>
            </Grid>
            <Grid item required xs={12}>
              <form noValidate autoComplete="off">
                <TextField required value={updateMetadataState.constraints} onChange={e =>handleConstraints(e)} 
                  size="small" fullWidth label="constraints" variant="outlined" />
              </form>
            </Grid>
            <Grid item required xs={12}>
              <form noValidate autoComplete="off">
                <TextField required  value={updateMetadataState.details} onChange={e =>handleDetails(e)} 
                  size="small" fullWidth label="details" variant="outlined"/>
              </form>
            </Grid>
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          
        </TableContainer>
        <DialogActions >
          <Button className={classes.updateButton} variant="contained" onClick={handleUpdateMetadataState}>Update</Button>
          <Button className={classes.deleteButton} variant="contained" onClick={handleCloseUpdateMetadataDialog}>Close</Button>
        </DialogActions>
      </Paper>
    );
  }

  //View Attributes

  const ViewMetadataDialog = () => { 
    const viewMetadataState = {
      description: selectedViewMetadataRow.properties["description"],
      language: selectedViewMetadataRow.properties["language"],
      license: selectedViewMetadataRow.properties["license"],
      doi: selectedViewMetadataRow.properties["doi"],
      attribution: selectedViewMetadataRow.properties["attribution"],
      regions: selectedViewMetadataRow.properties["regions"],
      dqs: selectedViewMetadataRow.properties["dqs"],
      restrictions: selectedViewMetadataRow.properties["restrictions"],
      constraints: selectedViewMetadataRow.properties["constraints"],
      details: selectedViewMetadataRow.properties["details"],
    }

    return (
      <Paper style={{height:"100%", overflowX:"hidden", borderRadius:0}}>
        <Toolbar className={classes.appbar}>
          <Typography className={classes.appbarTitle} style={{textAlign:"center", fontWeight:700}}>
            View Metadata Attributes
          </Typography>
        </Toolbar>
        <Grid container spacing={3} style={{padding:20}} >
          <Grid item required xs={12}>
            <form noValidate autoComplete="off">
              <TextField required value={viewMetadataState.description} onChange="" 
                size="small" fullWidth label="Description" variant="outlined" disabled = {true} />
            </form>
          </Grid>
          <Grid item required xs={12}>
            <form noValidate autoComplete="off">
              <TextField required value={viewMetadataState.language} onChange=""  
                size="small" fullWidth label="Language" variant="outlined" disabled = {true}/>
            </form>
          </Grid>
          <Grid item required xs={12}>
            <form noValidate autoComplete="off">
              <TextField required value={viewMetadataState.license} onChange="" 
                size="small" fullWidth label="License" variant="outlined" disabled = {true}/>
            </form>
          </Grid>
          <Grid item required xs={12}>
            <form noValidate autoComplete="off">
              <TextField required value={viewMetadataState.doi} onChange="" 
                size="small" fullWidth label="DOI" variant="outlined" disabled = {true}/>
            </form>
          </Grid>
          <Grid item required xs={12}>
            <form noValidate autoComplete="off">
              <TextField required value={viewMetadataState.attribution} onChange=""  
                size="small" fullWidth label="attribution" variant="outlined" disabled = {true}/>
            </form>
          </Grid>
          <Grid item required xs={12}>
            <form noValidate autoComplete="off">
              <TextField required value={viewMetadataState.regions} onChange="" 
                size="small" fullWidth label="regions" variant="outlined" disabled = {true}/>
            </form>
          </Grid>
          <Grid item required xs={12}>
            <form noValidate autoComplete="off">
              <TextField required value={viewMetadataState.dqs} onChange="" 
                size="small" fullWidth label="dqs" variant="outlined" disabled = {true}/>
            </form>
          </Grid>
          <Grid item required xs={12}>
            <form noValidate autoComplete="off">
              <TextField required value={viewMetadataState.restrictions}onChange="" 
                size="small" fullWidth label="restrictions" variant="outlined" disabled = {true}/>
            </form>
          </Grid>
          <Grid item required xs={12}>
            <form noValidate autoComplete="off">
              <TextField required value={viewMetadataState.constraints} onChange="" 
                size="small" fullWidth label="constraints" variant="outlined" disabled = {true}/>
            </form>
          </Grid>
          <Grid item required xs={12}>
            <form noValidate autoComplete="off">
              <TextField required value={viewMetadataState.details} onChange="" 
                size="small" fullWidth label="details" variant="outlined" disabled = {true}/>
            </form>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          
        </TableContainer>
        <DialogActions >
          <Button className={classes.deleteButton} variant="contained" onClick={handleCloseViewMetadataDialog}>Close</Button>
        </DialogActions>
      </Paper>
    );
  }

  // End View Attributes
  const DeleteMetaDataDialog = () => { 
    const deleteMetaData = { mtd_id_list: selectedDeleteRow.mtd_id_list };
    alert()
      
    return (
      <Paper style={{height:"100%", overflowX:"hidden", borderRadius:0}}>
        <Toolbar className={classes.appbar}>
          <Typography className={classes.appbarTitle} style={{textAlign:"center", fontWeight:700}}>
            Delete MetaData
          </Typography>
        </Toolbar>
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Module</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deleteMetaData.map((row) => (
                <StyledTableRow key= {row.mtd_list_id}>
                  <StyledTableCell align="center">{row.mtd_list_id}</StyledTableCell> 
                  <StyledTableCell>
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
    );
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - domain.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const searchTermChanged = (e) => {
    const {value} = e.target
    setSearchTerm(value);
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      e.preventDefault()
    }
  }
  
  return (
    <>
      <Dialog open={openViewMetadataDialog} onClose={handleCloseViewMetadataDialog}>
        <ViewMetadataDialog/>
      </Dialog>
      <Dialog open={openUpdateMetadataDialog} onClose={handleCloseUpdateMetadataDialog}>
        <UpdateMetadataDialog/>
      </Dialog>
      <Dialog open={openDeleteMetaDataDialog} onClose={handleCloseDeleteMetaDataDialog}>
        <DeleteMetaDataDialog/>
      </Dialog>
      <Dialog open={openUpdateGroupDialog} onClose={handleCloseUpdateGroupDialog}>
      </Dialog>

      <TextField type ="text" style={{width:"100%", justifyContent: "center"}} size="small" 
        value={searchTerm} onChange={e => searchTermChanged(e)} onKeyPress={e => handleKeyPress(e)} 
        placeholder="Search account by id and file name...." variant="outlined" 
        InputProps={{ startAdornment: (
          <InputAdornment position="start">
          <SearchIcon color="primary"/>
          </InputAdornment>
        )}}/>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500, height: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell style={{width: 20}}>MTD ID</StyledTableCell>
              <StyledTableCell>File Name</StyledTableCell>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell style={{width: 20}}>Tag</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {domain.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter((val) => {
                if(searchTerm == ""){
                  return val}
                else if(val.id.toLowerCase().includes(searchTerm.toLowerCase()) || val.name.toLowerCase().includes(searchTerm.toLowerCase())){
                  return val
                }
              }).map((row) => (
              <TableRow key={row.id} style={{height: 65}}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell  align="right">
                  {row.name}
                </TableCell>
                <TableCell  align="right">
                  {row.type}
                </TableCell>
                <TableCell  align="right">
                {row.tag.map((row) => <div>{row}</div>)}
                </TableCell>
                <TableCell align="center">
                  <Button className={classes.edit} variant="contained" onClick={() => handleOpenViewMetadataDialog(row)}>
                    View Attributes
                  </Button>
                  &nbsp;
                  <Button className={classes.delete} variant="contained" onClick={() => handleOpenUpdateMetadataDialog(row)}>
                    Edit Attributes
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 ? (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            ) : null}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination colSpan={5} count={domain.length} rowsPerPage={rowsPerPage} page={page}
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>   
    </>
  );
}