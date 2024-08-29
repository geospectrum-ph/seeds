import React from 'react';
import clsx from 'clsx';
import {useHistory} from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { makeStyles, withStyles, Tooltip, useTheme } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NearMeIcon from '@material-ui/icons/NearMe';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FilterListIcon from '@material-ui/icons/FilterList';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import MuiListItem from "@material-ui/core/ListItem";
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import {FeaturesContext} from '../../context/FeaturesContext';
import './index.css'
// import upload from '../../assets/icons'
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
},
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: '#0c343d'
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 50,
    [theme.breakpoints.up('sm')]: {
      width: 69,
    },
    backgroundColor: '#0c343d'
    // '#fffefe'
  },
  // toolbar: {
  //   display: 'flex',
  //   backgroundColor: '#1b798e',
  //   alignItems: 'center',
  //   justifyContent: 'flex-end',
  //   padding: theme.spacing(0, 1),
  //   necessary for content to be below app bar
  //   ...theme.mixins.toolbar,
  // },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  iconleft: {
    backgroundColor: '#0c343d',
    color: '#fffefe',
    '&:hover': {
    //   color: '#fffefe',
      backgroundColor: '#1b798e'
    }
  },
  icon: {
    // backgroundColor: '#0c343d',
    color: '#fffefe',
    // '&:hover': {
    //   color: '#fffefe',
      // backgroundColor: '#1b798e'
    // }
  },
  leftbutton: {
    color: '#ffffff',
    '&:hover': {
      color: '#fffefe',
      backgroundColor: '#1b798e',
    }
  },
  textfont1: {
        // fontFamily:'Nunito',
        fontFamily:'LeagueSpartan',
        // fontFamily:'GlacialIndifference',
        // fontFamily:'Montserrat',
        // fontFamily: 'Lora'
        fontSize: '3rem',
  },
  divider: {
    // color: "#fffefe",
    backgroundColor:"#fffefe"
  }
}));


export default function LeftNav() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { select, setSelect } = React.useContext(FeaturesContext)

  
  const history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(!open);
  };
  const [base, setBase] = React.useState(false);

  const handleClickDraw=(e)=>{
    // console.log("this is working fine");
    e.preventDefault();
    e.target.style.color = 'black'
    // console.log(e.target);
}
const [selectedIndex, setSelectedIndex] = React.useState(false);

const handleListItemClick = (event, index, theme) => {
  setSelectedIndex(index);
  const leftNav = ["SEEDs Populate", "SEEDs Catalogue", "SEEDs Map Portal","SEEDs Profile", "SEEDs Analytics"]
  // const leftNav = ["seedspopulate", "seedscatalogue", "SEEDs Map Portal","SEEDs Profile", "SEEDs Analytics"]
  // console.log("index",index)
  // console.log(typeof leftNav);
  // const leftnavstring
  const leftnav2 = JSON.stringify(leftNav[index]).replaceAll(" ","").toLowerCase().replace(/\"/g, "")
  // console.log("thisisleftnac",leftNav[index])
  // console.log("string",leftnav2)
  // var url1 = "/map/";
  // var url2 = url1.concat(leftnav2);
  // console.log("url",url2)

  setSelect(leftNav[index])
  // {history.push(url2)}
  // event.target.style.maxWidth= "360"
  // event.target.style.backgroundColor= "#fffefe"
  // event.theme.palette.background = "#fffefe"

};
const ListItem = withStyles({
  root: {
    "&$selected": {
      backgroundColor: "#1b798e",
      color: "white"
    },
    "&$selected:hover": {
      backgroundColor: "#1b798e",
      color: "white"
    },
    "&:hover": {
      backgroundColor: "#1b798e",
      color: "white"
    }
  },
  selected: {}
})(MuiListItem);
  return (
    <div className={classes.root}>
      
      <Drawer 
        // backgroundColor= '#3E636C'
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div >
          <IconButton onClick={handleDrawerClose} className={classes.iconleft}>
            {open ? <ChevronLeftIcon />:<ChevronRightIcon /> }
          </IconButton>
        </div>
    <br></br>
        <Divider />
        <List>
        {/* <Link to="/seedspopulate"> */}
          <ListItem button key={'SEEDs Populate'} 
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
            // onClick={()=>setSelect("SEEDs Populate")} 
            className={classes.leftbutton}>
            <Tooltip title="SEEDs Populate">
              <ListItemIcon className={classes.icon}> <CloudUploadIcon  /> </ListItemIcon>
            </Tooltip>
            <ListItemText className={classes.textfont1} primary={'SEEDs Populate'}/>
          </ListItem>
        {/* </Link> */}

        {/* <Link to="/seedscatalogue"> */}
          <ListItem button key={'SEED Catalogue'} 
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)} 
            // onClick={()=>setSelect("SEEDs Catalogue")} setSe
            className={classes.leftbutton}>
            <Tooltip title="SEEDs Catalogue">
              <ListItemIcon className={classes.icon}> <FolderOpenIcon /> </ListItemIcon>
            </Tooltip>
            <ListItemText primaryTypographyProps='textfont1' primary={'SEEDs Catalogue'} />  
          </ListItem>
        {/* </Link> */}

          <ListItem button key={'SEED Map Portal'} 
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
            // onClick={()=>setSelect("SEEDs Map Portal")} 
            className={classes.leftbutton}> 
            <Tooltip title="SEEDs Map Portal">
              <ListItemIcon className={classes.icon}> <NearMeIcon /> </ListItemIcon>
            </Tooltip>
            <ListItemText className={classes.textfont1} >SEEDs Map Portal</ListItemText>
          </ListItem>

          
          <ListItem button key={'SEEDs Profile'} 
            // onClick={()=>setSelect("SEEDs")} 
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3)}
            // setSelect(leftNav[index])
            className={classes.leftbutton}> 
            <Tooltip title="SEEDs Profile">
              <ListItemIcon className={classes.icon}> <FilterListIcon /> </ListItemIcon>
            </Tooltip>
            <ListItemText className={classes.textfont1} >SEEDs Profile</ListItemText>
          </ListItem>
     
          <ListItem button key={'SEEDs Analytics'} 
            // onClick={()=>setSelect("SEEDs")} 
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event, 4)}
            // setSelect(leftNav[index])
            className={classes.leftbutton}> 
            <Tooltip title="SEEDs Analytics">
              <ListItemIcon className={classes.icon}> <AssessmentOutlinedIcon /> </ListItemIcon>
            </Tooltip>
            <ListItemText className={classes.textfont1} >SEEDs Analytics</ListItemText>
          </ListItem>

          <List>
          <ListItem button key={'Logout'} onClick={()=>history.push('/')} className={classes.leftbutton}>
          <Tooltip title="Logout">
          
          <ListItemIcon className={classes.icon}> <ExitToAppOutlinedIcon /> </ListItemIcon>
          </Tooltip>
          <ListItemText className={classes.textfont1} primary={'Logout'} /> 
          </ListItem>
          
          
          <ListItem button key={'Help'} 
                    selected={selectedIndex === 5}
                    onClick={(event) => handleListItemClick(event, 5)}
          className={classes.leftbutton}>
          <Tooltip title="Help ">
          <ListItemIcon className={classes.icon}> <HelpOutlineOutlinedIcon /> </ListItemIcon>
          </Tooltip>
          <ListItemText className={classes.textfont1} primary={'Help'} /> 
          </ListItem>
          
          </List>
       
        </List>
        
      </Drawer>
      
    </div>
  );
}