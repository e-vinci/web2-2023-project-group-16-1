import { register } from '../../Domain/UserLibrary';

const RegisterPage = () => {
  const html = `<div class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form class="card-body">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input id="emailreg" type="email" placeholder="email" class="input input-bordered" required />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Username</span>
          </label>
          <input id="usernamereg" placeholder="username" class="input input-bordered" required />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input id="pwdreg" type="password" placeholder="password" class="input input-bordered" required />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Password confirm</span>
          </label>
          <input id="pwdConfirmreg" type="password" placeholder="password confirm" class="input input-bordered" required />
        </div>
        <div>
          <label for="gdprCheckbox">
            <input type="checkbox" id="gdprCheckbox"> I agree to the GDPR rules
          </label>
        </div>

        <div id="errordiv">
        </div>
          
        <div class="form-control mt-6">
          <button id="register" class="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
  </div>
</div>`;
  const main = document.querySelector('main');
  main.innerHTML = html;

  register();
};

export default RegisterPage;
