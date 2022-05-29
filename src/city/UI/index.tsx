import './App';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from '../Store';
import React from 'react';
import {App} from './App';

export class UI {
    init(id: string) {
        const container = document.getElementById(id);

        if (container) {
            const root = createRoot(container);

            root.render(
                <Provider store={store.getStore()}>
                    <App />
                </Provider>,
            );
        }
    }
}
