import './App';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from '../Store';
import React from 'react';
import {App} from './App';
import {EVENTS} from '../interfaces';

export interface ObserverCallback<T> {
    (payload: T): void;
}

export interface Observer<T> {
    event: EVENTS;
    callback: ObserverCallback<T>;
}

class UI {
    observers: Observer<any>[];
    canvas!: HTMLCanvasElement;

    constructor() {
        this.observers = [];
    }

    init(id: string, canvas: HTMLCanvasElement) {
        const container = document.getElementById(id);
        this.canvas = canvas;

        if (container) {
            const root = createRoot(container);

            root.render(
                <Provider store={store.getStore()}>
                    <App />
                </Provider>,
            );
        }
    }

    addEventListener<T>(event: EVENTS, callback: ObserverCallback<T>) {
        this.observers.push({event, callback});
    }

    removeEventListener(callback: Function) {
        this.observers = this.observers.filter(
            (observer) => observer.callback !== callback,
        );
    }

    dispatchEvent<T>(event: EVENTS, payload?: T) {
        this.observers.forEach((observer) => {
            if (observer.event === event) {
                observer.callback(payload);
                console.log(`%c%O ${event}`, 'color: #4287f5', payload);
            }
        });
    }
}

export const ui = new UI();
