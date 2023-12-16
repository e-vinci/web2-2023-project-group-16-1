import { influencerInfo } from '../../Domain/InfluencerLibrary';

const InfluencerPage = () => {
  const html = `
  <div class="flex-auto">
    <div class="px-5 py-5">
      <div id="influencerName">

      </div>

      <div id="description">
        
      </div>

      <div id="platforms">
        
      </div>
    </div>
  </div>`;

  const main = document.querySelector('main');
  main.innerHTML = html;

  const influencerId = new URLSearchParams(window.location.search).get('id');

  influencerInfo(influencerId);
};

export default InfluencerPage;
