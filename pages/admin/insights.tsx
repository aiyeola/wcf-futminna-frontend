import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Admin from '@layouts/Admin';
import Table from '@components/Table';
import { boxShadow } from '@styles/jss';

const useStyles = makeStyles({
  background: {
    background: '#fff',
    borderRadius: 6,
    opacity: '.8',
    paddingTop: '2rem',
    ...boxShadow,
  },
  pieChart: {
    height: '15rem',
  },
});

function Insights() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div className={classes.background}>
      <Grid container justify="space-around" alignItems="center">
        <Grid
          item
          xs={12}
          sm={6}
          style={{
            marginBottom: matchesXS ? '2rem' : 0,
          }}
        ></Grid>
        <Grid item xs={12} sm={6}></Grid>
      </Grid>

      <div
        style={{
          marginTop: '3rem',
        }}
      >
        <Table />
      </div>
    </div>
  );
}

Insights.getLayout = (page) => <Admin>{page}</Admin>;

export default Insights;
