import format from 'date-fns/format';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';

const useStyles = makeStyles({
  date: {
    marginRight: '.8rem',
  },
  userRole: {
    display: 'inline-flex',
    background: '#fff',
    padding: '.5rem .5rem',
    borderRadius: 6,
  },
});

export default function AdminNavbarLinks() {
  const classes = useStyles();

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      <Typography className={classes.date}>
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
        <Typography className={classes.date}>Admin</Typography>
      </div>
    </div>
  );
}
