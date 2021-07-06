import dynamic from 'next/dynamic';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Admin from '@layouts/Admin';
import { boxShadow } from '@styles/jss';
import { useDataGroupByField } from '@api/index';

const Chart = dynamic(() => import('@components/Charts/Pie'), {
  ssr: false,
});

const useStyles = makeStyles({
  background: {
    background: '#fff',
    borderRadius: 6,
    opacity: '.8',
    paddingTop: '2rem',
    ...boxShadow,
  },
  skeletonContainer: {
    paddingTop: '100%',
    position: 'relative',
  },
  skeleton: {
    position: 'absolute',
    top: 64,
    left: 62,
    width: '68%',
    height: '68%',
  },
});

function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const {
    data: genderData,
    isLoading: genderDataIsLoading,
    isSuccess: genderDataIsSuccess,
  } = useDataGroupByField('gender');

  const {
    data: campusData,
    isLoading: campusDataIsLoading,
    isSuccess: campusDataIsSuccess,
  } = useDataGroupByField('campus');

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
        >
          {genderDataIsLoading || !genderDataIsSuccess ? (
            <div className={classes.skeletonContainer}>
              <Skeleton
                variant="circle"
                animation="wave"
                className={classes.skeleton}
              />
            </div>
          ) : (
            <Chart
              title="Gender"
              labels={[
                genderData.data.data[0]._id,
                genderData.data.data[1]._id,
              ]}
              values={[
                genderData.data.data[0].total,
                genderData.data.data[1].total,
              ]}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {campusDataIsLoading || !campusDataIsSuccess ? (
            <div className={classes.skeletonContainer}>
              <Skeleton
                variant="circle"
                animation="wave"
                className={classes.skeleton}
              />
            </div>
          ) : (
            <Chart
              title="Campus"
              labels={[
                campusData.data.data[0]._id,
                campusData.data.data[1]._id,
              ]}
              values={[
                campusData.data.data[0].total,
                campusData.data.data[1].total,
              ]}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
}

Dashboard.getLayout = (page) => <Admin>{page}</Admin>;

export default Dashboard;
