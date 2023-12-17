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
        const msg = await response.json();
        document.getElementById('errordiv').innerText = `${msg}`;
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
    const gdprCheckbox = document.getElementById('gdprCheckbox');

    if (password !== passwordConfirm) {
      document.getElementById('errordiv').innerText = 'The passwords do not match';
    } else if (!gdprCheckbox.checked) {
      document.getElementById('errordiv').innerText = 'You forgot to accept the RGPD !';
    } else {
      // Creation of a new json object
      const newData = {
        email,
        username,
        // password,
      };

      try {
        const options = {
          method: 'POST',
          body: JSON.stringify(newData),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(`/api/auths/register`, options);

        if (!response.ok) {
          const msg = await response.json();
          document.getElementById('errordiv').innerText = `${msg}`;
        } else {
          // clearActive();
          Navigate('/login');
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('error: ', err);
      }
    }
  });
}

export { login, register };
