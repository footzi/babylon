import {
    PointLight,
    Scene,
    Vector3,
    Color3,
    AbstractMesh,
} from '@babylonjs/core';
import {loadModels} from '../utils';
import {Model} from '../interfaces';

export class Building {
    scene: Scene;
    options: Model;
    building!: AbstractMesh | null;

    constructor(scene: Scene, options: Model) {
        this.scene = scene;
        this.options = options;
    }

    public async paint() {
        const {position, path, rotation} = this.options;

        const model = await loadModels(path, {position, rotation});

        if (model?.meshes[0]) {
            this.building = model.meshes[0];
        }

        // const pointLight = new PointLight(
        //     'pointLight',
        //     new Vector3(0, 1, 0),
        //     this.scene,
        // );
        //
        // pointLight.diffuse = new Color3(172 / 255, 246 / 255, 250 / 255);
        // pointLight.intensity = 0.1;
        //
        // if (model?.meshes[0]) {
        //     pointLight.parent = model.meshes[0];
        // }
    }

    public getBuilding(): AbstractMesh | null {
        return this.building;
    }
}
