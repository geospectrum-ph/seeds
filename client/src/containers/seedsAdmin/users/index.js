import React, {useContext, useEffect, useState}  from 'react';
import axios from 'axios'
import { InputAdornment, Paper, Typography, Grid, Button, TextField, Dialog, DialogActions, Toolbar, Select, 
        MenuItem, Table, TableBody, TableCell, TableHead, Box, TableContainer, TableRow, TableFooter,
        TablePagination, IconButton } from '@material-ui/core';
import { withStyles, makeStyles,useTheme } from '@material-ui/core/styles';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import SearchIcon from '@material-ui/icons/Search'

import LoadingPage from '../../loadingPage'

import { SEEDSContext } from '../../../context/SEEDSContext'
import { AdminContext } from '../../../context/AdminContext'

const StyledTableCell = withStyles(theme => ({
  root: {
    backgroundColor: '#1b798e'
  }, body: {
    fontSize: 14,
    borderWidth:0
  },
}))(TableCell);

const useStyles = makeStyles(() => ({
  appbarTitle:{
    flexGrow: '1',
    color: '#fffefe',
    fontFamily:'LeagueSpartan',
    fontSize:20
  }, appbar: {
    backgroundColor: '#0d3c47',
    fontFamily:'LeagueSpartan',
    textAlign: "center",
    borderRadius:0
  }, table: {
    minWidth: 700
  }, add: {
    borderRadius: 35,
    backgroundColor: '#1b798e',
    color: '#ffffff',
    fontSize: "9px",
    padding: "9px 27px",
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922'
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
      backgroundColor: '#A31621'
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

export default function Users() {
  const classes = useStyles();

  const {setDisUp} = useContext(SEEDSContext);
  const { loginDetails, setSelectedItem } = useContext(AdminContext)

  const userTypeChoices_admin  = ["builder"];
  
  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Amy", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 12 },
    { id: 6, lastName: "Melisandre", firstName: "Jane", age: 15 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 }
  ];

  useEffect (()=> {
    setSelectedItem("users")
  },[])

  const [user, setUser] = useState([])

  const getLocalStorageUser = () => {
    let list = localStorage.getItem('user');
    if(list){
      return JSON.parse(localStorage.getItem('user'));
    }
  }

  const userItem = getLocalStorageUser()

  const getUserData = async () => {
    try{
      const userData = await axios.get("https://seeds.geospectrum.com.ph/usermaster/getusers/"
        +userItem._id+"");
      setUser(userData.data); 
    }
    catch(e){
      /* console.log(e) */
    }
  }

  useEffect (() => {
    getUserData();
  }, []);
  
  const [userGroups, setuserGroups] = useState([])

  useEffect (() => {
    const getUserGroups = async () => {
      const userGroups = await axios.get("https://seeds.geospectrum.com.ph/usermaster/getusergroups");
      setuserGroups(userGroups.data); 
    }
    
    getUserGroups();
  }, []);

  //add user
  const [openSignUpDialog, setOpenSignUpDialog] = useState(false);
  const handleOpenSignUpDialog = () => {setOpenSignUpDialog(true);}
  const handleCloseSignUpDialog = () => {setOpenSignUpDialog(false);}

  //update user
  const [selectedUpdateRow, setSelectedUpdateRow] = useState([]);
  const [openUpdateUserDialog, setOpenUpdateUserDialog] = useState(false);

  const handleOpenUpdateUserDialog = (row) => {
    setSelectedUpdateRow(row);
    setOpenUpdateUserDialog(true);
  }
  const handleCloseUpdateUserDialog = () => {setOpenUpdateUserDialog(false);}
  
  //DELETE USER
  const handleDelete = async row => {
    const _id = row._id;
    const req = await axios.delete(`https://seeds.geospectrum.com.ph/usermaster/deleteuser/${_id}`)
    .then(function() {
      alert("User account was deleted.");     
      getUserData();
    }).catch((error) => {
      alert(error);
    })      
  };

  //UPDATE USER
  const UpdateUserDialog = () => { 
    // const [updateUser, setUpdateUserState] = useState({
    //   id: selectedUpdateRow._id,
    //   name: selectedUpdateRow.name,
    //   email: selectedUpdateRow.email,
    //   user_type: selectedUpdateRow.user_type._id,
    // });

    const handleUpdateState = () => {
      setDisUp(true)
      const updateData = async(res, req) => {
        res = await axios.post(`https://seeds.geospectrum.com.ph/usermaster/edituser/${selectedUpdateRow._id}`, {
          name: selectedUpdateRow.name, 
          email: selectedUpdateRow.email,
          user_type: selectedUpdateRow.user_type,
        }).then(function() {
          getUserData();
          alert("User account was updated.");
          setDisUp(false);
        }).catch((error) => {
          // console.log(error)
          setDisUp(false)
        })
      }
      updateData(); 
      handleCloseUpdateUserDialog()
    }

    const handleName = event => {setselectedUpdateRow({ ...selectedUpdateRow, name: event.target.value})} 
    const handleEmail = event => {setselectedUpdateRow({ ...selectedUpdateRow, email: event.target.value})} 
    const handleUserType = event => {setselectedUpdateRow({ ...selectedUpdateRow, user_type: event.target.value})}
    
    return (
      <Paper style={{height:"100%", borderRadius:0}}>
        <Toolbar className={classes.appbar}>
          <Typography className={classes.appbarTitle} style={{textAlign:"center", fontWeight:700}}>
            Update User
          </Typography>
        </Toolbar>
        <Grid container spacing={3} style={{padding:20}} >
          <Grid item required xs={12}>
            <form noValidate autoComplete="off">
              <TextField required value={selectedUpdateRow.name} onChange={e =>handleName(e)} 
                size="small" fullWidth label="Name" variant="outlined" />
            </form>
          </Grid>
          <Grid item required xs={12}>
            <form noValidate autoComplete="off">
              <TextField required value={selectedUpdateRow.email} onChange={e =>handleEmail(e)} 
              size="small" fullWidth label="Email" variant="outlined" />
            </form>
          </Grid>
          <Grid item xs={12}>
            {loginDetails?loginDetails.user_type == "admin"?
              <Select fullWidth value={selectedUpdateRow.user_type._id} onChange={e=>handleUserType(e)}
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                  }, transformOrigin: {
                    vertical: "top",
                    horizontal: "left"
                  }, getContentAnchorEl: null
                }}> 
                {userTypeChoices_admin.map((choice, i)=>{
                  // console.log("choices", choice)
                  return(
                  <MenuItem key={i} value={choice}>{choice.user_group_type}</MenuItem>
                  )
                })}
              </Select> :
              <Select fullWidth value={selectedUpdateRow.user_type._id} onChange={e=>handleUserType(e)}
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                  }, transformOrigin: {
                    vertical: "top",
                    horizontal: "left"
                  }, getContentAnchorEl: null
                }}> 
                {userGroups.map((choice, i)=>{
                  return(
                  <MenuItem key={i} value={choice._id}>{choice.user_group_type}</MenuItem>
                  )
                })}
              </Select>
            :null}
          </Grid>
        </Grid>
        <DialogActions >
          <Button disabled={ !selectedUpdateRow.name || !selectedUpdateRow.email || !selectedUpdateRow.user_type } 
            className={classes.login1} variant="contained" onClick={handleUpdateState}>Update</Button>
          <Button className={classes.deleteButton} variant="contained" onClick={handleCloseUpdateUserDialog}>
            Close
          </Button>
        </DialogActions>
      </Paper>
    );
  }

  //SIGN UP USER
  const UserSignUpDialog = () => { 
    const [signUpState, setSignUpState] = useState({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      user_type: '',
      createdby_userid: '',
    });

    //functional for add user
    const handleSignUpState = event => {
      setDisUp(true)
      const fetchData = async() => {
        const res = await axios.post("https://seeds.geospectrum.com.ph/usermaster/signup", {
          name: signUpState.name,  //Number(signUpState.serialNo)  
          email: signUpState.email,
          password: signUpState.password,
          password_confirmation: signUpState.password_confirmation,
          user_type: signUpState.user_type,
          createdby_userid: userItem._id, 
        }).then(function(res) {
          if ('success' in res.data) {
            // successful yung login
            if (res.data.success == true) { 
              getUserData();
              alert("User account was added. Please check the Email Addresss for Verification.");
              setDisUp(false)
            } 
          } else {
            setDisUp(false)
          }
        }).catch((error) => {
          error.response.data.errors.forEach((error)=> {
            for (var key in error) {
              alert(error[key],"error")
            }
          })         
          setDisUp(false)
        })
      }
      fetchData(); 
      handleCloseSignUpDialog()
    }
    
    const handleName = event => {setSignUpState({ ...signUpState, name: event.target.value})} 
    const handleEmail = event => {setSignUpState({ ...signUpState, email: event.target.value})} 
    const handlePW = event => {setSignUpState({ ...signUpState, password: event.target.value})}
    const handlePWConfirm = event => {setSignUpState({ ...signUpState, password_confirmation: event.target.value})}
    const handleUserType = event => {setSignUpState({ ...signUpState, user_type: event.target.value})}

    return (
      <Paper style={{height:"100%",overflowX:"hidden", borderRadius:0}}>
        <Toolbar className={classes.appbar}>
          <Typography className={classes.appbarTitle} style={{textAlign:"center", fontWeight:700}}>Add a User</Typography>
        </Toolbar>
        <Grid container spacing={3} style={{padding:20}}>
          <Grid item required xs={12}>
            <form noValidate autoComplete="off">
              <TextField required value={signUpState.name} onChange={e =>handleName(e)} 
                size="small" fullWidth label="Name" variant="outlined"/>
            </form>
          </Grid>
          <Grid item required xs={12}>
            <form noValidate autoComplete="off">
              <TextField required value={signUpState.email} onChange={e =>handleEmail(e)} 
                size="small" fullWidth label="Email" variant="outlined"/>
            </form>
          </Grid>
          <Grid item xs={12}>
            <form noValidate autoComplete="off">
              <TextField required value={signUpState.password} onChange={e =>handlePW(e)} 
                size="small" fullWidth label="Password" variant="outlined" />
            </form>
          </Grid>
          <Grid item xs={12}>
            <form noValidate autoComplete="off">
              <TextField required value={signUpState.password_confirmation} onChange={e =>handlePWConfirm(e)} 
                size="small" fullWidth label="Password Confirmation" variant="outlined" />
            </form>
          </Grid>
          <Grid item xs={12}>
            {loginDetails?loginDetails.user_type == "admin"?
              <Select fullWidth value={signUpState.user_type} onChange={e=>handleUserType(e)}
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                  }, transformOrigin: {
                    vertical: "top",
                    horizontal: "left"
                  }, getContentAnchorEl: null
                }} align="left"> 
                {userTypeChoices_admin.map((choice)=>{
                  return(
                  <MenuItem value={choice} align="center">{choice}</MenuItem>
                  )
                })}
              </Select>
              : <Select fullWidth value={signUpState.user_type} onChange={e=>handleUserType(e)}
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                  }, transformOrigin: {
                    vertical: "top",
                    horizontal: "left"
                  }, getContentAnchorEl: null
                }} align="left"> 
                {userGroups.map((choice)=>{
                    return(
                    <MenuItem value={choice._id} align="center">{choice.user_group_type}</MenuItem>
                    )
                })}
              </Select>
            : null}
          </Grid>
        </Grid>

        <DialogActions>
          <Button disabled={ !signUpState.name || !signUpState.email || !signUpState.password || 
            !signUpState.password_confirmation || !signUpState.user_type } className={classes.login1}
            variant="contained" onClick={handleSignUpState}>
            Add
          </Button>
          <Button className={classes.deleteButton} variant="contained" onClick={handleCloseSignUpDialog}>
            Close
          </Button>
        </DialogActions>
      </Paper>
    );
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [searchTerm, setSearchTerm] = React.useState("");

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
      <Button className={classes.add} onClick={handleOpenSignUpDialog} variant="outlined" style={{marginBottom:20}}>
        Add a User
      </Button>
      <Dialog open={openSignUpDialog} onClose={handleCloseSignUpDialog}>
        <UserSignUpDialog/>
      </Dialog>
      <Dialog open={openUpdateUserDialog} onClose={handleCloseUpdateUserDialog} disableEnforceFocus>
        <UpdateUserDialog />
      </Dialog>
      <LoadingPage/>

      <TextField type ="text" style={{width:"100%", justifyContent: "center"}} value={searchTerm} 
        onChange={e => searchTermChanged(e)} onKeyPress={e => handleKeyPress(e)} size="medium" 
        placeholder="Search account by name or email...." variant="outlined" InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="primary"/>
          </InputAdornment>
        )}}/>
      
      <TableContainer component={Paper}>
        <Table className={classes.table} sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">User Type</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? user.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter((val) => {
                if(searchTerm == ""){
                  return val}
                else if(val.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  val.email.toLowerCase().includes(searchTerm.toLowerCase())){
                  return val
                }
              })
              : user 
            ).map((row, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  {row.email}
                </TableCell>
                <TableCell align="right">
                {row.user_type.user_group_type}
                </TableCell>
                <TableCell align="right">
                  <Button className={classes.edit} variant="contained"
                    onClick={(e) => handleOpenUpdateUserDialog(row)}>
                    Edit
                  </Button>
                  &nbsp;
                  <Button className={classes.delete} variant="contained" 
                    onClick={() => handleDelete(row)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={4} count={rows.length} rowsPerPage={rowsPerPage} page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}/>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}