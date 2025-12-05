import { render } from "../utils/render.js";

export function NotFoundView() {
  render(`
    <h1>404</h1>
    <p>La página no existe.</p>
  `);
}