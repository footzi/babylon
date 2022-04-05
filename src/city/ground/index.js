import * as BABYLON from 'babylonjs';
import {GROUND} from '../constants';

export const paintGround = () => {
    const ground = BABYLON.MeshBuilder.CreateGround('ground', {
        width: GROUND.WIDTH,
        height: GROUND.HEIGHT,
    });

    const groundMaterial = new BABYLON.StandardMaterial('groundMaterial');
    groundMaterial.diffuseColor = new BABYLON.Color3.FromHexString(
        GROUND.COLOR,
    );

    ground.material = groundMaterial;
    ground.enablePointerMoveEvents = true;

    return ground;
};
