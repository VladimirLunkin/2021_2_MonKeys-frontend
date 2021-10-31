/**
 * Здесь прописаны все возможные пути для роутера
 */

import LoginView from '../views/loginView.js';
import SignupView from '../views/signupView.js';
import EditView from '../views/editView.js';
import SignupEditView from '../views/signupEditView.js';
import ProfileView from '../views/profileView.js';
import LikesView from '../views/likesView.js';
import FeedView from '../views/feedView.js';
import ChatView from '../views/chatView.js';
import PageNotFoundView from '../views/pageNotFoundView.js';
import { userStatus } from '../constants/userStatus.js';

export interface route {
    readonly name: string;
    readonly path: string;
    readonly view?;
    readonly auth: number;
}

export const Routes = {
    '/': {
        name: 'Drip',
        auth: userStatus.notlLoggedIn,
        view: LoginView,
    },
    '/login': {
        name: 'Вход',
        path: userStatus.notlLoggedIn,
        auth: false,
        view: LoginView,
    },
    '/signup': {
        name: 'Регистрация',
        path: userStatus.notlLoggedIn,
        auth: false,
        view: SignupView,
    },
    '/edit': {
        name: 'Редактирование',
        path: '/edit',
        auth: userStatus.loggedIn,
        view: EditView,
    },
    '/signup-edit': {
        name: 'Редактирование',
        path: '/signup-edit',
        auth: userStatus.Signup,
        view: SignupEditView,
    },
    '/feed': {
        name: 'Лента',
        path: '/feed',
        auth: userStatus.loggedIn,
        view: FeedView,
    },
    '/matches': {
        name: 'Мэтчи',
        path: '/matches',
        auth: userStatus.loggedIn,
        view: LikesView,
    },
    '/profile': {
        name: 'Профиль',
        path: '/profile',
        auth: userStatus.loggedIn,
        view: ProfileView,
    },
    '/chat': {
        name: 'Чаты',
        path: '/chat',
        auth: userStatus.loggedIn,
        view: ChatView,
    },
    '/404': {
        name: 'Страница не найдена',
        path: '/404',
        auth: userStatus.loggedIn,
        view: PageNotFoundView,
    },
};