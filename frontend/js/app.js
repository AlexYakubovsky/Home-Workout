import '../styles/style';

import Utils from './helpers/utils';

import Header from './views/partials/header';
import Menu from './views/partials/menu';
import Footer from './views/partials/footer';

import About from './views/pages/about';
import Account from './views/pages/account';
import Error404 from './views/pages/error404';

import ChoiceTraining from './views/pages/training/choice-training';
import Info from './views/pages/training/info';
import Exercise from './views/pages/training/exercise';

const Routes = {
    '/': About,
    '/training': ChoiceTraining,
    '/training/:id': Info,
    '/training/:id/exercise': Exercise,
    '/account': Account
};

function router() {
    const headerContainer = document.getElementsByClassName('header')[0],
        menuContainer = document.getElementsByClassName('menu')[0],
        contentContainer = document.getElementsByClassName('content')[0],
        footerContainer = document.getElementsByClassName('footer')[0],
        header = new Header(),
        menu = new Menu(),
        footer = new Footer();

    header.render().then(html => {
        headerContainer.innerHTML = html;
        header.afterRender();
    });

    menu.render().then(html => {
        menuContainer.innerHTML = html;
    });

    const request = Utils.parseRequestURL(),
        parsedURL = `/${request.resource || ''}${request.id ? '/:id' : ''}${request.action ? `/${request.action}` : ''}`,
        page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();

    page.getData().then(data => {
        page.render(data).then(html => {
            contentContainer.innerHTML = html;
            page.afterRender(data);
        });
    });

    footer.render().then(html => {
        footerContainer.innerHTML = html;
    });
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);