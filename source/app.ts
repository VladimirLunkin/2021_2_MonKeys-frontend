import EventBus from './dispatcher/eventBus.js';
import router from './route/router.js';
import { InitBus } from './dispatcher/events.js';
import ViewBase from 'views/viewBase.js';

InitBus();

declare global {
    interface Window {
        currentDOM;
        currentView: ViewBase;
    }
}

window.onpopstate = (event) => {
    router.move(window.location.pathname);
};

EventBus.dispatch<string>('user:cookie-requests');
router.go(window.location.pathname);
window.history.pushState('', '', window.location.pathname);