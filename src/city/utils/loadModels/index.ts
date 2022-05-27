import {SceneLoader, ISceneLoaderAsyncResult, Vector3} from '@babylonjs/core';
import {setPosition, setRotation} from '../index';
import {LoadModelsOptions} from './interfaces';
import {ModelPath} from '../../interfaces';

export const loadModels = async (
    path: ModelPath,
    options: LoadModelsOptions,
): Promise<ISceneLoaderAsyncResult | null> => {
    const {folder, fileName} = path;
    const {position, rotation, scale, meshNames} = options;

    try {
        const model = await SceneLoader.ImportMeshAsync(
            meshNames,
            `/models/city/${folder}/`,
            fileName,
        );

        const mesh = model && model.meshes[0] ? model.meshes[0] : null;

        if (mesh) {
            setPosition(position.coords, mesh);

            if (rotation?.coords) {
                setRotation(rotation.coords, mesh);
            }

            if (scale) {
                const {value, coords} = scale;
                const scaling = scale.value
                    ? new Vector3(value, value, value)
                    : new Vector3(coords?.x, coords?.y, coords?.z);

                if (scaling) {
                    mesh.scaling = scaling;
                }
            }
        }

        return model;
    } catch (error) {
        console.log(error);
        return null;
    }
};
