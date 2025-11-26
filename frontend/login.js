document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        remember: document.getElementById("remember").checked
    };

    try {
        const res = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const json = await res.json();
        const output = document.getElementById("response");

        if (res.status >= 400) {
            output.innerHTML = `<p style="color:red">${json.error}</p>`;
            return;
        }

        // Login exitoso
        output.innerHTML = `<p style="color:green">${json.message}</p>`;
        
        // Guardar token y datos del usuario
        localStorage.setItem('token', json.token);
        localStorage.setItem('user', JSON.stringify(json.user));

        // Redirigir según el rol después de 1 segundo
        setTimeout(() => {
            if (json.user.role === 'proveedor') {
                window.location.href = 'dashboard-proveedor.html';
            } else {
                window.location.href = 'dashboard-cliente.html';
            }
        }, 1000);

    } catch (e) {
        document.getElementById("response").innerHTML =
            `<p style="color:red">Error de conexión con el servidor</p>`;
    }
});