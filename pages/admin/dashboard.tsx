import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Admin from '@layouts/Admin';
import PieChart from '@components/Charts/PieChart';
import Table from '@components/Table';

const useStyles = makeStyles({
  background: {
    background: '#fff',
    borderRadius: 6,
    opacity: '.8',
    paddingTop: '2rem',
  },
  pieChart: {
    height: '15rem',
  },
});

function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.background}>
      <Grid container justify="space-around" alignItems="center">
        <Grid item xs={12} sm={6}>
          <PieChart
            labels={['Male', 'Female']}
            values={[30, 70]}
            className={classes.pieChart}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PieChart
            labels={['Bosso', 'G.K.']}
            values={[45, 50]}
            className={classes.pieChart}
          />
        </Grid>
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

Dashboard.getLayout = (page) => <Admin>{page}</Admin>;

export default Dashboard;
