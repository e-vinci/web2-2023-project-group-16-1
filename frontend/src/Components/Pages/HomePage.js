const HomePage = () => {
  const html = `
  <div class="flex-auto">
    <div class="px-2 py-5">
      <input type="text" placeholder="Search" class="input input-bordered w-full max-w-xs" />
    </div>

    <div>
      <a class="twitter-timeline" data-lang="fr" data-height="1000" data-theme="dark" href="https://twitter.com/ZeratoR?ref_src=twsrc%5Etfw">Tweets by ZeratoR</a> 
    </div>
  </div>`
  
  const main = document.querySelector('main');
  main.innerHTML = html;
};

export default HomePage;
