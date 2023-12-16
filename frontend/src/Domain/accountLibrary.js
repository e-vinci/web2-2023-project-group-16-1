import Navigate from '../Components/Router/Navigate';
import Navbar from '../Components/Navbar/Navbar';
import { getAuthenticatedUser, clearAuthenticatedUser } from '../utils/auths';

async function accountInfo() {
  const user = getAuthenticatedUser();

  const div = document.getElementById('username');
  div.innerText = `Hello ${user.username} !`;

  buttunDelet(user);

  subscription(user);
}

async function buttunDelet(user) {
  const btn = document.getElementById('deleteAcount');

  btn.addEventListener('click', async (e) => {
    e.preventDefault();

    try {
      const options = {
        method: 'POST',
        body: JSON.stringify(),
        headers: {
          'Content-Type': 'application/json',
          Authorization: user.token,
        },
      };

      const response = await fetch(`/api/users/deleteUser`, options);

      if (!response.ok) {
        throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
      }
      clearAuthenticatedUser();

      Navbar();
      Navigate('/');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('error: ', err);
    }
  });
}

async function subscription(user) {
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token,
      },
    };
    const response = await fetch(`/api/users/`, options);
    const listSubscription = await response.json();

    const div = document.getElementById('subscriptions');

    listSubscription.forEach((sub) => {
      const divSubscription = document.createElement('div');
      divSubscription.innerText = `influencer: ${sub.influencer} platform: ${sub.platform}`;

      div.appendChild(divSubscription);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('error: ', err);
  }
}

// eslint-disable-next-line import/prefer-default-export
export { accountInfo };
