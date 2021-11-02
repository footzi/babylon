import * as BABYLON from 'babylonjs';

const canvas = document.getElementById('canvas');
const engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});

const createFaceUvForHouse = () => {
    const faceUV = [];
    faceUV[0] = new BABYLON.Vector4(0.6, 0.0, 1.0, 1.0); //rear face
    faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.4, 1.0); //front face
    faceUV[2] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //right side
    faceUV[3] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //left side

    return faceUV;
}

const createHouse = () => {
    const faceUV = createFaceUvForHouse();
    const box = BABYLON.MeshBuilder.CreateBox("box", {width: 2, faceUV, wrap: true}); //unit cube
    box.scaling = new BABYLON.Vector3(1, 1, 1);
    box.position = new BABYLON.Vector3(0, 0.5, 0);
    box.rotation.y = BABYLON.Tools.ToRadians(45);

    const boxMaterial = new BABYLON.StandardMaterial("boxMaterial");
    boxMaterial.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/semihouse.png");
    box.material = boxMaterial;

    const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.4, height: 1.2, tessellation: 3});
    roof.scaling = new BABYLON.Vector3(0.75, 2, 1);
    roof.position = new BABYLON.Vector3(0, 1.2, 0);
    roof.rotation.y = BABYLON.Tools.ToRadians(45);
    roof.rotation.z = Math.PI / 2;

    const roofMaterial = new BABYLON.StandardMaterial("roofMaterial");
    roofMaterial.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg");
    roof.material = roofMaterial;
}


const createScene = () => {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10});

    const groundMaterial = new BABYLON.StandardMaterial("groundMaterial");
    groundMaterial.diffuseColor = new BABYLON.Color3(0, 1, 0);
    ground.material = groundMaterial;

    createHouse(scene);

    return scene;
}

const scene = createScene();

engine.runRenderLoop(function(){
    scene.render();
});

window.addEventListener('resize', function(){
    engine.resize();
});