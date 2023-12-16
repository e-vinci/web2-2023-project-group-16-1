import Navigate from '../Components/Router/Navigate';
import Navbar from '../Components/Navbar/Navbar';
import { setAuthenticatedUser } from '../utils/auths';

async function login() {
  const btn = document.getElementById('loginbtn');

  btn.addEventListener('click', async (e) => {
    e.preventDefault();

    try {
      const email = document.getElementById('emaillog').value;
      const password = document.getElementById('pwdlog').value;

      const newData = {
        email,
        password,
      };

      const options = {
        method: 'POST',
        body: JSON.stringify(newData),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(`/api/auths/login`, options);

      if (!response.ok) {
        throw new Error(`Fetch error: ${response.status} - ${response.statusText}`);
      }

      const user = await response.json();

      setAuthenticatedUser(user);

      Navbar();
      Navigate('/');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('error: ', err);
    }
  });
}

async function register() {
  const btn = document.getElementById('register');

  btn.addEventListener('click', async (e) => {
    e.preventDefault();

    // Recovery of all data with id
    const email = document.getElementById('emailreg').value;
    const username = document.getElementById('usernamereg').value;
    const password = document.getElementById('pwdreg').value;
    const passwordConfirm = document.getElementById('pwdConfirmreg').value;

    // Creation of a new json object
    const newData = {
      email,
      username,
      password,
      passwordConfirm,
    };

    try {
      const options = {
        method: 'POST',
        body: JSON.stringify(newData),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const reponse = await fetch(`/api/auths/register`, options);

      if (!reponse.ok) {
        throw new Error(`fetch error : ${reponse.status} : ${reponse.statusText}`);
      }
      // clearActive();
      Navigate('/login');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('error: ', err);
    }
  });
}

export { login, register };
