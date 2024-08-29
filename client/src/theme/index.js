import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  typography: {
    h3: {
     fontFamily: 'LeagueSpartan'
    }, h6: {
      fontFamily: 'LeagueSpartan'
     }
  }, palette: {
    primary: {
      main: '#1b798e'
    }, secondary: {
      main: '#0d3c47'
    }
  },
});

export default theme;