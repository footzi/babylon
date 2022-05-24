import * as BABYLON from 'babylonjs';
import {CONFIG} from '../config';

export const paintGround = () => {
    const ground = BABYLON.MeshBuilder.CreateGround('ground', {
        width: CONFIG.ground.width,
        height: CONFIG.ground.height,
    });

    const groundMaterial = new BABYLON.StandardMaterial('groundMaterial');
    groundMaterial.diffuseColor = new BABYLON.Color3.FromHexString(
        CONFIG.ground.color,
    );

    ground.material = groundMaterial;
    ground.enablePointerMoveEvents = true;
    // ground.position = new BABYLON.Vector3(0, 0, 0);

    return ground;
};
