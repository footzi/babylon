import {CONFIG_TYPE} from './interfaces';

export const CONFIG: CONFIG_TYPE = {
    isDebugLayer: false,
    isGridCoords: false,
    // isMouseDrag: true,
    ground: {
        width: 30,
        height: 20,
        color: '#888844',
    },
    road: {
        size: 1,
        color: '#808080',
        markup: {
            width: 0.25,
            height: 0.02,
            color: '#FFFFFF',
            defaultCoords: {x: -0.25, y: 0, z: -0.001},
        },
        defaultCoords: {
            y: 0.002,
        },
    },
    camera: {
        alpha: -Math.PI / 2,
        beta: Math.PI / 4,
        radius: 5,
        panDistanceInfluence: 0.1,
        borders: {
            maxX: 8,
            minX: -8,
            maxZ: 4.7,
            minZ: -7.8,
        },
    },
};
