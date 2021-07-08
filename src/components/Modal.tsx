import { makeStyles, Theme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import format from 'date-fns/format';

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function DataModal(props) {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="data-modal"
      aria-describedby="data-modal-student-records"
      className={classes.modal}
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <Paper className={classes.paper} elevation={0}>
          {Object.keys(props.data).length > 0 && (
            <>
              <Typography>Name: {props.data.name}</Typography>
              <Typography>Level: {props.data.level}</Typography>
              <Typography>Email: {props.data.email}</Typography>
              <Typography>
                Phone Number: {`0${props.data.contactNumber1}`}
              </Typography>
              <Typography>Department: {props.data.department}</Typography>
              <Typography>Gender: {props.data.gender}</Typography>
              <Typography>
                School Address: {props.data.schoolAddress}
              </Typography>
              <Typography>State of Origin: {props.data.origin}</Typography>
              <Typography>Unit: {props.data.unit}</Typography>
              <Typography>Home Address: {props.data.homeAddress}</Typography>
              <Typography>
                Birthday:{' '}
                {format(new Date(props.data.dob.toString()), 'do MMMM')}
              </Typography>
              <Typography>Campus: {props.data.campus}</Typography>
            </>
          )}
        </Paper>
      </Fade>
    </Modal>
  );
}
