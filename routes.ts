import Dashboard from '@material-ui/icons/Dashboard';
import EmojiObjectsRoundedIcon from '@material-ui/icons/EmojiObjectsRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: Dashboard,
    layout: '/admin',
  },
  {
    path: '/insights',
    name: 'Insights',
    icon: EmojiObjectsRoundedIcon,
    layout: '/admin',
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: SettingsRoundedIcon,
    layout: '/admin',
  },
];

export default dashboardRoutes;
