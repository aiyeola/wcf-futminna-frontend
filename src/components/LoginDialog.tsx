import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Link from '@components/Link';

const useStyles = makeStyles((theme: Theme) => ({
  dialogTitle: {
    margin: 0,
    padding: theme.spacing(2),
  },
  dialogContent: {
    margin: 0,
    padding: theme.spacing(2),
  },
  dialogActions: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  button: {
    background: '#ffcc66',
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 16,
  },
  link: {
    color: '#0014ac',
  },
}));

export default function LoginDialog(props) {
  const classes = useStyles();
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Dialog
      onClose={props.handleClose}
      aria-labelledby="login-dialog"
      open={props.open}
      maxWidth="xs"
      fullScreen={fullScreen}
      disableBackdropClick
    >
      <DialogTitle
        id="login-dialog-title"
        disableTypography
        className={classes.dialogTitle}
      >
        <Typography>Session Timeout</Typography>
      </DialogTitle>
      <DialogContent className={classes.dialogContent} dividers>
        <Typography
          style={{
            marginBottom: 16,
          }}
        >
          To continue please enter your password
        </Typography>
        <form onSubmit={props.handleSubmit}>
          <TextField
            value={props.username}
            type="username"
            disabled
            style={{
              marginBottom: 16,
            }}
          />
          <TextField
            autoFocus
            autoComplete="off"
            value={props.password}
            onChange={props.handleInputChange}
            type="password"
            label="Password"
            required
          />
          <Button className={classes.button} type="submit">
            Continue
          </Button>
        </form>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Typography
          component={Link}
          href="/admin/login"
          underline="hover"
          className={classes.link}
        >
          Login as another user?
        </Typography>
      </DialogActions>
    </Dialog>
  );
}
