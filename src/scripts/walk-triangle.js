import * as BABYLON from 'babylonjs';

const canvas = document.getElementById('canvas');
const engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});


const createPoints = () => {
    const points = [];
    points.push(new BABYLON.Vector3(0, 0, 0));
    points.push(new BABYLON.Vector3(0, 0, 2));
    points.push(new BABYLON.Vector3(1, 0, 2));
    points.push(new BABYLON.Vector3(1, 0, 0));
    points.push(new BABYLON.Vector3(0, 0, 0));

    BABYLON.MeshBuilder.CreateLines("road", {points: points})
}

const createCar = () => {
    const box = BABYLON.MeshBuilder.CreateBox('car', {size: 0.1});

    return box;
}

const createScene = () => {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    createPoints();
    const car = createCar();

    let step = 0.05;
    let distance =  0;

    car.movePOV(0, 0, -2);

    // выполняется до отрисовки кадра
    scene.onBeforeRenderObservable.add(() => {
        car.movePOV(0, 0, step);
        // distance += step;
        // dis
        //code to execute
    });

    return scene;
}

const scene = createScene();

engine.runRenderLoop(function(){
    scene.render();
});
window.addEventListener('resize', function(){
    engine.resize();
});