import {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index';

export const todoAddedReducer = <T>(
    state: RootState,
    action: PayloadAction<T>,
) => {
    state.test.push(action.payload);
};
