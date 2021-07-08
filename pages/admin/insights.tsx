import makeStyles from '@material-ui/core/styles/makeStyles';

import Admin from '@layouts/Admin';
import MaterialTable from '@components/MaterialTable';
import { boxShadow } from '@styles/jss';

const useStyles = makeStyles({
  background: {
    background: '#fff',
    borderRadius: 6,
    opacity: '.8',
    ...boxShadow,
  },
});

function Insights() {
  const classes = useStyles();

  return (
    <div className={classes.background}>
      <MaterialTable />
    </div>
  );
}

Insights.getLayout = (page) => <Admin>{page}</Admin>;

export default Insights;
