import {CONFIG} from './config';
import {Mesh, Vector3, Color3} from 'babylonjs';
import {Coords} from './interfaces';

export const setAbsolutePosition = (
    requireX: number,
    requireY: number,
    requireZ: number,
    mesh: Mesh,
    options = {},
) => {
    // @ts-ignore
    const {isCalcYBounding = false} = options;
    const {ground} = CONFIG;
    const size = mesh.getBoundingInfo().boundingBox.extendSize;
    const startX = -ground.width / 2 - size.x;
    const startZ = -ground.height / 2 - size.z;

    const x = startX + requireX;
    const y = isCalcYBounding ? size.y + requireY : requireY;
    const z = startZ + requireZ;

    mesh.position = new Vector3(x, y, z);
};

export const setPosition = (coords: Coords, mesh: Mesh) => {
    const {x = 0, y = 0, z = 0} = coords;
    mesh.position = new Vector3(x, y, z);
};

export const setRotation = (coords: Coords, mesh: Mesh) => {
    const {x = 0, y = 0, z = 0} = coords;

    console.log(x, y, z);

    mesh.rotation = new Vector3(
        BABYLON.Tools.ToRadians(x),
        BABYLON.Tools.ToRadians(y),
        BABYLON.Tools.ToRadians(z),
    );
};

export interface CreateAndSetMaterialOptions {
    diffuseColor: string;
}

export const createAndSetMaterial = (
    name = '',
    mesh: Mesh,
    options: CreateAndSetMaterialOptions,
) => {
    const material = new BABYLON.StandardMaterial(name);
    const {diffuseColor} = options;

    // @ts-ignore
    material.diffuseColor = new Color3.FromHexString(diffuseColor);

    // @ts-ignore
    mesh.material = material;

    return material;
};
