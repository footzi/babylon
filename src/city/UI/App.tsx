import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider, useSelector, useDispatch} from 'react-redux';
import {store, todoAdded, RootState} from '../Store';
import {TopBar} from './TopBar';
import {BuildingBar} from './BuildingBar';

export const App: React.FC = () => {
    const state = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(todoAdded(5));
    };

    console.log(state, 'state');

    return (
        <>
            <TopBar />
            <BuildingBar />
            {/*<h1>Hello</h1>*/}
            {/*<button onClick={onClick}>Клик</button>*/}
        </>
    );
};
