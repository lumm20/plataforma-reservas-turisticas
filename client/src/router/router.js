import { LoginView } from '../views/LoginView.js';
import { RegisterView } from '../views/RegisterView.js';
import { NotFoundView } from '../views/NotFoundView.js';
import { NewExperienceView } from '../views/NewExperienceView.js';
import { HomeView } from '../views/HomeView.js';
import { requireAuth } from '../auth/guard.js';

const routes = {
    '/': HomeView,
    '/login': LoginView,
    '/register': RegisterView,
    '/experiencies/new': requireAuth(NewExperienceView),
};

export function initRouter() {
    loadRoute(location.pathname);

    document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            const url = e.target.href;

            history.pushState(null, null, url);
            loadRoute(url.replace(location.origin, ""));
        }
    });

    window.onpopstate = () => loadRoute(location.pathname);
}

export function loadRoute(path) {
    const view = routes[path] || NotFoundView;
    view();
}
