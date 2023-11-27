// eslint-disable-next-line no-unused-vars
/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */

const Navbar = () => {
  const navbarWrapper = document.querySelector('#navbarWrapper');
  const navbar = `
  <div class="navbar bg-base-100">
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl">SocialSync</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
      <li><a href="#" data-uri="/">Home</a></li>
      <li><a href="#" data-uri="/login">Login</a></li>
      <li><a href="#" data-uri="/register">Register</a></li>
    </ul>
  </div>
</div>
  `;
  navbarWrapper.innerHTML = navbar;
};

export default Navbar;
