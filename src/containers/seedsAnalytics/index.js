import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {FeaturesContext} from '../../context/FeaturesContext';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    
  },
}));

export default function TypographyTheme() {
  const classes = useStyles();
  const { selectedIndex, setSelectedIndex } = React.useContext(FeaturesContext);

  setSelectedIndex(4)
  // console.log(selectedIndex)
  return (
    <div className={classes.root} styles={{justifyContent: "center"}}>{"This feature is in construction."}</div>);
}