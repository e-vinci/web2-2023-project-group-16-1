import { register } from "../../Domain/UserLibrary";

const RegisterPage = () => {
  const html = `<div class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Register now!</h1>
      <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
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
            <span class="label-text">Password</span>
          </label>
          <input id="pwdreg" type="password" placeholder="password" class="input input-bordered" required />
        </div>
        <div class="form-control mt-6">
          <button id="register" class="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
  </div>
</div>`
    const main = document.querySelector('main');
    main.innerHTML = html;

    register();
  };
  

  export default RegisterPage;
  