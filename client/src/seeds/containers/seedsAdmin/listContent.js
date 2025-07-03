import React, { useState, useContext } from 'react';
import {useHistory} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core'

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import {AdminContext} from '../../context/AdminContext'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList() {
  const classes = useStyles();
  const history = useHistory();

  const [openUserAccounts, setOpenUserAccounts] = useState(true);
  const [openPeople, setOpenPeople] = useState(true);
  const [openDomain, setOpenDomain] = useState(true);
  const { selectedItem, setSelectedItem } = useContext(AdminContext);

  const handleClickUserAccounts = () => {
    setOpenUserAccounts(!openUserAccounts);
  };

  const handleClickPeople = () => {
    setOpenPeople(!openPeople);
  };

  const handleClickDomain = () => {
    setOpenDomain(!openDomain);
  };

  const handleListItemClick = (event, item, path) => {
    setSelectedItem(item);
    history.push(path)
  };

  return (
    <List style={{minHeight:"93.1vh"}} className={classes.root}>
      <ListItem button onClick={handleClickUserAccounts}>
        <ListItemText primary="User Accounts" primaryTypographyProps={{style: {fontWeight:700}}}/>
        {openPeople ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openUserAccounts} timeout="auto" unmountOnExit>
        <List disablePadding>
          <ListItem button className={classes.nested} selected={selectedItem === "users"} 
            onClick={(event) => handleListItemClick(event, "users", "/seeds/admin/users")}>
            <ListItemText primary="Users" />
          </ListItem>
        </List>
      </Collapse>
      <ListItem button onClick={handleClickPeople}>
        <ListItemText primary="People" primaryTypographyProps={{style: {fontWeight:700}}}/>
        {openPeople ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openPeople} timeout="auto" unmountOnExit>
        <List disablePadding>
          <ListItem button className={classes.nested} selected={selectedItem === "groups"} 
            onClick={(event) => handleListItemClick(event, "groups", "/seeds/admin/people")}>
            <ListItemText primary="Groups" />
          </ListItem>
        </List>
      </Collapse>
      <ListItem button onClick={handleClickDomain}>
        <ListItemText primary="Metadata" primaryTypographyProps={{style: {fontWeight:700}}}/>
        {openDomain ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openDomain} timeout="auto" unmountOnExit>
        <List disablePadding>
          <ListItem button className={classes.nested} selected={selectedItem === "social"} 
            onClick={(event) => handleListItemClick(event, "social", "/seeds/admin/domains")}>
            <ListItemText primary="Metadata Attributes" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}