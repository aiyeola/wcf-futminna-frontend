import { useState, useEffect, useRef } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

import routes from 'routes';
import SideBar from '@components/SideBar';
import NavBar from '@components/NavBar';
import { drawerWidth, transition, container } from '@styles/jss';

type Props = { children: React.ReactElement };

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: '100vh',
  },
  mainPanel: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      float: 'right',
    },
    background: '#f3e5e5',
    position: 'relative',
    overflow: 'auto',
    minHeight: '100vh',
    maxHeight: '100%',
    ...transition,
    ...container,
  },
  content: {
    marginTop: 70,
    padding: '30px 0px',
    [theme.breakpoints.up('md')]: {
      padding: '30px 10px',
    },
  },
}));

let ps;

export default function Admin({ children }: Props) {
  const classes = useStyles();

  const mainPanel = useRef();

  const [mobileOpen, setMobileOpen] = useState(false);

  // initialize and destroy the PerfectScrollbar plugin
  useEffect(() => {
    if (navigator.platform.includes('Win')) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
      });
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('resize', resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.includes('Win')) {
        ps.destroy();
      }
      window.removeEventListener('resize', resizeFunction);
    };
  }, [mainPanel]);

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.wrapper}>
      <SideBar
        routes={routes}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <NavBar handleDrawerToggle={handleDrawerToggle} />
        <div className={classes.content}>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
