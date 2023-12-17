import { login } from '../../Domain/UserLibrary';
import { clearPage } from '../../utils/render';

const LoginPage = () => {
  clearPage();

  const html = `<div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input id="emaillog" type="email" placeholder="email" class="input input-bordered" required />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input id="pwdlog" type="password" placeholder="password" class="input input-bordered" required />
            <label class="label">
              <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>

          <div id="errordiv">
          </div>

          <div class="form-control mt-6">
            <button class="btn btn-primary" id="loginbtn">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>`;
  const main = document.querySelector('main');
  main.innerHTML = html;

  login();
};

export default LoginPage;
