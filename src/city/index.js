import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import {BUILDING, GROUND} from './constants';
import {paintRoads} from './road';
import {paintGridCoords} from './gridCoords';
import {setAbsolutePosition} from './utils';
import {paintBuildings} from './buildings';
import {paintGround} from './ground';
import {paintCar} from './car';

let scene = null;

const canvas = document.getElementById('canvas');
const engine = new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
});

const input1 = document.getElementById('value-1');
input1.addEventListener('input', (event) => {
    const value = Number(event.target.value);
});

const createBuilding = () => {
    const box = BABYLON.MeshBuilder.CreateBox('box', {
        size: 1,
    });

    // console.log(box.getBoundingInfo(), 'box');

    // box.position.x = -0.5;
    // box.position.z = -0.5;

    const boxMaterial = new BABYLON.StandardMaterial('boxMaterial');
    boxMaterial.diffuseColor = new BABYLON.Color3.FromHexString(BUILDING.COLOR);
    box.material = boxMaterial;

    setAbsolutePosition(5, 0, 5, box);
};

const createScene = () => {
    const scene = new BABYLON.Scene(engine);
    scene.debugLayer.show();

    const camera = new BABYLON.ArcRotateCamera(
        'camera',
        -Math.PI / 2,
        Math.PI / 2.5,
        3,
        new BABYLON.Vector3(0, 0, 0),
        scene,
    );

    camera.attachControl(canvas, true);

    // вращение вверх-вниз
    camera.upperBetaLimit = 1.3;
    camera.lowerBetaLimit = 0.8;

    // приближение-отдаление
    camera.upperRadiusLimit = 10;
    camera.lowerRadiusLimit = 2;

    const light = new BABYLON.HemisphericLight(
        'light',
        new BABYLON.Vector3(0, 1, 0),
        scene,
    );

    // Интенсивность света
    light.intensity = 1;

    const ground = paintGround();
    paintRoads();
    paintBuildings(scene);
    paintCar(scene);
    // createBuilding();

    paintGridCoords();
    return scene;
};

scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener('resize', function () {
    engine.resize();
});

scene.onPointerPick = (event, pickInfo) => {
    // if (pickInfo?.pickedMesh?.name === 'cursor') {
    //     const vector = pickInfo.pickedPoint;
    //
    //     if (vector) {
    //         paintRoad(vector);
    //     }
    // }
};
