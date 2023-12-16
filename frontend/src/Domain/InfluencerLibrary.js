import { getAuthenticatedUser } from '../utils/auths';

async function influencerInfo(influencerId) {
  console.log(influencerId);

  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`/api/dbUtils/${influencerId}`, options);

    if (!response.ok) {
      throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    }
    const influencer = await response.json();

    console.log(influencer);

    const divInfluencerName = document.getElementById('influencerName');

    const subDivInfluencerName = document.createElement('div');
    subDivInfluencerName.innerText = influencer.name;

    divInfluencerName.appendChild(subDivInfluencerName);

    const divDescription = document.getElementById('description');

    const subDivDescription = document.createElement('div');
    subDivDescription.innerText = influencer.description;

    divDescription.appendChild(subDivDescription);

    const { platforms } = influencer;
    const divPlatforms = document.getElementById('platforms');

    const user = getAuthenticatedUser();

    platforms.forEach((platform) => {
      const subDivPlatforms = document.createElement('div');
      subDivPlatforms.innerText = platform;

      const btnPlatform = document.createElement('button');
      btnPlatform.innerText = 'Subscribe';

      btnPlatform.addEventListener('click', async (e) => {
        e.preventDefault();

        try {
          const options2 = {
            method: 'POST',
            body: JSON.stringify({
              influencer: influencer.name,
              platform,
            }),
            headers: {
              'Content-Type': 'application/json',
              Authorization: user.token,
            },
          };

          const response2 = await fetch(`/api/users/subscribe`, options2);

          if (!response2.ok) {
            throw new Error(`fetch error : ${response2.status} : ${response2.statusText}`);
          }
        } catch (err) {
          console.error('error: ', err);
        }
      });

      divPlatforms.appendChild(btnPlatform);
      divPlatforms.appendChild(subDivPlatforms);
    });
  } catch (err) {
    console.error('error: ', err);
  }
}

// eslint-disable-next-line import/prefer-default-export
export { influencerInfo };
