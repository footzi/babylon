import {
    configureStore,
    createSlice,
    PayloadAction,
    Slice,
    Store as ReduxStore,
} from '@reduxjs/toolkit';

import {addModelReducer, setIsStartBuildingReducer} from './reducers';

import {initialState} from './initialState';
import {LocalStorage} from '../utils/localStorage';
import {LOCAL_STORAGE_KEYS, Model2} from '../interfaces';
import {State} from './interfaces';

export class Store {
    store: ReduxStore;
    slice: Slice;

    constructor() {
        this.slice = createSlice({
            name: 'app',
            initialState: this.getInitialState(),
            reducers: {
                setIsStartBuilding: setIsStartBuildingReducer,
                addModel: addModelReducer,
            },
        });

        this.store = configureStore({
            reducer: this.slice.reducer,
        });
    }

    private getInitialState(): State {
        const models =
            LocalStorage.get<Model2[]>(LOCAL_STORAGE_KEYS.MODELS) ?? [];

        return {
            ...initialState,
            models,
        };
    }

    public getStore() {
        return this.store;
    }

    public getActions() {
        return this.slice.actions;
    }

    public getState(): State {
        return this.store.getState();
    }

    public dispatch<T>(action: PayloadAction<T>) {
        this.store.dispatch(action);
    }

    public subscribe(fn: () => void) {
        this.store.subscribe(fn);
    }
}

export const store = new Store();

export const {setIsStartBuilding, addModel} = store.getActions();

export * from './interfaces';
