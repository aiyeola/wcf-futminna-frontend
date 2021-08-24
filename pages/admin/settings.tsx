import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
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
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';

import Admin from '@layouts/Admin';
import { boxShadow } from '@styles/jss';
import SettingsDialog from '@components/SettingsDialog';
import { useAllAdmin, useRevokeAccess, useSignUp } from '@api/index';
import SnackBar, { SnackBarStateProps } from '@components/SnackBar';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface State {
  username: string;
  password: string;
  confirmPassword: string;
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

const useStyles = makeStyles((theme: Theme) => ({
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
  tableRoot: {
    minHeight: '74vh',
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
  margin: {
    marginBottom: theme.spacing(3),
  },
  textField: {
    width: '15rem',
  },
  root: {
    height: '74vh',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpButton: {
    background: '#ffcc66',
    color: '#fff',
    fontWeight: 600,
  },
}));

function Settings() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [adminUsername, setAdminUsername] = useState<string>('');
  const [values, setValues] = useState<State>({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [alert, setAlert] = useState<SnackBarStateProps>({
    open: false,
    message: '',
    backgroundColor: '',
  });

  const { mutate: revokeAccess, data: revokeResponse } = useRevokeAccess();

  const { data } = useAllAdmin();

  const {
    mutate: signup,
    isLoading,
    isSuccess,
    isError,
    error,
    data: signUpData,
  } = useSignUp();

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

  const handleInputChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleUsernameInputChange: React.ChangeEventHandler<HTMLInputElement> =
    (e) => setUsername(e.target.value);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { username, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: 'Password mismatch',
        backgroundColor: theme.palette.error.main,
      });
      setValues({ username: '', password: '', confirmPassword: '' });
    } else {
      const registerDetails = {
        username,
        password,
      };

      console.log('registerDetails: ', registerDetails);
      signup(registerDetails);
    }
  };

  useEffect(() => {
    if (revokeResponse) {
      setAlert({
        open: true,
        message: revokeResponse.message,
        backgroundColor: theme.palette.success.main,
      });
    }
  }, [revokeResponse]);

  useEffect(() => {
    if (isError) {
      //@ts-ignore
      if (error.response) {
        setAlert({
          open: true,
          //@ts-ignore
          message: error.response.data.message,
          backgroundColor: theme.palette.error.main,
        });
        setValues({ username: '', password: '', confirmPassword: '' });
      }
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      setAlert({
        open: true,
        message: signUpData.message,
        backgroundColor: theme.palette.success.main,
      });
      setValues({ username: '', password: '', confirmPassword: '' });
    }
  }, [isSuccess]);

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
        <Tab label="Register" {...a11yProps(1)} />
      </Tabs>
      <div className={classes.background}>
        <TabPanel value={value} index={0}>
          <TableContainer className={classes.tableRoot}>
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

        <TabPanel value={value} index={1}>
          <div className={classes.root}>
            <form onSubmit={handleSubmit}>
              <div className={classes.margin}>
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <OutlinedInput
                    id="username"
                    value={values.username}
                    onChange={handleInputChange('username')}
                    aria-describedby="username"
                    labelWidth={80}
                    required
                  />
                </FormControl>
              </div>

              <div className={classes.margin}>
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    type="password"
                    value={values.password}
                    onChange={handleInputChange('password')}
                    aria-describedby="password"
                    required
                    labelWidth={75}
                  />
                </FormControl>
              </div>

              <div className={classes.margin}>
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="password">Confirm Password</InputLabel>
                  <OutlinedInput
                    id="confirm-password"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleInputChange('confirmPassword')}
                    aria-describedby="confirm-password"
                    required
                    labelWidth={147}
                  />
                </FormControl>
              </div>

              <div>
                <Button
                  type="submit"
                  className={classes.signUpButton}
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress /> : 'Submit'}
                </Button>
              </div>
            </form>
          </div>
        </TabPanel>
      </div>

      <SettingsDialog
        open={open}
        handleClose={handleClose}
        username={username}
        adminUsername={adminUsername}
        handleInputChange={handleUsernameInputChange}
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
