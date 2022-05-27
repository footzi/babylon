import {CONFIG} from '../config';
import {Mesh, Scene, MeshBuilder} from '@babylonjs/core';
import {setMaterial} from '../utils';

export class Ground {
    scene: Scene;
    ground: Mesh;

    constructor(scene: Scene) {
        this.scene = scene;

        this.ground = MeshBuilder.CreateGround('ground', {
            width: CONFIG.ground.width,
            height: CONFIG.ground.height,
        });

        this.ground.receiveShadows = true;
    }

    public paint() {
        setMaterial('groundMaterial', this.ground, {
            diffuseColor: CONFIG.ground.color,
        });
    }

    public getGround() {
        return this.ground;
    }
}
