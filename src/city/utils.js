import {GROUND} from './constants';
import * as BABYLON from 'babylonjs';

export const setAbsolutePosition = (
    requireX,
    requireY,
    requireZ,
    mesh,
    options = {},
) => {
    const {isCalcYBounding = false} = options;
    const size = mesh.getBoundingInfo().boundingBox.extendSize;
    const startX = -GROUND.WIDTH / 2 - size.x;
    const startZ = -GROUND.HEIGHT / 2 - size.z;

    const x = startX + requireX;
    const y = isCalcYBounding ? size.y + requireY : requireY;
    const z = startZ + requireZ;

    mesh.position = new BABYLON.Vector3(x, y, z);
};

export const setPosition = (x, y, z, mesh) => {
    mesh.position = new BABYLON.Vector3(x, y, z);
};

export const setRotation = (angleX = 0, angleY = 0, angleZ = 0, mesh) => {
    mesh.rotation = new BABYLON.Vector3(
        BABYLON.Tools.ToRadians(angleX),
        BABYLON.Tools.ToRadians(angleY),
        BABYLON.Tools.ToRadians(angleZ),
    );
};

export const createAndSetMaterial = (name = '', mesh, options = {}) => {
    const material = new BABYLON.StandardMaterial(name);
    const {diffuseColor} = options;

    material.diffuseColor = new BABYLON.Color3.FromHexString(diffuseColor);

    mesh.material = material;

    return material;
};
