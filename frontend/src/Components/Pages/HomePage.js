const HomePage = () => {
  const html = `
  <div class="grid grid-cols-4">
    <div class="px-2 py-10 column-span-1">
      <input type="text" id="search_bar" placeholder="Search" class="input input-bordered w-full max-w-xs" />

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

            <div class="p-4">
              <div>
                <input type="radio" class="form-radio h-5 w-5 text-blue-600" name="social_networks" value="option1"   checked>
                <span class="ml-2">Twitter</span>
              </div>
              <div>
                <input type="radio" class="form-radio h-5 w-5 text-blue-600" name="social_networks" value="option2">
                <span class="ml-2">Instagram</span>
              </div>
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
    <div id="feed" class ="col-span-3 py-10 px-5" >
    <a class="twitter-timeline" data-lang="en" data-width="1000" data-height="1000" data-theme="dark" href="https://twitter.com/ZeratoR?ref_src=twsrc%5Etfw">Tweets by ZeratoR</a> 
    </div>
  </div>`
  
  const main = document.querySelector('main');
  main.innerHTML = html;

  // homeInfo()
};

export default HomePage;
