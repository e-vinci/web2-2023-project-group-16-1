import { clearAuthenticatedUser } from '../../utils/auths';
import { clearPage } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const logoutPage = () => {
  clearPage();

  clearAuthenticatedUser();

  Navbar();
  Navigate('/login');
};

export default logoutPage;
