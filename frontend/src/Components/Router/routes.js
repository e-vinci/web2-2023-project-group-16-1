import GamePage from '../Pages/GamePage';
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import NewPage from '../Pages/NewPage';

const routes = {
  '/': HomePage,
  '/game': GamePage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/new': NewPage,
};

export default routes;
