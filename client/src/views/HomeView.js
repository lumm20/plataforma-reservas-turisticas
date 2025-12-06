import { getUser } from "../auth/authService";
import { render } from "../utils/render";

export function HomeView(){
    const user= getUser();
    console.log(user);
    render(`
        <h1>Bienvenido ${user?`de nuevo, ${user.name}`:``}</h1>
    `)
}