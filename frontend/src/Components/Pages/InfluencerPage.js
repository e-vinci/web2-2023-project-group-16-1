import { influencerInfo } from '../../Domain/InfluencerLibrary';

const InfluencerPage = () => {
  const html = `
    <div class="max-w-3xl mx-auto p-8 bg-white rounded-lg px-5 py-5 text-center">
      <div id="influencerName" class ="p-5 text-4xl font-bold mb-2">

      </div>

      <div id="description" class="p-20 text-lg text-gray-600 mb-4">
            
      </div>

      <div id="platforms">
            
      </div>
    </div>

`;

  const main = document.querySelector('main');
  main.innerHTML = html;

  const influencerId = new URLSearchParams(window.location.search).get('id');

  influencerInfo(influencerId);
};

export default InfluencerPage;
