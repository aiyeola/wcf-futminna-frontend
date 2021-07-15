import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import format from 'date-fns/format';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useCheckUser, useRefreshToken } from '@api/index';
import LoginDialog from '@components/LoginDialog';
import { getRefreshToken } from '@config/index';
import SnackBar, { SnackBarStateProps } from '@components/SnackBar';

const useStyles = makeStyles((theme) => ({
  date: {
    marginRight: '.8rem',
    [theme.breakpoints.down('xs')]: {
      marginRight: '.5rem',
    },
  },
  userRole: {
    display: 'inline-flex',
    background: '#fff',
    padding: '.5rem .5rem',
    borderRadius: 6,
  },
}));

export default function AdminNavbarLinks() {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const [open, setOpen] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const { isError, isSuccess, error, data } = useCheckUser();

  const refreshToken = getRefreshToken();

  const {
    mutate: refreshAccessToken,
    isError: didNotRefresh,
    isSuccess: didRefresh,
    error: refreshError,
    data: refreshData,
  } = useRefreshToken();

  const [alert, setAlert] = useState<SnackBarStateProps>({
    open: false,
    message: '',
    backgroundColor: '',
  });

  useEffect(() => {
    setUsername(localStorage.getItem('username'));
  }, []);

  if (isSuccess) {
    localStorage.setItem('username', data.data.data.username);
  }

  useEffect(() => {
    if (isError) {
      //@ts-ignore
      if (error.response) {
        //@ts-ignore
        if (error.response.data.message.includes('expired')) {
          setOpen(true);
        } else {
          router.push(`login?next=${router.asPath}`);
        }
      }
    }
  }, [isError]);

  if (didNotRefresh) {
    if (refreshError) {
      router.push(
        //@ts-ignore
        `login?next=${router.asPath}&error=${refreshError.response.data.message}`,
      );
    }
  }

  if (didRefresh) {
    setAlert({
      open: true,
      message: refreshData.message,
      backgroundColor: theme.palette.success.main,
    });
    localStorage.setItem('access_token', refreshData.data.accessToken);
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const values = {
      username: localStorage.getItem('username'),
      password,
      refreshToken,
    };
    refreshAccessToken(values);
    setOpen(false);
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setPassword(e.target.value);

  return (
    <>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <Typography
          variant={matchesXS ? 'body2' : 'body1'}
          className={classes.date}
        >
          {format(new Date(), 'do MMMM, yyyy')}
        </Typography>
        <div className={classes.userRole}>
          <Icon
            style={{
              marginLeft: '.3rem',
              marginRight: '.3rem',
            }}
          >
            <PersonRoundedIcon />
          </Icon>
          <Typography className={classes.date}>
            {isSuccess && data.data.data.userRole}
          </Typography>
        </div>
      </div>

      <LoginDialog
        open={open}
        username={username}
        password={password}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />

      <SnackBar
        open={alert.open}
        message={alert.message}
        backgroundColor={alert.backgroundColor}
        onClose={() => setAlert({ ...alert, open: false })}
      />
    </>
  );
}
