import {GridMaterial} from 'babylonjs-materials';
import * as BABYLON from 'babylonjs';
import {POSITION_Y} from '../constants';
import {CONFIG} from '../config';

export const paintGridCoords = () => {
    const gridMaterial = new GridMaterial('gridMaterial');

    const ground = BABYLON.MeshBuilder.CreateGround('gridCoords', {
        width: CONFIG.ground.width,
        height: CONFIG.ground.height,
    });

    gridMaterial.gridRatio = 1;

    ground.material = gridMaterial;
    ground.position.y = POSITION_Y.GRID_COORDS;
};
