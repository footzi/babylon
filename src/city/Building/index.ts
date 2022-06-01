import {Scene} from '@babylonjs/core';
import {loadModels} from '../utils';
import {Model, CityMesh, BUILDING_TYPES} from '../interfaces';

export class Building {
    scene: Scene;
    options: Model;
    building!: CityMesh | null;

    constructor(scene: Scene, options: Model) {
        this.scene = scene;
        this.options = options;
    }

    public async paint() {
        const {position, path, rotation} = this.options;

        const mesh = await loadModels(path, {
            position,
            rotation,
        });

        if (mesh) {
            mesh.city = {
                type: BUILDING_TYPES.LIVING,
            };

            this.building = mesh;
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

    public getBuilding(): CityMesh | null {
        return this.building;
    }
}
