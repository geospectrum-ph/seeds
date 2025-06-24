import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, Tooltip, CardMedia, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    height: 420,
    root: {
      '& .MuiTypography-h3': {
        fontFamily: "'Outfit', sans-serif",
      }, '& .MuiTypography-h6': {
        fontFamily: "'Outfit', sans-serif",
      },
    },
  }, title: {
      fontFamily: "'Outfit', sans-serif",
     color: 'white',
  }, desc: {
    color: '#ddd',
    backgroundColor: '#E6EBEC',
    borderRadius: 30,
    boxShadow: 0
  }, cardMedia: {
    backgroundColor: '#0d3c47',
    boxShadow: 3,
    paddingTop: '100%',
    borderRadius: 30,
    width: '100%',
    '&:hover': { // for deletion
      color: '#fffefe',
      backgroundColor: '#229922',
    },
  }, cardContent: {
    flexGrow: 1,
  }
});

export default function ImageCard({seedsFeatures,domainName, iconName}) {
  const classes = useStyles();

  return (
    <div>
      <Typography gutterBottom variant="h5" component="h2" align="center" style={{fontFamily:"'Outfit', sans-serif"}}>
        {seedsFeatures}
      </Typography>
      <Grid container spacing={2} > 
        {domainName.map((domain, index)=>(
          <Tooltip title={domainName[index]} key={index}>
            <Grid item xs={6} sm={4} md={2} style={{marginHorizontal:10, boxShadow: 0}}>
              <CardMedia className={classes.cardMedia}
                image={require(`../../../../assets/icons/${iconName[index]}.png`)}/>
            </Grid>
          </Tooltip>
        ))}  
      </Grid>
    </div>
  );
}