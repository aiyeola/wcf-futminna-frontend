import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import Admin from '@layouts/Admin';
import { boxShadow } from '@styles/jss';
import SettingsDialog from '@components/SettingsDialog';
import { useAllAdmin, useRevokeAccess } from '@api/index';
import SnackBar, { SnackBarStateProps } from '@components/SnackBar';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...rest } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...rest}
    >
      {value === index && <Grid container>{children}</Grid>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  background: {
    background: '#fff',
    borderRadius: 6,
    opacity: '.8',
    ...boxShadow,
  },
  tabIndicator: {
    background: '#ffcc66',
    height: 3,
    borderRadius: 6,
  },
  table: {
    minWidth: 300,
  },
  button: {
    background: '#ff2020',
    color: '#fff',
    fontWeight: 600,
    width: '100%',
    maxWidth: 150,
    '&:hover': {
      color: '#ff2020',
    },
  },
});

function Settings() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [adminUsername, setAdminUsername] = useState<string>('');

  const [alert, setAlert] = useState<SnackBarStateProps>({
    open: false,
    message: '',
    backgroundColor: '',
  });

  const { mutate: revokeAccess, data: revokeResponse } = useRevokeAccess();

  const { data } = useAllAdmin();

  const handleOpen = (
    _e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    adminUsername: string,
  ) => {
    setOpen(true);
    setAdminUsername(adminUsername);
  };

  const handleClose = () => {
    setOpen(false);
    revokeAccess(adminUsername);
    setUsername('');
  };

  const handleClickBackdrop = () => {
    setOpen(false);
    setUsername('');
  };

  const handleChange = (_: React.ChangeEvent, newValue: number) =>
    setValue(newValue);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setUsername(e.target.value);

  useEffect(() => {
    if (revokeResponse) {
      setAlert({
        open: true,
        message: revokeResponse.message,
        backgroundColor: theme.palette.success.main,
      });
    }
  }, [revokeResponse]);

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="settings"
        TabIndicatorProps={{
          className: classes.tabIndicator,
        }}
      >
        <Tab label="Access" {...a11yProps(0)} />
      </Tabs>
      <div className={classes.background}>
        <TabPanel value={value} index={0}>
          <TableContainer>
            <Table className={classes.table} aria-label="user-role-table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    style={{ width: 90, fontWeight: 600 }}
                  >
                    Username
                  </TableCell>
                  <TableCell style={{ width: 90, fontWeight: 600 }}>
                    Role
                  </TableCell>
                  <TableCell style={{ width: 90 }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {React.Children.toArray(
                  data !== undefined &&
                    data.data.data
                      .filter((data) => data.isAdmin === true)
                      .map((rowData) => (
                        <TableRow>
                          <TableCell>{rowData.username}</TableCell>
                          <TableCell>{rowData.userRole}</TableCell>
                          <TableCell>
                            <Button
                              className={classes.button}
                              onClick={(e) => handleOpen(e, rowData.username)}
                            >
                              Revoke Access
                            </Button>
                          </TableCell>
                        </TableRow>
                      )),
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </div>

      <SettingsDialog
        open={open}
        handleClose={handleClose}
        username={username}
        adminUsername={adminUsername}
        handleInputChange={handleInputChange}
        handleClickBackdrop={handleClickBackdrop}
      />

      <SnackBar
        open={alert.open}
        message={alert.message}
        backgroundColor={alert.backgroundColor}
        onClose={() => setAlert({ ...alert, open: false })}
      />
    </div>
  );
}

Settings.getLayout = (page) => <Admin>{page}</Admin>;

export default Settings;
