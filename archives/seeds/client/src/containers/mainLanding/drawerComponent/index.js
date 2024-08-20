import React, { useState } from 'react';
import { List, IconButton, ListItemText, Drawer } from '@material-ui/core';
import MuiListItem from "@material-ui/core/ListItem";
import { makeStyles, withStyles} from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu';
import {useHistory} from "react-router-dom";

const ListItem = withStyles({
  root: {
    "&$selected": {
      backgroundColor: "#1b798e",
      color: "white"
    }, "&$selected:hover": {
      backgroundColor: "#1b798e",
      color: "white"
    }, "&:hover": {
      backgroundColor: "#1b798e",
      color: "white"
    }
  }, selected: {}
})(MuiListItem);

const DrawerComponent = () => {

  const useStyles = makeStyles(theme => ({
    drawerContainer: {
      width:"50%", 
      '& .MuiListItemText-primary': {
        fontFamily:"LeagueSpartan"
      }
    }, iconButtonContainer: {
      marginLeft: 'auto',
      color: 'white'
    }, menuIconToggle: {
      fontSize: '3rem'
    }
  }));

  const [openDrawer, setOpenDrawer] = useState(false);
  const history = useHistory();

  const handleListItemClick = (path) => {
    history.push(path)
    setOpenDrawer(false);
  };
  
  const classes = useStyles();

  return (
    <>
      <Drawer anchor='right' classes={{ paper: classes.drawerContainer }} open={openDrawer}
        onClose={() => setOpenDrawer(false)} onOpen={() => setOpenDrawer(true)}>
        <List>
          <ListItem divider button onClick={() => handleListItemClick("/aboutUs")}>
            <ListItemText className={classes.textfont1} primary="About Us"/>
          </ListItem>

          <ListItem divider button onClick={() => handleListItemClick( "/contactUs")}>
            <ListItemText className={classes.textfont1}>Contact Us</ListItemText>
          </ListItem>

          <ListItem divider button onClick={() => handleListItemClick("/features")}>
            <ListItemText className={classes.textfont1}>Features</ListItemText>
          </ListItem>

          <ListItem divider button onClick={() => handleListItemClick("/login")}>
            <ListItemText className={classes.textfont1}>Login</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <IconButton className={classes.iconButtonContainer} onClick={() => setOpenDrawer(!openDrawer)} disableRipple>
        <MenuIcon className={classes.menuIconToggle}/>
      </IconButton>
    </>
  );
};

export default DrawerComponent;