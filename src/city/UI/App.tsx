import React from 'react';
import {TopBar} from './TopBar';
import {BuildingBar} from './BuildingBar';
import {BuildingControls} from './BuildingControls';

export const App: React.FC = () => {
    return (
        <>
            <TopBar />
            <BuildingBar />
            <BuildingControls />
        </>
    );
};
