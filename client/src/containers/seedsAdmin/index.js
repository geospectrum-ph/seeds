

import React, {useEffect, useState} from 'react';
import { Switch, Route, useHistory } from "react-router-dom";
import axios from 'axios';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Drawer, Button } from '@material-ui/core';

import ListContent from './listContent'
import Users from './users'
import Domains from './domains'
import Socials from './socials'
import Economics from './economics'
import Environmentals from './environmentals'
import Demographics from './demographics'
import People from './groups'

import {AdminContext} from '../../context/AdminContext'
import {SEEDSContext} from '../../context/SEEDSContext'

const useStyles = makeStyles({
  list: {
    width: 250,
  }, fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {
  
  const [isAuth, setIsAuth] = useState();
  const [isUserPrivilegeManageUsers, setIsUserPrivilegeManageUsers] = useState([])
  const [temporaryDrawer, setTemporaryDrawer] = useState(false)

  

  const classes = useStyles();
  const theme = useTheme();

  const { setSelectedIndex } = React.useContext(SEEDSContext);
 
  useEffect(() => {
    setSelectedIndex(5)
    try{
      const _id = JSON.parse(localStorage.getItem('user'))._id;
      axios.get(`http://ec2-52-90-134-187.compute-1.amazonaws.com//usermaster/checkUserPrivilege/${_id}/61892c33219fea59d81938b3`).then(resp => {
        setIsUserPrivilegeManageUsers(resp.data);
        setIsAuth(isUserPrivilegeManageUsers["is_Privilege"])
      });
    }
    catch(e){
      console.log(e)
    }
  }, [])

  //search
  const {searchTerm} = useState("");
  const searchHandler = () => {};

  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (isMatch) {
      setTemporaryDrawer(true);
    } else {
      setTemporaryDrawer(false);
    }
  }, [isMatch, temporaryDrawer])

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div role="presentation" onKeyDown={toggleDrawer(anchor, false)} onClick={toggleDrawer(anchor, false)}
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}>
      <ListContent/>
    </div>
  );
  return (
    <div style={{minHeight:"93.1vh"}}>
      {temporaryDrawer? 
        <> 
          {['right'].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button style={{marginLeft:20, marginTop:20}} variant="outlined" onClick={toggleDrawer(anchor, true)}>
                Admin
              </Button>
              <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
          <Grid container style={{height:"100vh"}}>
            <Grid item xs={12} style={{padding:20}}>
              <Switch>
                <Route path="/seeds/admin/users">
                  <Users/>
                </Route>
                <Route path="/seeds/admin/people">
                  <People/>
                </Route>
                <Route path="/seeds/admin/domains">
                  <Domains/>
                </Route>
                <Route path="/seeds/admin/socials">
                  <Socials/>
                </Route>
                <Route path="/seeds/admin/economics">
                  <Economics/>
                </Route>
                <Route path="/seeds/admin/environmentals">
                  <Environmentals/>
                </Route>
                <Route path="/seeds/admin/demographics">
                  <Demographics/>
                </Route>
              </Switch>
            </Grid>
          </Grid>
        </> 
      : <Grid container>
          <Grid item xs={2}><ListContent/></Grid>
          <Grid item xs={10} style={{padding:50}}>
            <Switch>
              <Route path="/seeds/admin/users"
                render = {(props) => (
                  <Users {...props} term = {searchTerm} searchKeyword = {searchHandler}/>
                )}/>
              <Route path="/seeds/admin/people">
                <People/>
              </Route>
              <Route path="/seeds/admin/domains">
                <Domains/>
              </Route>
              <Route path="/seeds/admin/socials">
                <Socials/>
              </Route>
              <Route path="/seeds/admin/economics">
                <Economics/>
              </Route>
              <Route path="/seeds/admin/environmentals">
                <Environmentals/>
              </Route>
              <Route path="/seeds/admin/demographics">
                <Demographics/>
              </Route>
            </Switch>
          </Grid>
        </Grid>
      }
    </div>    
  );
}