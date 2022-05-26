import {CONFIG} from '../config';
import {Mesh, Scene, MeshBuilder} from '@babylonjs/core';
import {setMaterial} from '../utils';

// export const paintGround = () => {
//     const ground = BABYLON.MeshBuilder.CreateGround('ground', {
//         width: CONFIG.ground.width,
//         height: CONFIG.ground.height,
//     });
//
//     const groundMaterial = new BABYLON.StandardMaterial('groundMaterial');
//     groundMaterial.diffuseColor = new BABYLON.Color3.FromHexString(
//         CONFIG.ground.color,
//     );
//
//     ground.material = groundMaterial;
//     ground.enablePointerMoveEvents = true;
//     // ground.position = new BABYLON.Vector3(0, 0, 0);
//
//     return ground;
// };

export class Ground {
    scene: Scene;
    ground: Mesh;

    constructor(scene: Scene) {
        this.scene = scene;

        this.ground = MeshBuilder.CreateGround('ground', {
            width: CONFIG.ground.width,
            height: CONFIG.ground.height,
        });
    }

    paint() {
        setMaterial('groundMaterial', this.ground, {
            diffuseColor: CONFIG.ground.color,
        });
    }
}
