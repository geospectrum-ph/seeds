import { createMuiTheme } from '@material-ui/core/styles';
import { grey, deepPurple, amber } from '@material-ui/core/colors';




const theme = createMuiTheme({

    palette: {
      primary: {
        main: '#1b798e',
        backgroundColor: amber[500],
        fontFamily: "LeagueSpartan",
  
      },
  
      secondary: {
  
        main: '#0d3c47',
  
        contrastText: '#fffefe',
  
      },
  
    },
  
  });



export default theme;