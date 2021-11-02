import * as BABYLON from 'babylonjs';
import * as earcut from 'earcut';

window.earcut = earcut;

const canvas = document.getElementById('canvas');
const engine = new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
});

const getBodyCoords = () => {
    const outline = [
        new BABYLON.Vector3(-0.3, 0, -0.1),
        new BABYLON.Vector3(0.2, 0, -0.1),
    ];

    //curved front
    for (let i = 0; i < 20; i++) {
        outline.push(
            new BABYLON.Vector3(
                0.2 * Math.cos((i * Math.PI) / 40),
                0,
                0.2 * Math.sin((i * Math.PI) / 40) - 0.1,
            ),
        );
    }

    //top
    outline.push(new BABYLON.Vector3(0, 0, 0.1));
    outline.push(new BABYLON.Vector3(-0.3, 0, 0.1));

    return outline;
};

const getFaceUV = () => {
    const faceUV = [];
    faceUV[0] = new BABYLON.Vector4(0, 0.5, 0.38, 1);
    faceUV[1] = new BABYLON.Vector4(0, 0, 1, 0.5);
    faceUV[2] = new BABYLON.Vector4(0.38, 1, 0, 0.5);

    return faceUV;
};

const getWheelUV = () => {
    const wheelUV = [];
    wheelUV[0] = new BABYLON.Vector4(0, 0, 1, 1);
    wheelUV[1] = new BABYLON.Vector4(0, 0.5, 0, 0.5);
    wheelUV[2] = new BABYLON.Vector4(0, 0, 1, 1);

    return wheelUV;
};

const createWheels = (car, scene) => {
    // Рисование окружности
    const wheelRB = BABYLON.MeshBuilder.CreateCylinder('wheelRB', {
        diameter: 0.125,
        height: 0.05,
        faceUV: getWheelUV(),
    });

    wheelRB.parent = car;

    wheelRB.position = new BABYLON.Vector3(-0.2, 0.035, -0.1);

    const wheelRF = wheelRB.clone('wheelRF');
    wheelRF.position.x = 0.1;

    const wheelLB = wheelRB.clone('wheelLB');
    wheelLB.position.y = -0.2 - 0.035;

    const wheelLF = wheelRF.clone('wheelLF');
    wheelLF.position.y = -0.2 - 0.035;

    const wheelMat = new BABYLON.StandardMaterial('wheelMat');
    wheelMat.diffuseTexture = new BABYLON.Texture(
        'https://assets.babylonjs.com/environments/wheel.png',
    );

    wheelRB.material = wheelMat;
    wheelRF.material = wheelMat;
    wheelLB.material = wheelMat;
    wheelLF.material = wheelMat;

    const animWheel = animationWheels();

    //Link this animation to the right back wheel
    wheelRB.animations = [];
    wheelRB.animations.push(animWheel);
    wheelRF.animations = [];
    wheelRF.animations.push(animWheel);
    wheelLB.animations = [];
    wheelLB.animations.push(animWheel);
    wheelLF.animations = [];
    wheelLF.animations.push(animWheel);

    //Begin animation - object to animate, first frame, last frame and loop if true
    scene.beginAnimation(wheelRB, 0, 30, true);
    scene.beginAnimation(wheelRF, 0, 30, true);
    scene.beginAnimation(wheelLB, 0, 30, true);
    scene.beginAnimation(wheelLF, 0, 30, true);
};

const animationWheels = () => {
    const animWheel = new BABYLON.Animation(
        'wheelAnimation',
        'rotation.y',
        30,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE,
    );

    const wheelKeys = [];

    //At the animation key 0, the value of rotation.y is 0
    // Видимо создание начальной и конечной точки анимации
    wheelKeys.push({
        frame: 0,
        value: 0,
    });

    //At the animation key 30, (after 1 sec since animation fps = 30) the value of rotation.y is 2PI for a complete rotation
    wheelKeys.push({
        frame: 30,
        value: 2 * Math.PI,
    });

    //set the keys
    animWheel.setKeys(wheelKeys);

    return animWheel;
};

const animationCar = (car, scene) => {
    const animCar = new BABYLON.Animation(
        'carAnimation',
        'position.x',
        30,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE,
    );

    const carKeys = [];

    carKeys.push({
        frame: 0,
        value: -4,
    });

    carKeys.push({
        frame: 150,
        value: 4,
    });

    carKeys.push({
        frame: 210,
        value: 4,
    });

    animCar.setKeys(carKeys);

    car.animations = [];
    car.animations.push(animCar);

    //Begin animation - object to animate, first frame, last frame and loop if true
    scene.beginAnimation(car, 0, 210, true);
};

const createScene = () => {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera(
        'camera',
        -Math.PI / 2,
        Math.PI / 2.5,
        3,
        new BABYLON.Vector3(0, 0, 0),
    );
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight(
        'light',
        new BABYLON.Vector3(0, 1, 0),
    );

    // отрисовка полигонов
    const car = BABYLON.MeshBuilder.ExtrudePolygon('car', {
        shape: getBodyCoords(),
        depth: 0.2,
        faceUV: getFaceUV(),
        wrap: true,
    });

    const carMat = new BABYLON.StandardMaterial('carMat');
    carMat.diffuseTexture = new BABYLON.Texture(
        'https://assets.babylonjs.com/environments/car.png',
    );
    car.material = carMat;
    car.rotation.x = -Math.PI / 2;

    createWheels(car, scene);
    animationCar(car, scene);

    return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});
window.addEventListener('resize', function () {
    engine.resize();
});
