import { setAuthenticatedUser } from "../../utils/auths";
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';


const LoginPage = () => {
    const login = `<div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Login now!</h1>
        <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input id="email" type="email" placeholder="email" class="input input-bordered" required />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input id="password" type="password" placeholder="password" class="input input-bordered" required />
            <label class="label">
              <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary" id="loginbtn">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>`
    const main = document.querySelector('main');
    main.innerHTML = login;

    const btn = document.getElementById("loginbtn");
    btn.addEventListener("click", async(e) =>{
      e.preventdefault();
      
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const newData={
        email,
        password
      }

      try {
        const options = {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          body: JSON.stringify(newData),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const reponse = await fetch(`/api/auths/login`, options);
        if (!reponse.ok) {
                    throw new Error(
            // eslint-disable-next-line no-irregular-whitespace
            `fetch error : ${reponse.status} : ${reponse.statusText}`,
          );
        }

        const user = await reponse.json();

        // sets the Authenticated user to the actual user
        await setAuthenticatedUser(user);

        // reloads Navbar (display is different when user logged in)
        await Navbar();

        // navigte to homePage
        // clearActive();
        await Navigate('/');
      } catch (err) {
        // eslint-disable-next-line
        console.error('error: ', err);
      }
    });
  }
  
  export default LoginPage;
  