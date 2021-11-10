import BABYLON from 'babylonjs';
import {ROAD} from './constants';

let cursor = null;

const paintCursor = (coords) => {
    if (cursor) {
        cursor.position.x = coords.x;
        cursor.position.z = coords.z;

        return;
    }

    cursor = BABYLON.MeshBuilder.CreatePlane('cursor', {
        size: ROAD.SIZE,
    });

    cursor.position.x = coords.x;
    cursor.position.y = 0.02;
    cursor.position.z = coords.z;

    cursor.rotation.x = BABYLON.Tools.ToRadians(90);

    const planeMaterial = new BABYLON.StandardMaterial('cursorMaterial');
    planeMaterial.diffuseColor = new BABYLON.Color3.Green();
    cursor.visibility = 0.3;
    cursor.material = planeMaterial;
};

scene.onPointerMove = (event, pickInfo, two) => {
    // todo нужен debounce
    if (pickInfo?.pickedMesh?.name === 'ground') {
        const vector = pickInfo.pickedPoint;

        if (vector) {
            paintCursor(vector);
        }
    }
};
