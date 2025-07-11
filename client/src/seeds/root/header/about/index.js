import * as React from "react";

import { makeStyles, Grid, } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";

import { SEEDSContext } from "../../../context/SEEDSContext";

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

      "& .page-about-item": {
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

          overflow: "hidden auto",

          boxSizing: "border-box",
          padding: "48px",

          background: "var(--color-white)",

          font: "400 16px/1.25 'Outfit', sans-serif",
          color: "var(--color-black)",
        },
      },
    },
  });
});

export default function About () {
  const styles = useStyles();
  
  const { setAppBarValue } = React.useContext(SEEDSContext);

  const items = [
    {
      title: "About SEEDs",
      content:
        <span>
          { "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec dictum felis. Mauris euismod metus dui, et malesuada lacus congue sed. Aliquam erat volutpat. Duis sed nunc nec justo mattis vulputate ac sed orci. Nulla lobortis pulvinar maximus. Sed ac leo erat. Suspendisse arcu nulla, tempus vitae viverra eu, consectetur a metus. Nulla facilisi. Sed nec ex mollis, bibendum justo id, eleifend mi. Nullam blandit ligula ac interdum condimentum." }
          <br/><br/>
          { "In non pharetra lacus. Ut feugiat eros eros, sit amet dapibus elit varius quis. Cras non mauris ex. Donec aliquam lorem a odio luctus tempus. Aliquam faucibus commodo est in hendrerit. Proin at elit vel mauris dignissim pharetra ac eu quam. Pellentesque sagittis tortor nunc, non facilisis libero venenatis sit amet. Phasellus tempus eleifend metus at volutpat. Maecenas suscipit, nunc id lacinia finibus, nisi justo commodo mauris, non ultrices massa neque at turpis. Nulla sit amet mauris accumsan, cursus augue et, consequat lectus." }
          <br/><br/>
          { "Nullam ut commodo est. Sed vitae sapien purus. Donec consequat justo sed risus rutrum iaculis. Sed ut urna in mauris scelerisque malesuada. Sed aliquam, nisi eu vehicula aliquam, est erat porttitor metus, at placerat orci libero eu ligula. Nam a libero eu mauris tincidunt sollicitudin viverra et odio. Nullam placerat magna ut euismod accumsan. Mauris elementum, purus sed pellentesque dictum, velit dolor varius ante, nec vulputate diam turpis iaculis urna. " }
        </span>,
    },
    {
      title: "SEEDs Modules",
      content:
        <span>
          { "Praesent quam eros, blandit hendrerit tempus eu, porttitor posuere urna. Nam rhoncus ex et dui facilisis pharetra. Quisque ac vestibulum urna, porttitor vehicula arcu. Morbi ultrices maximus pretium. Curabitur quis massa magna. Sed id sem non metus pretium euismod quis a lacus. Sed sit amet purus ut ipsum efficitur tristique. Nam venenatis mi quis nulla facilisis, quis pulvinar metus sollicitudin. Nulla felis dolor, hendrerit ut eleifend sed, sagittis eget dui." }
          <br/><br/>
          { "Duis elit erat, lobortis quis quam eu, pulvinar faucibus magna. Proin efficitur semper lectus eu interdum. Pellentesque scelerisque interdum enim, ut aliquam ante vestibulum in. Pellentesque egestas rutrum pharetra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent mattis est non arcu vulputate finibus. Vivamus sit amet nunc faucibus velit commodo maximus sit amet quis ipsum. Quisque elementum, nulla sed eleifend blandit, tellus erat suscipit ante, ac efficitur urna arcu ut dolor. Phasellus a arcu accumsan, mattis neque eu, sodales purus." }
          <br/><br/>
          { "Nullam tempor arcu sed porta venenatis. Sed vehicula sapien at dignissim auctor. In sed velit velit. Nulla sed posuere nisi. Etiam aliquet nibh ut lectus cursus consequat. Nam nec leo quis est vestibulum tincidunt id et augue. Vivamus convallis accumsan blandit. Sed sit amet massa mi. Maecenas in convallis turpis, non varius nibh. Nam cursus justo ac turpis elementum, ac luctus nibh aliquam. Nunc suscipit lectus nec porttitor dictum. Aenean a erat semper lacus egestas accumsan eleifend nec odio. Quisque fermentum lorem sodales mi vulputate euismod. Nunc velit nisi, accumsan vitae metus eget, scelerisque ultricies ex. Fusce vel interdum dolor." }
        </span>,
    },
    {
      title: "SEEDs Profile",
      content:
        <span>
          { "Vestibulum sit amet nulla eget dui molestie lobortis sit amet sit amet turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc eu viverra ex, ac finibus diam. Ut ultrices est vel lorem laoreet, id convallis ante tempor. Sed lectus ante, varius sit amet porttitor sollicitudin, porttitor vitae nisi. Mauris ut lorem vitae velit posuere malesuada a dictum risus. Duis sed semper dui. Quisque eleifend euismod odio. Morbi laoreet hendrerit aliquam." }
          <br/><br/>
          { "Duis vehicula ultrices turpis, sit amet accumsan ipsum feugiat eu. Nullam posuere ex quis nibh malesuada sodales. Ut egestas dictum nunc, sed elementum purus sagittis sit amet. Nulla ut ex vel sapien fermentum dapibus. Nulla vulputate, ex et imperdiet faucibus, risus ipsum venenatis justo, nec sagittis nibh orci faucibus sem. Nam condimentum nisl vel laoreet sodales. Sed sit amet ornare elit. Donec finibus viverra turpis non rhoncus. Maecenas varius ante leo, non rutrum erat aliquam a. Fusce elementum ut elit id pretium. Pellentesque placerat dolor at tortor finibus pharetra. Fusce sed aliquet ex, nec lacinia sem. Donec odio magna, placerat sed ipsum a, mattis commodo justo. Duis porta id ipsum vulputate bibendum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce lacinia placerat purus sit amet elementum." }
          <br/><br/>
          { "Curabitur interdum mauris ligula, et facilisis lorem rhoncus in. Aenean euismod turpis et urna fermentum viverra. Nam est magna, luctus eu convallis ut, feugiat a tortor. Duis sit amet rhoncus mi, tempor porta magna. Maecenas vitae ullamcorper arcu. Nunc sollicitudin hendrerit blandit. Sed aliquet urna mauris, eu viverra turpis elementum ac. Nunc ac varius ipsum. Suspendisse potenti. Praesent molestie nulla non lacus laoreet consequat. Vivamus pellentesque mattis neque ac suscipit. Phasellus aliquam ligula libero, in euismod diam hendrerit ut. Nullam in metus euismod, placerat lacus et, tempus quam." }
        </span>,
    },
    {
      title: "SEEDs Analytics",
      content:
        <span>
          { "Quisque iaculis lectus dui, id ultrices arcu viverra nec. Maecenas non feugiat velit. Suspendisse at lectus rutrum, scelerisque lectus a, sagittis mauris. Curabitur consectetur interdum lobortis. Mauris sit amet leo mollis, hendrerit ligula vel, hendrerit sem. Quisque molestie vestibulum ligula vitae posuere. Morbi auctor nunc at erat aliquam consequat. Integer et mi eget ante pellentesque fringilla sit amet nec nisi." }
          <br/><br/>
          { "Morbi suscipit imperdiet sapien facilisis ornare. Nam cursus sapien vitae euismod viverra. Ut sit amet tempor velit. Ut sed placerat mi, eget semper nunc. Pellentesque pharetra augue at condimentum placerat. Ut euismod, quam sit amet vulputate rhoncus, erat enim iaculis sem, et pellentesque nisi lacus ac magna. Maecenas condimentum volutpat sollicitudin. Fusce tempus arcu vel nisl tristique, sed vestibulum dui aliquam. Proin id nulla eu elit elementum posuere quis sit amet risus. Quisque tempor pulvinar tortor vel cursus. Praesent laoreet turpis ut bibendum volutpat. Donec justo urna, vestibulum eu placerat at, hendrerit aliquet odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos." }
          <br/><br/>
          { "Maecenas auctor urna nec velit blandit, interdum posuere massa gravida. Nulla sit amet quam posuere, dapibus urna non, lobortis justo. Cras vel risus ac massa lobortis scelerisque et sed felis. Nulla maximus mattis enim vel iaculis. Nullam hendrerit bibendum nisl, et ullamcorper purus accumsan sit amet. Suspendisse id enim ullamcorper erat viverra molestie. Aenean varius eleifend fringilla. Maecenas quis enim feugiat, vulputate eros vel, consectetur augue. Cras consectetur nibh ut ullamcorper convallis." }
        </span>,
    },
  ];

  React.useEffect(function () {  
    setAppBarValue("/about");
  }, []);
  
  return (
    <Grid id = "page-about" className = { styles.pageAbout } container>
      <Carousel interval = { "8000" }>
        {
          items.map(function (item, index) {
            return (
              <Grid key = { index } className = { "page-about-item" } item container>
                <Grid item>
                  <span>{ item.title }</span>
                </Grid>
                <Grid item>
                  <span>{ item.content }</span>
                </Grid>
              </Grid>
            );
          })
        }
      </Carousel>
    </Grid>
  );
}
