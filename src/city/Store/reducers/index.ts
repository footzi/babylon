import {CaseReducer, PayloadAction} from '@reduxjs/toolkit';
import {State} from '../interfaces';
import {LocalStorage} from '../../utils/localStorage';
import {LOCAL_STORAGE_KEYS, Model2} from '../../interfaces';

export const setIsStartBuildingReducer: CaseReducer<
    State,
    PayloadAction<boolean>
> = (state, action) => {
    state.isStartBuilding = action.payload;
};

export const setIsMovingModelReducer = (
    state: State,
    action: PayloadAction<boolean>,
) => {
    state.isMovingModel = action.payload;
};

export const addModelReducer = (
    state: State,
    action: PayloadAction<Model2>,
) => {
    state.models.push(action.payload);

    LocalStorage.set(LOCAL_STORAGE_KEYS.MODELS, state.models);
};

export const removeModelReducer: CaseReducer<State, PayloadAction<string>> = (
    state,
    action,
) => {
    const newModels = state.models.filter(
        (model) => model.id !== action.payload,
    );

    state.models = newModels;
    LocalStorage.set(LOCAL_STORAGE_KEYS.MODELS, newModels);
};

export const changeModelReducer: CaseReducer<State, PayloadAction<Model2>> = (
    state,
    action,
) => {
    const newModels = state.models.map((model) => {
        if (model.id === action.payload.id) {
            return {
                ...action.payload,
            };
        }

        return {...model};
    });

    state.models = newModels;
    LocalStorage.set(LOCAL_STORAGE_KEYS.MODELS, newModels);
};
