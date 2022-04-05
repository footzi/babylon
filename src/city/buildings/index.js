import * as BABYLON from 'babylonjs';
import {setAbsolutePosition, setRotation} from '../utils';

export const paintBuildings = async (scene) => {
    await BABYLON.SceneLoader.ImportMeshAsync('', '/models/', 'house-1.glb');

    const house = scene.getMeshByName('House_1');

    setAbsolutePosition(15, 0.45, 15, house);
    setRotation(0, 90, 0, house);
};
