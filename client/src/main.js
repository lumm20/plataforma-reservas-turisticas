import { initRouter } from './router/router.js';
import { renderNav } from './components/Nav.js'
import './styles/main.css';
import './styles/style.css';
import './styles/nav.css';

document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  initRouter();
});

