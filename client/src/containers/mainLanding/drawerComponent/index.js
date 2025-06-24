import * as React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles, withStyles} from "@material-ui/core/styles";
import { Drawer, IconButton, List, ListItemText } from "@material-ui/core";
import MuiListItem from "@material-ui/core/ListItem";
import MenuIcon from "@material-ui/icons/Menu";

const ListItem = withStyles({
  root: {
    "&.list-item-selected": {
      backgroundColor: "var(--color-background-01)",
      
      color: "var(--color-white)",
    },
    "&:hover": {
      backgroundColor: "var(--color-background-02)",
      
      color: "var(--color-white)",
    },
  },
})(MuiListItem);

const DrawerComponent = () => {
  const useStyles = makeStyles(theme => ({
    drawerContainer: {
      width: "50%",

      "& .MuiListItemText-primary": {
        fontFamily: "'Outfit', sans-serif",
      },
    },
    iconButtonContainer: {
      marginLeft: "auto",
      color: "var(--color-white)",
    },
    menuIconToggle: {
      fontSize: "36px",
      color: "var(--color-background-02)",
    },
  }));

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const history = useHistory();

  const handleListItemClick = (path) => {
    if (history.location.pathname !== path) {
      history.push(path);
    }

    setOpenDrawer(false);
  };

  const classes = useStyles();

  return (
    <>
      <Drawer anchor = "right" classes = {{ paper: classes.drawerContainer }} open = { openDrawer } onClose = { () => setOpenDrawer(false) }>
        <List>
          <ListItem className = { history.location.pathname === "/aboutUs" ? "list-item-selected" : null } divider button onClick = { () => handleListItemClick("/aboutUs") }>
            <ListItemText className = { classes.textfont1 } primary = "About Us"/>
          </ListItem>
          <ListItem className = { history.location.pathname === "/features" ? "list-item-selected" : null } divider button onClick = { () => handleListItemClick("/features") }>
            <ListItemText className = { classes.textfont1 }>Features</ListItemText>
          </ListItem>
          <ListItem className = { history.location.pathname === "/contactUs" ? "list-item-selected" : null } divider button onClick = { () => handleListItemClick("/contactUs") }>
            <ListItemText className = { classes.textfont1 }>Contact Us</ListItemText>
          </ListItem>
          <ListItem className = { history.location.pathname === "/login" ? "list-item-selected" : null } divider button onClick = { () => handleListItemClick("/login") }>
            <ListItemText className = { classes.textfont1 }>Login</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <IconButton className = { classes.iconButtonContainer } onClick = { () => setOpenDrawer(!openDrawer) } disableRipple>
        <MenuIcon className = { classes.menuIconToggle }/>
      </IconButton>
    </>
  );
};

export default DrawerComponent;