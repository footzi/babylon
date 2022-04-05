import {GridMaterial} from 'babylonjs-materials';
import * as BABYLON from 'babylonjs';
import {GROUND, POSITION_Y} from '../constants';

export const paintGridCoords = () => {
    const gridMaterial = new GridMaterial('gridMaterial');

    const ground = BABYLON.MeshBuilder.CreateGround('gridCoords', {
        width: GROUND.WIDTH,
        height: GROUND.HEIGHT,
    });

    gridMaterial.gridRatio = 1;

    ground.material = gridMaterial;
    ground.position.y = POSITION_Y.GRID_COORDS;
};
