import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    fontWeight: 'bold',
    '&:hover': {
      color: '#ff2020',
      background: '#fff',
      outline: '#ff2020',
    },
  },
});

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
function Settings() {
  const classes = useStyles();

  const [value, setValue] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleChange = (_: React.ChangeEvent, newValue: number) =>
    setValue(newValue);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setUsername(e.target.value);

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
                    style={{ width: 250, fontWeight: 'bold' }}
                  >
                    Username
                  </TableCell>
                  <TableCell style={{ width: 100, fontWeight: 'bold' }}>
                    Role
                  </TableCell>
                  <TableCell style={{ width: 137 }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {React.Children.toArray(
                  rows.map((row) => (
                    <TableRow>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.calories}</TableCell>
                      <TableCell>
                        <Button className={classes.button} onClick={handleOpen}>
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
        handleInputChange={handleInputChange}
      />
    </div>
  );
}

Settings.getLayout = (page) => <Admin>{page}</Admin>;

export default Settings;
