const HomePage = () => {
  const html = `
  <div class="grid grid-cols-4">
    <div class="px-2 py-10 column-span-1">
      <input type="text" placeholder="Search" class="input input-bordered w-full max-w-xs" />

      <button class="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </button>
      
      <div class="px-2 py-10 w-3/4">
        <div class="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" checked="checked"/> 

          <div class="collapse-title text-xl font-medium">
           Trier par influenceur suivi
          </div>

          <div class="collapse-content"> 
          
          </div>
        </div>

        <div class="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" /> 

          <div class="collapse-title text-xl font-medium">
            Trier par réseau social
          </div>

          <div class="collapse-content space-y-2"> 
            <div>
              <label class="inline-flex items-center">
                <input type="radio" class="form-radio h-5 w-5 text-blue-600" name="options" value="option1">
                <span class="ml-2">Twitter</span>
              </label>
            </div>

            <div>
              <label class="inline-flex items-center">
                <input type="radio" class="form-radio h-5 w-5 text-blue-600" name="options" value="option2">
                <span class="ml-2">Instagram</span>
              </label>
            </div>

          </div>

        </div>

      </div>

    </div>

    <div class ="col-span-3 py-10" >
      <a class="twitter-timeline" data-lang="en" data-width="1000" data-height="1000" data-theme="dark" href="https://twitter.com/ZeratoR?ref_src=twsrc%5Etfw">Tweets by ZeratoR</a> 
    </div>
  </div>`
  
  const main = document.querySelector('main');
  main.innerHTML = html;
};

export default HomePage;
