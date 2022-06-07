import {PayloadAction} from '@reduxjs/toolkit';
import {State} from '../interfaces';
import {LocalStorage} from '../../utils/localStorage';
import {LOCAL_STORAGE_KEYS, Model2} from '../../interfaces';

export const setIsStartBuildingReducer = (
    state: State,
    action: PayloadAction<boolean>,
) => {
    state.isStartBuilding = action.payload;
};

export const addModelReducer = (
    state: State,
    action: PayloadAction<Model2>,
) => {
    state.models.push(action.payload);

    LocalStorage.set(LOCAL_STORAGE_KEYS.MODELS, state.models);
};
