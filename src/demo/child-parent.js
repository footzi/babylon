import * as BABYLON from 'babylonjs';

const canvas = document.getElementById('canvas');
const engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});

const faceColors = [
    BABYLON.Color3.Blue(), BABYLON.Color3.Teal(), BABYLON.Color3.Red(), BABYLON.Color3.Purple(),
    BABYLON.Color3.Green(), BABYLON.Color3.Yellow()
]

const createScene = () => {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    const boxParent = BABYLON.MeshBuilder.CreateBox("box", {faceColors});
    const boxChild = BABYLON.MeshBuilder.CreateBox("box", {size: 0.5, faceColors});

    boxChild.setParent(boxParent);

    boxParent.position = new BABYLON.Vector3(2, 0, 0);
    boxParent.rotation.x = 0;
    boxParent.rotation.y = 0;
    boxParent.rotation.z = -Math.PI / 4;

    // изменение положения дочернего элемента происходит в контексте родителя
    // все свойства дочернего копируются с родительского
    boxChild.position = new BABYLON.Vector3(0, 2, 0);

    return scene;
}

const scene = createScene();
engine.runRenderLoop(function(){
    scene.render();
});
window.addEventListener('resize', function(){
    engine.resize();
});