import {ModelPosition, ModelRotation, ModelScale} from '../../interfaces';

export interface LoadModelsOptions {
    position?: ModelPosition;
    rotation?: ModelRotation;
    scale?: ModelScale;
    meshNames?: string[];
    isMergeMeshes?: boolean;
}
