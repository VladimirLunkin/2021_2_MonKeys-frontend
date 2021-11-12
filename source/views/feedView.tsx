import ViewBase from './viewBase.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { Tapbar } from '../components/tapbar.js';
import { CardFeed } from '../components/cardFeed.js';
import { CardExpended } from '../components/cardExpended.js';
import feedStore from '../store/feedStore.js';
import eventBus from '../dispatcher/eventBus.js';
import { OutOfCards } from '../components/outOfCards.js';

import { CritError } from '../components/critError.js';

import TapbarStore from '../store/tapbarStore.js';

export default class FeedView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);

        const cardData = feedStore.get();
        this.updateDataTemaplate(cardData);
        feedStore.subscribe(this.subscribtionCallback, this);
    }

    private updateDataTemaplate(cardData) {
        if (!cardData.outOfCards) {
            this._data.cardData.userData = cardData.profiles[cardData.counter];
            this._data.critError.loading = cardData.apiErrorLoadCondition;
            this._template = this._createTmpl(this._data, cardData.expanded);
        } else {
            this._template = (
                <div class='card-container'>
                    {OutOfCards()}
                    {Tapbar(TapbarStore.get())}
                    {CritError(this._data.critError)}
                </div>
            );
        }
    }
    _data = {
        cardData: {
            userData: feedStore.get().profiles,
            buttons: {
                dislikeButton: {
                    type: 'button',
                    src: 'icons/button_dislike_white.svg',
                    class: 'menu-icon',
                    onclick: () => {
                        eventBus.dispatch('feed:dislike-button');
                    },
                },
                expandButton: {
                    type: 'button',
                    src: 'icons/button_expand_white.svg',
                    class: 'menu-icon',
                    onclick: () => {
                        eventBus.dispatch('feed:expand-button');
                    },
                },
                likeButton: {
                    type: 'button',
                    src: 'icons/tapbar_likes_white_selected.svg',
                    class: 'menu-icon',
                    onclick: () => {
                        eventBus.dispatch('feed:like-button');
                    },
                },
            },
        },
        tapbar: {
            class: 'menu-icon',
        },
        critError: {
            title: 'Ошибка подключения',
            text: 'Не удаётся подключиться к серверу. Проверь подключение к Интернету и попробуй снова.',
            loading: feedStore.get().apiErrorLoadCondition,
        },
    };

    forceRender() {
        const cardData = feedStore.get();
        this._template = this._createTmpl(this._data, cardData.expanded);
        this.render();
    }

    _createTmpl(data, expanded: boolean) {
        if (!expanded) {
            this._data.cardData.buttons.expandButton = {
                type: 'button',
                src: 'icons/button_expand_white.svg',
                class: 'menu-icon',
                onclick: () => {
                    eventBus.dispatch('feed:expand-button');
                },
            };

            return (
                <div class='card-container'>
                    <div class='card3'></div>
                    <div class='card3'></div>
                    <div class='card2'></div>
                    {CardFeed(data.cardData)}
                    {Tapbar(TapbarStore.get())}
                    {CritError(data.critError)}
                </div>
            );
        } else {
            this._data.cardData.buttons.expandButton = {
                type: 'button',
                src: 'icons/button_shrink_white.svg',
                class: 'menu-icon',
                onclick: () => {
                    eventBus.dispatch('feed:shrink-button');
                },
            };
            return (
                <div class='card-container'>
                    <div class='card3'></div>
                    <div class='card3'></div>
                    <div class='card2'></div>
                    {CardExpended(data.cardData)}
                    {Tapbar(data.tapbar)}
                    {CritError(data.critError)}
                </div>
            );
        }
    }

    public unsubscribe() {
        feedStore.unsubscribe(this.subscribtionCallback);
    }

    private subscribtionCallback(data, view) {
        const cardData = feedStore.get();
        view.updateDataTemaplate(cardData);
        view.render();
    }
}
