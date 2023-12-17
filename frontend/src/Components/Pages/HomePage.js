import Navigate from '../Router/Navigate';
import { getAuthenticatedUser, isAuthenticated } from '../../utils/auths';
import Navbar from '../Navbar/Navbar';
import { clearPage } from '../../utils/render';

const HomePage = () => {
  clearPage();

  const html = `
  <div class="grid grid-cols-4">
    <div class="px-2 py-10 column-span-1">
      <div>  
        <input type="text" id="search_bar" placeholder="Search" class="bg-white border input input-bordered w-full max-w-xs" />
        <div id="resultSearch">
          
        </div>
      </div>
      <div class="px-2 py-10 w-6/7">
        <div class="bg-white border rounded">

          <!-- First section -->
          <div class="border-b">
            <div  class="p-4 bg-gray-200">
              Trier par influenceur suivi
            </div>
            <div id="influencer" class="p-4">
              
            </div>
          </div>

          <!-- Second section -->
          <div class="border-b">
            <div class="p-4 bg-gray-200">
              Trier par réseau social
            </div>

            <div id="platforms" class="p-4">

            </div>
          </div>
        </div>


        <!-- Bouton de filtre -->
        <div class ="py-5" >
          <button id="filterbtn" class="btn btn-neutral">Filtrer</button>
        </div>
      </div>
    </div>
    
    <!-- Fil d'actualité -->
    <div id="feed"  class ="col-span-3 py-10 px-5">
      <a id="feedLink" class="twitter-timeline" data-lang="en" data-width="1000" data-height="1000" data-theme="dark"></a> 
    </div>
  </div>`;

  Navbar();

  const main = document.querySelector('main');
  main.innerHTML = html;

  homeInfo();
};

async function homeInfo() {
  let influencersList = [];
  try {
    const options = {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(`${process.env.API_BASE_URL}/dbUtils`, options);

    if (!response.ok) {
      throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    }
    influencersList = await response.json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('error: ', err);
  }

  randomFeed();

  filterInfluencer();
  filterPlatform();

  searchBar(influencersList);

  const btn = document.getElementById('filterbtn');

  btn.addEventListener('click', async (e) => {
    e.preventDefault();

    const radioInputs = document.querySelectorAll('input[type="radio"]');

    const params = {};

    radioInputs.forEach((radioInput) => {
      if (radioInput.checked) {
        const parentDiv = radioInput.closest('div');
        const spanElement = parentDiv.querySelector('span');

        const spanValue = spanElement.innerText;
        if (radioInput.name === 'social_networks') {
          params.platform = spanValue;
        }
        if (radioInput.name === 'influencer') {
          params.influencer = spanValue;
        }
      }
    });

    let inf;

    influencersList.forEach((influencer) => {
      // eslint-disable-next-line no-empty
      if (influencer.nom === params.influencer) {
        inf = influencer;
      }
    });

    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${process.env.API_BASE_URL}/dbUtils/${inf.id_influencer}`, options);

      if (!response.ok) {
        throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
      }
      const influencer = await response.json();

      let index = 0;
      let url;

      influencer.platforms.forEach((platform) => {
        if (platform === params.platform) {
          url = influencer.urls[index];
        }
        index += 1;
      });

      const anchorElement = document.getElementById('feedLink');
      anchorElement.innerText = `${params.platform} by ${params.influencer}`;
      anchorElement.setAttribute('href', `${url}`);

      const div = document.getElementById('feed');
      div.appendChild(anchorElement);
    } catch (err) {
      console.error('error: ', err);
    }
  });
}

// eslint-disable-next-line no-unused-vars
async function randomFeed() {
  if (isAuthenticated()) {
    const user = getAuthenticatedUser();

    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: user.token,
        },
      };
      const response = await fetch(`${process.env.API_BASE_URL}/users/`, options);

      if (!response.ok) {
        throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
      }
      const listSubscription = await response.json();

      const randomNumber = Math.floor(Math.random() * listSubscription.length);
      const influencer = listSubscription[randomNumber];

      createAnchor(influencer);
    } catch (err) {
      console.error('error: ', err);
    }
    // eslint-disable-next-line no-empty
  } else {
    const div = document.getElementById('feed');
    const subdiv = document.createElement('div');
    subdiv.innerText = 'Log in to see a feed';
    subdiv.className =
      'bg-white border-l-4 border-green-500 text-green-700 px-4 py-3 shadow-md rounded-md items-center inline-block rounded animate-wiggle animate-infinite animate-duration-1000 animate-delay-0';
    div.appendChild(subdiv);
  }
}

function createAnchor(influencer) {
  const anchorElement = document.getElementById('feedLink');
  anchorElement.innerText = `${influencer.platform} by ${influencer.influencer}`;
  anchorElement.setAttribute('href', `${influencer.url}`);

  const div = document.getElementById('feed');
  div.appendChild(anchorElement);
}

async function filterInfluencer() {
  try {
    const user = getAuthenticatedUser();

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.token,
      },
    };
    const response = await fetch(`${process.env.API_BASE_URL}/users/`, options);

    if (!response.ok) {
      throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    }
    const listSubscription = await response.json();

    const div = document.getElementById('influencer');

    listSubscription.forEach((subscription) => {
      const subdiv = document.createElement('div');

      const input = document.createElement('input');
      input.className = 'form-radio h-5 w-5 text-blue-600';
      input.type = 'radio';
      input.name = 'influencer';

      const span = document.createElement('span');
      span.innerText = subscription.influencer;
      span.className = 'ml-2';

      subdiv.appendChild(input);
      subdiv.appendChild(span);
      div.appendChild(subdiv);
    });
  } catch (err) {
    console.error('error: ', err);
  }
}

async function filterPlatform() {
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`${process.env.API_BASE_URL}/dbUtils2/`, options);

    if (!response.ok) {
      throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    }
    const listplatform = await response.json();

    const div = document.getElementById('platforms');
    listplatform.forEach((platform) => {
      const subdiv = document.createElement('div');

      const input = document.createElement('input');
      input.className = 'form-radio h-5 w-5 text-blue-600';
      input.type = 'radio';
      input.name = 'social_networks';

      const span = document.createElement('span');
      span.innerText = platform.nom;
      span.className = 'ml-2';

      subdiv.appendChild(input);
      subdiv.appendChild(span);
      div.appendChild(subdiv);
    });
  } catch (err) {
    console.error('error: ', err);
  }

  // eslint-disable-next-line no-unused-vars

  // eslint-disable-next-line no-unused-vars
}

async function searchBar(influencersList) {
  const searchbar = document.getElementById('search_bar');

  searchbar.addEventListener('input', async (e) => {
    e.preventDefault();

    const searchText = searchbar.value;
    const tmplist = [];

    influencersList.forEach((influencer) => {
      if (influencer.nom.toLowerCase().includes(searchText.toLowerCase())) {
        tmplist.push(influencer);
      }
    });
    const divresultSearch = document.getElementById('resultSearch');
    divresultSearch.className = 'py-2 px-1';
    while (divresultSearch.firstChild) {
      divresultSearch.removeChild(divresultSearch.firstChild);
    }

    let index = 0;
    tmplist.forEach((influencer) => {
      if (index < 3) {
        const divSubResultSearch = document.createElement('div');
        const btnInfluencer = document.createElement('button');
        btnInfluencer.innerText = influencer.nom;
        btnInfluencer.className = 'bg-white border border-gray-200 p-3';

        addEventListener(btnInfluencer, influencer);

        divSubResultSearch.appendChild(btnInfluencer);
        divresultSearch.appendChild(divSubResultSearch);
      }
      index += 1;
    });
  });
}

async function addEventListener(btnInfluencer, influencer) {
  btnInfluencer.addEventListener('click', async (e) => {
    e.preventDefault();

    Navigate(`/influencer?id=${influencer.id_influencer}`);
  });
}

export { searchBar };
export default HomePage;
