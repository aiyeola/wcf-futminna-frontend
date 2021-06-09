import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

import NavBarLinks from '@components/NavBar/NavBarLinks';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    paddingTop: '10px',
    transition: 'all 150ms ease 0s',
    position: 'absolute',
  },
  toolBar: {
    alignSelf: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginRight: 0,
      justifyContent: 'space-between',
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <NavBarLinks />
          <Hidden mdUp implementation="css">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={props.handleDrawerToggle}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    </>
  );
}
