import React from 'react';
import {TopBar} from './TopBar';
import {BuildingBar} from './BuildingBar';
import {BuildingControls} from './BuildingControls';
import {ModelInfo} from './ModelInfo';

export const App: React.FC = () => {
    return (
        <>
            <TopBar />
            <BuildingBar />
            <BuildingControls />
            <ModelInfo />
        </>
    );
};
