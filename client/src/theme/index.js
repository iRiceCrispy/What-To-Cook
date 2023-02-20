import { Link } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { blueGrey, deepOrange, purple } from '@mui/material/colors';

export default createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: Link,
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          borderRadius: 4,
        },
      },
    },
  },
  palette: {
    primary: {
      main: purple[300],
    },
    secondary: {
      main: deepOrange[400],
    },
    background: {
      default: blueGrey[50],
    },
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});
