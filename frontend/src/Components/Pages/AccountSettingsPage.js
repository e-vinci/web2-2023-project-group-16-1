import { accountInfo } from '../../Domain/AccountLibrary';

const AccountSettingsPage = () => {
  const html = `
  <div class="flex-auto">
    <div class="px-5 py-5">
      <div id="username">
       
      </div>

      <div id="subscriptions" class="bg-gray-100 font-bold p-6 py-5 w-1/3">
        <h2 class="text-2xl mb-4">Subscribed Influencers</h2>
      </div>

      <div class="py-5">
        <button class="btn btn-outline btn-error" id="deleteAccount">Delete account</button>
      </div>
    </div>
  </div>`;

  const main = document.querySelector('main');
  main.innerHTML = html;

  accountInfo();
  
};

export default AccountSettingsPage;
