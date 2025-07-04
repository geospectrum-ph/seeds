import { makeStyles, Button, Grid, Typography, Container, CssBaseline, Paper }from '@material-ui/core';
import Carousel from 'react-material-ui-carousel'

const useStyles = makeStyles(function () {
  return ({
    pageAbout: {
      width: "100%",
      height: "100%",
      
      "& > *":  {
        width: "100%",
        height: "100%",
        
        display: "flex",
        flexFlow: "column nowrap",
        placeContent: "center center",
        placeItems: "flex-start center",

        "& > :nth-of-type(1)":  {
          flex: "1 1 auto",

          "& > *": {
            flex: "1 1 auto",

            "& > *": {
              flex: "1 1 auto",
            },

            "& > *": {
              flex: "1 1 auto",
            },
          },
        },

        "& > :nth-of-type(2)":  {
          flex: "0 1 auto",
        },
      },
    },
    aboutItem: {
      display: "flex",
      flexFlow: "column nowrap",
      placeContent: "center center",
      placeItems: "flex-start center",

      boxSizing: "border-box",
      padding: "48px",
      gap: "48px",

      background: "var(--color-white)",

      "& > :nth-of-type(1)":  {
        flex: "0 1 auto",

        font: "800 72px/1 'Outfit', sans-serif",
      },

      "& > :nth-of-type(2)":  {
        flex: "1 1 auto",

        font: "400 18px/1.25 'Outfit', sans-serif",
      },
    },

      // "& > *": {
      //   overflow: "hidden auto",

      //   display: "flex",
      //   flex: "1 1 0",

      //   "& > *": {
      //     display: "flex",
      //     flexFlow: "row nowrap",

      //     boxSizing: "border-box",
      //     margin: "0",
      //     gap: "48px",

      //     "& > *": {
      //       width: "100%",
      //       height: "100%",
            
      //       display: "flex",
      //       flexFlow: "column nowrap",
      //       placeContent: "center center",
      //       placeItems: "flex-start center",

      //       "&:nth-of-type(1)": {
      //         font: "800 72px/1 'Outfit', sans-serif",
      //       },

      //       "&:nth-of-type(2)": {  
      //         font: "400 18px/1.25 'Outfit', sans-serif",
      //       },
      //     },

      //     "&:nth-of-type(odd)": {
      //       background: "var(--color-red-dark)",

      //       color: "var(--color-white)",
      //     },

      //     "&:nth-of-type(even)": {
      //       background: "var(--color-white)",

      //       color: "var(--color-black)",
      //     },

      //     "&:nth-of-type(1)": {
      //       boxSizing: "border-box",
      //       padding: "48px",
      //     },

      //     "&:nth-of-type(2)": {
      //       boxSizing: "border-box",
      //       padding: "48px",
      //     },

      //     "&:nth-of-type(4)": {
      //       boxSizing: "border-box",
      //       padding: "48px",
      //     },

      //     "&:nth-of-type(6)": {
      //       boxSizing: "border-box",
      //       padding: "48px",
      //     },
      //   },
      // },
  });
});

export default function About () {
  const styles = useStyles();

  const items = [
    {
      title: "About SEEDs",
      content: `SEEDs for LGU, or simply SEEDs is a web portal and GIS application that provides Local Government Units (LGUs) with a tool to effectively  utilize the spatial and textual information about and within their locality.`
    },
    {
      title: "SEEDs Modules",
      content: `Modules are a group of features that are designed to have a target outcome in the entirety of SEEDs.`
    },
    {
      title: "SEEDs Profile",
      content: ``
    },
    {
      title: "SEEDs Analytics",
      content: ``
    },
  ];

  function Item (props) {
    return (
      <Grid item container className = { styles.aboutItem }>
        <Grid item>
          <span>{ props.item.title }</span>
        </Grid>
        <Grid item>
          <span>{ props.item.content }</span>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid id = "page-about" className = { styles.pageAbout } container>
      <Carousel>
        {
          items.map(function (item, index) {
            return (
              <Item key = { index } item = { item }/>
            );
          })
        }
      </Carousel>
    </Grid>
  );
}

//               SEEDs Core
//             </Typography>
//             <Typography variant="h5" align="center" color="textSecondary" paragraph>
//               Comprises of a management system and its geographic databases which makes use of geographic maps 
//               and other textual information to provide personalized user-centric functionalities.
//             </Typography>
//         </div>
//           <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom >
//             SEEDs Profile
//           </Typography>
//           <Typography variant="h5" align="center" color="textSecondary" paragraph>
//             SEEDs Profile provides LGUs with GIS-based mapping and data analysis systems that will enhance, 
//             among other things, the capability for:
//           </Typography>
//           <Grid container spacing={4} >
//             {/* <Grid item xs={12} sm={6} md={3}>
//               <ImageCard seedimg={seedsImg[0]}/>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <ImageCard seedimg={seedsImg[1]}/>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <ImageCard seedimg={seedsImg[2]}/>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <ImageCard seedimg={seedsImg[3]}/>
//             </Grid> */}
//           </Grid>

//         <div className={styles.heroContent}>
//           <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
//             SEEDs Analytics
//           </Typography>
//         </div>
//       </div>
//         <main id="header"> 
//           <div className={styles.heroContent}>
//               <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
//                 Overview of the Project
//               </Typography>
//               <Typography variant="h5" align="center" color="textSecondary" paragraph>
//                 Insert description
//               </Typography>
//           </div>
//             <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
//               Project Team
//             </Typography>
//             <Typography variant="h5" align="center" color="textSecondary" paragraph>
//               Insert description
//             </Typography>
//             <br/>
//           <div className={styles.heroContent} >
//               <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
//                 Project Team
//               </Typography>
//               <Typography variant="h5" align="center" color="textSecondary" paragraph>
//                 Insert description
//               </Typography>
//           </div>
//             <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
//               Other details
//             </Typography>
//             <Typography variant="h5" align="center" color="textSecondary" paragraph>
//               Insert description
//             </Typography>
//             <br/>
//         </main>
//       </div>
// </div>