import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Divider, CardContent, CardActions, CardActionArea, CardMedia, Typography, Grid} from '@material-ui/core';
import Carousel from 'react-material-ui-carousel'

import SocialImage from "../../../../assets/seedsProfileOverview/social_16-9.jpg"
import EconomicImage from "../../../../assets/seedsProfileOverview/economic_16-9.jpg"
import EnvironmentalImage from "../../../../assets/seedsProfileOverview/environmental_16-9_lr.jpg"
import DemographicImage from "../../../../assets/seedsProfileOverview/demographic_16-9_lr.jpg"

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#ced8da"
  }, media: {
    minWidth:800,
    maxWidth:"100%",
    height:444.375,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }
}));

function SeedsCarouselCard ({seedsFeatures,seedsDesc, imgPath}) {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea>
        <CardMedia image={imgPath} className={classes.media}/>
          <CardContent>
            <Typography variant="h4" style={{fontFamily:"LeagueSpartan"}} >
              {seedsFeatures}
            </Typography>
            <Divider/>
            <Typography variant="body2" color="textSecondary" component="p">
              {seedsDesc}
            </Typography>
          </CardContent>
      </CardActionArea>
      <CardActions>

      </CardActions>
    </Card>
  );
}

export default function Example() {
  return (
    <Grid container>
      <Grid item xs={12} md={12} lg={12}>
        <Carousel>
          <SeedsCarouselCard seedsFeatures="Social" imgPath={SocialImage}
            seedsDesc={["Planning, monitoring and implementation of local government projects"]}/>
          <SeedsCarouselCard seedsFeatures="Economic" imgPath={EconomicImage}
            seedsDesc={["Formulation of economic development plans and land use policies"]}/>
          <SeedsCarouselCard seedsFeatures="Environmental" imgPath={EnvironmentalImage}
            seedsDesc={["Development of master plans for health and safety, risk and disaster mitigation and other environmental policies"]}/>
          <SeedsCarouselCard seedsFeatures="Demographic" imgPath={DemographicImage}
            seedsDesc={["Efficient delivery of social services to its constituents with the aid of its demographic and socio-economic databases"]}/>     
        </Carousel>
        </Grid>
    </Grid>
  )
}