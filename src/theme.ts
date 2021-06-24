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
    MuiButton: {
      variant: 'contained',
      disableElevation: true,
      fullWidth: true,
    },
    MuiTextField: {
      variant: 'outlined',
      type: 'text',
      size: 'small',
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
