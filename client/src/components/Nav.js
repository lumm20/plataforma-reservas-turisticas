import { logout } from "../auth/authService";
import { isAuthenticated } from "../auth/token";

export function renderNav() {
  document.getElementById("nav").innerHTML = `
    <a href="/" data-link>Home</a>
    ${isAuthenticated()
      ? `
      <a href="/experiencies/new" data-link>New Experience</a>
      <a href="#" id="logoutBtn">Salir</a>
      `
      : `
      <a href="/login" data-link>Login</a>
      <a href="/register" data-link>Register</a>
      ` }
  `;

  if (isAuthenticated()) {
    document.getElementById("logoutBtn").addEventListener("click", () => {
      logout();
      history.pushState(null, null, "/");
      location.reload();
    });
  }
}
