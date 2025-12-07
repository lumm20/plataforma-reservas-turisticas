import { token } from "./token.js";

class AuthService{
    #user=null;
    constructor() {}

    async login(data) {
        const res = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    
        const json = await res.json();
    
        if (res.status >= 400) {
            throw new Error(json.error);
        }
    
        // Guardar token y datos del usuario
        this.#saveUser(json.token, json.user);
    
        return true;
    }
    
    logout() {
        token.setToken(null);
        this.#user = null;
    }
    
    async register(data) {
        const res = await fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    
        const json = await res.json();
    
        console.log('json:',json)
        if (res.status >= 400) {
            if (json.errors) {
                const errors = json.errors.map(err=>err.msg);
                throw new Error(errors);
            } else {
                throw new Error(json.error);
            }
        }
    
        this.#saveUser(json.token, json.user);
    }
    
    #saveUser(newToken, userData){
        token.setToken(newToken);
        this.#user = userData;
    }
    
    getUser(){
        // const user= JSON.parse(localStorage.getItem('user'));
        return this.#user;
    }

}

export const auth = new AuthService();