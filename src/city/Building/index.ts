import {Scene, Vector3} from '@babylonjs/core';
import {loadModels} from '../utils';
import {CityMesh, BUILDING_TYPES, Model2, ModelPosition} from '../interfaces';

export class Building {
    scene: Scene;
    options: Model2;
    id: string;
    building!: CityMesh | null;

    constructor(scene: Scene, options: Model2) {
        this.scene = scene;
        this.options = options;
        this.id = options.id;
    }

    public async paint() {
        const {position, path, rotation} = this.options;

        const mesh = await loadModels(path, {
            position,
            rotation,
        });

        if (mesh && this.options.id) {
            mesh.city = {
                id: this.id,
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

    public setPosition(position: Vector3) {
        if (this.building) {
            this.building.position = position;
        }
    }

    public getMesh(): CityMesh | null {
        return this.building;
    }

    public getPositionCoords(): ModelPosition {
        const position = this.building?.position;

        return {
            coords: {x: position?.x, y: position?.y, z: position?.z},
        };
    }

    public getCoords(): Vector3 {
        return this.building?.position ?? new Vector3(0, 0, 0);
    }

    public remove() {
        this.building?.dispose();
    }
}
