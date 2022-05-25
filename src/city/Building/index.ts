import {createAndSetMaterial, setPosition} from '../utils';
import Data from '../data.json';
import {Mesh, MeshBuilder, Scene} from 'babylonjs';
import {BuildingData, BuildingOptions} from './interfaces';

export class Building {
    scene: Scene;
    building: Mesh;
    options: BuildingOptions;

    constructor(scene: Scene, options: BuildingOptions) {
        this.scene = scene;
        this.options = options;
        this.building = MeshBuilder.CreateBox('Building_' + options.id, {
            width: options.size.width,
            depth: options.size.depth,
            height: options.size.height,
        });
    }

    paint() {
        const {coords, size, materials} = this.options;
        const {x, z} = coords;
        const y = size.height / 2;

        setPosition({x, y, z}, this.building);
        createAndSetMaterial('buildingMaterial', this.building, {
            diffuseColor: materials.color,
        });
    }
}

export const paintBuildings = (scene: Scene) => {
    Data.buildings.forEach((buildingData: BuildingData) => {
        const building = new Building(scene, {
            id: buildingData.id,
            coords: buildingData.coords,
            size: buildingData.size,
            materials: buildingData.materials,
        });

        building.paint();
    });
};
