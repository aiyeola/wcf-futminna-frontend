import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

export default function DataCard({ label, value }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={0}>
      <CardContent>
        <Typography variant="h4" align="center">
          {value}
        </Typography>
        <Typography align="center">{label}</Typography>
      </CardContent>
    </Card>
  );
}
