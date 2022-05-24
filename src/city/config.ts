import {CONFIG_TYPE} from './interfaces';

export const CONFIG: CONFIG_TYPE = {
    isDebugLayer: false,
    isGridCoords: false,
    isMouseDrag: true,
    ground: {
        width: 30,
        height: 20,
        color: '#888844',
    },
    moveBorders: {
        maxX: 8,
        minX: -8,
        maxZ: 4.7,
        minZ: -7.8,
    },
    camera: {
        alpha: -Math.PI / 2,
        beta: Math.PI / 4,
        radius: 5,
        panDistanceInfluence: 0.1,
    },
};
