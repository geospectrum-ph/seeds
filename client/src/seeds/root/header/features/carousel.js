import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Card, CardActionArea, CardMedia } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  }, media: {
    paddingTop: '48%'
  }, marginTop: {
    marginTop: theme.spacing(2),
  }, details: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: "#ced8da"
  }  
}));

export default function SeedsCarouselCard ({seedsCore,seedsDesc, seedsImg}) {
  const classes = useStyles();
  var str2 = JSON.stringify(seedsCore); //convert object to string

  return (
    <div className={classes.details}>
      <Card className={classes.marginTop2}>
        <CardActionArea>   
          <CardMedia className={classes.media} title={seedsDesc}
            image={require(`../../../../assets/seeds${seedsCore}Images/${seedsImg}.png`)}/>
          <Divider/>
          <Typography variant="body2" color="textSecondary" component="p" style={{backgroundColor:"#eeeeee"}}> 
            {seedsDesc}
          </Typography>
        </CardActionArea>
      </Card>
    </div> 
  );
}