import {
    configureStore,
    PayloadAction,
    Store as ReduxStore,
    Slice,
} from '@reduxjs/toolkit';

import {todoAddedReducer} from './reducers';

import {createSlice} from '@reduxjs/toolkit';

export interface State {
    test: number[];
}

export const initialState: State = {
    test: [],
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export class Store {
    store: ReduxStore;
    slice: Slice;

    constructor() {
        this.slice = createSlice({
            name: 'app',
            initialState,
            reducers: {
                todoAdded: todoAddedReducer,
            },
        });

        this.store = configureStore({
            reducer: this.slice.reducer,
        });
    }

    public getStore() {
        return this.store;
    }

    public getActions() {
        return this.slice.actions;
    }

    public getState() {
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

export const {todoAdded} = store.getActions();
