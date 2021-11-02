import * as BABYLON from 'babylonjs';

// Get the canvas DOM element
const canvas = document.getElementById('canvas');
// Load the 3D engine
const engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});

// Добавление объекта
const createSimpleBox = (scene) => {
    const box = BABYLON.MeshBuilder.CreateBox("box", {
        // параметры для BOX
        width: 3,
        height: 3,
        depth: 3
    }, scene);

    //box created with default size so height is 1
    box.position.y = 1.5 //3 / 2 = 1.5
}

// установка для каждой стороны куба изображений из спрайта материала
// https://doc.babylonjs.com/start/chap2/face_material
const createFaceUvForHouse = () => {
    const faceUV = [];
    faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face
    faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face
    faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
    faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side

    return faceUV;
}

const createBoxHouse = () => {
    const faceUV = createFaceUvForHouse();
    const box = BABYLON.MeshBuilder.CreateBox("box", {faceUV, wrap: true}); //unit cube
    // Изменение размеров куба
    // аналогично box.scaling.x = 2; box.scaling.y = 1.5; box.scaling.z = 3;
    box.scaling = new BABYLON.Vector3(1, 1, 1);

    // Изменение положения куба
    // Аналогично box.position.x = -2; box.position.y = 4.2; box.position.z = 0.1;
    box.position = new BABYLON.Vector3(4, 0.5, 0);

    // Вращение (для простоты используется только Y)
    box.rotation.y = BABYLON.Tools.ToRadians(45);

    // Добавление материала для дома
    const boxMaterial = new BABYLON.StandardMaterial("boxMaterial");
    // boxMaterial.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/floor.png");
    boxMaterial.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/cubehouse.png");
    box.material = boxMaterial;

    return box;
}

const createRoofHouse = () => {
    // создание цилиндра (не понятно как из него получается крыша)
    const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.4, height: 1.2, tessellation: 3});

    roof.position = new BABYLON.Vector3(4, 1.3, 0);
    roof.rotation.y = BABYLON.Tools.ToRadians(45);
    roof.rotation.z = Math.PI / 2;

    // Добавление материала для крыши
    const roofMaterial = new BABYLON.StandardMaterial("roofMaterial");
    roofMaterial.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg");
    roof.material = roofMaterial;

    return roof;
}

// Кланирование мешей - происходит с полным копированием всех свойств - включая позицию
const cloneHouse = (house) => {
   const clonedHouse = house.createInstance('cloned-house');

   clonedHouse.position = new BABYLON.Vector3(-8, 0, 0);
}

// Импорт мешей
const importMash = () => {
    BABYLON.SceneLoader.ImportMeshAsync(
        // мешей может быть несколько в одном файле
        ["ground", "semi_house"],
        "https://assets.babylonjs.com/meshes/",
        "both_houses_scene.babylon")
        .then((result) => console.log(result));
}

const createScene = () => {
    // Создание сцены
    const scene = new BABYLON.Scene(engine);

    // Установка камеры
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);

    // Установка света
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Создание земли
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10});

    // Создание материала и добавление для земли
    const groundMaterial = new BABYLON.StandardMaterial("groundMaterial");
    groundMaterial.diffuseColor = new BABYLON.Color3(0, 1, 0); // или new BABYLON.Color3.Green();
    ground.material = groundMaterial;

    const boxHouse = createBoxHouse();
    const roofHouse = createRoofHouse();
    // объединение мешей
    const house = BABYLON.Mesh.MergeMeshes([boxHouse, roofHouse], true, false, null, false, true);

    createSimpleBox(scene);
    cloneHouse(house);
    // importMash();

    return scene;
}

// call the createScene function
const scene = createScene();
// run the render loop
engine.runRenderLoop(function(){
    scene.render();
});
// the canvas/window resize event handler
window.addEventListener('resize', function(){
    engine.resize();
});