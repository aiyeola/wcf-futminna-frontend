import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { useLogin } from '@api/index';
import SnackBar, { SnackBarStateProps } from '@components/SnackBar';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textField: {
    width: '15rem',
  },
  margin: {
    marginBottom: theme.spacing(3),
  },
  button: {
    background: '#ffcc66',
    color: '#fff',
    fontWeight: 'bold',
    '&:hover': {},
  },
}));

interface State {
  username: string;
  password: string;
  showPassword: boolean;
}

export default function LogIn() {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const [values, setValues] = useState<State>({
    username: '',
    password: '',
    showPassword: false,
  });

  const [alert, setAlert] = useState<SnackBarStateProps>({
    open: false,
    message: '',
    backgroundColor: '',
  });

  const {
    mutate: login,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
  } = useLogin();

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { username, password } = values;
    const loginDetails = {
      username,
      password,
    };

    //@ts-ignore
    login(loginDetails);
  };

  useEffect(() => {
    if (isError) {
      //@ts-ignore
      if (error.message.includes(401)) {
        setAlert({
          open: true,
          message: 'Invalid username or password',
          backgroundColor: theme.palette.error.main,
        });
        setValues({ ...values, username: '', password: '' });
      } else {
        setAlert({
          open: true,
          //@ts-ignore
          message: error?.message,
          backgroundColor: theme.palette.error.main,
        });
      }
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem('access_token', data.data.accessToken);
      localStorage.setItem('refresh_token', data.data.refreshToken);
      router.push('/admin/dashboard');
    }
  }, [isSuccess]);

  useEffect(() => {
    router.prefetch('/admin/dashboard');
  }, []);

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <div className={classes.margin}>
          <FormControl className={classes.textField}>
            <InputLabel htmlFor="username">Username</InputLabel>
            <OutlinedInput
              id="username"
              value={values.username}
              onChange={handleChange('username')}
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
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              aria-describedby="password"
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={75}
            />
          </FormControl>
        </div>

        <div>
          <Button type="submit" className={classes.button} disabled={isLoading}>
            {isLoading ? <CircularProgress /> : 'Submit'}
          </Button>
        </div>
      </form>

      <SnackBar
        open={alert.open}
        message={alert.message}
        backgroundColor={alert.backgroundColor}
        onClose={() => setAlert({ ...alert, open: false })}
      />
    </div>
  );
}
