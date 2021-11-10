import * as BABYLON from 'babylonjs';
import {BUILDING, GROUND} from './constants';
import {createRoad, createRoads, paintRoads} from './road';

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

export const createGround = () => {
    const ground = BABYLON.MeshBuilder.CreateGround('ground', {
        width: GROUND.WIDTH,
        height: GROUND.HEIGHT,
    });

    const groundMaterial = new BABYLON.StandardMaterial('groundMaterial');
    groundMaterial.diffuseColor = new BABYLON.Color3.FromHexString(
        GROUND.COLOR,
    );
    ground.material = groundMaterial;
    ground.enablePointerMoveEvents = true;

    return ground;
};

const paintRoad = (coords) => {
    const plane = BABYLON.MeshBuilder.CreatePlane('plane', {
        size: ROAD.SIZE,
    });

    plane.position.x = coords.x;
    plane.position.y = 0.01;
    plane.position.z = coords.z;

    plane.rotation.x = BABYLON.Tools.ToRadians(90);

    const planeMaterial = new BABYLON.StandardMaterial('planeMaterial');
    planeMaterial.diffuseColor = new BABYLON.Color3.FromHexString(ROAD.COLOR);
    plane.material = planeMaterial;
};

const createBuilding = () => {
    const box = BABYLON.MeshBuilder.CreateBox('box', {
        size: BUILDING.SIZE,
    });

    box.position.y = BUILDING.SIZE / 2;

    const boxMaterial = new BABYLON.StandardMaterial('boxMaterial');
    boxMaterial.diffuseColor = new BABYLON.Color3.FromHexString(BUILDING.COLOR);
    box.material = boxMaterial;
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

    camera.allowUpsideDown = false;
    camera.noRotationConstraint = true;
    camera.attachControl(canvas, true);
    // camera. = 10;

    const light = new BABYLON.HemisphericLight(
        'light',
        new BABYLON.Vector3(0, 1, 0),
        scene,
    );

    // Интенсивность света
    light.intensity = 1;

    const ground = createGround();
    paintRoads();
    // createBuilding();

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
