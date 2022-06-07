import {SceneLoader, Vector3, Mesh} from '@babylonjs/core';
import {setPosition, setRotation} from '../index';
import {LoadModelsOptions} from './interfaces';
import {CityMesh, ModelPath} from '../../interfaces';
import {mergeMeshes} from '../mergeMeshes';

export const loadModels = async (
    path: ModelPath,
    options: LoadModelsOptions,
): Promise<CityMesh | null> => {
    const {folder, fileName} = path;
    const {
        position,
        rotation,
        scale,
        meshNames,
        isMergeMeshes = true,
    } = options;

    try {
        const model = await SceneLoader.ImportMeshAsync(
            meshNames,
            `/models/city/${folder}/`,
            fileName,
        );

        const meshes = model.meshes as Mesh[];

        const mesh = isMergeMeshes
            ? mergeMeshes(meshes)
            : model && meshes[0]
            ? meshes[0]
            : null;

        if (mesh) {
            if (position?.coords) {
                setPosition(position.coords, mesh);
            }

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

        return mesh;
    } catch (error) {
        console.log(error);
        return null;
    }
};
