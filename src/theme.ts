import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme({
  props: {},
  overrides: {},
});

theme = responsiveFontSizes(theme);

export default theme;
