import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Collapse } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

//import functions from other folders
// import BG from '../../../assets/satellite-bg.jpg'
import seedsImg from '../../../assets/static/seedsImg'


const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    background: 'rgba(0,0,0,0.5)',
    margin:'10px',
    height: 400,
  },
  media: {
    height: 250,
  },
  title: {
    // fontFamily: 'Nunito',
      fontFamily:'LeagueSpartan',
      // fontFamily:'GlacialIndifference',
      // fontFamily:'Montserrat',
      // fontFamily: 'Lora'
    // fontWeight: 'Bold',
    color: 'white',
    // fontSize: '2rem',
  },
  desc: {
    // fontFamily: 'Nunito',
          // fontFamily:'LeagueSpartan',
      // fontFamily:'GlacialIndifference',
      // fontFamily:'Montserrat',
      // fontFamily: 'Lora'
    // fontWeight: 'Bold',
    color: '#ddd',
    // fontSize: '2rem',
  },
  // media: {
  //   height: '56.25%', // 16:9
  // },
});

export default function ImageCard({seedimg,checked}) {
  const classes = useStyles();

  return (
    <Collapse in ={checked} 
    {...(checked ? { timeout: 1000 } : {})} 
    >
        <Card className={classes.root}>
            <CardMedia
            className={classes.media}
            image={seedimg.imageUrl}
            title="Social"
            />
            <CardContent>
            <Typography 
            gutterBottom 
            variant="h5" 
            component="h2"
            className={classes.title}>
                {seedimg.title}
            </Typography>
            <Typography className={classes.desc} variant="body2" color="textSecondary" component="p">
                {seedimg.description}
            </Typography>
            </CardContent>
        </Card>
    </Collapse>
  );
}