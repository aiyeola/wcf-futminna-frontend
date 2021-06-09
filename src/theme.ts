import '@fontsource/poppins';
import grey from '@material-ui/core/colors/grey';

import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[400],
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
  props: {
    MuiLink: {
      underline: 'none',
    },
  },
  overrides: {},
});

theme = responsiveFontSizes(theme);

export default theme;
