import {auth} from "../auth/authService.js";
import { loadRoute } from "../router/router.js";
import { render } from "../utils/render";

export function LoginView(msg='') {
  render(`
    <div class="container">
        <h1>Iniciar Sesión</h1>
        ${msg ? `<p style="color:red;">${msg}</p>` : ""}
        <form id="loginForm">
            <div class="form-group">
                <label>Email</label>
                <input type="email" id="email" required>
            </div>

            <div class="form-group">
                <label>Contraseña</label>
                <input type="password" id="password" required>
            </div>

            <div class="form-group checkbox-group">
                <label class="checkbox-label">
                    <input type="checkbox" id="remember">
                    <span>Recordarme (30 días)</span>
                </label>
            </div>
            
            <button type="submit">Iniciar Sesión</button>
        </form>

        <!--p id="response"></p-->

        <div class="link-group">
            <p>¿No tienes cuenta? <a href="/register" data-link>Regístrate aquí</a></p>
        </div>
    </div>
  `);

   document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    // const data = new FormData(e.target);
    const data = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        remember: document.getElementById("remember").checked
    };

    try {
      const ok = await auth.login(data);
      if(ok){
        history.pushState(null, null, "/");
        loadRoute('/');
        // location.reload();
      }
    } catch (err) {
      LoginView(err.message);
    }
  });
}