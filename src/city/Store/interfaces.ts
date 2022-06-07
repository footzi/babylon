import {Model2} from '../interfaces';
import {store} from './index';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export interface State {
    isStartBuilding: boolean;
    models: Model2[];
}
