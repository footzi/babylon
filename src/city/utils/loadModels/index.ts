import {Coords} from '../../interfaces';
import {SceneLoader, ISceneLoaderAsyncResult} from '@babylonjs/core';
import {setPosition, setRotation} from '../index';

export const loadModels = async (
    folder: string,
    fileName: string,
    coords: Coords,
    rotationCoords?: Coords,
    meshNames?: string[],
): Promise<ISceneLoaderAsyncResult | null> => {
    try {
        const model = await SceneLoader.ImportMeshAsync(
            meshNames,
            `/models/city/${folder}/`,
            fileName,
        );

        const mesh = model && model.meshes[0] ? model.meshes[0] : null;

        if (mesh) {
            setPosition(coords, mesh);

            if (rotationCoords) {
                setRotation(rotationCoords, mesh);
            }
        }

        return model;
    } catch (error) {
        console.log(error);
        return null;
    }
};
