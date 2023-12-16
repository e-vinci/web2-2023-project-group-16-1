import { accountInfo } from '../../Domain/accountLibrary';

const AccountSettingsPage = () => {
  const html = `
  <div class="flex-auto">
    <div class="px-2 py-5">
      <div id="username">
       
      </div>

      <div id="subscriptions">
        <p>You are subscribe too :</p>

      </div>

      <button class="btn btn-primary" id="deleteAcount">delete your acount</button>
      </div>
  </div>`;

  const main = document.querySelector('main');
  main.innerHTML = html;

  accountInfo();
};

export default AccountSettingsPage;
