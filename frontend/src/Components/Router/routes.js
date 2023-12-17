import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import AccountSettingsPage from '../Pages/AccountSettingsPage';
import InfluencerPage from '../Pages/InfluencerPage';
import logoutPage from '../Pages/Logout';

const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/settings': AccountSettingsPage,
  '/influencer': InfluencerPage,
  '/logout': logoutPage,
};

export default routes;
