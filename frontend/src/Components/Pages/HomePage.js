import Navigate from '../Router/Navigate';
import { getAuthenticatedUser, isAuthenticated } from '../../utils/auths';
import Navbar from '../Navbar/Navbar';

const HomePage = () => {
  const html = `
  <div class="grid grid-cols-4">
    <div class="px-2 py-10 column-span-1">
      <div>  
        <input type="text" id="search_bar" placeholder="Search" class="input input-bordered w-full max-w-xs" />
        <div id="resultSearch">
          
        </div>
      </div>
      <div class="px-2 py-10 w-6/7">
        <div class="border rounded">

          <!-- First section -->
          <div class="border-b">
            <div class="p-4 bg-gray-200">
              Trier par influenceur suivi
            </div>
            <div class="p-4">
              <div>
                <input type="radio" class="form-radio h-5 w-5 text-blue-600" name="influencers" value="option1" checked>
                <span class="ml-2">Mister MV</span>
              </div>
              <div>
                <input type="radio" class="form-radio h-5 w-5 text-blue-600" name="influencers" value="option2">
                <span class="ml-2">Zerator</span>
              </div>
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
          <button class="btn btn-neutral">Filtrer</button>
        </div>
      </div>
    </div>

    <!-- Fil d'actualité -->
    <div id="feed"  class ="col-span-3 py-10 px-5">
    
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

    const response = await fetch('/api/dbUtils', options);

    if (!response.ok) {
      throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    }
    influencersList = await response.json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('error: ', err);
  }

  randomFeed();

  filters();

  searchBare(influencersList);
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
      const response = await fetch(`/api/users/`, options);

      if (!response.ok) {
        throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
      }
      const listSubscription = await response.json();

      const randomNumber = Math.floor(Math.random() * listSubscription.length);
      const influencer = listSubscription[randomNumber];

      creatAnchor(influencer);
    } catch (err) {
      console.error('error: ', err);
    }
    // eslint-disable-next-line no-empty
  } else {
    const div = document.getElementById('feed');
    const subdiv = document.createElement('div');
    subdiv.innerText = 'you are not loged in !';
    div.appendChild(subdiv);
  }
}

function creatAnchor(influencer) {
  const anchorElement = document.createElement('a');
  anchorElement.innerText = `${influencer.platform} by ${influencer.influencer}`;
  anchorElement.setAttribute('href', `${influencer.url}`);
  anchorElement.setAttribute('class', `twitter-timeline`);
  anchorElement.setAttribute('data-lang', `en`);
  anchorElement.setAttribute('data-width', `1000`);
  anchorElement.setAttribute('data-height', `1000`);
  anchorElement.setAttribute('data-theme', `dark`);

  const div = document.getElementById('feed');
  div.appendChild(anchorElement);
}

async function filters() {
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`/api/dbUtils2/`, options);

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

      input.addEventListener('click', async (e) => {
        e.preventDefault();

        // get the value and chnage the feed
      });

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

async function searchBare(influencersList) {
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

    while (divresultSearch.firstChild) {
      divresultSearch.removeChild(divresultSearch.firstChild);
    }

    let index = 0;
    tmplist.forEach((influencer) => {
      if (index < 3) {
        const divSubResultSearch = document.createElement('div');
        const btnInfluencer = document.createElement('button');
        btnInfluencer.innerText = influencer.nom;

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

export default HomePage;
