import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
    '& > :not(:first-child)': {
      margin: 0,
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  bolder: {
    fontWeight: 600,
  },
  button: {
    background: '#f85149',
    color: '#fff',
    fontWeight: 600,
    marginTop: 16,
    '&:hover': {
      color: '#f85149',
    },
  },
}));

export default function SettingsDialog(props) {
  const classes = useStyles();
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Dialog
      onClose={props.handleClose}
      aria-labelledby="settings-dialog"
      open={props.open}
      maxWidth="xs"
      fullScreen={fullScreen}
    >
      <DialogTitle
        id="setting-dialog-title"
        disableTypography
        className={classes.dialogTitle}
      >
        <Typography>Are you absolutely sure?</Typography>
        {props.handleClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={props.handleClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent className={classes.dialogContent} dividers>
        <Typography>
          This action <span className={classes.bolder}>cannot</span> be undone.
          This will permanently revoke{' '}
          <span className={classes.bolder}>{props.adminUsername}</span>&#39;s
          access as an admin.
        </Typography>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Typography
          gutterBottom
          align="left"
          style={{
            width: '100%',
          }}
        >
          Please type{' '}
          <span className={classes.bolder}>{props.adminUsername}</span> to
          confirm.
        </Typography>
        <TextField
          autoFocus
          value={props.username}
          onChange={props.handleInputChange}
          style={{
            marginBottom: 16,
          }}
        />
        <Button
          onClick={props.handleClose}
          className={classes.button}
          disabled={props.adminUsername !== props.username}
        >
          I understand the consequences, revoke access
        </Button>
      </DialogActions>
    </Dialog>
  );
}
