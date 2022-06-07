export * from './loadModels';

import {
    Mesh,
    Vector3,
    Color3,
    Tools,
    StandardMaterial,
    AbstractMesh,
} from '@babylonjs/core';
import {Coords} from '../interfaces';

export const setPosition = (coords: Coords, mesh: Mesh | AbstractMesh) => {
    const {x = 0, y = 0, z = 0} = coords;
    mesh.position = new Vector3(x, y, z);
};

export const setRotation = (coords: Coords, mesh: Mesh | AbstractMesh) => {
    const {x = 0, y = 0, z = 0} = coords;

    mesh.rotation = new Vector3(
        Tools.ToRadians(x),
        Tools.ToRadians(y),
        Tools.ToRadians(z),
    );
};

export interface SetMaterialOptions {
    diffuseColor: string;
}

export const setMaterial = (
    name = '',
    mesh: Mesh,
    options: SetMaterialOptions,
) => {
    const material = new StandardMaterial(name);
    const {diffuseColor} = options;

    // @ts-ignore
    material.diffuseColor = new Color3.FromHexString(diffuseColor);

    // @ts-ignore
    mesh.material = material;

    return material;
};

// export const setTexture = () => {
//     var mat = new StandardMaterial('mat', this.scene);
//     var texture = new Texture(
//         './textures/dry_ground_rocks_diff_2k.jpg',
//         this.scene,
//     );
//     mat.diffuseTexture = texture;
//
//     this.ground.material = mat;
// }

// export co
