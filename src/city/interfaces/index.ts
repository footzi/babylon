import {AbstractMesh} from '@babylonjs/core';
import {BUILDING_TYPES} from './enums';

export interface Coords {
    x?: number;
    y?: number;
    z?: number;
}

export interface Size {
    width: number;
    height: number;
    depth: number;
}

export interface Model2 {
    type: BUILDING_TYPES;
    path: ModelPath;
    position?: ModelPosition;
    rotation?: ModelRotation;
    scale?: ModelScale;
}

// export interface StateModel {
//     type: BUILDING_TYPES;
//     position?: ModelPosition;
// }

// export interface CreatingBuilding {
//     model: Model2;
//     coords: ElementSize | null;
// }

export interface Model {
    id: number;
    position: ModelPosition;
    path: ModelPath;
    rotation?: ModelRotation;
    scale?: ModelScale;
    animation?: ModelAnimation;
}

export interface ModelPath {
    folder: string;
    fileName: string;
}

export interface ModelPosition {
    coords: Coords;
}

export interface ModelRotation {
    coords: Coords;
}

export interface ModelScale {
    value?: number;
    coords?: Coords;
}

export interface ModelAnimation {
    endCoords: Coords;
    speedTime: number;
}

export interface CityMesh extends AbstractMesh {
    city?: {
        type: BUILDING_TYPES;
    };
}

export interface ElementSize {
    top: number;
    left: number;
    width: number;
    height: number;
}

export interface CONFIG_TYPE {
    isDebug?: boolean;
    isGrid?: boolean;
    isMouseDrag?: boolean;
    ground: {
        width: number;
        height: number;
        color: string;
        defaultCoords: Coords;
    };
    light: {
        position: Coords;
        intensity: number;
    };
    shadow: {
        mapSize: number;
        darkness: number;
    };
    road: {
        size: number;
        color: string;
        markup: {
            width: number;
            height: number;
            color: string;
            defaultCoords: Coords;
        };
        defaultCoords: Coords;
    };
    camera: {
        alpha: number;
        beta: number;
        radius: number;
        panDistanceInfluence: number;
        fov: number;
        fovRatio: number;
        betaRatio: number;
        borders?: {
            minFov: number;
            maxBeta?: number;
            maxX: number;
            minX: number;
            maxZ: number;
            minZ: number;
        };
    };
}

export * from './enums';
