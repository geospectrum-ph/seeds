import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    height: 420,
  }, title: {
    fontFamily:'LeagueSpartan',
    color: 'white',
  }, desc: {
    color: '#ddd',
  }, cardMedia: {
    backgroundColor: '#646464',
    paddingTop: '90%',
    borderRadius: 30,
  }, cardContent: {
    flexGrow: 1,
    textAlign:'justify'
  }
});

export default function ImageCard({seedimg,checked}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.cardMedia} image={seedimg.imageUrl}/>
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {seedimg.title}
        </Typography>
        <Typography>
          {seedimg.description}
        </Typography>
      </CardContent>              
    </Card>
  );
}