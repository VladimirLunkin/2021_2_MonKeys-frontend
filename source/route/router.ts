import { route, Routes } from './routes.js'
import AuthStore from '../store/authStore.js'

class Router {
    private routes: route[]

    constructor(routes) {
        this.routes = routes;
    }

    go(route: string) {
        if (route) {
            window.history.pushState({},'',route);
            
        }
        const $root = document.getElementById('app');
        const location = route;
        if(this.routes[location]){
            if(this.routes[location].auth && AuthStore.get().loggedIn){
                const currentView = new this.routes[location].view($root);
                window.document.title = this.routes[location].name;
                currentView.render()
            } else if (this.routes[location].auth && !AuthStore.get().loggedIn){
                const currentView = new this.routes['/login'].view($root);
                window.document.title = this.routes[location].name;
                window.history.pushState({},'','/login');
                currentView.render()
            } else {
                const currentView = new this.routes[route].view($root);
                window.document.title = this.routes[location].name;
                window.history.pushState({},'', route);
                currentView.render()
            }
        } else {
            // console.log(this.routes['/404'])
            window.location.pathname = '/404'; 
        }
    }
}

export default new Router(Routes);