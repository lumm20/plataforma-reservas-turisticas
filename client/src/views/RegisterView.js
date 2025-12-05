import { register } from "../auth/authService.js";
import { render } from "../utils/render.js";

export function RegisterView(msg=''){
    render(`
        <div class="container">
            <h1>Registro</h1>
            ${msg ? `<p style="color:red;">${msg}</p>` : ""}
            <form id="registerForm">
                <div class="form-group">
                    <label>Nombre completo</label>
                    <input type="text" id="name" required>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="email" required>
                </div>

                <div class="form-group">
                    <label>Contraseña</label>
                    <input type="password" id="password" required>
                </div>

                <div class="form-group">
                    <label>Confirmar contraseña</label>
                    <input type="password" id="confirmPassword" required>
                </div>

                <div class="form-group">
                    <label>Rol</label>
                    <select id="role">
                        <option value="cliente">Cliente</option>
                        <option value="proveedor">Proveedor</option>
                    </select>
                </div>

                <!-- Campo extra del proveedor -->
                <div id="providerFields" style="display:none;">
                    <div class="form-group">
                        <label>Tipo de servicio</label>
                        <select id="service_type">
                            <option value="">Selecciona una categoría</option>
                            <option value="guia_turistico">Guía Turístico</option>
                            <option value="artesano">Artesano</option>
                            <option value="chef">Chef / Gastronomía</option>
                            <option value="instructor">Instructor / Actividades</option>
                            <option value="cultura">Actividad Cultural</option>
                            <option value="recreativo">Actividad Recreativa</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>
                </div>
                
                <button type="submit">Registrarse</button>
            </form>

            <p id="response"></p>

            <div class="link-group">
                <p>¿Ya tienes cuenta? <a href="/login" data-link>Inicia sesión aquí</a></p>
            </div>
        </div>
    `);

    document.getElementById("registerForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        // const data = new FormData(e.target);
        const data = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            confirmPassword: document.getElementById("confirmPassword").value,
            role: document.getElementById("role").value,
        };

        if (data.role === "proveedor") {
            data.service_type = document.getElementById("service_type").value;
        }
        try {
          await register(data);
          history.pushState(null, null, "/");
          location.reload();
        } catch (err) {
          RegisterView(err.message);
        }
      });
}