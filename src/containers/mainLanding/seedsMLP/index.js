import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

//import functions from other folders
import ImageCard from '../imageCardMLP';
import BG from '../../../assets/satellite-bg.jpg';
import seedsImg from '../../../assets/static/seedsImg'
import useWindowPosition from '../../../hook/useWindowPosition';
import './index.css'
const useStyles = makeStyles((theme)=>({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down("md")]:{
      flexDirection: "column",
    },
  },
}));

export default function SeedsMLP() {
  const classes = useStyles();
  const checked = useWindowPosition('header');

  return (
    <div className={classes.root} id="seeds-Img">
      <ImageCard seedimg={seedsImg[0]} checked={checked} class="zoom" />
      <ImageCard seedimg={seedsImg[1]} checked={checked} class="zoom" />
      <ImageCard seedimg={seedsImg[2]} checked={checked} class="zoom" />
      <ImageCard seedimg={seedsImg[3]} checked={checked} class="zoom" />
    </div>
  );
}