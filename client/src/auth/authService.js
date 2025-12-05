import { setToken, clearToken } from "./token.js";

export async function login(data) {
    const validUser = data.email === "admin@gmail.com" && data.password === "1234";

    if (!validUser) {
        throw new Error("Credenciales inválidas");
    }

    const fakeToken = "abc123TOKEN";
    saveUser(fakeToken, data.email);

    return true;

    // const res = await fetch("http://localhost:3000/api/auth/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(data)
    // });

    // const json = await res.json();

    // if (res.status >= 400) {
    //     throw new Error(json.error);
    // }

    // // Guardar token y datos del usuario
    // saveUser(json.token, json.user);

    // // Redirigir según el rol después de 1 segundo
    // // setTimeout(() => {
    // //     if (json.user.role === 'proveedor') {
    // //         window.location.href = 'dashboard-proveedor.html';
    // //     } else {
    // //         window.location.href = 'dashboard-cliente.html';
    // //     }
    // // }, 1000);

    // return true;
}

export function logout() {
    clearToken();
    localStorage.removeItem('user');
}

export async function register(data) {
    const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const json = await res.json();

    if (res.status >= 400) {
        if (json.errors) {
            throw new Error(json.errors);
        } else {
            throw new Error(json.error);
        }
    }

    saveUser(json.token, json.user);
    return true;
}


function saveUser(token, user){
    setToken(token);
    localStorage.setItem('user', JSON.stringify(user));
}