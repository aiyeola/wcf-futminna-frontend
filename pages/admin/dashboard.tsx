import dynamic from 'next/dynamic';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Admin from '@layouts/Admin';
import { boxShadow } from '@styles/jss';
import { useDataGroupByField, useAllData } from '@api/index';
import Card from '@components/DataCard';

const PieChart = dynamic(() => import('@components/Charts/Pie'), {
  ssr: false,
});

const BarChart = dynamic(() => import('@components/Charts/Bar'), {
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
  cardContainer: {
    marginBottom: '2rem',
    padding: '1rem',
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

  const {
    data: unitData,
    isLoading: unitDataIsLoading,
    isSuccess: unitDataIsSuccess,
  } = useDataGroupByField('unit');

  const {
    data: levelData,
    isLoading: levelDataIsLoading,
    isSuccess: levelDataIsSuccess,
  } = useDataGroupByField('level');

  const {
    data: allData,
    isLoading: allDataIsLoading,
    isSuccess: allDataIsSuccess,
  } = useAllData();

  return (
    <div className={classes.background}>
      <Grid container className={classes.cardContainer}>
        <Grid item xs={12} md={6} lg={4}>
          <Card
            label={'Student Records'}
            value={
              allDataIsLoading || !allDataIsSuccess
                ? '----'
                : allData.data.data.total
            }
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card label={'Birthdays this week'} value={'----'} />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card label={'------ ---- ----- ---'} value={'----'} />
        </Grid>
      </Grid>

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
            <PieChart
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
            <PieChart
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

      <Grid
        container
        style={{
          margin: '2rem 0',
        }}
      >
        <Grid item xs={12} sm={6}>
          {unitDataIsLoading || !unitDataIsSuccess ? (
            'Loading...'
          ) : (
            <BarChart data={unitData.data.data} id={unitData.data} />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {levelDataIsLoading || !levelDataIsSuccess ? (
            'Loading...'
          ) : (
            <BarChart data={levelData.data.data} id={levelData.data} />
          )}
        </Grid>
      </Grid>
    </div>
  );
}

Dashboard.getLayout = (page) => <Admin>{page}</Admin>;

export default Dashboard;
