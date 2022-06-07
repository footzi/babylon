import {CONFIG_TYPE} from './interfaces';

export const CONFIG: CONFIG_TYPE = {
    // isDebug: true,
    // isGrid: true,
    isMouseDrag: true,
    ground: {
        width: 30,
        height: 20,
        color: '#888844',
        defaultCoords: {y: 0.001},
    },
    light: {
        position: {x: -0.75, y: -2, z: 1},
        intensity: 1.2,
    },
    shadow: {
        mapSize: 2048,
        darkness: 0.6,
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
        // угол поворта
        alpha: -Math.PI / 2,
        // угол наклона
        beta: Math.PI / 4,
        // приблежение / удаление
        radius: 10,
        // уровень чувствительности пан
        panDistanceInfluence: 0.1,
        // зум
        fov: 1,
        fovRatio: 250,
        betaRatio: 300,
        borders: {
            minFov: 0.5,
            // maxBeta: 1.3,
            maxX: 8,
            minX: -8,
            maxZ: 4.7,
            minZ: -7.8,
        },
    },
};
