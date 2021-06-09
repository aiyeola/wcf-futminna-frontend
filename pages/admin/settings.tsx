import Admin from '@layouts/Admin';

function Settings() {
  return <div>This is the Settings</div>;
}

Settings.getLayout = (page) => <Admin>{page}</Admin>;

export default Settings;
