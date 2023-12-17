import { influencerInfo } from '../../Domain/InfluencerLibrary';
import { clearPage } from '../../utils/render';
import { searchBar } from './HomePage';
import Navbar from '../Navbar/Navbar';
  
const InfluencerPage = () => {
  clearPage();

  const html = `
  <div class ='grid grid-cols-4 px-2 py-10'>
    <div>  
      <input type="text" id="search_bar" placeholder="Search" class="bg-white border col-span-1 input input-bordered w-full max-w-xs" />
      <div id="resultSearch">
      
      </div>
    </div>
    <div class="col-span-2 max-w-3xl mx-auto p-8 bg-white rounded-lg px-5 py-5 text-center">

      

      <div id="influencerName" class ="p-5 text-4xl font-bold mb-2">

      </div>

      <div id="description" class="p-20 text-lg text-gray-600 mb-4">
            
      </div>

      <div id="platforms">
            
      </div>
    </div>
  </div>
`;

  const main = document.querySelector('main');
  main.innerHTML = html;

  const influencerId = new URLSearchParams(window.location.search).get('id');
  influencerInfo(influencerId);

  searchBarSetup()
  Navbar();

  async function searchBarSetup(){
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

    searchBar(influencersList);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('error: ', err);
  }
  }
};

export default InfluencerPage;
