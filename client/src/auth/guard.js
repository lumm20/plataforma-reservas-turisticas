import { isAuthenticated } from "./token.js";
import { LoginView } from "../views/LoginView.js";

export function requireAuth(viewFunction) {
  return () => {
    if (!isAuthenticated()) {
      LoginView("Debes iniciar sesión para acceder.");
      return;
    }
    viewFunction();
  };
}
