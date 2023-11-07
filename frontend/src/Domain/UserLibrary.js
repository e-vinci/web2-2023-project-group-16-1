import Navbar from "../Components/Navbar/Navbar";
import Navigate from "../Components/Router/Navigate";
import { setAuthenticatedUser } from "../utils/auths";

async function login() {
const btn = document.getElementById("loginbtn");
    btn.addEventListener("click", async(e) =>{
      e.preventdefault();
      
      const email = document.getElementById("emaillog").value;
      const password = document.getElementById("pwdlog").value;

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


async function register(){
    const btn = document.getElementById('register');
    // const btnLogin = document.getElementById('login');

    /* btnLogin.addEventListener('click', async (e) => {
      e.preventDefault();
      clearActive();
      Navigate('/login');
    });
    */

    // Adding the user after pressing the submit button
    btn.addEventListener('click', async (e) => {
      e.preventDefault();

      // Recovery of all data with id
      // const lastname = document.getElementById('nom').value;
      // const firstname = document.getElementById('prenom').value;
      const email = document.getElementById('emailreg').value;
      const password = document.getElementById('pwdreg').value;
      // const passwordConfirmed = document.getElementById('pwdreg2').value;

      // If values are undifined
      if (
        // lastname.value === undefined ||
        // firstname.value === undefined ||
        email.value === undefined ||
        password.value === undefined // ||
        // passwordConfirmed.value === undefined
      ) {
        // eslint-disable-next-line no-console
        console.log("complete all fields");
      }

      /* if (password !== passwordConfirmed) {
        console.log("passwords dont match");
      }
      */

      // Creation of a new json object
      const newData = {
        // lastname,
        // firstname,
        email,
        password,
        // passwordConfirmed
      };

      try {
        const options = {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          body: JSON.stringify(newData),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const reponse = await fetch(`/api/auths/register`, options);

        if (!reponse.ok) {
          throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
        }
        // clearActive();
        Navigate('/login');
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('error: ', err);
      }
    });
  }


  export {login, register};