import '@fontsource/poppins';
import '@fontsource/poppins/100.css';
import '@fontsource/poppins/200.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/poppins/900.css';
import grey from '@material-ui/core/colors/grey';

import {
  createMuiTheme,
  responsiveFontSizes,
  Theme,
} from '@material-ui/core/styles';

let theme: Theme = createMuiTheme({
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
    MuiButton: {
      variant: 'contained',
      disableElevation: true,
      fullWidth: true,
    },
    MuiTextField: {
      variant: 'outlined',
      type: 'text',
      size: 'small',
      fullWidth: true,
    },
    MuiFormControl: {
      size: 'small',
      variant: 'outlined',
    },
    MuiCircularProgress: {
      size: 24,
    },
    MuiOutlinedInput: {
      fullWidth: true,
    },
    MuiSnackbar: {
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
    },
  },
  overrides: {
    MuiTab: {
      root: {
        textTransform: 'none',
      },
    },
    MuiButton: {
      root: {
        textTransform: 'none',
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
