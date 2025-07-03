import { makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles(function () {
  return ({
    pageTermsOfUse: {
      width: "100%",
      height: "100%",

      display: "flex",
      flexFlow: "column nowrap",
      placeContent: "center center",
      placeItems: "center center",

      background: "var(--color-white)",

      font: "800 72px/1 'Outfit', sans-serif",
      color: "var(--color-black)",

      "& >:nth-of-type(1)": {
        flex: "0 1 auto",
      },
      
      "& >:nth-of-type(2)": {
        flex: "1 1 auto",
      },
    },
  });
});

export default function TermsOfUse() {
  const styles = useStyles();

  return (
    <Grid id = "page-terms-of-use" className = { styles.pageTermsOfUse } container>
      <Grid item>
        <span>{ "Terms of Use" }</span>
      </Grid>
      <Grid item>
        <span>{ "SAMPLE TEXT" }</span>
      </Grid>
    </Grid>
  );
}
