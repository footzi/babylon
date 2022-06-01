import {Mesh} from '@babylonjs/core';
import {CityMesh} from '../../interfaces';

export const mergeMeshes = (meshes?: Mesh[]): CityMesh | null => {
    if (!meshes?.length) {
        return null;
    }

    const root = meshes[0].getChildren()[0];

    // @ts-ignore
    root.setParent(null);
    meshes[0].dispose();

    const meshesToMerge = meshes.slice(1);
    const mergeMesh = Mesh.MergeMeshes(
        meshesToMerge,
        true,
        false,
        undefined,
        false,
        true,
    );
    if (mergeMesh) {
        mergeMesh.setParent(root);

        return mergeMesh;
    } else {
        return null;
    }
};
