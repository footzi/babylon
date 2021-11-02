import * as BABYLON from 'babylonjs';

const canvas = document.getElementById('canvas');
const engine = new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
});

const createScene = () => {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera(
        'camera',
        -Math.PI / 2,
        Math.PI / 2.5,
        3,
        new BABYLON.Vector3(0, 0, 0),
        scene,
    );
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight(
        'light',
        new BABYLON.Vector3(0, 1, 0),
        scene,
    );

    // Dude
    BABYLON.SceneLoader.ImportMeshAsync(
        'him',
        '/models/Dude/',
        'Dude.babylon',
        scene,
    ).then((result) => {
        const dude = result.meshes[0];
        dude.scaling = new BABYLON.Vector3(0.25, 0.25, 0.25);

        scene.beginAnimation(result.skeletons[0], 0, 100, true, 1.0);
    });

    return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});
window.addEventListener('resize', function () {
    engine.resize();
});
