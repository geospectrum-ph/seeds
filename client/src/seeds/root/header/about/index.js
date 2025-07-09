import { makeStyles, Grid, } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";

const useStyles = makeStyles(function () {
  return ({
    pageAbout: {
      width: "100%",
      height: "100%",
      
      "& > *": {
        width: "100%",
        height: "100%",

        display: "flex",
        flexFlow: "column nowrap",
        placeContent: "center center",
        placeItems: "center center",

        "& > :nth-child(1)": {
          width: "100%",
          height: "100%",

          display: "flex",
          flex: "1 1 auto",

          background: "var(--color-white)",    
            
          "& > * > * > * > *": {
            width: "100%",
            height: "100%",
          },
        },

        "& > :nth-child(4)": {
            display: "flex",
            flex: "0 1 auto",
            placeContent: "center center",
            placeItems: "center center",

            boxSizing: "border-box",
            margin: "0",
            padding: "48px",
            gap: "12px",

            background: "var(--color-white)",
        },
      },
    },
    aboutItem: {
      width: "100%",
      height: "100%",
      
      display: "flex",
      flexFlow: "column nowrap",
      placeContent: "center center",
      placeItems: "center center",

      "& > :nth-child(1)": {
        width: "100%",
        height: "auto",

        flex: "0 1 auto",        

        boxSizing: "border-box",
        padding: "48px",

        background: "var(--color-red-dark)",

        font: "800 72px/1 'Outfit', sans-serif",
        color: "var(--color-white)",
      },

      "& > :nth-child(2)": {
        width: "100%",
        height: "100%",

        flex: "1 1 auto",

        boxSizing: "border-box",
        padding: "48px",

        background: "var(--color-white)",

        font: "400 18px/1.25 'Outfit', sans-serif",
        color: "var(--color-black)",
      },
    },
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
      <Carousel interval = { "8000" }>
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
