import Navigate from '../Components/Router/Navigate';
import Navbar from '../Components/Navbar/Navbar';
import { getAuthenticatedUser, clearAuthenticatedUser } from '../utils/auths';

async function accountInfo() {
  const user = getAuthenticatedUser();

  const div = document.getElementById('username');
  div.innerText = `Hello ${user.username} !`;
  div.className = 'text-2xl font-bold mb-4';

  buttonDelete(user);

  subscription(user);
}

async function buttonDelete(user) {
  const btn = document.getElementById('deleteAccount');

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
    const divSubscriptions = document.createElement('div');
    divSubscriptions.className = 'bg-white rounded shadow-md p-4';

    let index = 1;
    listSubscription.forEach((sub) => {
      const divSubscription = document.createElement('div');
      divSubscription.className = 'mb-4';

      const subscriptionInfluencer = document.createElement('p');
      subscriptionInfluencer.className = 'font-bold';
      subscriptionInfluencer.innerText = `Influencer : ${sub.influencer}`;

      const subscriptionPlatform = document.createElement('p');
      subscriptionPlatform.className = 'text-gray-500';
      subscriptionPlatform.innerText = `Platforms : ${sub.platform}`;

      divSubscription.appendChild(subscriptionInfluencer);
      divSubscription.appendChild(subscriptionPlatform);
      divSubscriptions.appendChild(divSubscription);

      if (listSubscription.length !== index) {
        const subscriptionSeparation = document.createElement('div');
        subscriptionSeparation.className = 'border-t border-gray-200 py-3';
        divSubscriptions.appendChild(subscriptionSeparation);
      }

      index += 1;
    });
    div.appendChild(divSubscriptions);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('error: ', err);
  }
}

// eslint-disable-next-line import/prefer-default-export
export { accountInfo };
