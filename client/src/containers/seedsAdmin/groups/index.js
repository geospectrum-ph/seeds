import React, {useContext, useEffect, useState}  from 'react';
import axios from 'axios'
import { Paper, Typography, Grid, Button, TextField, Dialog, DialogActions, Toolbar, 
        Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import { SEEDSContext } from '../../../context/SEEDSContext'
import { AdminContext } from '../../../context/AdminContext'

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

const useStyles = makeStyles(() => ({
  table: {
    minWidth: 500,
  }, edit: {
    borderRadius: 35,
    backgroundColor: '#1b798e',
    color: '#ffffff',
    fontSize: "9px",
    padding: "9px 27px",
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#229922'
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

export default function Groups() {
  const classes = useStyles();

  const { setDisUp } = useContext(SEEDSContext);
  const { setSelectedItem, groupPrivilege } = useContext(AdminContext);

  setSelectedItem("groups")

  const [selectedUpdateGroupRow, setSelectedUpdateGroupRow] = useState([]);
  const [openUpdateGroupDialog, setOpenUpdateGroupDialog] = useState(false);
  const handleOpenUpdateGroupDialog = async row => {
    setOpenUpdateGroupDialog(true);
    setSelectedUpdateGroupRow(row)
  }
  const handleCloseUpdateGroupDialog = () => {setOpenUpdateGroupDialog(false);}

  //delete user
  const handleDelete = async row => {
    const _id = row._id;
    const getGroupLength = await axios.get(`http://localhost:5000/usermaster/checkUserGroupUnderExist/${_id}`);
    if(getGroupLength.data > 0){
      alert('Unable to delete User Group.')
    }
    else{
      const req = await axios.delete(`http://localhost:5000/usergroup/delete/${_id}`)
      .then(function() {
        alert("Group deleted successsfully.");
        getUserGroups();
      }).catch((error) => {
        alert(error);
      }) 
    }
  };

    //Update Group
  const UpdateGroupDialog = () => { 
    // handler to import ng table
    const groupUpdate = {
      id: selectedUpdateGroupRow._id,
      user_group_type: selectedUpdateGroupRow.user_group_type,
      privileges: selectedUpdateGroupRow.privileges
    };
    const [updateGPrivileges, setUpdateGPrivileges] = useState(selectedUpdateGroupRow.privileges)
    
    const getUpdateValue=(e, row)=>{
      if(e.target.checked){
        // console.log(updateGPrivileges, selectedUpdateGroupRow.privileges)
        let data = updateGPrivileges;
        data.push(row)
        setUpdateGPrivileges(data)
      } else {
        let data = updateGPrivileges;
        setUpdateGPrivileges(updateGPrivileges.filter(o => o._id !== e.target.value))
      }
    }

    //functional for update group
    const handleUpdateGroupState = () => {
      setDisUp(true)
      alert("Update")
      const updatePrivilege_values = [];
      
      const updateData = async() => {
        const res = await axios.put(`http://localhost:5000/usergroup/update/${groupUpdate.id}`, {
          user_group_type: groupUpdate.user_group_type, 
          privileges: updatePrivilege_values
        }).then(function(res) {
          alert("Group updated successfully.");
          getUserGroups();
        }).catch((error) => {
          // console.log(error.response)
        })
      }
      updateData(); 
      handleCloseUpdateGroupDialog()
    }  

    return (
      <Paper style={{height:"100%",overflowX:"hidden", borderRadius:0}}>
        <Toolbar className={classes.appbar}>
          <Typography className={classes.appbarTitle} style={{textAlign:"center", fontWeight:700}}>
            Update Group
          </Typography>
        </Toolbar>
        <Grid container spacing={3} style={{padding:20}} >
          <Grid item required xs={12}>
            <form noValidate autoComplete="off">
              <TextField required value={groupUpdate.user_group_type} onChange={e =>handleUpdateGroupState(e)} 
                size="small" label="User Group Type" variant="outlined" />
            </form>
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell align="center">Group Privilege</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groupPrivilege.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell align="center" component="th" scope="row">
                    <Checkbox color="primary" value={row._id} onChange={(e)=>getUpdateValue(e, row)} 
                      defaultChecked={updateGPrivileges.filter(o => o._id === row._id).length > 0}/> 
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.privilege_name}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <DialogActions >
          <Button disabled={!groupUpdate.user_group_type} className={classes.login1} variant="contained" 
            onClick={handleUpdateGroupState}>Update</Button>
          <Button className={classes.deleteButton} variant="contained" onClick={handleCloseUpdateGroupDialog}>
            Close
          </Button>
        </DialogActions>
      </Paper>
    );
  }

  // Get Selected Values
  const [selectedGroupPrivilege, setSelectedGroupPrivilege] = useState([])

  const getValue=(e)=>{
    if(e.target.checked){
      let data = selectedGroupPrivilege;
      data.push(e.target.value)
      setSelectedGroupPrivilege(data)
    }
    else if(!e.target.checked){
      
    }
  }

  // Get All User Groups
  const [group, setGroup] = useState([])
  const getUserGroups = async () => {
    try{
      const userGroups = await axios.get("http://localhost:5000/usergroup");
      setGroup(userGroups.data)
    }
    catch(e){
      /* console.log(e) */
    }
  }

  useEffect (() => {
    getUserGroups();
  }, []);

  const [openAddGroupDialog, setOpenAddGroupDialog] = useState(false);
  const handleOpenAddGroupDialog = () => {setOpenAddGroupDialog(true);}
  const handleCloseAddGroupDialog = () => {setOpenAddGroupDialog(false);}


  //Add Group
  const AddGroupDialog = () => { 
    // handler to import ng table
    const [groupAdd, setGroupAddState] = useState({
      user_group_type: '',
    });

    //functional for add group
    const handleAddGroupState = () => {
      setDisUp(true)
      const fetchData = async() => {
        const res = await axios.post("http://localhost:5000/usergroup/add/", {
          user_group_type: groupAdd.user_group_type,
          privileges:  selectedGroupPrivilege,
        }).then(function() {            
          alert("Group added successfully.");
          getUserGroups();
          setDisUp(false)
        }).catch((error) => {
          // console.log(error)
        })
      }
      fetchData(); 
      handleCloseAddGroupDialog()
      setSelectedGroupPrivilege([])
    }

    const handleUserGroupType = event => {setGroupAddState({ ...groupAdd, user_group_type: event.target.value})} 

    return (
      <Paper style={{height:"100%",overflowX:"hidden", borderRadius:0}}>
        <Toolbar className={classes.appbar}>
          <Typography className={classes.appbarTitle} style={{textAlign:"center", fontWeight:700}}>Add Group</Typography>
        </Toolbar>
        <Grid container spacing={3} style={{padding:20}} >
          <Grid item required xs={12}>
            <form noValidate autoComplete="off">
              <TextField required value={groupAdd.user_group_type} onChange={e =>handleUserGroupType(e)} 
                size="small" fullWidth label="User Group Type" variant="outlined" />
            </form>
          </Grid>    
        </Grid>
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center"/>
                <StyledTableCell align="center">Group Privilege</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groupPrivilege.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell align="center" component="th" scope="row">
                    <Checkbox color="primary" value={row._id} onChange={(e)=>getValue(e)}/> 
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.privilege_name}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <DialogActions>
          <Button disabled={!groupAdd.user_group_type } className={classes.login1} variant="contained" 
            onClick={handleAddGroupState}>Add</Button>
          <Button className={classes.deleteButton} variant="contained" onClick={handleCloseAddGroupDialog}>
            Close
          </Button>
        </DialogActions>
      </Paper>
    );
  }

  return (
    <>
      <Button onClick={() => handleOpenAddGroupDialog()} variant="outlined" style={{marginBottom:20}}>Add a Group</Button>
      <Dialog open={openAddGroupDialog} onClose={handleCloseAddGroupDialog}>
        <AddGroupDialog/>
      </Dialog>
      <Dialog open={openUpdateGroupDialog} onClose={handleCloseUpdateGroupDialog}>
        <UpdateGroupDialog/>
      </Dialog>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Group Id</StyledTableCell>
              <StyledTableCell align="center">Group Name</StyledTableCell>
              <StyledTableCell align="center">Group Privileges</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {group.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell align="center" component="th" scope="row">
                  {row._id}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.user_group_type}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.privileges.map(privilege => <div>{privilege.privilege_name}</div>)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button  className={classes.edit} variant="contained"
                    onClick={() => handleOpenUpdateGroupDialog(row)}>
                    Edit
                  </Button>
                  &nbsp;
                  <Button className={classes.delete} variant="contained"
                    onClick={() => handleDelete(row)}>
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}