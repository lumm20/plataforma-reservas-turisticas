import { auth } from "../auth/authService.js";
import { token } from "../auth/token";

export function renderNav() {
  document.getElementById("nav").innerHTML = `
    <a href="/" data-link>Home</a>
    ${token.isAuthenticated()
      ? `<a href="#" id="logoutBtn">Salir</a>
      ${auth.getUser().role==='proveedor'?
        `<a href="/experiencies/new" data-link>New Experience</a>`
        :
        `<a href="#" data-link>Experiences</a>`
      }
      `
      : `
      <a href="/login" data-link>Login</a>
      <a href="/register" data-link>Register</a>
      ` }
      
  `;

  if (token.isAuthenticated()) {
    document.getElementById("logoutBtn").addEventListener("click", () => {
      auth.logout();
      history.pushState(null, null, "/");
      location.reload();
    });
  }
}
