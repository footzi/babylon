import {GridMaterial} from '@babylonjs/materials';
import {CONFIG} from '../config';
import {Scene, Mesh, MeshBuilder} from '@babylonjs/core';
import {setPosition} from '../utils';

export class Grid {
    scene: Scene;
    ground: Mesh;

    constructor(scene: Scene) {
        this.scene = scene;
        this.ground = MeshBuilder.CreateGround('gridCoords', {
            width: CONFIG.ground.width,
            height: CONFIG.ground.height,
        });
    }

    paint() {
        const gridMaterial = new GridMaterial('gridMaterial');
        gridMaterial.gridRatio = 1;
        this.ground.material = gridMaterial;

        setPosition({y: CONFIG.ground.defaultCoords.y}, this.ground);
    }
}
