import { useRouter } from 'next/router';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Link from '@components/Link';
import { transition } from '@styles/jss';

const useStyles = makeStyles({
  drawerPaper: {
    width: 260,
    background: '#f3e5e5',
    border: 'none',
    ...transition,
  },
  sidebarWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  img: {
    width: 100,
    height: 100,
    marginTop: 50,
    borderRadius: 50,
    boxShadow: '2px 5px 10px rgb(0 0 0 / 30%)',
  },
  list: {
    marginTop: '3rem',
  },
  listItem: {
    marginBottom: '1rem',
    ...transition,
    '&:hover,&:focus': {
      background: '#fff',
      borderRadius: 6,
      opacity: '.8',
    },
  },
  item: {
    color: '#000',
  },
  activeLink: {
    background: '#fff',
    borderRadius: 6,
    opacity: '.8',
  },
});

export default function Sidebar(props) {
  const router = useRouter();

  const classes = useStyles();

  function activeRoute(routeName) {
    return router.route.indexOf(routeName) === 0 ? true : false;
  }

  const links = (
    <List className={classes.list}>
      {props.routes.map((route, index) => {
        const activeClassName = clsx({
          [classes.activeLink]: activeRoute(`${route.layout}${route.path}`),
        });

        return (
          <ListItem
            button
            key={`${route.name}-${index}`}
            component={Link}
            href={`${route.layout}${route.path}`}
            className={clsx(classes.listItem, activeClassName)}
          >
            <ListItemIcon>
              <route.icon className={classes.item} />
            </ListItemIcon>
            <ListItemText primary={route.name} className={classes.item} />
          </ListItem>
        );
      })}
    </List>
  );
  return (
    <>
      <Hidden smDown implementation="css">
        <Drawer
          open
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.sidebarWrapper}>
            <Link href="/admin/dashboard">
              <img src="/images/logo.jpg" alt="logo" className={classes.img} />
            </Link>
            {links}
          </div>
        </Drawer>
      </Hidden>

      <Hidden mdUp implementation="css">
        <Drawer
          anchor="right"
          variant="temporary"
          open={props.open}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className={classes.sidebarWrapper}>
            <Link href="/admin/dashboard">
              <img src="/images/logo.jpg" alt="logo" className={classes.img} />
            </Link>
            {links}
          </div>
        </Drawer>
      </Hidden>
    </>
  );
}
