import { auth } from "../auth/authService.js";
import { render } from "../utils/render.js";

export function HomeView(){
    const user= auth.getUser();
    console.log('user',user);
    render(`
        <h1>Bienvenido ${user?`de nuevo, ${user.name}`:``}</h1>
    `)
}