import * as BABYLON from 'babylonjs';
import {createAndSetMaterial, setAbsolutePosition} from '../utils';

export const paintCar = (scene) => {
    const car = BABYLON.MeshBuilder.CreateBox('box', {
        width: 0.3,
        depth: 0.5,
        height: 0.2,
    });

    setAbsolutePosition(10, 0, 10, car);

    createAndSetMaterial('carMaterial', car, {
        diffuseColor: '#FFFF00',
    });

    scene.onKeyboardObservable.add((event) => {});
};
