import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import AccountSettingsPage from '../Pages/AccountSettingsPage';
import InfluencerPage from '../Pages/InfluencerPage';

const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/settings': AccountSettingsPage,
  '/influencer': InfluencerPage,
};

export default routes;
